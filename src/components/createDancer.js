import React, { Component } from 'react';
import axios from 'axios';

export default class CreateDancer extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const dancer = {
      username: this.state.username
    };

    console.log(dancer);

    axios.post('http://localhost:5000/dancers/add', dancer)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <br />
        <h3>Create New Dancer</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Dancer" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
