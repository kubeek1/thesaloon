import React from 'react';
import Select from 'react-select';
import {DateRangePicker} from 'rsuite';
import { locales, yesNoOptions } from 'views/assets/js/consts.js';
import { selectStyle } from 'views/assets/js/definedStyles.js';
import {toast} from "react-toastify";

const { beforeToday } = DateRangePicker;

export default class ReservationsForm extends React.Component {
    state = {
        car: this.props.car || null,
        customer: this.props.customer || null,
        startDate: this.props.startDate || new Date(),
        endDate: this.props.endDate || new Date(),
        settled: this.props.settled || false,
        additionalInformation: this.props.additionalInformation || ''
    };

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            this.setState(this.props);
        }
    };

    handleDateChange = e =>  {
        this.setState({
            startDate: e[0],
            endDate: e[1]
        })
    };
    handleCarChange = e =>  {
        this.setState({
            car: e
        });
    };
    handleCustomerChange = e =>  {
        this.setState({
            customer: e
        });
    };
    handleSettledChange = e =>  {
        this.setState({
            settled: e.value
        });
    };
    handleAdditionalInformationChange = e =>  {
        this.setState({
            additionalInformation: e.target.value
        });
    };

    handleSubmit = e =>  {
        e.preventDefault();
        if(this.state.car && this.state.customer && this.state.startDate && this.state.endDate) {
            this.props.onSubmit({
                'car': this.state.car,
                'customer': this.state.customer,
                'startDate': this.state.startDate,
                'endDate': this.state.endDate,
                'settled': this.state.settled,
                'additionalInformation': this.state.additionalInformation
            });
        } else {
            toast.error('Uzupełnij wszystkie dane');
        }
    };

    returnCustData(){
        if(this.state.customer) return {value: this.state.customer._id, label: this.state.customer.name + ' ' + this.state.customer.surname};
    };
    returnCarData(){
        if(this.state.car) return {value: this.state.car._id, label: (this.state.car.brand + ' ' + this.state.car.model + ' ' + this.state.car.engine + ' ' + this.state.car.year + ' ' + this.state.car.color + '  ['+this.state.car.plate+']')}
    };

    render() {
         return (
                <form name="reserv_list" className="form-horizontal fade-in" onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="row justify-content-center" style={{fontSize: '1.3em', paddingBottom: '35px'}}>Szczegóły rezerwacji</div>
                    <div className="row form-group justify-content-center align-items-center">
                        <label className="col-lg-1 control-label col-form-label">Okres rezerwacji</label>
                        <div className="col-lg-4">
                            <DateRangePicker style={{ width: '100%'}}
                                             appearance="subtle"
                                             format="dd.MM.yyyy"
                                             cleanable={false}
                                             locale={locales}
                                             ranges={[]}
                                             onChange={this.handleDateChange}
                                             shouldDisableDate={beforeToday()}
                                             value={[this.state.startDate, this.state.endDate]}
                                             //disabled={this.props.modifying || false}
                                             placeholder="Wybierz okres rezerwacji"
                                             character=" - "
                                             showOneCalendar/>
                        </div>
                    </div>
                    <div className="row form-group justify-content-center align-items-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="customer">Klient</label>
                        <div className="col-lg-4">
                            <Select id="customer"
                                    placeholder="Wybierz..."
                                    styles={selectStyle}
                                    options={this.props.customerOptions || null}
                                    onChange={this.handleCustomerChange}
                                    value={this.returnCustData()}
                                    isDisabled={this.props.modifying || false} />
                        </div>
                    </div>
                    <div className="row form-group justify-content-center align-items-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="car">Samochód</label>
                        <div className="col-lg-4">
                            <Select id="car"
                                    placeholder="Wybierz..."
                                    styles={selectStyle}
                                    options={this.props.carOptions}
                                    onChange={this.handleCarChange}
                                    value={this.returnCarData()}
                                    isDisabled={this.props.modifying || false} />
                        </div>
                    </div>
                    <div className="row form-group justify-content-center align-items-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="settled">Rozliczone</label>
                        <div className="col-lg-4">
                            <Select id="settled"
                                    placeholder="Wybierz..."
                                    styles={selectStyle}
                                    options={yesNoOptions}
                                    onChange={this.handleSettledChange}
                                    value={this.state.settled ? yesNoOptions[0] : yesNoOptions[1]} />
                        </div>
                    </div>
                    <div className="row form-group justify-content-center align-items-center">
                        <label className="col-lg-1 control-label col-form-label" htmlFor="additionalInformation">Dodatkowe informacje</label>
                        <div className="col-lg-4">
                            <input type="text"
                                   id="additionalInformation"
                                   value={this.state.additionalInformation}
                                   onChange={this.handleAdditionalInformationChange}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="row form-group justify-content-center align-items-center">
                        <div className="col-lg-6 mt-4">
                            <button className="btn btn-primary btn-block" type="submit" id="submit">Zatwierdź</button>
                        </div>
                    </div>
                </form>
        );
    }
};