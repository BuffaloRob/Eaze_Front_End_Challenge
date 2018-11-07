import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

console.log(process.env.REACT_APP_GIPHY_API_KEY)

class Giphy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const YOUR_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
    fetch("http://api.giphy.com/v1/gifs/trending?api_key=" + YOUR_API_KEY)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
 
  createListing(items) {
    return items.map((e, i) => {
      return (
        <Listing key={i} value={e.images.downsized_medium.url} />
      )
    })
  }
 
  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {
            this.state.items.map((e, i) => {
              return (
                <Listing key={i} value={e.images.downsized_medium.url} />
              );
            })
          }
          //{this.createListing(this.state.items)}
        </ul>
      );
    }
  }
}

function Listing(props) {
    return (
      <li><img src={props.value} /></li>    
    )
}

class SearchBar extends Component {
  render() {
    return (
      <input type="text" placeholder="Search Trending Gifs..."/>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <div className="container">
        <div className="search_bar">
          <SearchBar />
        </div>
        <div className="gify_container">
          <Giphy />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);


