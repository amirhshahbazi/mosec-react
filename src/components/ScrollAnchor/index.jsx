import React, {Component} from "react"
import './style.scss'

class ScrollAnchor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            observer: new IntersectionObserver(([entry]) => {
                this.observerChanged(entry)
            })
        }
    }

    componentDidMount() {
        this.state.observer.observe(document.querySelector('.scroll-anchor'))
    }

    observerChanged = (entry) => {
        if (entry && entry.isIntersecting) {
            this.props.onIntersect()
        }
    }

    componentWillUnmount() {
        this.state.observer.disconnect()
    }

    render() {
        return (
            <div className={`scroll-anchor`}></div>
        )
    }
}

export default ScrollAnchor
