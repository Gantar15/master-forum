import '../styles/PostSummary.scss';

import { Post } from '../../../../models/Post';
import PostMeta from './PostMeta';
import React from 'react';
import { TextUtil } from '../../../../../../shared/utils/TextUtil';

interface PostProps extends Post {}

const PostSummary: React.FC<PostProps> = (props) => (
  <div className="post">
    <PostMeta {...props} includeLink={false} />
    {!!props.text ? (
      <div
        className="post__body"
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
    ) : (
      <a className="link" target="_blank" href={props.link} rel="noreferrer">
        Click to visit the link at {TextUtil.getDomainNameFromUrl(props.link)}
      </a>
    )}
  </div>
);

export default PostSummary;
