import { ESPostService } from "./esPostService";
import { PostService } from "./postService";
import { esConnection } from "./esConnection";

const postService = new PostService();

const esPostService = new ESPostService(esConnection);
esPostService.createIndex();

export { postService, esPostService };
