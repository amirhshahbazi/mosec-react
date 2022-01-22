import React, {Component} from 'react'
import './style.scss'

class IssueItem extends Component {
    render() {
        const { issue } = this.props

        return (
            <div className={`issue`}>
                <div className="issue-icon">
                    <i className="bx"/>
                </div>
                <div className="issue-item">
                    <div className="issue-item__title">
                        {issue.title}
                    </div>
                    <div className="issue-item__reporter">
                        {issue.user.login} {issue.state}
                    </div>
                </div>
            </div>
        )
    }
}

export default IssueItem
