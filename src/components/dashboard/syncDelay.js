import React, { Component } from 'react';
import '../dashboard.css';

export default class Delay extends Component {
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
        const value = this.props.value;
        return (
            <div className='boxUp'>
                {value}
            </div>
        )
    }
}
