import { Injectable } from '@nestjs/common';
import { PostDto, CreatePostDto } from './blog.model'; // CreatePostDto 추가
import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
  private readonly blogRepository = new BlogFileRepository();

  async getAllPosts(): Promise<PostDto[]> {
    return this.blogRepository.getAllPost();
  }

  async createPost(postDto: CreatePostDto): Promise<void> {
    await this.blogRepository.createPost(postDto);
  }

  async getPost(id: string): Promise<PostDto | undefined> {
    return this.blogRepository.getPost(id);
  }

  async delete(id: string): Promise<void> {
    await this.blogRepository.deletePost(id);
  }

  async updatePost(
    id: string,
    postDto: CreatePostDto,
  ): Promise<PostDto | undefined> {
    return this.blogRepository.updatePost(id, postDto);
  }
}
