import { ConflictException, HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/create-auth.dto";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { password, username } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if ((error.code = "23505")) {
        throw new ConflictException("Username already exists");
      }
    }
    delete user.password;
    delete user.salt;
    return user;
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
    const { password, username } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return username;
    } else {
      return null;
    }
  }
  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
