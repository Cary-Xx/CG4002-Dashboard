import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditDancemove extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDateCreated = this.onChangeDateCreated.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      duration: 0,
      dateCreated: new Date(),
      dancers: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/dancemoves/' + this.props.match.params.id)
        .then(response => {
          this.setState({
            name: response.data.name,
            description: response.data.description,
            duration: response.data.duration,
            dateCreated: new Date(response.data.dateCreated)
          })
        })
        .catch(function (error) {
          console.log(error);
        });

    axios.get('http://localhost:5000/dancers/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              dancers: response.data.map(dancer => dancer.username),
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDateCreated(dateCreated) {
    this.setState({
      dateCreated: dateCreated
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const dancemove = {
      name: this.state.name,
      description: this.state.description,
      duration: this.state.duration,
      dateCreated: this.state.dateCreated
    };

    console.log(dancemove);

    axios.post('http://localhost:5000/dancemoves/update/' + this.props.match.params.id, dancemove)
        .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
        <div>
          <h3>Edit DanceMove Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name: </label>
              <select ref="userInput"
                      required
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChangeName}>
                {
                  this.state.dancers.map(function (dancer) {
                    return <option
                        key={dancer}
                        value={dancer}>{dancer}
                    </option>;
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <label>Description: </label>
              <input type="text"
                     required
                     className="form-control"
                     value={this.state.description}
                     onChange={this.onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input
                  type="text"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
              />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                    selected={this.state.dateCreated}
                    onChange={this.onChangeDateCreated}
                />
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="Edit DanceMove Log" className="btn btn-primary"/>
            </div>
          </form>
        </div>
    )
  }
}
