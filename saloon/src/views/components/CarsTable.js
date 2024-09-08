import React from 'react';
import { Link } from 'react-router-dom';
import FilterInput from './FilterInput.js';
import {ChangeSVG, DeleteSVG} from './Icons.js';
import { NoMatches } from './NoMatches.js';

export default class CarsTable extends React.Component {
    state = {
        filteredList: this.props.carsList,
        stock: this.props.carsList,
        phrase: ''
    }

    deleteHandler(i, e) {
        e.preventDefault();
        this.props.onDelete(this.state.filteredList[i]._id);

        this.setState({
            filteredList: this.state.filteredList.filter(x => x._id !== this.state.filteredList[i]._id),
            stock: this.state.stock.filter(x => x._id !== this.state.filteredList[i]._id)
        })
    };

    handleFilterChange = e => {
        this.setState({
            phrase: e.target.value,
            filteredList: this.state.stock.filter(f => f.brand.concat(" ", f.model).concat(" ", f.plate).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
        });
    }

    render() {
        return (
                <table className="table table-hover table-fade-in">
                    <thead>
                    <tr>
                        <th colSpan={8} className="tableCaption">Auta</th>
                    </tr>
                    <tr>
                        <th className="filter-head" colSpan={8}>Wyszukaj po marce, modelu lub tablicy rejestracyjnej:
                            <FilterInput onChange={this.handleFilterChange} value={this.state.phrase}/>
                        </th>
                    </tr>
                    <tr>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Silnik</th>
                        <th>Rok</th>
                        <th>Kolor</th>
                        <th>Tablice</th>
                        <th>Dostępny</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.filteredList.length > 0
                        ? this.state.filteredList.map((c, i) => {
                            return (
                                <tr key={c._id}>
                                    <td className="align-middle">{c.brand}</td>
                                    <td className="align-middle">{c.model}</td>
                                    <td className="align-middle">{c.engine}</td>
                                    <td className="align-middle">{c.year}</td>
                                    <td className="align-middle">{c.color}</td>
                                    <td className="align-middle">{c.plate}</td>
                                    <td className="align-middle">{c.availability ? "Tak" : "Nie" }</td>
                                    <td className="align-middle">
                                        <Link to={`/cars/change/${c._id}`} className="btn" data-toggle="tooltip" title="Zmień"><ChangeSVG/></Link>

                                        {
                                            c.availability
                                                ?
                                                    <span>
                                                        <button onClick={this.deleteHandler.bind(this, i)} className="btn btn-link" data-toggle="tooltip" title="Usuń"><DeleteSVG/></button>
                                                        <Link to={{ pathname:'/lead/addReservation', state: { car: this.props.carsList[i]}}} className="btn btn-dark btn-sm actbtn">Zarezerwuj</Link>
                                                    </span>
                                                :
                                                    <span>
                                                        <span data-toggle="tooltip" data-placement="top" title="Auto w rezerwacji lub usterce"><button onClick={this.deleteHandler.bind(this, i)} className="btn btn-link" disabled><DeleteSVG/></button></span>
                                                        <span data-toggle="tooltip" data-placement="top" title="Auto w rezerwacji lub usterce"><button className="btn btn-dark btn-sm actbtn" disabled>Zarezerwuj</button></span>
                                                    </span>
                                        }

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