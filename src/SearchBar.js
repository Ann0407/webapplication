import React from 'react';

class SearchBar extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendKeywordToApp(this.refs.photoKeyword.value);
  }

  render() {
    return (
      <div className="">
        <h2 className="title">React Flickr</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" 
            className="searchInput"
            placeholder="Search keyword..." 
            ref="photoKeyword"
            required
            autoFocus />
          <button 
            type="submit" 
            ref="button"
            className="searchButton">Search</button>
        </form>
      </div>
    )    
  }
};

export default SearchBar;