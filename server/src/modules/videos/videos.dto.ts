import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsEmail,
  ValidateNested,
} from 'class-validator';

export class CreatedByDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;
}

export class VideoDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  sharedLink: string;

  @IsString()
  youtubeId: string;

  @ValidateNested()
  createdBy: CreatedByDto;
}
