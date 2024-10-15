'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { selectUser } from '@/constants/selectors';

const withAdmin = (WrappedComponent) => {
  function ProtectedAdminComponent(props) {
    const router = useRouter();
    const { is_admin } = useSelector(selectUser);

    useEffect(() => {
      if (!is_admin) {
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  }

  return ProtectedAdminComponent;
};

export default withAdmin;
