import { Request, Response } from "express";
import { User } from "../entities/user";
import { dataSource } from "../database/data-source";

const userRepository = dataSource.getRepository(User);

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  }

  async createUser(req: Request, res: Response) {
    const newUser = userRepository.create(req.body);

    try {
      await userRepository.save(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).send("Failed to create user");
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    try {
      await userRepository.update(userId, updatedUser);
      res.status(200).send("User updated");
    } catch (error) {
      res.status(400).send("Failed to update user");
    }
  }

  async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    try {
      await userRepository.delete(userId);
      res.status(204).send("User deleted");
    } catch (error) {
      res.status(400).send("Failed to delete user");
    }
  }
}
