import { Request, Response } from "express";
import { Commit } from "../entities/commit";
import { dataSource } from "../database/data-source";
import { GitApiUrlParam } from "../interfaces/owner";
import axios from "axios";
// import qs from "qs";

const commitRepository = dataSource.getRepository(Commit);

export class CommitController {
  async getAllCommits(req: Request, res: Response) {
    const commit = await commitRepository.find();
    res.json(commit);
  }

  async getCommitById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const commit = await commitRepository.findOneBy({ id });

    if (!commit) {
      res.status(404).send("Commit not found");
    } else {
      res.json(commit);
    }
  }

  async createCommit(req: Request, res: Response) {
    const gitApiUrlParam: GitApiUrlParam = {
      owner: req.params.owner,
      repos: req.params.repos,
    };
    var querystring = require("querystring");
    const baseUrl = process.env.BASE_URL;
    const owner = gitApiUrlParam.owner
      ? gitApiUrlParam.owner
      : process.env.OWNER;
    const repos = gitApiUrlParam.repos
      ? gitApiUrlParam.repos
      : process.env.REPOS;
    const url = baseUrl + "/repos/" + owner + "/" + repos + "/commits";

    let results: any = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    let value: Commit[];
    if (results !== null && results !== undefined) {
      let data = results.data;
      data.forEach((element) => {
		console.log(element);
        // value.push(element);
      });
    }

    const newCommit = commitRepository.create(value);

    try {
      await commitRepository.save(newCommit);
      res.status(201).json(newCommit);
    } catch (error) {
      res.status(400).send("Failed to create commit");
    }
  }

  async updateCommit(req: Request, res: Response) {
    const repoId = parseInt(req.params.id);
    const updatedCommit = req.body;

    try {
      await commitRepository.update(repoId, updatedCommit);
      res.status(200).send("Commit updated");
    } catch (error) {
      res.status(400).send("Failed to update commit");
    }
  }

  async deleteCommit(req: Request, res: Response) {
    const repoId = parseInt(req.params.id);

    try {
      await commitRepository.delete(repoId);
      res.status(204).send("Commit deleted");
    } catch (error) {
      res.status(400).send("Failed to delete commit");
    }
  }
}
