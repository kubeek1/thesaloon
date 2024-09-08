import React from 'react';
import { Link } from 'react-router-dom';
import { isLogged, logout } from 'views/components/isLogged.js';
import { LogoutSVG } from "./Icons.js";

export default class Home extends React.Component {

    state = {
        logged: isLogged(),
        hidden: false,
    }

    handleLogout = () => {
        this.setState({
            logged: false,
            hidden: true
        }, () => logout())
    }

    render(){
      return (
        <header>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <Link className="navbar-brand" to='/lead'>Saloon</Link>
            <button className="navbar-toggler" hidden={this.state.hidden} type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            { !this.state.logged ? null :
            <div className="collapse navbar-collapse div-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to='/reservations'>Rezerwacje</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to='/incidents'>Zgłoszenia</Link>
                  </li>
                  <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Baza danych
                      </a>
                      <div className="dropdown-menu bg-dark"  aria-labelledby="navbarDropdown">
                          <Link className="dropdown-item" style={{color: 'rgba(255,255,255,.5)'}} to={'/cars'}>Auta</Link>
                          <Link className="dropdown-item" style={{color: 'rgba(255,255,255,.5)'}} to={'/customers'}>Klienci</Link>
                      </div>
                  </li>
              </ul>
              <div className="row align-items-center">
              <Link className="navbar-text nav-link" to='/login' onClick={this.handleLogout}>
                  Wyloguj
                  <LogoutSVG/>
              </Link>
              </div>
            </div>
             }
          </nav>
        </header>
      );
    };
}
