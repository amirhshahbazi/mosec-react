import React, {Component} from "react"
import SwitchButton from "../SwitchButton"
import issuesApi from "../../service/issuesApi"
import './style.scss'

class Container extends Component {
    state = {
        states: [],
        page: 1,
        sort: 'created',
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getIssues()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getIssues()
    }

    getIssues = async () => {
        const state = this.determineState()
        const {page, sort} = this.state
        const results = await issuesApi.fetchIssues({
            state,
            page,
            sort,
        })
    }

    determineState = () => {
        const {states} = this.state
        let state

        if (states.length === 0 || states.length === 2) {
            state = 'all'
        } else {
            state = states[0]
        }

        return state
    }

    showState = (val, buttonName) => {
        if (!this.state.states.includes(buttonName)) {
            this.setState({
                states: [...this.state.states, buttonName]
            })
        } else if (this.state.states.includes(buttonName)) {
            this.setState({
                states: this.state.states.filter(state => state !== buttonName)
            })
        }
    }

    render() {
        return (
            <div className="container">
                <header className={`container__header`}>
                    <SwitchButton stateChanged={this.showState} title={`open`}/>
                    <SwitchButton stateChanged={this.showState} title={`closed`}/>
                </header>
                <main className={`container__body`}>
                </main>
            </div>
        )
    }
}

export default Container
