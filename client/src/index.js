import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      objectList: []
    };
    
    this.fetchObjects = this.fetchObjects.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  fetchObjects() {
    //log the execution of the fetch
    console.log(`fetching objects from server @ route "objects"`)

    Axios.get(`objects`)
      .then(({data}) => {
        console.log(`successful get request! recieved these models: ${JSON.stringify(data)}`);
        this.setState({
          objectList: data
        });
      })
      .catch((err) => {
        console.error(`fetch is broken with error: ${err}`);
      })
  }

  handleClick() {
    Axios.post(`objects`, {topic: `transport`})
      .then((data) => {
        console.log(data);
        this.fetchObjects();
      })
      .catch((err) => {
        console.error(`fetch is broken with error: ${err}`);
      })
    
  }

  componentDidMount() {
    this.fetchObjects();

    //log the results of first fetch from server, ADD THIS
    // console.log(`fetching objects after app mounts to dom`)
  }

  render () {
    //log each time it renders
    console.log(`rendering`);
    return (
      <div>
        <h1>
          BOILERPLATE
        </h1>
        <button onClick={this.handleClick}>CLICK ME</button>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById(`app`));