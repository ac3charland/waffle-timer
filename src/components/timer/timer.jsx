import React, { Component } from 'react'
import './timer.scss'
import waffle from '../../images/waffle.png'

const cb = 'timer'

export default class Timer extends Component {

    constructor(props) {
        super(props)
        this.state = { value: 25 }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    calculateArcCoordinates = (value, radius) => {

        const radiusMinus5 = radius - 5
        const diameterMinus5 = 2 * radius - 5

        const degrees = 360 * ((value - 100) / -100) - 90
        console.log('degrees sanity check:', degrees)
        const radians = degrees * (Math.PI / 180)

        const x = radius - radiusMinus5 * Math.cos(radians)
        const y = radius + radiusMinus5 * Math.sin(radians)

        const firstHalf = `A${radiusMinus5},${radiusMinus5} 1 0,0 ${radius},${diameterMinus5} `
        const customHalf = `A${radiusMinus5},${radiusMinus5} 1 0,0 ${x},${y}`

        if (degrees < 90) {
            return customHalf
        }
        return firstHalf + customHalf

    }

    render() {
        const radius = 202
        const arcCoordinates = this.calculateArcCoordinates(this.state.value, radius)

        return (
            <div className={cb}>
                <span className={`${cb}__timer-wrapper`}>
                    <img className={`${cb}__image`} src={waffle} />
                    <div className={`${cb}__svg-wrapper`}>
                        <svg height={2 * radius} width={2 * radius}>
                            <path d={`M${radius},${radius} L${radius},5 ${arcCoordinates} z`} fill="white"></path>
                        </svg>
                    </div>
                </span>
                <div className="slidecontainer">
                    <input type="range" min="1" max="100" value={this.state.value} className="slider" id="myRange" onChange={this.handleChange} />
                </div>
            </div>
        )
    }

}