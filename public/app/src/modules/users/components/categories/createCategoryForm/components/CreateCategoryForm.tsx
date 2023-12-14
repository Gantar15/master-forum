import '../styles/CreateCategoryForm.scss';

import { Button } from '../../../../../../shared/components/button';
import React from 'react';
import { TextInput } from '../../../../../../shared/components/text-input';

type CreateCategoryFormProps = {
  updateFormField: (fieldName: string, value: string) => void;
  onSubmit: () => void;
};

const CreateCategoryForm = (props: CreateCategoryFormProps) => {
  const [isWrapped, setIsWrapped] = React.useState(false);

  return (
    <div className="create-category-manager-form">
      <Button
        text="Create form"
        onClick={() => setIsWrapped((isWrapped) => !isWrapped)}
      />
      <br />
      <div
        className={
          isWrapped
            ? 'create-category-manager-form__form--wrapped'
            : 'create-category-manager-form__form'
        }
      >
        <TextInput
          placeholder="category title"
          onChange={(category: string) =>
            props.updateFormField('category', category)
          }
          type="text"
        />
        <div className="create-category-manager-form__button">
          <Button text="Create category" onClick={() => props.onSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
