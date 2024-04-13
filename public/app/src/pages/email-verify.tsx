import React, { useEffect } from 'react';

import { Layout } from '../shared/layout';
import { Loader } from '../shared/components/loader';
import { useParams } from 'react-router-dom';
import { usersService } from '../modules/users/services';

export const EmailVerifyPage = () => {
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    if (!code) return;
    usersService
      .verifyEmail(code)
      .then(() => {})
      .catch(() => {});
  }, [code]);

  return (
    <Layout>
      <Loader />
    </Layout>
  );
};
