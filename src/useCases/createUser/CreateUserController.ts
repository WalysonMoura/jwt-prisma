import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(res: Response, req: Request) {
    const { username, name, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.execute({
      username,
      name,
      password,
    });

    return res.json(user);
  }
}
