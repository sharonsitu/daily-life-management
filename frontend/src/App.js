import React, { Component } from 'react';
import MyCalendar from './components/MyCalendar';
import TodoList from './components/TodoList';
import CompletedList from './components/CompletedList';
import DailyStory from './components/DailyStory';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoList:[],
      PlanIDList: [],
    };
    this.handleAddPlan = this.handleAddPlan.bind(this);
    this.deleteplans = this.deleteplans.bind(this)
  }

  handleAddPlan(ID,event,time_pick,category) {
    var newplan = {"ID":ID, "plan":event, "time":time_pick, "category":category}
    var newToDoList = this.state.TodoList.concat([newplan])
    var newPlanIDList = this.state.PlanIDList
    newPlanIDList.push(ID)
    this.setState({
        TodoList: newToDoList,
        PlanIDList: newPlanIDList
    })
  }

  deleteplans(keys) {
    var newToDolist = []
    var newPlanIDList = []
    for (var i = 0; i < this.state.TodoList.length; ++i) {
        var id = this.state.TodoList[i]['ID']
        if (! (keys.includes(id))) {
            newToDolist = newToDolist.concat([this.state.TodoList[i]])
            newPlanIDList.push(id)
        }
    }
    this.setState({
        TodoList: newToDolist,
        PlanIDList: newPlanIDList
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Daily Life Management
        </header>
        <body>
        <div>
          <MyCalendar/>
          <TodoList TodoList={this.state.TodoList} handleAddPlan={this.handleAddPlan} deleteplans={this.deleteplans}/>
          <CompletedList TodoList={this.state.TodoList} PlanIDList={this.state.PlanIDList}/>
          <DailyStory/>
        </div> 
        </body>
      </div>
    );
  }
}

export default App;
