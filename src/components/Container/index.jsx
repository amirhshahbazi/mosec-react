import React, {useState, useEffect} from "react"
import SwitchButton from "../SwitchButton"
import './style.scss'

const Container = (props) => {
    const [states, setStates] = useState([])


    useEffect(() => {
        // states are here! do something with them!
        console.log(states)
    })

    const showState = (val, buttonName) => {
        if (!states.includes(buttonName)) {
            setStates([...states, buttonName])
        } else if (states.includes(buttonName)) {
            setStates(states.filter(state => state !== buttonName))
        }
    }

    return (
        <div className="container">
            <header className={`container__header`}>
                <SwitchButton stateChanged={showState} title={`open`} />
                <SwitchButton stateChanged={showState} title={`closed`} />
            </header>
            <main className={`container__body`}>
            </main>
        </div>
    )
}

export default Container
