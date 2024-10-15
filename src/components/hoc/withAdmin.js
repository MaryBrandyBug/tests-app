'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const withAdmin = (WrappedComponent) => {
  function ProtectedAdminComponent(props) {
    const router = useRouter();
    const isAdmin = useSelector((state) => state.user.is_admin);

    useEffect(() => {
      if (!isAdmin) {
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  }

  return ProtectedAdminComponent;
};

export default withAdmin;
