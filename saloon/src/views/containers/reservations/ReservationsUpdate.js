import React from 'react';
import history from 'views/components/history.js';
import LoadingIndicator from "../../components/LoadingIndicator.js";
import ReservationsForm from 'views/components/ReservationsForm.js';
import {fetchReservation, updateReservation} from 'actions/dataActions.js';
import { scrollToBottom } from '../../assets/js/animations.js';
import {toast} from "react-toastify";

export default class ReservationsUpdate extends React.Component {

    state = {
        reservation: {},
        loading: true
    };

    componentDidMount() {
        fetchReservation(this.props.match.params.id)
            .then((data) => {
                if(data){
                    this.setState({
                        reservation: data,
                        loading: false
                    });
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                loading: true
            }, () => {
                fetchReservation(this.props.match.params.id)
                    .then((data) => {
                        if (data) {
                            this.setState({
                                reservation: data,
                                loading: false
                            });
                        } else toast.error("Nie udało się połączyć z bazą danych");
                    })
                    .catch((err) => {
                        console.error('err', err);
                    });
            })
        }
        scrollToBottom();
    };

    handleSubmit = data => {
    this.setState({ loading: true });
            updateReservation(this.props.match.params.id, data).then(() => {
                setTimeout( () => {
                    this.setState({ loading: false });
                    history.push('/reservations');
                    history.go(0);
                }, 3000)
            });
    };

    render() {
        return (
           this.state.loading
           ?    <LoadingIndicator />
           :    <ReservationsForm onSubmit={this.handleSubmit}
                      startDate={new Date(this.state.reservation.startDate)}
                      endDate={new Date(this.state.reservation.endDate)}
                      car={this.state.reservation.car}
                      customer={this.state.reservation.customer}
                      settled={this.state.reservation.settled}
                      additionalInformation={this.state.reservation.additionalInformation}
                      modifying={true}
               />
        );
    }
};