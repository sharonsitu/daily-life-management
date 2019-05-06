import React, { Component } from 'react';
import TimePicker from 'react-time-picker';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './todolist.css'

let order = 'desc';
let ID = -1;

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showAddItem: true,
          time_pick: '10:00',
          event: "",
          category: "select category",
        };
        this.handleTimePickChange = this.handleTimePickChange.bind(this);
        this.handleAddEventChange = this.handleAddEventChange.bind(this);
        this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this);
        this.handleAddPlan = this.handleAddPlan.bind(this);
        this.deleteplans = this.deleteplans.bind(this)
    }
    
    handleTimePickChange(time) {
        this.setState({
            time_pick: time
        })
    }

    handleAddEventChange(event) {
        this.setState({
            event: event.target.value
        })
    }

    handleSelectCategoryChange(event) {
        this.setState({
            category: event.target.value
        })
    }

    handleAddPlan() {
        ++ID;
        var event = this.state.event;
        var time_pick = this.state.time_pick;
        var category = this.state.category;
        this.props.handleAddPlan(ID,event,time_pick,category)
    }

    handleBtnClick = () => {
        if (order === 'desc') {
          this.refs.table.handleSort('asc', 'name');
          order = 'asc';
        } else {
          this.refs.table.handleSort('desc', 'name');
          order = 'desc';
        }
    }

    deleteplans(keys) {
        this.props.deleteplans(keys);
    }
  
    render() {
        let selectRowProp = {
            mode: 'checkbox'
        };
        
        let options = {
            afterDeleteRow: this.deleteplans  // A hook for after droping rows.
        };

        let todolist_table = (
            <div className = "todolist-table">
                <div className="search-box">
                    <form>
                        <input type="text" name="name" onChange={this.handleAddEventChange} placeholder="Type what you plan to do here"/>
                    </form>
                    <TimePicker
                        onChange={this.handleTimePickChange}
                        value={this.state.time_pick}
                    />
                    <select className="select-category" value={this.state.category} onChange={this.handleSelectCategoryChange}>
                        <option value="select category">select category</option>
                        <option value="study/work">study/work</option>
                        <option value="sports">sports</option>
                        <option value="shopping">shopping</option>
                        <option value="indoor activities">indoor activities</option>
                    </select>
                    <button className="addplan-button" onClick={this.handleAddPlan} type="submit">Add Now</button>
                </div>
                <BootstrapTable ref='table' data={ this.props.TodoList} deleteRow={true} selectRow={selectRowProp} options={ options }>
                    <TableHeaderColumn dataField='ID' isKey={ true } dataSort={ true }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='plan'>Plan</TableHeaderColumn>
                    <TableHeaderColumn dataField='time' dataSort={ true }>Time</TableHeaderColumn>
                    <TableHeaderColumn dataField='category' dataSort={ true }>Category</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )

        return (
            <div className="todolist-container">
                <div className="todolist-title">
                    <div>Make a Plan</div>
                    <i className="fas fa-tasks"></i>
                </div>
                {todolist_table}
            </div>
        );
    }
}

export default TodoList;