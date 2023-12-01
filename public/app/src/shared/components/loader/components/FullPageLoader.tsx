import '../styles/FullPageLoader.scss';

//@ts-ignore
import Loader from 'react-loader-spinner';
import React from 'react';

const FullPageLoader = () => (
  <div className="full-page-loader">
    <Loader type="Rings" color="#6a69ff" height={100} width={100} />
  </div>
);

export default FullPageLoader;
