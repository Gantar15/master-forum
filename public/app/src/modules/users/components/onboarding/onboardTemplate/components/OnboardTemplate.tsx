import '../styles/OnboardTemplate.scss';

import { Button } from '../../../../../../shared/components/button';
import GoogleIcon from '../../../../../../assets/img/google-icon.png';
import { IconButton } from '../../../../../../shared/components/button/components/IconButton';
import { Link } from 'react-router-dom';
import { Loader } from '../../../../../../shared/components/loader';
import React from 'react';
import { TextInput } from '../../../../../../shared/components/text-input';

type TemplateType = 'login' | 'signup';

interface OnboardTemplateProps {
  type: TemplateType;
  updateFormField: (fieldName: string, value: string) => void;
  onSubmit: () => void;
  onGoogleOauth: () => void;
  isLoggingIn?: boolean;
  isCreatingUser?: boolean;
}

function getRedirectTextName(type: TemplateType): string {
  return type === 'login' ? 'Signup' : 'Login';
}

function getRedirectText(type: TemplateType): string {
  return type === 'signup'
    ? 'already have an account?'
    : "don't have an account?";
}

function getRedirectLocation(type: TemplateType): string {
  return type === 'signup' ? '/login' : '/join';
}

function getTitle(type: TemplateType) {
  return type === 'signup' ? 'Create account' : 'Log in';
}

const OnboardTemplate: React.FC<OnboardTemplateProps> = (props) => (
  <div className="onboard-container">
    <p className="title">{getTitle(props.type)}</p>
    <br />
    {props.type === 'signup' && (
      <TextInput
        placeholder="email"
        onChange={(val: string) => props.updateFormField('email', val)}
        type="text"
      />
    )}
    <TextInput
      placeholder="username"
      onChange={(val: string) => props.updateFormField('username', val)}
      type="text"
    />
    <TextInput
      placeholder="password"
      onChange={(val: string) => props.updateFormField('password', val)}
      type="password"
    />
    <br />
    <div className="submit-container">
      <IconButton onClick={props.onGoogleOauth} icon={GoogleIcon} width={35} />
      <div className="submit-container__block">
        <div className="message">
          <p>{getRedirectText(props.type)}</p>
          <Link to={getRedirectLocation(props.type)}>
            {getRedirectTextName(props.type)}
          </Link>
        </div>
        {(
          props.type === 'signup' ? props.isCreatingUser : props.isLoggingIn
        ) ? (
          <Loader />
        ) : (
          <Button text="Submit" onClick={() => props.onSubmit()} />
        )}
      </div>
    </div>
  </div>
);

export default OnboardTemplate;
