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
  isBanned?: boolean;
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
          <p className="user-row__parameter user-row__is-email-verified">
            email verification status:{' '}
            <span>{props.isEmailVerified ? 'verified' : 'not verified'}</span>
          </p>
          <p className="user-row__parameter user-row__is-deleted">
            status of existence:{' '}
            <span>{props.isDeleted ? 'deleted' : 'exists'}</span>
          </p>
          <p className="user-row__parameter user-row__is-banned">
            ban status: <span>{props.isBanned ? 'banned' : 'no ban'}</span>
          </p>
        </div>
      </div>
      {!props.isDeleted ? (
        <EntityActions
          actions={['delete', props.isBanned ? 'unban' : 'ban']}
          onAction={(action) => onAction(action, props)}
        />
      ) : null}
    </div>
  );
};

export default UserRow;
