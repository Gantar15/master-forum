import '../styles/UserRow.scss';

import EntityActions from '../../../../../../shared/components/entity-actions/components/EntityActions';
import React from 'react';
import { User } from '../../../../models/user';

type Props = {
  onAction: (action: string, user: User) => void;
  onUserClick?: (user: User) => void;
  userId: string;
  username: string;
  email: string;
  isEmailVerified?: boolean;
  isAdminUser: boolean;
  isManagerUser: boolean;
  isDeleted?: boolean;
};

const UserRow = ({ onAction, onUserClick, ...props }: Props) => {
  return (
    <div className="user-row">
      <div className="user-row__wrapper">
        <a className="user-row__id" onClick={() => onUserClick?.(props)}>
          {props.userId}
        </a>
        <div className="user-row__info">
          <p className="user-row__parameter user-row__username">
            name: <span>{props.username}</span>
          </p>
          <p className="user-row__parameter user-row__email">
            email: <span>{props.email}</span>
          </p>
          <p className="user-row__parameter user-row__role">
            role:{' '}
            <span>
              {props.isManagerUser
                ? 'manager'
                : props.isAdminUser
                ? 'admin'
                : 'user'}
            </span>
          </p>
        </div>
      </div>
      <EntityActions
        actions={['delete']}
        onAction={(action) => onAction(action, props)}
      />
    </div>
  );
};

export default UserRow;
