import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({
      name: createCategoryDto.name,
      parent_category: createCategoryDto.parent_category,
    });
  }

  findAll() {
    return this.categoryModel.findAll({
      include: [{ model: Category, attributes: ['id', 'name'] }],
      attributes: ['id', 'name'],
    });
  }

  findOne(id: number) {
    return this.categoryModel.findAll({ where: { parent_category: id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
