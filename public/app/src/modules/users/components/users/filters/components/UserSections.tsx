import '../styles/UserSections.scss';

import React from 'react';

export type UserSectionType = 'POSTS' | 'VOTES' | 'COMMENTS';

interface FilterProps {
  activeFilter: UserSectionType;
  filterType: UserSectionType;
  onClick: (activeFilter: UserSectionType) => void;
  text: string;
}

const Filter: React.FC<FilterProps> = (props) => (
  <div
    onClick={() => props.onClick(props.filterType)}
    className={`user-section ${
      props.activeFilter === props.filterType ? 'active' : ''
    }`}
  >
    {props.text}
  </div>
);

interface UserSectionProps {
  activeFilter: UserSectionType;
  onClick: (activeFilter: UserSectionType) => void;
}

const UserSections: React.FC<UserSectionProps> = (props) => (
  <div className="user-sections">
    <Filter
      activeFilter={props.activeFilter}
      filterType={'POSTS'}
      text="Created posts"
      onClick={props.onClick}
    />
    <Filter
      activeFilter={props.activeFilter}
      filterType={'VOTES'}
      text="Votes"
      onClick={props.onClick}
    />
    <Filter
      activeFilter={props.activeFilter}
      filterType={'COMMENTS'}
      text="Comments"
      onClick={props.onClick}
    />
  </div>
);

export default UserSections;
