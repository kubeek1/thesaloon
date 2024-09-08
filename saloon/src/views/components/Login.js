import React from 'react';
import { authUser } from 'actions/dataActions.js';
import { login } from './isLogged.js';
import { toast } from 'react-toastify';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();

        authUser(this.state.login, this.state.password)
            .then((r) => {
                if(r) {
                    if (r.status === 200) {
                        toast.success("Zalogowano pomyślnie.", {autoClose: 750, onClose: () => { login() }});
                    }
                    if (r.status === 204) {
                        toast.error("Nieprawidłowy login lub hasło", {autoClose: 750});
                    }
                    ;
                    if (r.status === 206) {
                        toast.warn("Użytkownik nie istnieje", {autoClose: 750});
                    }
                }
                else toast.error("Nie udało się połączyć z bazą danych");
            });
    }

    handleInputChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render(){
      return (
          <div className="row justify-content-center align-items-center pt-5 pb-5">
            <form name="login" className="form-horizontal" onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="login_login">Login</label>
                        <div className="col-md-12">
                            <input type="text"
                                   id="login"
                                   required="required"
                                   value={this.state.login}
                                   onChange={this.handleInputChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="login_password">Hasło</label>
                        <div className="col-md-12">
                            <input type="password"
                                   id="password"
                                   required="required"
                                   value={this.state.password}
                                   onChange={this.handleInputChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-12 pt-3">
                            <button type="submit"
                                    id="login_submit"
                                    className="btn btn-primary btn-block">
                                Zaloguj
                            </button>
                        </div>
                    </div>
            </form>
          </div>
      );
    };
 }
