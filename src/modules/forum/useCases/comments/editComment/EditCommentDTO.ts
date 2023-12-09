export interface EditCommentDTO {
  commentId: string;
  comment: string;
  userId: string;
  managerUser: boolean;
  adminUser: boolean;
}
