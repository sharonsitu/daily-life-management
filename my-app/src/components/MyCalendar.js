import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Clock from 'react-live-clock';
import './calendar.css';
 
class MyCalendar extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
  
  render() {
    return (
      <div className="calendar-container">
        <div className="calendar-box">
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
        <div className="timer-box">
          <div className="timer">
            <p>Current Time</p>
            <Clock format={'YYYY/MM/DD HH:mm:ss'} ticking={true} />
          </div>
          <p className="time-motto">“The most efficient way to live reasonably is every morning to <b>make a plan</b> of one’s day and every night to <b>examine the results</b> obtained.”</p>
          <p className="time-motto-author">– Alexis Carrel</p>
        </div>
      </div>
    );
  }
}

export default MyCalendar;