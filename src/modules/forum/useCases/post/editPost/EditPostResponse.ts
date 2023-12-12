import { Either, Result } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { EditPostErrors } from "./EditPostErrors";
import { PostDetails } from "../../../domain/postDetails";

export type EditPostResponse = Either<
  | EditPostErrors.PostNotFoundError
  | EditPostErrors.ForbiddenError
  | AppError.UnexpectedError
  | AppError.MessageError,
  Result<PostDetails>
>;
