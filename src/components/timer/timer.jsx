import React, { Component } from 'react'
import './timer.css'
import waffle from '../../images/waffle.png'

const cb = 'timer'

export default class Timer extends Component {

    constructor(props) {
        super(props)
        this.state = {value: 25}
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    calculateArcCoordinates = (value) => {
        const degrees = 360 * (value / 100) - 90
        const radians = degrees * (Math.PI / 180)
        console.log('degrees:', degrees)
        console.log('radians:', radians)
        const x = 115 + 110 * Math.cos(radians)
        const y = 115 + 110 * Math.sin(radians)
        const firstHalf = 'A110,110 1 0,1 115,225 '
        const customHalf = `A110,110 1 0,1 ${x},${y}`
        
        console.log('x:', x, 'y:', y)
        if (degrees < 90) {
            return customHalf
        }
        return firstHalf + customHalf

    }

    render() {

        const arcCoordinates = this.calculateArcCoordinates(this.state.value)
        
        return (
            <div className={cb}>
                <img src={waffle} />
                <div>
                    <svg height="300" width="300">
                        <circle cx="115" cy="115" r="110" fill="white"></circle>
                        <path d={`M115,115 L115,5 ${arcCoordinates} z`} fill="blue"></path>
                    </svg>
                </div>
                <div>
                    <div className="slidecontainer">   
                        <input type="range" min="1" max="100" value={this.state.value} className="slider" id="myRange" onChange={this.handleChange} />
                    </div>
                </div>
            </div>
        )
    }

}