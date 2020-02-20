import React, { Component } from 'react'
import './App.css'
import Timer from './components/timer/timer'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import Form from './components/form/form'
import { API, graphqlOperation } from 'aws-amplify'
import * as subscriptions from './graphql/subscriptions'
import * as queries from './graphql/queries'
import moment from 'moment'

Amplify.configure(config)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      lastTimer: null
     }
    this.timer = 0;
  }

  componentDidMount() {
    API.graphql(graphqlOperation(queries.listTimers)).then(res => {
      const timers = res.data.listTimers.items
      const lastTimer = timers[timers.length - 1]
      this.setState({ lastTimer })
    })

    API.graphql(graphqlOperation(subscriptions.onCreateTimer)).subscribe({
      next: timerCreated => {
        const timerObject = timerCreated.value.data.onCreateTimer
        this.setState({ lastTimer: timerObject })
      }
    })
  }

  checkIfActiveTimer(timer) {
    if (timer) {
      const { endISOString } = timer
      this.setState({ activeTimerExists: moment().isBefore(endISOString)}) 
    }
    else {
      this.setState({activeTimerExists: true})
    }
  }

  calculateTimerProps(timer) {
    if (timer) {
      const { startISOString, endISOString } = timer
      const timerDuration = moment(endISOString).diff(moment(startISOString), 'seconds')
      const secondsUntilEnd = moment(endISOString).diff(moment(), 'seconds')
      const percentage = Math.round(secondsUntilEnd / timerDuration * 100)
      const timeRemaining = Math.floor(secondsUntilEnd / 60) + ':' + secondsUntilEnd % 60
      if (percentage < 0) {
        this.setState({ percentage: 100, timeRemaining: null })
        return
      }
      else {
        this.setState({ percentage, timeRemaining })
      }
    } else {
      this.setState({ percentage: 100, timeRemaining: null })
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Waffle Timer</h1>
        {!this.state.activeTimerExists && <Form />}
        <Timer percentage={this.state.percentage} secondsUntilEnd={this.state.secondsUntilEnd} />
      </div>
    )
  }
}

export default App
