import React from 'react';
import moment from 'moment';

export default class FeedTable extends React.Component {

    render() {
        return (
            <div className="container w-50" style={{paddingTop: '10%'}}>
                <div className="row">
                    {
                        this.props.list.today.length > 0 ?
                            <div className="col-sm">
                                <table className="table table-hover feedTable">
                                    <thead>
                                    <tr>
                                        <th className="tableCaption">Dziś kończy się</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        this.props.list.today.map((c, i) => {
                                                return (
                                                    <tr key={c._id}>
                                                        <td className="align-middle">
                                                            { moment(c.endDate).format("DD.MM.YYYY") + ' ' + c.car.brand + ' ' + c.car.model +  ' ['+c.car.plate+']' }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                    </tbody>
                                </table>
                        </div>
                        : null
                    }
                    { this.props.list.tomorrow.length > 0 ?
                        <div className="col-sm">
                            <table className="table table-hover feedTable">
                                <thead>
                                <tr>
                                    <th className="tableCaption">Jutro zaczyna się</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.list.tomorrow.length > 0
                                        ? this.props.list.tomorrow.map((c) => {
                                            return (
                                                <tr key={c._id}>
                                                    <td className="align-middle">
                                                        { moment(c.startDate).format("DD.MM.YYYY") + ' ' + c.car.brand + ' ' + c.car.model +  ' ['+c.car.plate+']' }</td>
                                                </tr>
                                            )
                                        })
                                        : null
                                }
                                </tbody>
                            </table>
                        </div>
                    : null }
                </div>
            </div>
        );
    }

}