import '../styles/CategoryRow.scss';

import EntityActions from '../../../../../../shared/components/entity-actions/components/EntityActions';
import React from 'react';

type Props = {
  onAction: (action: string, category: string) => void;
  onCategoryClick?: (category: string) => void;
  category: string;
};

const UserRow = ({ onAction, onCategoryClick, category }: Props) => {
  return (
    <div className="category-row">
      <div className="category-row__category">
        <a onClick={() => onCategoryClick && onCategoryClick(category)}>
          {category}
        </a>
      </div>
      <EntityActions
        actions={['delete']}
        onAction={(action) => onAction(action, category)}
      />
    </div>
  );
};

export default UserRow;
