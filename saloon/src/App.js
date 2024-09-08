import React from 'react';
import { Router, Switch } from 'react-router-dom';
import history from 'views/components/history.js';

import Lead from 'views/components/Lead.js';

import CarsList from 'views/containers/cars/CarsList.js';
import CarsCreate from 'views/containers/cars/CarsCreate.js';
import CarsUpdate from 'views/containers/cars/CarsUpdate.js';

import ReservationsList from 'views/containers/reservations/ReservationsList.js';
import ReservationsCreate from 'views/containers/reservations/ReservationsCreate.js';
import ReservationsUpdate from 'views/containers/reservations/ReservationsUpdate.js';
import ReservationsFeed from 'views/containers/reservations/ReservationsFeed.js';

import CustomersList from 'views/containers/customers/CustomersList.js';
import CustomersCreate from 'views/containers/customers/CustomersCreate.js';
import CustomersUpdate from 'views/containers/customers/CustomersUpdate.js';

import IncidentsList from 'views/containers/incidents/IncidentsList.js';
import IncidentsCreate from 'views/containers/incidents/IncidentsCreate.js';
import IncidentsUpdate from 'views/containers/incidents/IncidentsUpdate.js';

import Home from 'views/components/Home.js';
import Login from 'views/components/Login.js';
import PrivateRoute from 'views/components/PrivateRoute.js';
import PublicRoute from 'views/components/PublicRoute.js';
import { Route, Redirect } from 'react-router';


import { ToastContainer } from 'react-toastify';


export default class App extends React.Component {

      render() {
        return (
            <Router history={history}>
                <Home />
                <div className="main row justify-content-center">
                    <Switch>
                        <PublicRoute restricted={true} component={Login} path="/login" exact />
                        <PrivateRoute path="/reservations" component={ReservationsList}/>
                        <PrivateRoute path="/customers" component={CustomersList}/>
                        <PrivateRoute path="/cars" component={CarsList}/>
                        <PrivateRoute path="/incidents" component={IncidentsList}/>
                        <PrivateRoute path="/lead" component={Lead}/>
                        <Route path="*"><Redirect to="/lead"/></Route>
                    </Switch>
                </div>
                <div id="forms">
                    <PrivateRoute path="/lead/addCar" component={CarsCreate}/>
                    <PrivateRoute path="/cars/change/:id" component={CarsUpdate}/>
                    <PrivateRoute path="/lead/addCustomer" component={CustomersCreate}/>
                    <PrivateRoute path="/customers/change/:id" component={CustomersUpdate}/>
                    <PrivateRoute path="/lead/addReservation" component={ReservationsCreate}/>
                    <PrivateRoute path="/reservations/change/:id" component={ReservationsUpdate}/>
                    <PrivateRoute path="/lead/addIncident" component={IncidentsCreate}/>
                    <PrivateRoute path="/incidents/change/:id" component={IncidentsUpdate}/>

                </div>
                <ToastContainer position="bottom-center" autoClose={2000} limit={3} style={{width: 'auto', textAlign: 'center'}} newestOnTop={true} />
            </Router>
        );
      }
}