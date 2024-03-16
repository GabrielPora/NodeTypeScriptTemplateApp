import { Request, Response } from "express";
import { Commit } from "../entities/commit";
import { dataSource } from "../database/data-source";
import { GitApiUrlParam } from "../interfaces/owner";
import axios from "axios";
import { Octokit } from "octokit";
import { Verification } from "../entities/verification";
import { Author } from "../entities/author";
import { Tree } from "../entities/tree";
import { Committer } from "../entities/committer";
// import qs from "qs";

const commitRepository = dataSource.getRepository(Commit);
const authorRepository = dataSource.getRepository(Author);
const committerRepository = dataSource.getRepository(Committer);
const verificationRepository = dataSource.getRepository(Verification);
const treeRepository = dataSource.getRepository(Tree);

export class CommitController {
  async getAllCommits(req: Request, res: Response) {
    const commit = await commitRepository.find();
    res.json(commit);
  }

  async getCommitById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const commit = await commitRepository.findOneBy({ id });
    const commitTest = await commitRepository.findOne({
      where: { id },
      //   relations: { author: true },
    });

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
    const baseUrl = process.env.BASE_URL;
    const owner = gitApiUrlParam.owner
      ? gitApiUrlParam.owner
      : process.env.OWNER;
    const repos = gitApiUrlParam.repos
      ? gitApiUrlParam.repos
      : process.env.REPOS;

    const octokit = new Octokit({
      auth: process.env.TOKEN,
    });

    let results = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: owner,
      repo: repos,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    let commitArr: Commit[] = [];
    if (results !== null && results !== undefined) {
      results.data.forEach((element) => {
        const url = new URL(element.commit.url);
        let elm = Object.assign(new Commit(), {
          author: element.commit.author,
          committer: element.commit.committer,
          message: element.commit.message,
          comment_count: element.commit.comment_count,
          verification: element.commit.verification,
          url: url.toString(),
          tree: element.commit.tree,
        });
        commitArr.push(elm);
      });
    }

    const newCommit = commitRepository.create(commitArr);

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
