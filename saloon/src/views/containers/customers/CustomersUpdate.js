import React from 'react';
import CustomersForm from 'views/components/CustomersForm.js';
import {fetchCustomer, updateCustomer} from 'actions/dataActions.js';
import history from 'views/components/history.js';
import { scrollToBottom } from '../../assets/js/animations.js';
import LoadingIndicator from '../../components/LoadingIndicator.js';
import {toast} from "react-toastify";

export default class CustomersUpdate extends React.Component {
    state = {
        custList: [],
        loading: true
    };

    componentDidMount() {
        fetchCustomer(this.props.match.params.id)
            .then((data) => {
                if(data) {
                    this.setState({
                        custList: data,
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
                fetchCustomer(this.props.match.params.id)
                    .then((data) => {
                        if(data){
                            this.setState({
                                custList: data,
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

    handleSubmit = async (data) => {
        try {
            await updateCustomer(this.props.match.params.id, data);
            history.push('/customers');
            history.go(0);
        } catch(e) {
            console.error("Update failed", e);
        }

    };

    render() {
        return (
           this.state.loading
           ?    <LoadingIndicator />
           :    <CustomersForm onSubmit={this.handleSubmit}
                      name={this.state.custList.name}
                      surname={this.state.custList.surname}
                      address={this.state.custList.address}
                      email={this.state.custList.email}
                      phone={this.state.custList.phone} />
        );
    }
};