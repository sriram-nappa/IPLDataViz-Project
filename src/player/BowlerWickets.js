import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios'; 

const URLExt = 'player/playerwicket'

class BowlerWickets extends Component {
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
            console.log('bowlwe',res.data)
            this.setState({data: res.data})
        })
  }

  parseGraphData(res) {
      let years = []
      let wickets = []
      let names = []
      res.forEach(function(val){
          console.log('val',val['Season_Year'])
          years.push(val['Season_Year'])
          wickets.push(val['Wickets'])
          names.push(val['Player_Name'])
      })
      console.log('Wicketsinitial',wickets)
      let tmpArr = []
      tmpArr.push(years)
      tmpArr.push(wickets)
      tmpArr.push(names)
      console.log('Wicket temp',tmpArr[1])
      return tmpArr
  }

  renderGraph() {
    let graphData = this.state.data;
    let result = this.parseGraphData(graphData)
    console.log('Name of the player',result[2][0])
    console.log('Year',result[0])
    console.log('Wickets',result[1])
    let config = {
        chart: {
        type: 'line'
    },
    title: {
        text: 'Number of Wickets-Seasonwise-'+result[2][0]
    },
    subtitle: {
        text: 'Source: Kaggle.com'
    },
    xAxis: {
        categories: result[0],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of Wickets'
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Wickets',
        data: result[1]
    } ]
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
    console.log('bowler', gData, Object.keys(gData).length)
    return (
      <div className="bowler_wickets">
        {(Object.keys(gData).length) ? this.renderGraph(): null}
      </div>
    );
  }
}

export default BowlerWickets;
