import React from 'react';
import LoadingIndicator from '../../components/LoadingIndicator.js';
import ReservationsTable from 'views/components/ReservationsTable.js';
import {fetchReservations, deleteReservation } from 'actions/dataActions.js';
import {toast} from "react-toastify";

export default class ReservationsList extends React.Component {

    state = {
        reservations: [],
        loading: true
    }

    componentDidMount() {
        fetchReservations()
            .then((data) => {
                if(data) {
                    this.setState({
                        reservations: data,
                        loading: false
                    })
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch((e) => {
                console.error('Error', e);
            });
    };

    onDelete(id) {
        deleteReservation(id)
            .then(() => {
                this.setState({
                    reservations: this.state.reservations.filter((r) => {
                        return id !== r._id;
                    })
            })})
            .catch((e) => {
                console.error('Error', e);
            });
    };


    render() {
        let phr = '';
        if(this.props.location.state != null) phr = this.props.location.state.filterphrase;
        return (
            this.state.loading
            ?   <LoadingIndicator/>
            :   <ReservationsTable reservations={this.state.reservations} onDelete={this.onDelete.bind(this)} filterphrase={phr}/>
        );
    }
}