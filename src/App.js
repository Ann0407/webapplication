import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      showAll: true,
      keyword: '',
      photos: [],
    };
  }

  componentDidMount() {
    fetch("/api/v1/photos")
      .then(response => response.json())
      .then(data => this.setState({photos: data}));
  }

  handleChange(e) {
    this.setState({showAll: e === 1 ? true : false});
  }

  setkeyword(keyword) {
    this.setState({keyword: keyword});
  }

  render() {
    return (
      <div className="container">
        <SearchBar 
          sendKeywordToApp={
              (keyword) => {
                  this.setkeyword(keyword);
              }
          }/>
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.handleChange}>
            <ToggleButton value={1}>All</ToggleButton>
            <ToggleButton value={2}>Pinned</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <Gallery elements={this.state.photos} showAll={this.state.showAll}
          keyword={this.state.keyword}/>
      </div>
    );
  }
}

export default App;
