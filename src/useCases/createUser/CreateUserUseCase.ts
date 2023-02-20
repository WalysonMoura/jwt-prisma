import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserResquest {
  name: string;
  password: string;
  username: string;
}

export class CreateUserUseCase {
  async execute({ name, password, username }: IUserResquest) {
    const UserAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (UserAlreadyExists) {
      new Error("User already exists!");
    }

    const passowordHash = await hash(password, 8);
    const user = await client.user.create({
      date: {
        name,
        username,
        passoword: passowordHash,
      },
    });

    return user;
  }
}
