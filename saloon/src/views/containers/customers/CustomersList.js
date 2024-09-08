import React from 'react';
import LoadingIndicator from "../../components/LoadingIndicator.js";
import CustomersTable from 'views/components/CustomersTable.js';
import {fetchCustomers, deleteCustomer} from 'actions/dataActions.js';
import {toast} from "react-toastify";

export default class CustomersList extends React.Component {

    state = {
        custList: [],
        loading: true
    }

    componentDidMount() {
        fetchCustomers()
            .then((data) => {
                if(data) {
                    this.setState({
                        custList: data,
                        loading: false
                    })
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch((e) => {
                console.error('Error', e);
            });
    };


    onDelete(id) {
        deleteCustomer(id)
            .catch((e) => {
                console.error('Error', e);
            });
    }

    render() {
        return (
            this.state.loading
            ?   <LoadingIndicator />
            :   <CustomersTable custList={this.state.custList} onDelete={this.onDelete.bind(this)}/>

        );
    }
}