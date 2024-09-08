import React from 'react';
import { Route, Redirect } from 'react-router';
import { isLogged } from './isLogged.js';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogged() && restricted ?
                <Redirect to="/lead" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;