import React, { Component } from 'react';
import '../dashboard.css';

export default class Move extends Component {
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

    shouldComponentUpdate(newProps) {
        return this.props.value !== newProps.value
    }

    render() {
        const value = this.props.value.replace(/'/g, '');
        // switch (value) {
        //     case '1':
        //         type = 'Dumbbell'
        //         break;
        //     case '2':
        //         type = 'Facewipe'
        //         break;
        //     case 3:
        //         type = 'Muscle'
        //         break;
        //     case 4:
        //         type = 'Pacman'
        //         break;
        //     case 5:
        //         type = 'ShootingStar'
        //         break;
        //     case 6:
        //         type = 'Shoutout'
        //         break;
        //     case 7:
        //         type = 'Tornado'
        //         break;
        //     case 8:
        //         type = 'Weightlifting'
        //         break;
        //     default:
        //         type = ''
        //         break;
        // }
        return (
            <div className='boxUp'>
                {value}
            </div>
        )
    }
}
