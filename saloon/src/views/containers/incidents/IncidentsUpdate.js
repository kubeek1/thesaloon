import React from 'react';
import history from 'views/components/history.js';
import LoadingIndicator from "../../components/LoadingIndicator.js";
import IncidentsForm from 'views/components/IncidentsForm.js';
import {fetchIncident, updateIncident } from 'actions/dataActions.js';
import { scrollToBottom } from '../../assets/js/animations.js';
import {toast} from "react-toastify";

export default class IncidentsUpdate extends React.Component {

    state = {
        incident: {},
        loading: true
    };

    componentDidMount() {
        fetchIncident(this.props.match.params.id)
            .then((data) => {
                if(data){
                    this.setState({
                        incident: data,
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
            this.setState({
                loading: true
            }, () => {
                fetchIncident(this.props.match.params.id)
                    .then((data) => {
                        if(data) {
                            this.setState({
                                incident: data,
                                loading: false
                            });
                        } else toast.error("Nie udało się połączyć z bazą danych");
                    })
                    .catch((e) => {
                        console.error('Error', e);
                    });
            })
        }
        scrollToBottom();
    };

    handleSubmit = data => {
        updateIncident(this.props.match.params.id, data);
        history.push('/incidents');
        history.go(0);
    };

    render() {
        return (
            this.state.loading
            ?   <LoadingIndicator />
            :   <IncidentsForm
                    onSubmit={this.handleSubmit}
                    date={new Date(this.state.incident.date)}
                    car={this.state.incident.car}
                    description={this.state.incident.description}
                    exclude={this.state.incident.exclude}
                    isSelectDisabled={true} />
        );
    }
};