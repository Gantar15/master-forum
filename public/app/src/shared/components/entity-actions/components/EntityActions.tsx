import '../styles/EntityActions.scss';

import React from 'react';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';

type EntityActionsProps = {
  actions: ('edit' | 'delete')[];
  onAction?: (action: 'edit' | 'delete') => void;
};

const EntityActions: React.FC<EntityActionsProps> = ({
  actions = ['delete', 'edit'],
  onAction
}) => {
  return (
    <div className="entity-actions">
      {actions.includes('edit') && (
        <img src={editIcon} alt="Edit" onClick={() => onAction?.('edit')} />
      )}
      {actions.includes('delete') && (
        <img
          src={deleteIcon}
          alt="Delete"
          onClick={() => onAction?.('delete')}
        />
      )}
    </div>
  );
};

export default EntityActions;
