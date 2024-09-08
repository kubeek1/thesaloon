import React from 'react';
import LoadingIndicator from "../../components/LoadingIndicator.js";
import IncidentsTable from 'views/components/IncidentsTable.js';
import {fetchIncidents, deleteIncident } from 'actions/dataActions.js';
import {toast} from "react-toastify";

export default class IncidentsList extends React.Component {

    state = {
        incidents: [],
        loading: true
    }

    componentDidMount() {
        fetchIncidents()
            .then((data) => {
                if(data) {
                    this.setState({
                        incidents: data,
                        loading: false
                    })
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch((e) => {
                console.error('Error', e);
            });
    };

    onDelete(id) {
        deleteIncident(id)
            .then(() => {
                let afterDeletion = this.state.incidents.filter((inc) => {
                    return id !== inc._id;
                });

                this.setState({
                    incidents: afterDeletion
                });
            })
            .catch((e) => {
                console.error('Error', e);
            });
    }

    render() {
        return (
            this.state.loading
            ?   <LoadingIndicator />
            :   <IncidentsTable incidents={this.state.incidents} onDelete={this.onDelete.bind(this)} />

        );
    }
}