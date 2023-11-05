import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostFileValidator } from '../validators/post-file.validator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('add')
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(
      'file',
      new ParseFilePipe({
        validators: [new PostFileValidator({})],
      }),
    )
    file: any,
  ) {
    return this.postsService.create(createPostDto, file);
  }

  @Get('category/:id')
  findAll(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile(
      'file',
      new ParseFilePipe({
        validators: [new PostFileValidator({})],
      }),
    )
    file: any,
  ) {
    return this.postsService.update(+id, updatePostDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
