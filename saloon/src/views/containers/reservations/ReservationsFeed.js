import React, { Component } from 'react';
import { fetchFeed } from 'actions/dataActions.js';
import FeedTable from "../../components/FeedTable.js";
import {toast} from "react-toastify";

export default class ReservationsFeed extends Component {

    state = {
        feed: [],
        loading: true
    }

    componentDidMount() {
        fetchFeed()
            .then((r) => {
                if(r) {
                    this.setState({
                        feed: r,
                        loading: false
                    })
                } else toast.error("Nie udało się połączyć z bazą danych");
            })
    };

    render() {
        return (
            this.state.loading
                ?   null
                :   <FeedTable list={this.state.feed} />
        );
    }

}