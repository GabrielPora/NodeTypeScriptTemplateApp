import 'reflect-metadata';
import express, { Request, Response } from "express";
import { getDs } from "./database/data-source";
import { ControllerMap, Routes } from "./routes";
import { checkSchemaAndDetermineSyncState } from "./database/db-initilisation";

const main = async () => {
  try {
    const shouldSyncSchema = await checkSchemaAndDetermineSyncState(
      process.env.DB_SCHEMA ?? "github",
      process.env.DB_DEFAULT_TABLE ?? "user"
    );
    const ds = await getDs(true).initialize();

    if (shouldSyncSchema) { // enable check once in production
    const dropBeforeSync = false;
    await ds.synchronize(dropBeforeSync);
	}

    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
      const allowedOrigins = [""];
      const origin = req.headers.origin ?? "";

      if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }

      // Set other CORS headers as needed
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      // Handle OPTIONS method for pre-flight requests
      if (req.method === "OPTIONS") {
        res.sendStatus(200);
      } else {
        next();
      }
    });

    Routes.forEach((route) => {
      const actionCallback = async (
        req: Request,
        res: Response,
        next: Function
      ) => {
        const result = await new (ControllerMap[route.controller] as any)()[
          route.action
        ](req, res, next);
        if (result !== null && result !== undefined) {
          res.json(result);
        }
      };
      app[route.method](route.route, actionCallback);
    });
    app.listen(3000, () => console.log("API RUNNING..."));
  } catch (error) {
    console.error(error);
  }
};

main();
