
import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <>
      <ul className="EventList">
        {events.map(inputevent =>
          <li key={inputevent.id}>
            <Event event={inputevent} />
          </li>
          )}
      </ul>
      </>
    );
  }}

export default EventList;
