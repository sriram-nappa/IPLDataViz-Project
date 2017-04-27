import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';

const URLExt = 'match/team2powerwickets/335987'

class Team2WSplit extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: []
      }
      this.loadGraphData = this.loadGraphData.bind(this);
  }

  componentWillMount() {
      this.loadGraphData(URLExt);
      console.log('in')
  }

  loadGraphData(url) {
      axios.get(`${this.props.urlExt}/${url}`)
        .then(res => {
            console.log(res.data)
            this.setState({data: res.data})
        })
  }

  parseGraphData(res) {
      let powerruns = []
      let middleruns = []
      let slogruns = []
      let teamnames = []
      res.forEach(function(val){
          powerruns.push(val['Power'])
          middleruns.push(val['Middle'])
          slogruns.push(val['Slog'])
          teamnames.push(val['Team_Name'])
      })
      let tmpArr = []
      tmpArr.push(powerruns)
      tmpArr.push(middleruns)
      tmpArr.push(slogruns)
      tmpArr.push(teamnames)
      return tmpArr
  }

  renderGraph() {
    let graphData = this.state.data;
    let result = this.parseGraphData(graphData);
    console.log('Team names',result[3][0])
    let config = {
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Wickets taken-'+result[3][0],
        align: 'center',
        verticalAlign: 'middle',
        y: -110
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%']
        }
    },
    series: [{
        type: 'pie',
        name: 'Wickets',
        innerSize: '50%',
        data: [
            ['Powerplay',   result[0][0]],
            ['Middle',       result[1][0]],
            ['Slog', result[2][0]]
        ]
    }]

    }
    console.log(result)
    if(result[0].length) {   
        console.log('render') 
        return(<ReactHighcharts config={config} ref='chart'></ReactHighcharts>)
    } else {
        return null
    }
  }

  componentWillUnmount() {
    this.refs.chart.destroy();
  }

  render() {
    let gData = this.state.data
    console.log('In season', gData, Object.keys(gData).length)
    return (
      <div className="match_team2wsplit">
        {(Object.keys(gData).length) ? this.renderGraph(): null}
      </div>
    );
  }
}

export default Team2WSplit;