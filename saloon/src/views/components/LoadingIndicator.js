import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default class LoadingIndicator extends React.Component {

    render () {
        return (
            <span className="loaderContainer">
               <ThreeDots color="#007bff" height={70} width={70} wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}/>
               <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Łączenie z bazą danych..</p>
            </span>
        )
    }
}