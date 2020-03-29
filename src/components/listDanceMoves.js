import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dancemove = props => (
  <tr>
    <td>{props.dancemove.name}</td>
    <td>{props.dancemove.description}</td>
    <td>{props.dancemove.duration}</td>
    <td>{props.dancemove.dateCreated.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.dancemove._id}>edit</Link> | <button onClick={() => { props.deleteDancemove(props.dancemove._id) }}>delete</button>
    </td>
  </tr>
);

export default class DancemoveList extends Component {
  constructor(props) {
    super(props);

    this.deleteDancemove = this.deleteDancemove.bind(this)

    this.state = { dancemoves: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/dancemoves/')
      .then(response => {
        this.setState({ dancemoves: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDancemove(id) {
    axios.delete('http://localhost:5000/dancemoves/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      dancemoves: this.state.dancemoves.filter(el => el._id !== id)
    })
  }

  dancemoveList() {
    return this.state.dancemoves.map(currentDancemove => {
      return <Dancemove dancemove={currentDancemove} deleteDancemove={this.deleteDancemove} key={currentDancemove._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Dancemoves</h3>
        <table className="table" style={{ border: '1px solid black' }}>
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>DateCreated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.dancemoveList()}
          </tbody>
        </table>
      </div>
    )
  }
}
