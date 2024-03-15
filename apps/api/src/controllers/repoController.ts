import { Request, Response } from "express";
import { Repository } from "../entities/repository";
import { dataSource } from "../database/data-source";
import axios from "axios";
// import qs from "qs";

const repository = dataSource.getRepository(Repository);

export class RepoController {
  async getAllRepos(req: Request, res: Response) {
    const repo = await repository.find();
    res.json(repo);
  }

  async getRepoById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const repo = await repository.findOneBy({ id });

    if (!repo) {
      res.status(404).send("Repo not found");
    } else {
      res.json(repo);
    }
  }

  async createRepo(req: Request, res: Response) {
    const newRepo = repository.create(req.body);

    try {
      await repository.save(newRepo);
      res.status(201).json(newRepo);
    } catch (error) {
      res.status(400).send("Failed to create repo");
    }
    var querystring = require("querystring");
    const baseUrl = process.env.BASE_URL;
    const owner = process.env.OWNER;
    const repos = process.env.REPOS;
    const url = baseUrl + "/repos/" + owner + "/" + repos + "/commits";
    //...
    axios
      .post(
        url,
        querystring.stringify({
          reponame: "abcd", //gave the values directly for testing
          password: "1235!",
          client_id: "repo-client",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      });
  }

  async updateRepo(req: Request, res: Response) {
    const repoId = parseInt(req.params.id);
    const updatedRepo = req.body;

    try {
      await repository.update(repoId, updatedRepo);
      res.status(200).send("Repo updated");
    } catch (error) {
      res.status(400).send("Failed to update repo");
    }
  }

  async deleteRepo(req: Request, res: Response) {
    const repoId = parseInt(req.params.id);

    try {
      await repository.delete(repoId);
      res.status(204).send("Repo deleted");
    } catch (error) {
      res.status(400).send("Failed to delete repo");
    }
  }
}
