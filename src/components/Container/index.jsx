import React, {Component} from "react"
import SwitchButton from "../SwitchButton"
import issuesApi from "../../service/issuesApi"
import IssueList from "../IssueList"
import ScrollAnchor from "../ScrollAnchor"
import './style.scss'

class Container extends Component {
    state = {
        states: [],
        page: 0,
        sort: 'created',
        data: [],
        ended: false,
        type: 'replace',
    }

    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevState.states !== this.state.states && !this.state.ended)) {
            this.getIssues('replace')
        } else if ((prevState.page !== this.state.page && !this.state.ended)) {
            this.getIssues('extend')
        }
    }

    getIssues = async (type) => {
        const state = this.determineState()
        const {sort, page} = this.state

        const {data} = await issuesApi.fetchIssues({state, page, sort})

        if (data.length === 0) {
            this.setState({ended: true})
        }

        if (type === 'replace') {
            this.setState({data})
        } else {
            this.setState({data: [...this.state.data, ...data]})
        }
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
                states: [...this.state.states, buttonName],
                type: 'replace',
                page: 1,
                ended: false,
            })
        } else {
            this.setState({
                states: this.state.states.filter(state => state !== buttonName),
                type: 'replace',
                page: 1,
                ended: false,
            })
        }
    }

    updatePage = () => {
        let {page} = this.state
        this.setState({page: page + 1, type: 'extend'})
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
                    <ScrollAnchor onIntersect={this.updatePage}/>
                </main>
            </div>
        )
    }
}

export default Container
