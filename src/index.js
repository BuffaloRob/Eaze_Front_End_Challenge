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

  componentDidMount(string) {
    const YOUR_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
    let GIPHY_API = 'http://api.giphy.com/v1/gifs/';

    if (string) { 
      GIPHY_API += 'search/?q=' + string + '&api_key=' + YOUR_API_KEY;
    } else { 
      GIPHY_API += 'trending?api_key=' + YOUR_API_KEY;
    }

    console.log(GIPHY_API);
    fetch(GIPHY_API)
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

      this.state.items.map((e) => {
        if (e.user !== undefined) {
          console.log(e.user);
        }
      })
      return (
        <ul>
          {
            this.state.items.map((e, i) => {
                let username = ""
                if (e.user !== undefined)
                    username = e.user.username
                else
                    username = "No username"
                return (
                <Listing key={i} image={e.images.downsized_medium.url} username={username} />
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
      <li>
        <img src={props.image} />
        <h1>{props.username}</h1>
      </li>    
    )
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ''
    };
  } 

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.value); 
  }

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={e => this.onSubmit(e)}>
          <input type="text" placeholder="Search Trending Gifs..." value={this.state.value} onChange={e => this.handleChange(e)}/>
          <button>Search</button>
        </form>
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <div className="container">
        <div className="search_bar">
          <Form />
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


