import React, { Component } from 'react';
import RTChart from 'react-rt-chart';

export default class ImuDancer2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ''
        }
    }

    // componentDidMount() {
    //     setInterval(() => this.forceUpdate(), 100);
    // }

    // changeState = e => {
    //     this.setState({
    //         value: e.target.value
    //     })
    // }

    // shouldComponentUpdate(nextState) {
    //     return this.state.value !== nextState.value;
    // }

    shouldComponentUpdate(newProps) {
        return this.props.value !== newProps.value
    }

    render() {
        const value = this.props.value;
        const values = value.toString().split(' ');
        // console.log(values.toString());
        // const values = value.split(",");
        // console.log("imu1");
        // console.log(parseInt(values[0]));
        // console.log(parseInt(values[1]));
        // console.log(parseInt(values[2]));
        // console.log(parseInt(values[3]));
        // console.log(parseInt(values[4]));
        // console.log(parseInt(values[5]));
        // console.log(typeof parseInt(values[0]));
        // console.log(typeof parseInt(values[1]));
        // console.log(typeof parseInt(values[2]));
        // console.log(typeof parseInt(values[3]));
        // console.log(typeof parseInt(values[4]));
        // console.log(typeof parseInt(values[5]));

        var dataImu = {
            date: new Date(),
            Acc_X: parseInt(values[0]),
            Acc_Y: parseInt(values[1]),
            Acc_Z: parseInt(values[2]),
            Gyro_X: parseInt(values[3]),
            Gyro_Y: parseInt(values[4]),
            Gyro_Z: parseInt(values[5])
        };
        var chart = {
            axis: {
                x: {
                    label: 'Time',
                    tick: {
                        format: ' ',
                        fit: true,
                        count: 6
                    }
                },
                y: {
                    label: 'Value'
                }
            },
            size: {
                width: 420,
                height: 320
            }
            // ,
            // title: {
            //     show: false,
            //     text: 'Imu',
            //     position: 'top-center',
            // }
        }
        return <RTChart
            chart={chart}
            fields={['Acc_X', 'Acc_Y', 'Acc_Z', 'Gyro_X', 'Gyro_Y', 'Gyro_Z']}
            data={dataImu} />
    }
}
