import { Button } from '../../../../../shared/components/button';
import { Link } from 'react-router-dom';
import React from 'react';

interface ProfileButtonProps {
  isLoggedIn: boolean;
  username: string;
  userId?: string;
  onLogout: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  return props.isLoggedIn ? (
    <Button
      text={
        <>
          <Link to={`/member/${props.userId}`}>{props.username}</Link>
          {' / '}
          <u style={{ cursor: 'pointer' }} onClick={props.onLogout}>
            logout
          </u>
        </>
      }
      style={{ cursor: 'auto' }}
    />
  ) : (
    <Button
      text="Join"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/join';
        }
      }}
    />
  );
};

export default ProfileButton;
