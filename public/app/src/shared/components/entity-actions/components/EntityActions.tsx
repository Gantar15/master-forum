import '../styles/EntityActions.scss';

import React from 'react';
import Tooltip from 'react-tooltip';
import banIcon from '../assets/ban.svg';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import unbanIcon from '../assets/unban.svg';

type ActionTypes = 'edit' | 'delete' | 'ban' | 'unban';

type EntityActionsProps = {
  actions: ActionTypes[];
  onAction?: (action: ActionTypes) => void;
  width?: number;
  height?: number;
};

const EntityActions: React.FC<EntityActionsProps> = ({
  actions = ['delete', 'edit', 'ban', 'unban'],
  onAction,
  width = 32,
  height = 32
}) => {
  return (
    <div className="entity-actions">
      {actions.includes('edit') && (
        <img
          width={width}
          height={height}
          src={editIcon}
          alt="Edit"
          onClick={() => onAction?.('edit')}
          data-tip="Edit"
        />
      )}
      {actions.includes('unban') && (
        <img
          width={width}
          height={height}
          src={unbanIcon}
          alt="Unban"
          onClick={() => onAction?.('unban')}
          data-tip="Unban"
        />
      )}
      {actions.includes('ban') && (
        <img
          width={width}
          height={height}
          src={banIcon}
          alt="Ban"
          onClick={() => onAction?.('ban')}
          data-tip="Ban"
        />
      )}
      {actions.includes('delete') && (
        <img
          width={width}
          height={height}
          src={deleteIcon}
          alt="Delete"
          onClick={() => onAction?.('delete')}
          data-tip="Delete"
        />
      )}
      <Tooltip />
    </div>
  );
};

export default EntityActions;
