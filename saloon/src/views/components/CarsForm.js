import React from 'react';

export default class CarsForm extends React.Component {
    state = {
        brand: this.props.brand || '',
        model: this.props.model || '',
        engine: this.props.engine || '',
        year: this.props.year || '',
        color: this.props.color || '',
        plate: this.props.plate || ''
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
            <form name="car_form" className="form-horizontal fade-in" onSubmit={this.handleSubmit} autoComplete="off">
                <div className="row justify-content-center" style={{fontSize: '1.3em', paddingBottom: '35px'}}>Dane auta</div>
                <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="brand">Marka</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="brand"
                                   className="form-control"
                                   required="required"
                                   pattern={"[a-zA-Z0-9 ]+"}
                                   value={this.state.brand}
                                   onChange={this.handleInputChange} />
                        </div>
                </div>
                <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="model">Model</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="model"
                                   className="form-control"
                                   required="required"
                                   pattern={"[a-zA-Z0-9 ]+"}
                                   value={this.state.model}
                                   onChange={this.handleInputChange} />
                        </div>
                </div>
                <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="engine">Silnik [litry]</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="engine"
                                   className="form-control"
                                   required="required"
                                   title="Pojemność silnika powinna być wyrażona w litrach - np. 3.0"
                                   pattern={"\\d{1,2}.\\d{1,2}"}
                                   value={this.state.engine}
                                   onChange={this.handleInputChange} />
                        </div>
                </div>
                <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="year">Rok produkcji</label>
                        <div className="col-lg-3">
                            <input type="number" step="1" min="2000" max="2025"
                                   id="year"
                                   className="form-control"
                                   required="required"
                                   value={this.state.year}
                                   onChange={this.handleInputChange} />
                        </div>
                </div>
                <div className="row form-group justify-content-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="color">Kolor</label>
                        <div className="col-lg-3">
                            <input type="text"
                                   id="color"
                                   className="form-control"
                                   required="required"
                                   pattern={"[\\p{L}]{2,15}"}
                                   value={this.state.color}
                                   onChange={this.handleInputChange} />
                        </div>
                </div>
                <div className="row form-group justify-content-center">
                    <label className="col-lg-1 control-label col-form-label" htmlFor="plate">Rejestracja</label>
                    <div className="col-lg-3">
                        <input type="text"
                               id="plate"
                               className="form-control"
                               required="required"
                               title="Numer rejestracjny powinien składać się z dwóch części - np. WI 0190F"
                               pattern={"[A-Z0-9]{2,3}\\s[A-Z0-9]{3,6}"}
                               onChange={this.handleInputChange}
                               value={this.state.plate}/>
                    </div>
                </div>
                <div className="row form-group justify-content-center">
                        <div className="col-lg-5 mt-4">
                            <button className="btn btn-primary btn-block" type="submit" id="car_submit">Zatwierdź</button>
                        </div>
                </div>
            </form>

        );
    }
};