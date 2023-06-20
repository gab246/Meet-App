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
      const code = searchParams.get('code');
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
          getEvents().then((events) => {
            events = events.slice(0, 64);
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

  //number of events in each cityπ
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => events.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  }

  render() {
    const { location, numberOfEvents, events } = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />;
    return (
      <div className='App'>
          <h1 className='title'>Meet App</h1>
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} /> 
            <NumberOfEvents updateEvents={this.updateEvents}/>

          <h4 className='chartTitle'>Events in Each City</h4>
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid />
                <XAxis type='category' dataKey='city' name='City' />
                <YAxis type='number' dataKey='number' name='Number Of Events' allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3'}} />
                <Scatter  data={this.getData()} fill='#8884d8' />
            </ScatterChart>
          </ResponsiveContainer>
        <EventList events={this.state.events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
          {!navigator.onLine ? <WarningAlert text={'You are now offline. The events may not be up to date.'} /> :null}
      </div>
    );
  }
}


export default App;