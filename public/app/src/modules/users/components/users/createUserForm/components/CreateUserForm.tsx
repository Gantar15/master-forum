import '../styles/CreateUserForm.scss';

import { Button } from '../../../../../../shared/components/button';
import React from 'react';
import { TextInput } from '../../../../../../shared/components/text-input';

type CreateUserFormProps = {
  updateFormField: (fieldName: string, value: string) => void;
  onSubmit: () => void;
};

const CreateUserForm = (props: CreateUserFormProps) => {
  const [isWrapped, setIsWrapped] = React.useState(false);

  return (
    <div className="create-user-manager-form">
      <Button
        text="Create form"
        onClick={() => setIsWrapped((isWrapped) => !isWrapped)}
      />
      <br />
      <div
        className={
          isWrapped
            ? 'create-user-manager-form__form--wrapped'
            : 'create-user-manager-form__form'
        }
      >
        <TextInput
          placeholder="email"
          onChange={(val: string) => props.updateFormField('email', val)}
          type="text"
        />
        <TextInput
          placeholder="username"
          onChange={(val: string) => props.updateFormField('username', val)}
          type="text"
        />
        <TextInput
          placeholder="role"
          onChange={(val: string) => props.updateFormField('role', val)}
          type="text"
        />
        <TextInput
          placeholder="password"
          onChange={(val: string) => props.updateFormField('password', val)}
          type="password"
        />
        <div className="create-user-manager-form__button">
          <Button text="Create user" onClick={() => props.onSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
