import React from 'react';
import { useLocation, Link } from 'react-router';

const BoardCardDndContainer = (props: {
  children: React.ReactNode;
  id: string;
  pos: number;
}) => {
  const { id, children } = props;
  const location = useLocation();
  return (
    <Link to={`cards/${id}`} state={{ background: location }}>
      {children}
    </Link>
  );
};

export default BoardCardDndContainer;
