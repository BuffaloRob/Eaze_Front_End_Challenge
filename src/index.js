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
    const YOUR_API_KEY = 'i3mwyIid3cRgqhwO9FPwC83IccBImA1P';
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
        <div className="giphy-list">
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
          </ul>
        </div>
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

class Input extends Component {
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
      <div className="main-header">
        <h1>Search for Giphys!</h1>
        <div className="searchbar">
          <form onSubmit={e => this.onSubmit(e)}>
            <input className="searchbar-input" type="text" value={this.state.value} onChange={e => this.handleChange(e)}/>
            <i className="fa fa-search searchbar-icon" aria-hidden="true"></i>
            <i className="fa fa-times searchbar-cross" aria-hidden="true"></i>
          </form>
        </div>
      </div>
    );
  }
}


class Main extends Component {
  render() {
    return (
      <div className="container">
        <div class="row">
          <Input />
        </div>
        <div class="row">
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


