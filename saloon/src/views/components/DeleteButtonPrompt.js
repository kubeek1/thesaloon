import React from 'react';
import Loader from 'react-loader-spinner';

export default class DeleteButtonPrompt extends React.Component {

    render () {
        return (
            <span className="promptContainer">
               <Loader type="ThreeDots" color="#007bff" height={70} width={70} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}/>
               <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Łączenie z bazą danych..</p>
            </span>
        )
    }
}