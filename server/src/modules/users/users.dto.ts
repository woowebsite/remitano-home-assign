import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class UserLoginRegisterRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UserLoginRegisterResponseDto {
  @IsBoolean()
  isNewUser: boolean;

  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
