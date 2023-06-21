import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };

  handleInputChange = async (event) => {
    let value = event.target.value;
    if(value <= 32 && value > 0){
      this.setState({
        eventCount: value,
        errorText: ''
      });

      this.props.updateEvents(null, value);
      
    } else {
      return this.setState({
        eventCount: value,
        errorText: 'Please enter a number from 1 to 32.'
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
            max={32}
            value={this.state.eventCount}
            onChange={this.handleInputChange}
          />
           <ErrorAlert text={this.state.errorText} />
        </div>   
    )
  }
}

export default NumberOfEvents;