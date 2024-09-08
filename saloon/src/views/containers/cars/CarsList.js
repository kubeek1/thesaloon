import React from 'react';
import LoadingIndicator from "../../components/LoadingIndicator.js";
import CarsTable from 'views/components/CarsTable.js';
import {fetchCars, deleteCar} from 'actions/dataActions.js';
import {toast} from "react-toastify";

export default class CarsList extends React.Component {

    state = {
        carsList: [],
        loading: true
    }

    componentDidMount() {
        fetchCars()
            .then((data) => {
                if(data) {
                    this.setState({
                        carsList: data,
                        loading: false
                    })
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch((e) => {
                console.error('Error', e);
            });
    };

    onDelete(id) {
        deleteCar(id)
            .catch((e) => {
                console.error('Error', e);
            });
    }

    render() {
        return (
            this.state.loading
            ?   <LoadingIndicator />
            :   <CarsTable carsList={this.state.carsList} onDelete={this.onDelete.bind(this)} />

        );
    }
}