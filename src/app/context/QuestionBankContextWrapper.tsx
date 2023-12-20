import React, { ReactElement } from 'react';

import WpcasContext from '@/app/context/WpcasContext';

interface ContextWrapperProps {
  children: ReactElement;
}

const QuestionBankContextWrapper = ({ children }: ContextWrapperProps) => {
  return <WpcasContext>{children}</WpcasContext>;
};

export default QuestionBankContextWrapper;
