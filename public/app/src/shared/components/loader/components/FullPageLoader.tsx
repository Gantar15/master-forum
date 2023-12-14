import '../styles/FullPageLoader.scss';

import React, { useEffect } from 'react';

//@ts-ignore
import Loader from 'react-loader-spinner';

const FullPageLoader = ({ waitTime = 300 }: { waitTime?: number }) => {
  const [isReadyToLoading, setIsReadyToLoading] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReadyToLoading(true);
    }, waitTime);
  }, []);

  if (!isReadyToLoading) {
    return null;
  }
  return (
    <div className="full-page-loader">
      <Loader type="Rings" color="#6a69ff" height={100} width={100} />
    </div>
  );
};

export default FullPageLoader;
