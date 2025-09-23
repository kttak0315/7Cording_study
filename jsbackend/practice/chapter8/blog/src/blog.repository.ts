import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { PostDto, CreatePostDto } from './blog.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: CreatePostDto): Promise<void>;
  getPost(id: string): Promise<PostDto | undefined>;
  deletePost(id: string): Promise<void>;
  updatePost(id: string, postDto: CreatePostDto): Promise<PostDto | undefined>;
}
@Injectable()
export class BlogFileRepository implements BlogRepository {
  private readonly FILE_NAME = './src/blog.data.json';

  async getAllPost(): Promise<PostDto[]> {
    const data = await readFile(this.FILE_NAME, 'utf8');
    return JSON.parse(data) as PostDto[];
  }

  async createPost(postDto: CreatePostDto): Promise<void> {
    const posts = await this.getAllPost();
    const id = (posts.length + 1).toString();
    const newPost: PostDto = { id, ...postDto, createdDt: new Date() };
    posts.push(newPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts, null, 2));
  }

  async getPost(id: string): Promise<PostDto | undefined> {
    const posts = await this.getAllPost();
    return posts.find((post) => post.id === id);
  }

  async deletePost(id: string): Promise<void> {
    const posts = await this.getAllPost();
    const filtered = posts.filter((post) => post.id !== id);
    await writeFile(this.FILE_NAME, JSON.stringify(filtered, null, 2));
  }

  async updatePost(
    id: string,
    postDto: CreatePostDto,
  ): Promise<PostDto | undefined> {
    const posts = await this.getAllPost();
    const index = posts.findIndex((post) => post.id === id);
    if (index === -1) return undefined;

    const updatedPost: PostDto = {
      ...posts[index],
      ...postDto,
      updatedDt: new Date(),
    };
    posts[index] = updatedPost;
    await writeFile(this.FILE_NAME, JSON.stringify(posts, null, 2));
    return updatedPost;
  }
}
@Injectable()
export Class BlogMongoRepository implements BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}
  async getAllPost(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updateDt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogModel.findById(id);
  }

  async deletePost(id: string) {
    await this.blogModel.findByIdAndDelete(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    const updatePost = identity, ...postDto, updatedDt: new Date() };
    await this.blogModel.findByIdAndUpdate(identity, updatePost);
  }
}
