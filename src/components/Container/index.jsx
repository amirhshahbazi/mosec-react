import React, {Component} from "react"
import SwitchButton from "../SwitchButton"
import issuesApi from "../../service/issuesApi"
import './style.scss'
import IssueList from "../IssueList";
import ScrollAnchor from "../ScrollAnchor";

class Container extends Component {
    state = {
        states: [],
        page: 0,
        sort: 'created',
        data: [],
        isLoading: false,
        ended: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.states !== this.state.states && !this.state.ended) {
            this.getIssues()
        }
    }

    getIssues = async () => {
        const state = this.determineState()
        const {sort} = this.state
        let {page} = this.state

        page++
        this.setState({isLoading: true})
        const {data} = await issuesApi.fetchIssues({state, page, sort})
        if (data.length === 0) {
            this.setState({ended: true})
        }
        this.setState({data, isLoading: false})
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
        this.setState({
            page: 0,
            ended: false,
            data: [],
        })
    }

    render() {
        return (
            <div className="container">
                <header className={`container__header`}>
                    <SwitchButton stateChanged={this.showState} title={`open`}/>
                    <SwitchButton stateChanged={this.showState} title={`closed`}/>
                </header>
                <main className={`container__body`}>
                    <IssueList issues={this.state.data}/>
                    <ScrollAnchor onIntersect={this.getIssues}/>
                </main>
            </div>
        )
    }
}

export default Container
