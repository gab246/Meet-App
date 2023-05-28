import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    location: 'all',
    numberOfEvents: 32
  }

componentDidMount() {
      this.mounted = true;
      getEvents().then((events) => {
        if (this.mounted) {
        this.setState({ 
          events,
          locations: extractLocations(events) });
        }
      });
    }
    componentWillUnmount(){
      this.mounted = false;
    }


  updateEvents = (location, eventCount) => {
    if (location) this.setState({ location });
    if (eventCount) this.setState({ numberOfEvents: eventCount });
    getEvents().then((events) => {
      const locationEvents = (this.state.location === 'all') ? 
      events : 
      events.filter((event) => event.location === this.state.location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents),
      });
    });
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/> 
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events}/>
        
      </div>
    );
  }
}

export default App;