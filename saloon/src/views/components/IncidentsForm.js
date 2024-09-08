import React from 'react';
import Select from 'react-select';
import {DatePicker} from 'rsuite';
import {locales, yesNoOptions} from 'views/assets/js/consts.js';
import {selectStyle} from 'views/assets/js/definedStyles.js';
import {toast} from "react-toastify";

export default class IncidentsForm extends React.Component {
    state = {
        date: this.props.date || new Date(Date.now()),
        car: this.props.car,
        description: this.props.description || '',
        exclude: this.props.exclude || false
    };

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            this.setState(this.props);
        }
    };

    handleCarChange = e => {
        this.setState({
            car: e
        });
    };
    handleDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    };
    handleDateChange = e => {
        this.setState({
            date: e
        });
    };
    handleExcludeChange = e => {
        this.setState({
            exclude: e.value
        })
    };
    handleSubmit = e => {
        e.preventDefault();
        if(this.state.date && this.state.car && this.state.description) {
            this.props.onSubmit({
                'date': this.state.date,
                'car': this.state.car,
                'description': this.state.description,
                'exclude': this.state.exclude
            });
        } else {
            toast.error('Uzupełnij wszystkie dane');
        }
    };

    returnCarData(){
        if(this.state.car) return {value: this.state.car._id, label: this.state.car.brand + ' ' + this.state.car.model + ' ' + this.state.car.year + ' ' + this.state.car.color};
    };

    render() {
         return (
             <form name="incident_form" className="form-horizontal fade-in" onSubmit={this.handleSubmit} autoComplete="off">
                 <div className="row justify-content-center" style={{fontSize: '1.3em', paddingBottom: '35px'}}>Szczegóły usterki</div>
                        <div className="row form-group justify-content-center align-items-center">
                            <label className="col-lg-1 control-label required mb-0" htmlFor="incident_date">Data</label>
                            <div className="col-lg-4">
                                <DatePicker id="incident_date"
                                            appearance="subtle"
                                            format="dd.MM.yyyy"
                                            locale={locales}
                                            value={this.state.date}
                                            onChange={this.handleDateChange}
                                            cleanable={false}
                                            disabled
                                            oneTap/>
                            </div>
                        </div>
                        <div className="row form-group justify-content-center align-items-center">
                            <label className="col-lg-1 control-label required mb-0" htmlFor="incident_car">Samochód</label>
                            <div className="col-lg-4">
                                <Select id="incident_car"
                                        styles={selectStyle}
                                        placeholder="Wybierz..."
                                        options={this.props.carsLab}
                                        onChange={this.handleCarChange}
                                        value={this.returnCarData()}
                                        isDisabled={this.props.isSelectDisabled || false}/>

                            </div>
                        </div>
                     <div className="row form-group justify-content-center align-items-center">
                         <label className="col-lg-1 control-label required mb-0" htmlFor="incident_exclude">Wyklucz</label>
                         <div className="col-lg-4">
                             <Select id="incident_exclude"
                                     styles={selectStyle}
                                     placeholder="Wybierz..."
                                     options={yesNoOptions}
                                     value={this.state.exclude ? yesNoOptions[0] : yesNoOptions[1]}
                                     onChange={this.handleExcludeChange} />
                         </div>
                     </div>
                     <div className="row form-group justify-content-center align-items-center">
                            <label className="col-lg-1 control-label required mb-0" htmlFor="incident_description">Opis</label>
                            <div className="col-lg-4">
                                <input type="text"
                                       id="incident_description"
                                       required="required"
                                       value={this.state.description}
                                       onChange={this.handleDescriptionChange}
                                       className="form-control"/>
                            </div>
                        </div>
                       <div className="row form-group justify-content-center align-items-center">
                           <div className="col-6 mt-4">
                               <button className="btn btn-primary btn-block" type="submit" id="incident_submit">Zatwierdź</button>
                           </div>
                       </div>
                </form>
        );
    }
};