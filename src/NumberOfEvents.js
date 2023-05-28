import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };


  handleInputChange = async (event) => {
    await this.setState({ eventCount: event.target.value });
    this.props.updateEvents(null, event.target.value);
  }

  
  render(){
    return (
      <div className='numberOfEvents'>
        <div>Number of Events</div>
          <input
            type='number'
            className='eventNumber'
            id='num'
            value={this.state.eventCount}
            onChange={this.handleInputChange}
          />
        </div>   
    )
  }
}

export default NumberOfEvents;