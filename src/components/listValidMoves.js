import React, { Component } from 'react';
import axios from 'axios';

const ValidMove = props => (
    <tr>
        <td>{props.validmove.position}</td>
        <td>{props.validmove.danceType}</td>
        <td>{props.validmove.syncDelay}</td>
        <td>{props.validmove.updatedAt}</td>
    </tr>
);

export default class ValidmoveList extends Component {
    constructor(props) {
        super(props);

        this.state = { validmoves: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/validmoves/')
            .then(response => {
                this.setState({ validmoves: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    validmoveList() {
        return this.state.validmoves.map(currentValidmove => {
            return <ValidMove validmove={currentValidmove} />;
        })
    }

    render() {
        return (
            <div>
                <br />
                <h3>Logged Valid Movements</h3>
                <table className="table" style={{ border: '1px solid black' }}>
                    <thead className="thead-light">
                        <tr>
                            <th>Relative Position</th>
                            <th>Dance Type</th>
                            <th>Sync Delay</th>
                            <th>Time Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.validmoveList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
