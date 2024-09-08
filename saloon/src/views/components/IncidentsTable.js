import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {ChangeSVG, DeleteSVG} from "./Icons.js";
import {NoMatches} from "./NoMatches.js";

export default class IncidentsTable extends Component {

    deleteHandler(i, e) {
        e.preventDefault();
        this.props.onDelete(this.props.incidents[i]._id);
    };

    render() {
        return (
                <table className="table overflow-auto table-hover">
                    <thead>
                    <tr>
                        <th colSpan={6} style={{paddingBottom: '2em', border: '0px', fontSize: '25px'}}>Zgłoszenia usterkowe</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Data</th>
                        <th>Samochód</th>
                        <th>Opis</th>
                        <th>Wyklucz dostępność</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.incidents.length > 0
                        ? this.props.incidents.map((i, j) => {
                            return (
                                <tr key={i._id}>
                                    <td className="align-middle">{j+1}</td>
                                        <td className="align-middle">{moment(i.date).format("DD.MM.YYYY")}</td>
                                    <td className="align-middle">
                                        <li>{i.car.brand} {i.car.model} {i.car.engine} {i.car.year}</li>
                                        <li>Kolor: {i.car.color}</li>
                                        <li className="pt-1">{i.car.plate}</li>
                                    </td>
                                    <td className="align-middle">{i.description}</td>
                                    <td className="align-middle">{i.exclude ? "Tak" : "Nie"}</td>
                                    <td className="align-middle">
                                        <Link to={`/incidents/change/${i._id}`} className="btn" data-toggle="tooltip" title="Zmień"><ChangeSVG/></Link>
                                        <button onClick={this.deleteHandler.bind(this, j)} className="btn btn-link" data-toggle="tooltip" title="Usuń"><DeleteSVG/></button>
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