import React, {useState} from "react"
import './style.scss'

const SwitchButton = (props) => {
    const [isActive, setIsActive] = useState(false)

    const changeButtonState = () => {
        props.stateChanged(!isActive, props.title)
    }

    return (
        <button onClick={() => {
            setIsActive(!isActive)
            changeButtonState()
        }} className={`switch-button ${isActive ? 'switch-button--activated' : ''}`}>
            {props.title}
            <span className={
                props.title === 'open' ? 'bx bx-circle' : 'bx bx-check-circle'
            }/>
        </button>
    )
}

export default SwitchButton
