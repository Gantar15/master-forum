import '../styles/PostMeta.scss';

import { Link } from 'react-router-dom';
import { Post } from '../../../../models/Post';
import React from 'react';
import moment from 'moment';

interface PostMetaProps extends Post {
  includeLink?: boolean;
}

const PostMeta: React.FC<PostMetaProps> = (props) => (
  <div className="post-row-content">
    {props.includeLink === false ? (
      ''
    ) : (
      <Link to={`/discuss/${props.slug}`} className="title">
        "{props.title}" {props.link ? <span className="link">[link]</span> : ''}
      </Link>
    )}
    <div className="post-row-meta">
      {moment(props.createdAt).fromNow()} | {`by `}{' '}
      <Link to={`/member/${props.postAuthor}`}>{props.postAuthor}</Link> |{' '}
      {`${props.numComments} comments`}
    </div>
    <div className="post-row-classification">
      <Link
        className="post-row-classification__category"
        to={`/category/${props.category}`}
      >
        {props.category}
      </Link>
      <div className="post-row-classification__tags">
        {props.tags?.length > 0 &&
          props.tags.map((tag) => <div key={tag}>#{tag}</div>)}
      </div>
    </div>
  </div>
);

export default PostMeta;
