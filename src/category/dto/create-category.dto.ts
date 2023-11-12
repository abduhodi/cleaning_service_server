import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name_uz: string;
  @IsString()
  @IsNotEmpty()
  name_ru: string;
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  description_uz: string;
  @IsString()
  @IsNotEmpty()
  description_ru: string;
  @IsString()
  @IsNotEmpty()
  description_en: string;

  parent_category?: number;
}
