import { CategoryRepo } from "./implementations/categoryRepo";
import { CommentRepo } from "./implementations/commentRepo";
import { CommentVotesRepo } from "./implementations/sequelizeCommentVotesRepo";
import { MemberRepo } from "./implementations/sequelizeMemberRepo";
import { PostRepo } from "./implementations/sequelizePostRepo";
import { PostVotesRepo } from "./implementations/sequelizePostVotesRepo";
import models from "../../../shared/infra/database/sequelize/models";

const commentVotesRepo = new CommentVotesRepo(models);
const postVotesRepo = new PostVotesRepo(models);
const memberRepo = new MemberRepo(models);
const commentRepo = new CommentRepo(models, commentVotesRepo);
const postRepo = new PostRepo(models, commentRepo, postVotesRepo);
const categoryRepo = new CategoryRepo(models);

export {
  memberRepo,
  postRepo,
  commentRepo,
  postVotesRepo,
  commentVotesRepo,
  categoryRepo,
};
