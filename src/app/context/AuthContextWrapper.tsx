import React, { ReactElement } from 'react';

import AuthContextContext from '@/app/context/AuthContext';

interface ContextWrapperProps {
  children: ReactElement;
}

const AuthContextWrapper = ({ children }: ContextWrapperProps) => {
  return <AuthContextContext>{children}</AuthContextContext>;
};

export default AuthContextWrapper;
