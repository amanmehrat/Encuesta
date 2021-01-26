import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    if (isLoggedIn == null) return null;
    return (
        <Route
            {...rest}
            render={props => {
                return (!isLoggedIn) ? (<Redirect to='/auth' />) : (
                    <Component {...props} />
                )
            }
            }
        />
    );
};

export default PrivateRoute;