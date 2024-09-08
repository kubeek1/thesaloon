import React from 'react';
import history from 'views/components/history.js';
import LoadingIndicator from '../../components/LoadingIndicator.js';
import ReservationsForm from 'views/components/ReservationsForm.js';
import {createReservation, fetchCars, fetchCustomers, fetchReservationsByCarID} from 'actions/dataActions.js';
import moment from 'moment';
import {toast} from 'react-toastify';
import { createCarLabels, createCustomerLabels } from 'actions/labelsCreator.js';

export default class ReservationsCreate extends React.Component {

    state = {
        carsList: [],
        customersList: [],
        carOptions: [],
        customerOptions: [],
        loading: true
    }

    handleSubmit(data) {
        fetchReservationsByCarID(data.car._id)
            .then((r) => {
                if(r) {
                    // Sprawdzanie czy rezerwacja nie koliduje na inną rezerwację
                    let chosen = data;
                    let future = r.filter(x => moment().startOf('day').valueOf() < new Date(x.startDate).getTime());
                    let closest = Math.min.apply(Math, future.map(function(o){ return new Date(o.startDate) }))
                    closest = moment(closest).add(-1,'day');

                    if(chosen.endDate.getTime() > moment(closest).valueOf()){
                        toast.error('Wybrane auto można zarezerwować tylko do ' + moment(closest).format("DD.MM.YYYY") + '.', {autoClose: 3000})
                    } else {
                        createReservation(data).then(() => {
                            history.push('/reservations');
                        })
                    }

                } else toast.error("Nie udało się połączyć z bazą danych");
            })
    }

    componentDidMount() {
        fetchCars()
            .then((cars) => {
                fetchCustomers()
                    .then((customers) => {
                        if(cars || customers) {
                            this.setState({
                                carsList: cars.filter(f => f.availability),
                                customersList: customers,
                                loading: false
                            }, () => this.addLabels());
                        } else toast.error("Nie udało się połączyć z bazą danych");
                    })
                    .catch((err) => {
                        console.error('err', err);
                    });
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    addLabels(){
        this.setState({
            carOptions: createCarLabels(this.state.carsList),
            customerOptions: createCustomerLabels(this.state.customersList)
        })
    };

    render() {
        let car = null;
        if(this.props.location.state != null) car = this.props.location.state.car;

        return (
            this.state.loading
            ?    <LoadingIndicator />
            :    <ReservationsForm
                    onSubmit={this.handleSubmit.bind(this)}
                    car={car}
                    carOptions={this.state.carOptions}
                    customerOptions={this.state.customerOptions}
                    modifying={false} />
        );
    }
}