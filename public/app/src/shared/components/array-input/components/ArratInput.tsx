import 'react-tagsinput/react-tagsinput.css';
import '../style/ArratInput.scss';

import React from 'react';
import TagsInput from 'react-tagsinput';

interface ArratInputProps extends TagsInput.ReactTagsInputProps {}

const ArratInput: React.FC<ArratInputProps> = (props) => {
  return (
    <div className="array-input">
      <TagsInput {...props} inputProps={{ className: 'tags-input' }} />
    </div>
  );
};

export default ArratInput;
