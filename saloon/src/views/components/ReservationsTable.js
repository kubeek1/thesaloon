import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FilterInput from './FilterInput.js';
import {ChangeSVG, DeleteSVG} from './Icons.js';
import {NoMatches} from './NoMatches.js';

export default class ReservationsTable extends React.Component {
    state = {
        phrase: this.props.filterphrase || '',
        stockList: this.props.reservations,
        filteredList: this.props.reservations
    };

    deleteHandler(i, e) {
        if(window.confirm("Czy na pewno chcesz usunąć rezerwację?")){
            e.preventDefault();
            this.props.onDelete(this.state.filteredList[i]._id);

            // Usunięcie rezerwacji z widoku aktualnych i pierwotnych
            this.setState({
                filteredList: this.state.filteredList.filter(x => x._id !== this.state.filteredList[i]._id),
                stockList: this.state.stockList.filter(x => x._id !== this.state.stockList[i]._id)
            })
        }
    };


    filterList = (list,phr) => {
        this.setState({
            filteredList: list.filter(f => f.customer.name.concat(" ", f.customer.surname).concat(" ", f.customer.phone).toLowerCase().indexOf(phr.toLowerCase()) !== -1)
        });
    };

    componentDidMount(){

    };


    handleFilterChange = e => {
        this.setState({
            phrase: e.target.value,
        });

        this.filterList(this.state.stockList, e.target.value);
    };

    handleActivityFilter = e => {
        let isChecked = e.target.checked;

        if(isChecked){
            this.setState({
                filteredList: this.state.stockList.filter( f => f.active )
            })
        }
        else {
            this.setState({
            filteredList: this.state.stockList
            })
        }
    }

    render() {
        return (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th colSpan={8} style={{paddingBottom: '1em', border: '0px', fontSize: '25px'}}>Lista rezerwacji</th>
                    </tr>
                    <tr>
                        <th style={{border: 0}} colSpan={8}>
                            <span style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
                                Pokaż tylko aktywne:
                                <input style={{marginLeft: '7px'}} type="checkbox" onClick={this.handleActivityFilter}/></span>
                        </th>
                    </tr>
                    <tr>
                        <th className="filter-head" colSpan={8}>
                            Wyszukaj po imieniu, nazwisku lub numerze telefonu:
                            <FilterInput onChange={this.handleFilterChange} value={this.state.phrase} />
                        </th>
                    </tr>
                    <tr className="align-middle">
                        <th>#</th>
                        <th>Od dnia</th>
                        <th>Do dnia</th>
                        <th>Samochód</th>
                        <th>Klient</th>
                        <th>Rozliczone</th>
                        <th>Aktywna</th>
                        <th>Dodatkowe informacje</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.filteredList.length > 0
                        ? this.state.filteredList.map((r, j) => {
                            return (
                                <tr key={r._id}
                                className={ !r.active ? "inactive fade-in" : "fade-in" }
                                >

                                    <td className="align-middle">{j+1}</td>
                                    <td className="align-middle">{moment(r.startDate).format("DD.MM.YYYY")}</td>
                                    <td className="align-middle">{moment(r.endDate).format("DD.MM.YYYY")}</td>
                                    <td className="align-middle">
                                        <li>{r.car.brand} {r.car.model} {r.car.engine} {r.car.year}</li>
                                        <li>Kolor: {r.car.color}</li>
                                        <li className="pt-1">{r.car.plate}</li>
                                    </td>
                                    <td className="align-middle">
                                        <li>{r.customer.name} {r.customer.surname}</li>
                                        <li>Mail: {r.customer.email}</li>
                                        <li>Telefon: {r.customer.phone}</li>
                                    </td>
                                    <td className="align-middle">
                                        <li>{r.settled ? "Tak" : "Nie"}</li>
                                    </td>
                                    <td className="align-middle">
                                        <li>{r.active ? "Tak" : "Nie"}</li>
                                    </td>
                                    <td className="align-middle">
                                        <li>{r.additionalInformation || '-'}</li>
                                    </td>
                                    <td className="align-middle">
                                        <Link to={`/reservations/change/${r._id}`} className="btn" data-toggle="tooltip" title="Zmień"><ChangeSVG/></Link>
                                        <button onClick={this.deleteHandler.bind(this, j)} className="btn btn-link" data-toggle="tooltip" title="Usuń"><DeleteSVG/></button>

                                    </td>
                                </tr>
                            )
                        })
                    : <NoMatches colSpan={8}/>
                    }
                    </tbody>
                </table>
        );
    }

}