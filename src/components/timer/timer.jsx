import React from 'react'
import './timer.scss'
import waffle from '../../images/waffle.png'

export const cb = 'timer'

const Timer = props => {
    const {percentage, timeRemaining, name} = props
    const radius = 150
    const arcCoordinates = calculateArcCoordinates(percentage || 100, radius)
    const nameText = name && (name[name.length - 1] === 's' ? `${name}'` : `${name}'s`)
    let headerText
    if (nameText && timeRemaining) {
        headerText = `Time until ${nameText} waffle is ready:`
    }
    else if (nameText) {
        headerText = `${nameText} waffle is done!`
    }
    else {
        headerText = 'Enter your name below and be the first one to have a waffle!'
    }

    return (
        <div className={cb}>
            <span className={`${cb}__timer-wrapper`}>
                <img className={`${cb}__image`} alt='' src={waffle} />
                <div className={`${cb}__svg-wrapper`}>
                    <svg height={2 * radius} width={2 * radius}>
                        <path d={`M${radius},${radius} L${radius},5 ${arcCoordinates} z`} fill="#FFEDD0"></path>
                    </svg>
                </div>
            </span>
            <div className={`${cb}__countdown-wrapper`}>
                <h2 className={`${cb}__header`}>{headerText}</h2>
                {timeRemaining && <h3>{timeRemaining}</h3>}
            </div>
        </div>
    )
}

const calculateArcCoordinates = (value, radius) => {

    const radiusMinus5 = radius - 5
    const diameterMinus5 = 2 * radius - 5

    const degrees = 360 * ((value - 100) / -100) - 90
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

export default Timer
