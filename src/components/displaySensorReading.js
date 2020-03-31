import React, { Component } from 'react';
// import SplitPane from 'react-split-pane';
// import RTChart from 'react-rt-chart';
import './dashboard.css';

import Position from './dashboard/position';
import Move from './dashboard/danceType';
import Delay from './dashboard/syncDelay';
import ImuDancer1 from './dashboard/imuDancer1';
import ImuDancer2 from './dashboard/imuDancer2';
import ImuDancer3 from './dashboard/imuDancer3';
import EmgDancer2 from './dashboard/emgDancer2';

// var stateChange = '';
var counterImu = 0;
var counterEmg = 0;

// counter value
const imuFre = 10;
const emgFre = 20;

export default class DisplaySensorReading extends Component {
  constructor(props) {
    super(props);

    // this.position = React.createRef();
    // this.move = React.createRef();
    // this.delay = React.createRef();
    // this.imuDancer1 = React.createRef();
    // this.imuDancer2 = React.createRef();
    // this.imuDancer3 = React.createRef();
    // this.emgDancer1 = React.createRef();
    // this.emgDancer2 = React.createRef();
    // this.emgDancer3 = React.createRef();

    // this.handleImuDataChange1 = this.handleImuDataChange1.bind(this);

    this.state = {
      pos: '',
      move: '',
      delay: '',
      imu1: '',
      imu2: '',
      imu3: '',
      emg: '',
      // emg1: '',
      // emg2: '',
      // emg3: '',
      ws: '',
    }
  }

  componentDidMount() {
    // same ip and port as express server
    // jw's hotspot
    const URL = 'ws://192.168.43.222:7000'
    // zh's hotspot
    // const URL = 'ws://172.20.10.9:7000'

    
    // const URL = 'ws://172.25.96.131:7000'
    const ws = new WebSocket(URL)

    // on connection
    ws.onopen = () => {
      console.log('Successfully connected to backend');
    }

    // on receiving message
    ws.onmessage = e => {

      const inputData = JSON.stringify(e.data).trim().replace(/\\n/g, '');
      // String array
      // console.log("input data from frontend: ", inputData);
      const splitData = inputData.replace('{', '').replace('}', '').split(':').toString().replace(/\s/g, "").replace('"', '').replace('"', '').replace('"', '').split(",");
      // console.log("split data from frontend: ", splitData.toString());
      switch (splitData.length) {
        case 8:
          console.log("validmove received on frontend");
          this.setState({
            pos: splitData[3],
            move: splitData[5],
            delay: splitData[7]
          })
          break;
        case 14:
          counterEmg++;
          if (counterEmg === 15) {
            console.log("emg received on frontend");
            // val val val val
            var newDataEmg = splitData[5] + ' ' + splitData[7] + ' ' + splitData[9] + ' ' + splitData[11] + ' ' + splitData[13];
            counterEmg = 0;
            this.setState({
              emg: newDataEmg
            })
            // switch (splitData[3]) {
            //   case 1:
            //     this.setState({
            //       emg1: newData
            //     })
            //     break;
            //   case '2':
            //     this.setState({
            //       emg2: newData
            //     })
            //     break;
            //   case '3':
            //     this.setState({
            //       emg3: newData
            //     })
            //     break;
            //   default:
            //     break;
            // }
          }
          break;
        case 16:
          counterImu++;
          if (counterImu === 10) {
            console.log("imu received on frontend");
            // val val val val val val
            var newDataImu = splitData[5] + ' ' + splitData[7] + ' ' + splitData[9] + ' ' + splitData[11] + ' ' + splitData[13] + ' ' + splitData[15];
            counterImu = 0;
            switch (splitData[3]) {
              case '1':
                this.setState({
                  imu1: newDataImu
                })
                counterImu = 0;
                break;
              case '2':
                this.setState({
                  imu2: newDataImu
                })
                break;
              case '3':
                this.setState({
                  imu3: newDataImu
                })
                break;
              default:
                // console.log("Default" + splitData[3]);
                break;
            }
          }
          break;

        // unreachable
        default:
          break;

      }
    }

    ws.onclose = () => {
      console.log('disconnected from backend');
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL)
      });
    }
  }

  // handleImuDataChange1(e) {
  //   console.log("step2");
  //   this.setState({
  //     imu1: e
  //   })
  // }
  // handleEmgDataChange1 = e => {
  //   this.setState({
  //     emg1: e.target.value
  //   })
  // }
  // handleImuDataChange2 = e => {
  //   this.setState({
  //     imu2: e.target.value
  //   })
  // }
  // handleEmgDataChange2 = e => {
  //   this.setState({
  //     emg2: e.target.value
  //   })
  // }
  // handleImuDataChange3 = e => {
  //   this.setState({
  //     imu3: e.target.value
  //   })
  // }
  // handleEmgDataChange3 = e => {
  //   this.setState({
  //     emg3: e.target.value
  //   })
  // }
  // handlePosChange = e => {
  //   this.setState({
  //     pos: e.target.value
  //   })
  // }
  // handleMoveChange = e => {
  //   this.setState({
  //     move: e.target.value
  //   })
  // }
  // handlePosChange = e => {
  //   this.setState({
  //     delay: e.target.value
  //   })
  // }


  // handleImuDataChange1 = e => {
  //   this.imuDancer1.current.changeState(e);
  // }
  // handleEmgDataChange1 = e => {
  //   this.emgDancer1.current.changeState(e);
  // }
  // handleImuDataChange2 = e => {
  //   this.imuDancer2.current.changeState(e);
  // }
  // handleEmgDataChange2 = e => {
  //   this.emgDancer2.current.changeState(e);
  // }
  // handleImuDataChange3 = e => {
  //   this.imuDancer3.current.changeState(e);
  // }
  // handleEmgDataChange3 = e => {
  //   this.emgDancer3.current.changeState(e);
  // }
  // handlePosChange = e => {
  //   this.position.current.changeState(e);
  // }
  // handleMoveChange = e => {
  //   this.position.current.changeState(e);
  // }
  // handleDelayChange = e => {
  //   this.position.current.changeState(e);
  // }
  // handleValidMoveChange = e => {
  //   this.setState({
  //     validMove: e.target.value
  //   })
  //   stateChange = 'move';
  // }

  render() {
    // const { imuData } = this.state.imuData;
    // const { emgData } = this.state.emgData;
    // const { validMove } = this.state.validMove;
    // var dataImu;
    // var dataEmg;
    // // correspond to one data point on a chart
    // switch (stateChange) {
    //   case 'imu':
    //     dataImu = {
    //       dancer: this.state.imuData[0],
    //       accX: this.state.imuData[1],
    //       accY: this.state.imuData[2],
    //       accZ: this.state.imuData[3],
    //       gyroX: this.state.imuData[4],
    //       gyroY: this.state.imuData[5],
    //       gyroZ: this.state.imuData[6]
    //     }
    //     break;
    //   case 'emg':
    //     dataEmg = {
    //       dancer: this.state.imuData[0],
    //       emg1: this.state.imuData[1],
    //       emg2: this.state.imuData[2],
    //       emg3: this.state.imuData[3],
    //       emg4: this.state.imuData[4],
    //       emg5: this.state.imuData[5]
    //     }
    //     break;
    //   case 'move':
    //     break;
    //   default:
    //     break;
    // }

    return (
      <div>
        <div className='rowUp'>
          <div className='roundedContainer'>
            <div className='columnUp'>
              <div className='titleContainer'>
                <p style={{ font: 'courier', fontSize: '150%'}}> <b>Position</b> </p>
                <Position value={this.state.pos} />
              </div>
            </div>
            <div className='splitter'></div>
            <div className='columnUp'>
              <div className='titleContainer'>
                <p style={{ font: 'courier', fontSize: '150%' }}> <b>Move</b> </p>
                <Move value={this.state.move} />
              </div>
            </div>
            <div className='splitter'></div>
            <div className='columnUp'>
              <div className='titleContainer'>
                <p style={{ font: 'courier', fontSize: '150%' }}> <b>Delay</b> </p>
                <Delay value={this.state.delay} />
              </div>
            </div>
          </div>

        </div>

        <div className='rowDown'>
          <div className='columnDown'>
            <p style={{ fontSize: '150%', textAlign: 'center', color: 'white' }}> <b>Dancer</b> &nbsp; <b>1</b></p>
            <div className='rtchart'>
              <ImuDancer1 value={this.state.imu1} />
            </div>
            {/* <div className='rtchart'>
              <EmgDancer1 value={this.state.emg1} />
            </div> */}

          </div>
          <div className='columnDown'>
            <p style={{ fontSize: '150%', textAlign: 'center', color: 'white' }}> <b>Dancer</b> &nbsp; <b>2</b></p>
            <div className='rtchart'>
              <ImuDancer2 value={this.state.imu2} />
            </div>
            {/* <p style={{ fontSize: '100%', textAlign: 'center', color: 'white' }}> <b>Emg</b> &nbsp; </p> */}
            <div className='emgBox' style={{ overflowY: 'hidden' }}>
              <EmgDancer2 value={this.state.emg} />
            </div>

            {/* <div className='rtchart'>
              <EmgDancer2 value={this.state.emg2} />
            </div> */}
          </div>
          <div className='columnDown'>
            <p style={{ fontSize: '150%', textAlign: 'center', color: 'white' }}> <b>Dancer</b> &nbsp; <b>3</b></p>
            <div className='rtchart'>
              <ImuDancer3 value={this.state.imu3} />
            </div>
            {/* <div className='rtchart'>
              <EmgDancer3 value={this.state.emg3} />
            </div> */}
          </div>
        </div >
      </div >
    )
  }
}

// {/* <SplitPane split="horizontal" position="relative" maxSize="25%" defaultSize="25%">
//             <SplitPane split="vertical" maxSize="25%" defaultSize="25%"> */}
// {/* 
//             <div className="container" align='center'>
//               <h4> Position </h4>
//               <p>{this.state.validMove[0]}</p>
//             </div> */}

// {/* <div className="container" align='center'> */ }
// {/* <Position ref={this.position} /> */ }
// {/* </div> */ }

// {/* <SplitPane split="vertical" maxSize="25%" defaultSize="25%"> */ }
// {/* <div className="container" align='center'>
//                 <h5> Move </h5>
//                 <p>{this.state.validMove[1]}</p>
//               </div> */}
// {/* <div className="container" align='center'> */ }
// {/* <Move ref={this.move} /> */ }
// {/* </div> */ }

// {/* <div className="container" align='center'> */ }
// {/* <h5> Delay </h5>
//                 <p>{this.state.validMove[2]}</p>
//               </div> */}
// {/* <div className="container" align='center'> */ }
// {/* <Delay ref={this.delay} /> */ }
// {/* </div> */ }

// {/* </SplitPane>
//             </SplitPane>
//             <SplitPane split="vertical" minSize="33%"> */}
// {/* 
//             <div className="container" align='center'>
//               <h5> Dancer 1 </h5>
//               <RTChart
//                 fields={['Accelerometer X', 'Accelerometer Y', 'Accelerometer Z', 'Gyroscope X', 'Gyroscope Y', 'Gyroscope Z']}
//                 data={dataImu} />
//               <RTChart
//                 fields={['Emg 1', 'Emg 2', 'Emg 3', 'Emg 4', 'Emg 5']}
//                 data={dataEmg} />
//             </div> */}

// {/* <SplitPane split="vertical" minSize="50%"> */ }
// {/* <div className="container" align='center'>
//                 <h5> Dancer 2 </h5>
//               </div>

//               <div className="container" align='center'>
//                 <h5> Dancer 3 </h5>
//               </div> */}

// {/* </SplitPane>
//             </SplitPane>
//           </SplitPane> */}
