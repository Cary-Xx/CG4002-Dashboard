import React, { Component } from 'react';
import RTChart from 'react-rt-chart';

export default class EmgDancer3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ''
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

    render() {
        const value = this.props.value;
        const values = value.toString().split(' ');
        var dataEmg = {
            date: new Date(),
            Emg_1: parseInt(values[0]),
            Emg_2: parseInt(values[1]),
            Emg_3: parseInt(values[2]),
            Emg_4: parseInt(values[3]),
            Emg_5: parseInt(values[4])
        }
        var chart = {
            axis: {
                x: {
                    label: 'Time'
                },
                y: {
                    label: 'Value'
                }
            }
        }
        return (
            <RTChart
                chart={chart}
                fields={['Emg_1', 'Emg_2', 'Emg_3', 'Emg_4', 'Emg_5']}
                data={dataEmg} />
        )
    }
}
