import { AfterCommentPosted } from "./afterCommentPosted";
import { AfterCommentVotesChanged } from "./afterCommentVotesChanged";
import { AfterPostVotesChanged } from "./afterPostVotesChanged";
import { AfterUserCreated } from "./afterUserCreated";
import { createMember } from "../useCases/members/createMember";
import { updateCommentStats } from "../useCases/comments/updateCommentStats";
import { updatePostStats } from "../useCases/post/updatePostStats";

// Subscriptions
new AfterUserCreated(createMember);
new AfterCommentPosted(updatePostStats);
new AfterCommentVotesChanged(updatePostStats, updateCommentStats);
new AfterPostVotesChanged(updatePostStats);
