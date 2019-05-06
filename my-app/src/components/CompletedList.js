import React, { Component } from 'react';
import './completedlist.css'
import {Pie} from 'react-chartjs-2';

class CompletedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          InvalidIDs : [],
          ErrorMsg: "",
          showGraph: false,
          pie_labels: ["study/work","sports","shopping","indoor activities","undefined"],
          CompletedIDList: [],
          CompletedCategories: [{
              data:[0,0,0,0,0],
              backgroundColor:[]
            }]
        };
        this.handleAddCompletedSubmit = this.handleAddCompletedSubmit.bind(this);
    }

    handleAddCompletedSubmit(event) {
        var tmp = [0,0,0,0,0]
        var tmp1 = []
        var tmp2 = []
        var msg = ""
        var totalcompleted = 0
        if(event.which === 13) {
            var ids = event.target.value
            var idlist = ids.split(",")
            for (var i = 0; i < idlist.length; ++i) {
                var id = parseInt(idlist[i])
                if (this.props.PlanIDList.includes(id)) {
                    tmp1.push(id)
                    var index = this.props.PlanIDList.indexOf(id);
                    var category = this.props.TodoList[index]['category']
                    if (category === "study/work") {
                        tmp[0] += 1
                    } else if (category === "sports") {
                        tmp[1] += 1
                    } else if (category === "shopping") {
                        tmp[2] += 1
                    } else if (category === "indoor activities") {
                        tmp[3] += 1
                    } else {
                        tmp[4] += 1
                    }
                } else {
                    tmp2.push(id)
                }
            }
            for (var j = 0; j < tmp2.length; ++j) {
                msg += "ID"
                msg += tmp2[j]
                msg += " "
            }
            if (tmp2.length !== 0) {
                msg += "are invalid"
            }
            this.setState({
                CompletedIDList: tmp1,
                CompletedCategories: [{data:tmp,backgroundColor:["LightBlue","PeachPuff","Thistle","Lavender","AliceBlue"]}],
                InvalidIDs: tmp2,
                ErrorMsg: msg,
                showGraph:true,
            })
        }  
    }

    render() {
        let completedlist = (
            <div className="actionadd-box">
                <form onSubmit={e => { e.preventDefault(); }}>
                    <input type="text" name="name" onKeyPress={this.handleAddCompletedSubmit} placeholder="Type your completed plans here, seperate ids by common: eg. 1,2,5,... "/>
                </form>
                <div className="errormsg">{this.state.ErrorMsg}</div>     
            </div>
        )

        let piechart = this.state.showGraph ? (
            <Pie
                data={{
                    labels: this.state.pie_labels,
                    datasets: this.state.CompletedCategories
                }}
                height='50%'
            />
        ):''
        
        let completed_rate = (this.props.PlanIDList.length === 0) ? 0 : ((this.state.CompletedIDList.length)/(this.props.PlanIDList.length)*100).toFixed(2)
        
        let uncompleted_total = this.props.PlanIDList.length - this.state.CompletedIDList.length

        let summary = this.state.showGraph ? (
            <div className="summary">
                <p>You have finished {completed_rate}% of your plan.</p>
                <p>You still need to finish {uncompleted_total} tasks.</p>
            </div>    
        ):''

        return (
            <div className="completedlist-container">
                <div className="completedlist-title">
                    <div>Examine the Results</div>
                    <i className="fas fa-chart-pie"></i>
                </div>
                {completedlist}
                {piechart}
                {summary}
            </div>
        );
    }
}

export default CompletedList;