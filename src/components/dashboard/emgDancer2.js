import React, { Component } from 'react';
import '../dashboard.css';

var tableRows = [['', '', '', '', '']];

export default class EmgDancer2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    // changeState = e => {
    //     this.setState({
    //         value: e.target.value
    //     })
    // }

    // shouldComponentUpdate(nextState) {
    //     return this.state.value !== nextState.value;
    // }
    processEmgData(data) {
        for (var i = 1; i < data.length; i++) {
            data[i] = (parseFloat(data[i]) / 100).toFixed(1);
        }
    }
    iterateRows(table) {
        return table.map(function (row, i) {
            return (
                <tr key={i}>
                    <td className='td'>{row[0]}</td>
                    <td className='td'>{row[1]}</td>
                    <td className='td'>{row[2]}</td>
                    <td className='td'>{row[3]}</td>
                    <td className='td'>{row[4]}</td>
                </tr>);
        });
    };

    shouldComponentUpdate(newProps) {
        return this.props.value !== newProps.value
    }

    render() {
        const value = this.props.value;
        const splitData = value.toString().split(' ');

        this.processEmgData(splitData);
        tableRows.unshift(splitData);

        return (
            <table className="emgTable">
                <thead className="thead-light">
                    <tr className='tr'>
                        <th>Average</th>
                        <th>Slope Diff</th>
                        <th>Peak</th>
                        <th>MNF</th>
                        <th>Power</th>
                    </tr>
                </thead>
                <tbody className='tbody'>
                    {this.iterateRows(tableRows)}
                </tbody>
            </table>

        )
    }
}
