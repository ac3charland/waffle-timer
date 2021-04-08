import React, { Component } from 'react'
import './App.scss'
import Timer from './components/timer/timer'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import Form from './components/form/form'
import { API, graphqlOperation } from 'aws-amplify'
import * as subscriptions from './graphql/subscriptions'
import * as queries from './graphql/queries'
import moment from 'moment'
import {GITHUB_URL, PORTFOLIO_URL} from './utils/constants'

Amplify.configure(config)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastTimer: null,
      showForm: false,
      loading: true
    }
    this.timer = 0
    this.checkIfActiveTimer = this.checkIfActiveTimer.bind(this)
  }

  componentDidMount() {
    API.graphql(graphqlOperation(queries.listTimers, {limit: 1000})).then(res => {
      const timers = res.data.listTimers.items
      let lastTimer
      timers.forEach(timer => {
        const { endISOString } = timer
        if (!lastTimer) {
          lastTimer = timer
        } else if (moment(endISOString).isAfter(lastTimer.endISOString)) {
          lastTimer = timer
        }
      })
      this.setState({ lastTimer, loading: false, showForm: true })
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
      return moment().isBefore(endISOString)
    }
    return true
  }

  calculateTimerProps(timer) {
    if (timer) {
      const { startISOString, endISOString } = timer
      const timerDuration = moment(endISOString).diff(moment(startISOString), 'seconds')
      const secondsUntilEnd = moment(endISOString).diff(moment(), 'seconds')
      const percentage = (timerDuration - secondsUntilEnd) / timerDuration * 100
      const minutesRemaining = Math.floor(secondsUntilEnd / 60)
      const secondsRemainder = secondsUntilEnd % 60
      const secondsString = secondsRemainder < 10 ? `0${secondsRemainder}` : secondsRemainder
      const timeRemaining = `${minutesRemaining}:${secondsString}`
      if (percentage > 99) {
        this.setState({ percentage: null, timeRemaining: null })
      }
      else {
        this.setState({ percentage, timeRemaining })
      }
    } else {
      this.setState({ percentage: null, timeRemaining: null })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newTimerSinceLastUpdate = prevState.lastTimer !== this.state.lastTimer
    const timerExists = !!this.state.lastTimer
    if (newTimerSinceLastUpdate && timerExists && this.checkIfActiveTimer(this.state.lastTimer)) {
      this.setState({showForm: false})
      this.calculateTimerProps(this.state.lastTimer)
      this.interval = setInterval(() => {
        if (this.state.lastTimer && this.checkIfActiveTimer(this.state.lastTimer)) {
          this.calculateTimerProps(this.state.lastTimer)
        }
        else {
          this.calculateTimerProps(this.state.lastTimer)
          this.setState({showForm: true})
          clearInterval(this.interval)
        }
      }, 1000)
    }
  }

  render() {
    const name = this.state.lastTimer && this.state.lastTimer.name
    return (
      <div className="App">
        <div className='flex-wrapper'>
          <div className='top-wrapper'>
            <h1 className='heading'>The Dotcom Services Waffle Timer</h1>
            {!this.state.loading ? <Timer percentage={this.state.percentage} timeRemaining={this.state.timeRemaining} name={name} /> : <div>Loading...</div>}
            {this.state.showForm && <Form />}
          </div>
          <div className='footer'>Built by <a href={PORTFOLIO_URL}>Alex Charland</a> <a href={GITHUB_URL}><i className="fab fa-github-alt"></i></a></div>
        </div>
      </div>
    )
  }
}

export default App
