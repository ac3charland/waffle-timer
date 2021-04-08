import React, {useState} from 'react'
import './form.scss'
import {API, graphqlOperation} from 'aws-amplify'
import * as mutations from '../../graphql/mutations'
import moment from 'moment'

export const cb = 'form'

const Form = () => {
    const [name, setName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const displayName = name || 'Anonymous'
        const startISOString = moment().format()
        const endISOString = moment().add(3, 'minutes').format()
        const timer = {name: displayName, startISOString, endISOString}
        API.graphql(graphqlOperation(mutations.createTimer, {input: timer}))
    }

    return (
        <div className={cb}>
            <form className={`${cb}__wrapper`} onSubmit={handleSubmit}>
                <label htmlFor='nameEntry'>Enter Your Name to <br />Start Your Timer</label>
                <input className={`${cb}__input`} type='text' id='nameEntry' onChange={(e) => setName(e.target.value)} value={name}></input>
                <input className={`${cb}__submit`} type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default Form