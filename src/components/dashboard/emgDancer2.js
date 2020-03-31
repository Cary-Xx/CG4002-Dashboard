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
        const splitData = value.split(' ');
        // const values = value.toString().replace(/ /g, '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
        // const display = '\xa0\xa0' + values.toString() + '\xa0\xa0';
        // values.forEach(element => {
        //     element = element + ' '
        // });
        // var dataEmg = {
        //     date: new Date(),
        //     Emg_1: parseInt(values[0]),
        //     Emg_2: parseInt(values[1]),
        //     Emg_3: parseInt(values[2]),
        //     Emg_4: parseInt(values[3]),
        //     Emg_5: parseInt(values[4])
        // }
        // var chart = {
        //     axis: {
        //         x: {
        //             label: 'Time'
        //         },
        //         y: {
        //             label: 'Value'
        //         }
        //     },
        //     size: {
        //         width: 420,
        //         height: 255
        //     }
        //     // ,
        //     // title: {
        //     //     show: false,
        //     //     text: 'Emg',
        //     //     position: 'top-center',
        //     // }
        // }
        tableRows.unshift(splitData);
        // console.log("AA" + splitData);
        // console.log("Table" + tableRows)
        return (
            // <RTChart
            //     chart={chart}
            //     fields={['Emg_1', 'Emg_2', 'Emg_3', 'Emg_4', 'Emg_5']}
            //     data={dataEmg} />
            // <div>

            <table className="emgTable" id='myTable'>
                <thead className="thead-light">
                    <tr className='tr'>
                        <th>Emg 1</th>
                        <th>Emg 2</th>
                        <th>Emg 3</th>
                        <th>Emg 4</th>
                        <th>Emg 5</th>
                    </tr>
                </thead>
                <tbody className='tbody'>
                    {this.iterateRows(tableRows)}
                </tbody>

                {/* {tableRows.forEach(element => <tbody className='tbody'>{element}</tbody>)} */}
            </table>

        )
    }
}
