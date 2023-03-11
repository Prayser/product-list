import React from 'react';
import { createPortal } from 'react-dom';
import { usePortal } from './usePortal';

interface PortalProps {
  id: string;
  children: React.ReactNode;
  isRemovable?: boolean;
}

export const Portal = ({ id, children, isRemovable }: PortalProps) => {
  const target = usePortal(id, isRemovable);
  return createPortal(children, target, id);
};
