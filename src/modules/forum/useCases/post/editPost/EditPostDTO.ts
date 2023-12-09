import { PostType } from "../../../domain/postType";

export interface EditPostDTO {
  userId: string;
  managerUser: boolean;
  adminUser: boolean;
  slug: string;
  postType?: PostType;
  title?: string;
  text?: string;
  link?: string;
  category?: string;
  tags?: string[];
}
