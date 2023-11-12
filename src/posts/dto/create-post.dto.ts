import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title_uz: string;
  @IsString()
  @IsNotEmpty()
  title_ru: string;
  @IsString()
  @IsNotEmpty()
  title_en: string;
  @IsString()
  @IsNotEmpty()
  content_uz: string;
  @IsString()
  @IsNotEmpty()
  content_ru: string;
  @IsString()
  @IsNotEmpty()
  content_en: string;
  @IsNumber()
  @IsPositive()
  category_id: number;
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
