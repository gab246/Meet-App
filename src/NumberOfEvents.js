import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventCount: 64,
  };

  handleInputChange = async (event) => {
    let value = event.target.value;
    if(value <= 64 && value > 0){
      this.setState({
        eventCount: value
      });

      this.props.updateEvents(null, value);
      
    } else {
      this.setState({
        eventCount: value
      })
    };
   
  }

  render(){
    return (
      <div className='numberOfEvents-container'>
        <div>Number of Events</div>
          <input
            type='number'
            className='eventNumber'
            id='num'
            min={1}
            max={64}
            value={this.state.eventCount}
            onChange={this.handleInputChange}
          />
        </div>   
    )
  }
}

export default NumberOfEvents;