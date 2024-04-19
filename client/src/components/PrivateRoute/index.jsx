import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUser } from '../../actions/getUser';

function PrivateRoute(props) {
  const { isAdmin, isLoggedIn } = props;

  const user = useSelector(state => state.user);

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.id) {
      dispatch(getUser()).then(() => {
      setLoading(false);
    })
    } else {
      setLoading(false);
    }
  }, [dispatch, user?.id]);

  let render = null;

  if (!loading) {
    if ((isLoggedIn || isAdmin) && !user?.id) {
      render = (
        <Navigate
          to="/no-access-login"
          state={{ from: location.pathname }}
          replace
        />
      );
    } else if (isAdmin && user?.role !== 'admin') {
      render = (
        <Navigate
          to="/no-access-role"
          state={{ from: location.pathname }}
          replace
        />
      );
    } else {
      render = (
        <Outlet />
      );
    }
  }

  return render;
}

export default PrivateRoute;