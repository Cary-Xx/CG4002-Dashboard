import React, { Component } from 'react';

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

    render() {
        const { value } = this.props;
        return (
            < div align='center' >
                {/* <h4> Delay </h4> */}
                <p>{value}</p>
            </div >
        )
    }
}
