import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Category } from '../category/models/category.model';
import { uploadFile } from '../utils/upload-file.utils';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postModel: typeof Post,
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async create(createPostDto: CreatePostDto, file: any) {
    try {
      if (createPostDto.category_id) {
        const cat = await this.categoryModel.findByPk(
          createPostDto.category_id,
        );
        if (!cat) {
          throw new BadRequestException('category is not found');
        }
      }
      const filename = await uploadFile(file);
      const post = await this.postModel.create({
        url: filename,
        ...createPostDto,
      });

      return {
        status: HttpStatus.CREATED,
        data: { ...post.dataValues },
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

  async findAll(id: number) {
    try {
      const data = await this.postModel.findAll({ where: { category_id: id } });
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
      const data = await this.postModel.findByPk(id, { include: [Category] });
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

  async update(id: number, updatePostDto: UpdatePostDto, file: any) {
    try {
      const data = await this.postModel.findByPk(id);
      if (!data) {
        throw new BadRequestException('Post is not found');
      }
      if (updatePostDto.category_id) {
        const cat = await this.categoryModel.findByPk(
          updatePostDto.category_id,
        );
        if (!cat) {
          throw new BadRequestException('category is not found');
        }
      }
      let updated = {};
      if (file) {
        const filename = await uploadFile(file);
        updated = await data.update({ filename, ...updatePostDto });
      } else {
        updated = await data.update(updatePostDto);
      }

      return {
        status: HttpStatus.OK,
        data: { ...updated },
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
      const data = await this.postModel.findByPk(id);
      if (!data) {
        throw new BadRequestException('Post is not found');
      }
      await data.destroy();

      return {
        status: HttpStatus.OK,
        data: { message: 'delete success' },
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
