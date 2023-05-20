import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };

  handleInputChange = (event) => {
    const numInput = event.target.value;
    this.setState ({
      event: event,
      eventCount: numInput,
    })

    //location is undefined
    this.props.eventsUpdate(undefined, numInput)

    if (numInput <1 || numInput > 32){
      this.setState({
        errorText: 'Try Again! Please enter a number between 1 and 32'
      })
     } else {
        return this.setState({
          errorText: ''
        });
      }
    }
  
  render(){
    return (
      <div className='container'>
        <div>Number of Events</div>
          <input
            type='number'
            className='eventNumber'
            id='num'
            min={1}
            max={32}
            value={this.state.eventCount}
            onChange={this.handleInputChange}
          />
        </div>   
    )
  }
}

export default NumberOfEvents;