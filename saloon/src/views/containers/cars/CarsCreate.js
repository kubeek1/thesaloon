import React from 'react';
import history from 'views/components/history.js';
import CarsForm from 'views/components/CarsForm.js';
import { createCar, fetchCarPlate } from 'actions/dataActions.js';
import {toast} from 'react-toastify';

export default class CarsCreate extends React.Component {

    handleSubmit(data) {
        fetchCarPlate(data.plate)
            .then((r) => {
                if(r) {
                    if(r.length === 0){
                        createCar(data).then(() => {
                            history.push('/cars');
                        })
                    } else {
                        toast.warning('Pojazd o podanym numerze rejestracyjnym istnieje już w bazie danych');
                        return false;
                    }
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch(e => console.error(e))
    }

    render() {
        return (
            <CarsForm onSubmit={this.handleSubmit.bind(this)}/>
        );
    }
}