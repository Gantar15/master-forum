import { Tag } from "./tag";
import { WatchedList } from "../../../shared/domain/WatchedList";

export class Tags extends WatchedList<Tag> {
  private constructor(initialVotes: Tag[]) {
    super(initialVotes);
  }

  public compareItems(a: Tag, b: Tag): boolean {
    return a.equals(b);
  }

  public static create(tags?: Tag[]): Tags {
    return new Tags(tags ? tags : []);
  }
}
