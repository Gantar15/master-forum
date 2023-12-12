import '../styles/PostSubmission.scss';

import ArratInput from '../../../../../shared/components/array-input/components/ArratInput';
import Editor from './Editor';
import { PostType } from '../../../models/Post';
import { PostUtil } from '../../../utils/PostUtil';
import React from 'react';
import { SubmitButton } from '../../../../../shared/components/button';
import { TextInput } from '../../../../../shared/components/text-input';

interface IPostSubmissionProps {
  updateFormField: (fieldName: string, val: string | string[]) => void;
  onPostTypeChanged: (type: PostType) => void;
  postType: PostType;
  textValue: string;
  titleValue: string;
  linkValue: string;
  categoryValue: string;
  tagsValue: string[];
  onSubmit: () => void;
}

const PostSubmission: React.FC<IPostSubmissionProps> = (props) => (
  <div className="post-submission">
    <h2>Title</h2>
    <TextInput
      type="text"
      onChange={(val: string) => props.updateFormField('title', val)}
      placeholder="Enter the title"
      value={props.titleValue}
    />

    <TextInput
      type="text"
      onChange={(val: string) => props.updateFormField('category', val)}
      placeholder="Enter the category"
      value={props.categoryValue}
    />

    <ArratInput
      value={props.tagsValue}
      onChange={(val: string[]) => props.updateFormField('tags', val)}
    />

    <h2>
      <span
        onClick={() => props.onPostTypeChanged('text')}
        className={`choice ${props.postType === 'text' ? 'active' : ''}`}
      >
        Text
      </span>{' '}
      |{' '}
      <span
        onClick={() => props.onPostTypeChanged('link')}
        className={`choice ${props.postType === 'link' ? 'active' : ''}`}
      >
        Link
      </span>{' '}
      <span>(choose)</span>
    </h2>

    <div
      style={{
        display: props.postType === 'text' ? 'block' : 'none'
      }}
    >
      <Editor
        text={props.textValue}
        maxLength={PostUtil.maxTextLength}
        placeholder={'Write a post!'}
        handleChange={(html: string) => props.updateFormField('text', html)}
      />
    </div>

    <div
      style={{
        display: props.postType === 'link' ? 'block' : 'none'
      }}
    >
      <TextInput
        value={props.linkValue}
        type="text"
        onChange={(val: string) => props.updateFormField('link', val)}
        placeholder="Paste a link! Ex: https://site.com/some-post"
      />
    </div>

    <br />

    <SubmitButton onClick={() => props.onSubmit()} text="Submit post" />
  </div>
);

export default PostSubmission;
