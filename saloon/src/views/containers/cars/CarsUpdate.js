import React from 'react';
import history from 'views/components/history.js';
import LoadingIndicator from "../../components/LoadingIndicator.js";
import CarsForm from 'views/components/CarsForm.js';
import {fetchCar, updateCar} from 'actions/dataActions.js';
import { scrollToBottom } from '../../assets/js/animations.js';
import {toast} from "react-toastify";

export default class CarsUpdate extends React.Component {

    state = {
        car: {},
        loading: true
    };

    componentDidMount() {
         fetchCar(this.props.match.params.id)
            .then((data) => {
                if(data) {
                    this.setState({
                        car: data,
                        loading: false
                    });
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch((e) => {
                console.error('Error', e);
            });
    };

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id){
            fetchCar(this.props.match.params.id)
            .then((data) => {
                if(data){
                    this.setState({
                        car: data
                    });
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
        }
        scrollToBottom();
    };

    handleSubmit = async (data) => {
        try {
            await updateCar(this.props.match.params.id, data)
            history.push('/cars');
            history.go(0);
        } catch (e) {
            console.error("Update failed", e);
        }
    };


    render() {
        return (
            this.state.loading
            ?    <LoadingIndicator />
            :    <CarsForm
                       onSubmit={this.handleSubmit}
                       brand={this.state.car.brand}
                       model={this.state.car.model}
                       engine={this.state.car.engine}
                       year={this.state.car.year}
                       color={this.state.car.color}
                       plate={this.state.car.plate} />
        );
    }
};