import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './App.css';
import './nprogress.css';
import { WarningAlert } from './Alert'
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    location: 'all',
    numberOfEvents: 64,
    warningAlert: '',
    showWelcomeScreen: undefined
  }

async componentDidMount() {
      this.mounted = true;
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
          getEvents().then((events) => {
        if (this.mounted) {
          events = events.slice(0,64)
          this.setState({ 
            events, 
            locations: extractLocations(events) });
          }
      });
    }
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
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    return (
      <div className="App">
        {!navigator.onLine ? <WarningAlert text={'You are now offline. The events may not be up to date.'} /> :null}
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/> 
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;