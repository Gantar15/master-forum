import { memberRepo, postRepo } from "../../../repos";

import { GetPostBySlug } from "./GetPostBySlug";
import { GetPostBySlugController } from "./GetPostBySlugController";

const getPostBySlug = new GetPostBySlug(postRepo, memberRepo);
const getPostBySlugController = new GetPostBySlugController(getPostBySlug);

export { getPostBySlug, getPostBySlugController };
