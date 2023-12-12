import { ForumState } from '../redux/states';
import { IForumOperations } from '../redux/operators';
import React from 'react';

interface withVotingProps extends IForumOperations {
  users: ForumState;
}

function withVoting(WrappedComponent: any) {
  class HOC extends React.Component<withVotingProps, any> {
    constructor(props: withVotingProps) {
      super(props);
    }

    handleUpvoteComment(commentId: string, postSlug: string) {
      this.props.upvoteComment(commentId, postSlug);
    }

    handleDownvoteComment(commentId: string, postSlug: string) {
      this.props.downvoteComment(commentId, postSlug);
    }

    handleUpvotePost(postSlug: string) {
      this.props.upvotePost(postSlug);
    }

    handleDownvotePost(postSlug: string) {
      this.props.downvotePost(postSlug);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          upvoteComment={(commentId: string, postSlug: string) =>
            this.handleUpvoteComment(commentId, postSlug)
          }
          downvoteComment={(commentId: string, postSlug: string) =>
            this.handleDownvoteComment(commentId, postSlug)
          }
          upvotePost={(slug: string) => this.handleUpvotePost(slug)}
          downvotePost={(slug: string) => this.handleDownvotePost(slug)}
        />
      );
    }
  }
  return HOC;
}

export default withVoting;
