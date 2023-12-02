import { PostType } from "../../../domain/postType";

export interface CreatePostDTO {
  userId: string;
  title: string;
  text: string;
  link: string;
  postType: PostType;
  category: string;
  tags: string[];
}
