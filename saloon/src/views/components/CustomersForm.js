import React from 'react';

export default class CustomersForm extends React.Component {

    state = {
        name: this.props.name || '',
        surname: this.props.surname || '',
        address: this.props.address || '',
        email: this.props.email || '',
        phone: this.props.phone || ''
    };

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            this.setState(this.props);
        }
    };

    handleInputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        return (
          <form name="cust_list" className="form-horizontal fade-in" onSubmit={this.handleSubmit} autoComplete="off">
              <div className="row justify-content-center" style={{fontSize: '1.3em', paddingBottom: '35px'}}>Dane klienta</div>
                    <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="name">Imię</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="name"
                                   required="required"
                                   value={this.state.name}
                                   onChange={this.handleInputChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="surname">Nazwisko</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="surname"
                                   required="required"
                                   value={this.state.surname}
                                   onChange={this.handleInputChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="address">Adres</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="address"
                                   required="required"
                                   value={this.state.address}
                                   onChange={this.handleInputChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="email">Mail</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="email"
                                   required="required"
                                   pattern={"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+"}
                                   value={this.state.email}
                                   onChange={this.handleInputChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="phone">Telefon</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="phone"
                                   required="required"
                                   pattern={"[0-9]{9}"}
                                   value={this.state.phone}
                                   onChange={this.handleInputChange}
                                   maxLength={9}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="row form-group justify-content-center">
                        <div className="col-lg-5 mt-4">
                            <button className="btn btn-primary btn-block" type="submit" id="cust_list_submit">Zatwierdź</button>
                        </div>
                    </div>
            </form>
        );
    }
};