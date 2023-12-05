export interface EditPostDTO {
  userId: string;
  slug: string;
  title?: string;
  text?: string;
  link?: string;
  category?: string;
  tags?: string[];
}
