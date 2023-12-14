import '../styles/EntityActions.scss';

import React from 'react';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';

type EntityActionsProps = {
  actions: ('edit' | 'delete')[];
  onAction?: (action: 'edit' | 'delete') => void;
  width?: number;
  height?: number;
};

const EntityActions: React.FC<EntityActionsProps> = ({
  actions = ['delete', 'edit'],
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
        />
      )}
      {actions.includes('delete') && (
        <img
          width={width}
          height={height}
          src={deleteIcon}
          alt="Delete"
          onClick={() => onAction?.('delete')}
        />
      )}
    </div>
  );
};

export default EntityActions;
