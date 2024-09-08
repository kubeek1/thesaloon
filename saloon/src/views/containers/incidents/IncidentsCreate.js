import React from 'react';
import history from 'views/components/history.js';
import LoadingIndicator from "../../components/LoadingIndicator.js";
import IncidentsForm from 'views/components/IncidentsForm.js';
import {createIncident, fetchCars, fetchReservationsByCarID} from 'actions/dataActions.js';
import {toast} from "react-toastify";
import moment from "moment";

export default class IncidentsCreate extends React.Component {
    state = {
        carOptions: [],
        loading: true
    }

    handleSubmit(data) {
        if(data.exclude)
            fetchReservationsByCarID(data.car._id)
                .then((r) => {
                    if(r) {
                        for (let res of r) {
                            if (data.date.getTime() < new Date(res.startDate).getTime()) {
                                toast.error('Dla wybranego auta istnieje zaplanowana rezerwacja od dnia  ' + moment(res.startDate).format("DD.MM.YYYY") + '. Aby wprowadzić wykluczającą usterkę usuń zaplanowaną rezerwację.', { autoClose: 5000});
                                return false;
                            }
                        }
                        createIncident(data).then(() => {
                            history.push('/incidents');
                        });
                    } else toast.error("Nie udało się połączyć z bazą danych");
                })
        else {
            createIncident(data).then(() => {
                history.push('/incidents');
            });
        }
    }

    componentDidMount() {
        fetchCars()
            .then((data) => {
                if(data) {
                    this.setState({
                        cars: data.filter(x => x.availability),
                        loading: false
                    }, () => this.addLabels());
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    addLabels(){
        let carOptions = this.state.cars;

        for(let i=0; i<carOptions.length; i++){
            carOptions[i].value = carOptions[i]._id;
            carOptions[i].label = carOptions[i].brand + ' ' + carOptions[i].model + ' ' + carOptions[i].engine + ' ' + carOptions[i].year + ' ' + carOptions[i].color + '  ['+carOptions[i].plate+']';
        }

        this.setState({
            carsLab: carOptions
        });
    };

    render() {
        return (
            this.state.loading
            ?   <LoadingIndicator />
            :   <IncidentsForm onSubmit={this.handleSubmit.bind(this)} carsLab={this.state.carsLab} />
        );
    }
}