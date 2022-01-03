import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/, {
    message: "Password is too weak",
  })
  password: string;
}
