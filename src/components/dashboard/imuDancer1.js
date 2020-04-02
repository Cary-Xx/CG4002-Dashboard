import React, { Component } from 'react';
import RTChart from 'react-rt-chart';
// import { LineChart, XAxis, CartesianGrid, Tooltip, Line } from 'recharts';

var index = 0;

export default class ImuDancer1 extends Component {
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
        index++;
        const value = this.props.value;
        const splitValues = value.toString().split(' ');

        var dataImu = {
            date: index,
            Acc_X: (parseFloat(splitValues[0]) / 16384).toFixed(6),
            Acc_Y: (parseFloat(splitValues[1]) / 16384).toFixed(6),
            Acc_Z: (parseFloat(splitValues[2]) / 16384).toFixed(6),
            Gyro_X: (parseFloat(splitValues[3]) / 131).toFixed(6),
            Gyro_Y: (parseFloat(splitValues[4]) / 131).toFixed(6),
            Gyro_Z: (parseFloat(splitValues[5]) / 131).toFixed(6)
        };

        // if (value.length !== 0) {
        var chart = {
            data: {
                rows: [
                    ['Acc_X', 'Acc_Y', 'Acc_Z', 'Gyro_X', 'Gyro_Y', 'Gyro_Z'],
                ],
                axes: {
                    Acc_X: 'y',
                    Acc_Y: 'y',
                    Acc_Z: 'y',
                    Gyro_X: 'y2',
                    Gyro_Y: 'y2',
                    Gyro_Z: 'y2'
                },
                point: {
                    show: false
                }
            },
            axis: {
                x: {
                    label: 'Time',
                    tick: {
                        format: ' '
                    }
                },
                y: {
                    min: -2.0,
                    max: 2.0,
                    label: {
                        text: 'Accelerometer'
                    },
                    tick: {
                        values: [-2.0, -1.6, -1.2, -0.8, -0.4, 0.0,
                            0.4, 0.8, 1.2, 1.6, 2.0],
                    }
                }
                ,
                y2: {
                    min: -250,
                    max: 250,
                    show: true,
                    label: {
                        text: 'Gyroscope'
                    },
                    tick: {
                        values: [-250, -200, -150, -100, -50, 0,
                            50, 100, 150, 200, 250],
                    }
                }
            }
            ,
            size: {
                width: 470,
                height: 500
            },
            // grid: {
            //     y: {
            //         show: true
            //     },
            //     x: {
            //         show: true
            //     }
            // }
            // ,
        }
        // }
        return (
            <div id='chart'>
                <RTChart
                    data={dataImu}
                    chart={chart}
                    fields={['Acc_X', 'Acc_Y', 'Acc_Z', 'Gyro_X', 'Gyro_Y', 'Gyro_Z']}
                    maxValues='10'
                />
            </div>


            // <LineChart
            //     width={400}
            //     height={400}
            //     data={dataImu}
            //     margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            // >
            //     <XAxis dataKey="name" />
            //     <Tooltip />
            //     <CartesianGrid stroke="#f5f5f5" />
            //     <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
            //     <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
            // </LineChart>

            // </div>
        )
    }
}
