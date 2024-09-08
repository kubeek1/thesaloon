import React from 'react';
import { Link } from 'react-router-dom';
import FilterInput from './FilterInput.js';
import {ChangeSVG} from './Icons.js';
import {NoMatches} from "./NoMatches.js";

export default class CustomersTable extends React.Component {
    state = {
        filteredList: this.props.custList,
        stock: this.props.custList,
        phrase: ''
    }

    handleFilterChange = e => {
        this.setState({
            phrase: e.target.value,
            filteredList: this.state.stock.filter(f => f.name.concat(" ", f.surname).concat(" ", f.phone).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
        });

    }

    render() {
        return (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th colSpan={6} className="tableCaption">Klienci</th>
                    </tr>
                    <tr>
                        <th className="filter-head" colSpan={6}>Wyszukaj po imieniu, nazwisku lub numerze telefonu:
                            <FilterInput onChange={this.handleFilterChange} value={this.state.phrase}/>
                        </th>
                    </tr>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Adres</th>
                        <th>Mail</th>
                        <th>Telefon</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.filteredList.length > 0
                        ? this.state.filteredList.map((c, i) => {
                            return (
                                <tr key={c._id}>
                                    <td className="align-middle">{c.name}</td>
                                    <td className="align-middle">{c.surname}</td>
                                    <td className="align-middle">{c.address}</td>
                                    <td className="align-middle">{c.email}</td>
                                    <td className="align-middle">{c.phone}</td>
                                    <td className="align-middle">
                                        <Link to={`/customers/change/${c._id}`}
                                              className="btn"
                                              data-toggle="tooltip"
                                              title="Zmień"><ChangeSVG/></Link>
                                        <Link to={{
                                                pathname: '/reservations',
                                                state: { filterphrase: (c.name + ' ' + c.surname) }}}
                                              className="btn btn-dark btn-sm actbtn"
                                              data-toggle="tooltip"
                                              title="Wyszukaj rezerwacje klienta">Rezerwacje</Link>
                                    </td>
                                </tr>
                            )
                        })
                        : <NoMatches colSpan={6}/>
                    }
                    </tbody>
                </table>
        );
    }

}