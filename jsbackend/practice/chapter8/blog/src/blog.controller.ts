import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto, PostDto } from './blog.model';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllPosts(): Promise<PostDto[]> {
    return this.blogService.getAllPosts();
  }

  @Post()
  async createPost(@Body() createDto: CreatePostDto): Promise<string> {
    await this.blogService.createPost(createDto);
    return 'success';
  }

  @Get('/:id')
  async getPost(@Param('id') id: string): Promise<PostDto> {
    const post = await this.blogService.getPost(id);
    if (!post) throw new NotFoundException(`Post with id ${id} not found`);
    return post;
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string): Promise<string> {
    await this.blogService.delete(id);
    return 'success';
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() updateDto: CreatePostDto,
  ): Promise<PostDto> {
    const updated = await this.blogService.updatePost(id, updateDto);
    if (!updated) throw new NotFoundException(`Post with id ${id} not found`);
    return updated;
  }
}
