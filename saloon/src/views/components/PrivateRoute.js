import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from './isLogged.js';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogged() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;