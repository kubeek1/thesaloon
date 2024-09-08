import React from 'react';
import history from 'views/components/history.js';
import CustomersForm from 'views/components/CustomersForm.js';
import {createCustomer, fetchCustomerPhone} from 'actions/dataActions.js';
import {toast} from "react-toastify";

export default class CustomersCreate extends React.Component {

    handleSubmit(data) {
        fetchCustomerPhone(data.phone)
            .then((r) => {
                if(r) {
                    if (r.length === 0) {
                        createCustomer(data).then(() => {
                            history.push('/customers');
                        })
                    } else {
                        toast.warning('Klient z takim numerem telefonu istnieje już w bazie danych');
                        return false;
                    }
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
            .catch(e => console.error(e));
    }

    render() {
        return (
            <CustomersForm onSubmit={this.handleSubmit.bind(this)}/>
        );
    }
}