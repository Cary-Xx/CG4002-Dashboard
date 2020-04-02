import React, { Component } from 'react';
import '../dashboard.css';

export default class Position extends Component {
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
        const splitValue = this.props.value.replace(/-/g, ' ').replace(/'/g, ' ');
        const newValue = splitValue.split("").join(" ");

        return (
            <div className='boxUp'>
                {newValue}
            </div>
        )
    }
}
