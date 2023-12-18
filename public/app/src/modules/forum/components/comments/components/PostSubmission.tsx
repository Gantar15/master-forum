import '../styles/PostSubmission.scss';

import React, { useEffect, useState } from 'react';

import ArratInput from '../../../../../shared/components/array-input/components/ArratInput';
import Editor from './Editor';
import { PostType } from '../../../models/Post';
import { PostUtil } from '../../../utils/PostUtil';
import Select from '../../../../../shared/components/select/components/Select';
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
  categories?: string[];
  tagsValue: string[];
  onSubmit: () => void;
}

const PostSubmission: React.FC<IPostSubmissionProps> = (props) => {
  const [categoriesOptions, setCategoriesOptions] = useState<
    | {
        label: string;
        value: string;
      }[]
  >([]);

  useEffect(() => {
    if (props.categories) {
      setCategoriesOptions(
        props.categories.map((c) => ({ label: c, value: c }))
      );
    }
  }, [props.categories]);

  return (
    <div className="post-submission">
      <h2>Title</h2>
      <TextInput
        type="text"
        onChange={(val: string) => props.updateFormField('title', val)}
        placeholder="Enter the title"
        value={props.titleValue}
      />

      <Select
        options={categoriesOptions}
        placeHolder="Select a category"
        isSearchable={true}
        onChange={(val: { label: string; value: string }) =>
          props.updateFormField('category', val.value)
        }
        value={
          props.categoryValue
            ? {
                label: props.categoryValue,
                value: props.categoryValue
              }
            : undefined
        }
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
};

export default PostSubmission;
