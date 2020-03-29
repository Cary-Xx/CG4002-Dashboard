import React, { Component } from 'react';
import axios from 'axios';

const ImuReading = props => (
  <tr>
    <td>{props.imuReading.dancer}</td>
    <td>{props.imuReading.wristAccX}</td>
    <td>{props.imuReading.wristAccY}</td>
    <td>{props.imuReading.wristAccZ}</td>
    <td>{props.imuReading.wristGyroX}</td>
    <td>{props.imuReading.wristGyroY}</td>
    <td>{props.imuReading.wristGyroZ}</td>
    <td>{props.imuReading.updatedAt.substring(0, 19)}</td>
  </tr>
);

export default class ImuReadingList extends Component {
  constructor(props) {
    super(props);

    this.state = { imuReadings: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/imus/')
      .then(response => {
        this.setState({ imuReadings: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  imuReadingList() {
    return this.state.imuReadings.reverse().map(currentImu => {
      return <ImuReading imuReading={currentImu}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged ImuReading</h3>
        <table className="table" style={{ border: '1px solid black' }}>
          <thead className="thead-light">
            <tr>
              <th>Dancer</th>
              <th>Accelerometer X Value</th>
              <th>Accelerometer Y Value</th>
              <th>Accelerometer Z Value</th>
              <th>Gyroscope X Value</th>
              <th>Gyroscope Y Value</th>
              <th>Gyroscope Z Value</th>
              <th>Time Created</th>
            </tr>
          </thead>
          <tbody>
            {this.imuReadingList()}
          </tbody>
        </table>
      </div>
    )
  }
}
