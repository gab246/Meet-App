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
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    location: 'all',
    numberOfEvents: 32,
    warningAlert: '',
    showWelcomeScreen: undefined,
  }

async componentDidMount() {
      this.mounted = true;
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
          getEvents().then((events) => {
            events = events.slice(0, 32);
        if (this.mounted) {
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

  //number of events in each city for graph
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();

      return {city, number};
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />;
    const { events } = this.state
    
    return (
      <div className='App'>
        {!navigator.onLine ? <WarningAlert text={'You are now offline. The events may not be up to date.'} /> :null}
          <h1 className='title'>Meet App</h1>
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} /> 
            <NumberOfEvents updateEvents={this.updateEvents}/>
          
          <div className='chartTitle'>Events in each City</div>
          <div className='data-vis-wrapper'>
            <div>
            <EventGenre events={events} />
            </div>
          <ResponsiveContainer height={400} >
              <ScatterChart
                margin={{
                  top: 40, right: 40, bottom: 40, left: 40,
                }}>

            <CartesianGrid />
              <XAxis type='category' dataKey='city' name='City' />
              <YAxis type='number' dataKey='number' name='Number Of Events' allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3'}} />
              <Scatter  data={this.getData()} fill='#8884d8' />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
          <EventList events={this.state.events}/>
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => { getAccessToken() }} />

       
      </div>
    );
  }
}


export default App;