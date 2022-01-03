import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "../dto/create-auth.dto";
import { UpdateAuthDto } from "../dto/update-auth.dto";
import { UserRepository } from "../repos/user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async singIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto
    );
    if (!username) {
      throw new UnauthorizedException("Invalid credentials!");
    }
    return username;
  }

  findAll() {
    return `This action returns all auth`;
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }
}
