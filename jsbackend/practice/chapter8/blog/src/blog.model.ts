export interface CreatePostDto {
  title: string;
  content: string;
  name: string;
}

export interface PostDto extends CreatePostDto {
  id: string;
  createdDt: Date;
  updatedDt?: Date;
}
