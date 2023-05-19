import React, { Component } from "react";

class Event extends Component {
  state = {
    hide : true,
  } 

  handleStateChange = () => {
    this.setState((prevState) => ({
      hide: !prevState.hide
    }))
   }

  render() {
    const { event } = this.props;
    const { hide } = this.state;

    return (
    <div className='event'>
       <h1 className='summary'>{event.summary}</h1>
       <p className='start'>{event.start.dateTime}</p>
       <p className='location'>{event.location}</p>


       {!hide && (
        <div className='eventDetails'>
          <h2 className='aboutTitle'>About Event:</h2>
          <a className='eventLink' href={event.htmlLink} >See Event in Google Calendar</a>
          <p className='description'>{event.description}</p>
        </div>
       )}

        <button 
        type='button'
        className='detailsButton' 
        onClick={() => this.handleStateChange()}>{hide ? 'Show': 'Hide'} Details
        </button>
      </div>
    );
  }
}
export default Event;