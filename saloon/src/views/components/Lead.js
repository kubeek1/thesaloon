import React from 'react';
import { Link } from 'react-router-dom';
import {PersonSVG, AutoSVG, BookmarkCheckSVG, WrenchSVG} from './Icons.js';
import { scrollToBottom } from '../assets/js/animations.js';

export default class Lead extends React.Component {

    render(){
      return (
        <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <blockquote className="blockquote text-center">
                    <p className="mb-0 mt-2">Klient</p>
                        <PersonSVG/>
                    <Link to="/lead/addCustomer" className="btn btn-primary btn-block" onClick={scrollToBottom()}>Dodaj klienta</Link>
                </blockquote>
              </div>
              <div className="col-lg-3">
                <blockquote className="blockquote text-center">
                    <p className="mb-0 mt-2">Auto</p>
                        <AutoSVG/>
                    <Link to="/lead/addCar" className="btn btn-primary btn-block">Dodaj auto</Link>
                </blockquote>
              </div>
              <div className="col-lg-3">
                <blockquote className="blockquote text-center">
                    <p className="mb-0 mt-2">Rezerwacja</p>
                        <BookmarkCheckSVG/>
                    <Link to="/lead/addReservation" className="btn btn-primary btn-block">Dodaj rezerwację</Link>
                </blockquote>
              </div>
              <div className="col-lg-3">
                <blockquote className="blockquote text-center">
                    <p className="mb-0 mt-2">Zgłoszenia</p>
                        <WrenchSVG/>
                    <Link to="/lead/addIncident" className="btn btn-primary btn-block">Zgłoś usterkę</Link>
                </blockquote>
              </div>
            </div>
        </div>
      );
    };
  }

