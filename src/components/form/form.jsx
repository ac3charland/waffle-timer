import React, {Component} from 'react'
import './form.scss'
import {API, graphqlOperation} from 'aws-amplify'
import * as mutations from '../../graphql/mutations'
import moment from 'moment'

const cb = 'form'

export default class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {name: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({name: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const name = this.state.name || 'Anonymous'
        const startISOString = moment().format()
        const endISOString = moment().add(3, 'minutes').format()
        const timer = {name, startISOString, endISOString}
        API.graphql(graphqlOperation(mutations.createTimer, {input: timer}))
    }

    render () {
        return (
            <div className={cb}>
                <form className={`${cb}__wrapper`} onSubmit={this.handleSubmit}>
                    <label htmlFor='nameEntry'>Enter Your Name to <br/>Start Your Timer</label>
                    <input className={`${cb}__input`} type='text' id='nameEntry' onChange={this.handleChange}></input>
                    <input className={`${cb}__submit`} type="submit" value="Submit"></input>
                </form>
            </div>
        )
    }
}