import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "../dto/create-auth.dto";
import { UpdateAuthDto } from "../dto/update-auth.dto";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UserRepository } from "../repos/user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async singIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto
    );
    if (!username) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
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
