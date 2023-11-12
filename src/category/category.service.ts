import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { uploadFile } from '../utils/upload-file.utils';
import { Post } from '../posts/models/post.model';
import { dot } from 'node:test/reporters';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      console.log(createCategoryDto);
      const cat = await this.categoryModel.create({
        ...createCategoryDto,
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
        where: { parent_category: null },
        include: [{ model: Category }],
        order: [['id', 'ASC']],
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

  async findAllServices() {
    try {
      const data = await this.categoryModel.findAll({
        include: [{ model: Category }],
        order: [['id', 'ASC']],
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

  async findCategoryServices(id: number) {
    try {
      const data = await this.categoryModel.findAll({
        where: { parent_category: id },
        include: [{ model: Category }],
        order: [['id', 'ASC']],
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
      const cat = await this.categoryModel.findByPk(id, { include: [Post] });
      const data = await this.categoryModel.findAll({
        where: { parent_category: id },
      });
      return {
        status: HttpStatus.OK,
        data: { ...cat.dataValues, children: [...data] },
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
