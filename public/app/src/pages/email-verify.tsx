import './styles/email-verify.scss';

import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Button } from '../shared/components/button';
import { Layout } from '../shared/layout';
import { Loader } from '../shared/components/loader';
import { toast } from 'react-toastify';
import { usersService } from '../modules/users/services';

export const EmailVerifyPage = () => {
  const { code } = useParams<{ code: string }>();
  const [isSuccessVerified, setIsSuccessVerified] = useState(false);

  useEffect(() => {
    if (!code) return;
    usersService.verifyEmail(code).then((result) => {
      if (result.isRight()) {
        setIsSuccessVerified(true);
        toast.success(
          `Your email has been successfully verified!!! Log in to your account. 🤠`,
          {
            autoClose: 3000
          }
        );
      } else {
        toast.error(`Email verify error. 🤠`, {
          autoClose: 3000
        });
      }
    });
  }, [code]);

  return (
    <Layout>
      {!isSuccessVerified ? (
        <div className="email-verify">
          <p>Await confirmation please</p>
          <Loader />
        </div>
      ) : (
        <div className="email-verify">
          Your email successfully confirmed!!!
          <Button
            text={
              <Link to={'/login'}>
                <span style={{ color: 'white' }}>To Login page</span>
              </Link>
            }
          />
        </div>
      )}
    </Layout>
  );
};
