import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';

const Home = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const _email = useSelector((state: RootState) => state.auth.email);

  return (
    <div>
      {isAuthenticated? <div>logeado {_email}</div>: <div>fuera</div>}
      Home
    </div>
  );
};

export default Home;