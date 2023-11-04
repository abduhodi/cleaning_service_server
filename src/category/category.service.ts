import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { uploadFile } from '../utils/upload-file.utils';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const cat = await this.categoryModel.create({
        name: createCategoryDto.name,
        parent_category: createCategoryDto.parent_category,
      });
      return {
        status: HttpStatus.CREATED,
        data: { ...cat.dataValues },
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      const data = await this.categoryModel.findAll({
        include: [{ model: Category, attributes: ['id', 'name'] }],
        attributes: ['id', 'name'],
      });
      return {
        status: HttpStatus.OK,
        data,
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.categoryModel.findAll({
        where: { parent_category: id },
      });
      return {
        status: HttpStatus.OK,
        data,
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }

  async fileUpload(file: any) {
    try {
      const filename = await uploadFile(file);
      return {
        status: HttpStatus.OK,
        data: { filename },
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const cat = await this.categoryModel.update(updateCategoryDto, {
        where: { id },
        returning: true,
      });
      if (!cat[0]) {
        throw new BadRequestException('Update is failed');
      }
      return {
        status: HttpStatus.OK,
        data: cat[1][0],
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryModel.findByPk(id);
      if (!category) {
        throw new BadRequestException('Category is not found');
      }
      await category.destroy();
      return {
        status: HttpStatus.OK,
        data: { message: 'delete succes' },
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }
}
