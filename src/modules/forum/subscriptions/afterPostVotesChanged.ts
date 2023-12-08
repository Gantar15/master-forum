import { CommentVotesChanged } from "../domain/events/commentVotesChanged";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { PostId } from "../domain/postId";
import { PostVotesChanged } from "../domain/events/postVotesChanged";
import { UpdatePostStats } from "../useCases/post/updatePostStats/UpdatePostStats";

export class AfterPostVotesChanged implements IHandle<PostVotesChanged> {
  private updatePostStats: UpdatePostStats;

  constructor(updatePostStats: UpdatePostStats) {
    this.setupSubscriptions();
    this.updatePostStats = updatePostStats;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(
      this.onPostVotesChanged.bind(this),
      PostVotesChanged.name
    );
  }

  private async onPostVotesChanged(event: CommentVotesChanged): Promise<void> {
    // let postId: PostId = event.post.postId;
    // try {
    //   // Then, update the post stats
    //   await this.updatePostStats.execute({ postId: postId.getStringValue() });
    //   console.log(`[AfterPostVotesChanged]: Updated votes on postId={${postId.getStringValue()}}`);
    // } catch (err) {
    //   console.log(err);
    //   console.log(`[AfterPostVotesChanged]: Failed to update votes on postId={${postId.getStringValue()}}`)
    // }
  }
}
