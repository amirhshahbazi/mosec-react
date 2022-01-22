import React, {Component} from "react"
import './style.scss'
import IssueItem from "../IssueItem"

class IssueList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const issues = this.props.issues.map((issue) => {
            return <IssueItem key={issue.id} issue={issue} />
        })

        return (
            <div className="issue-list">
                {issues}
            </div>
        )
    }
}

export default IssueList
