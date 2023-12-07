import { PostType } from "../../../domain/postType";

export interface EditPostDTO {
  userId: string;
  slug: string;
  postType?: PostType;
  title?: string;
  text?: string;
  link?: string;
  category?: string;
  tags?: string[];
}
