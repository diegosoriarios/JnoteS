import React, { Component } from 'react'
import Calendar from 'react-calendar/dist/entry.nostyle'
import './DatePicker.css'

class DatePicker extends Component {
    state = {
        date: new Date()
    }

    componentDidMount() {
        this.props.filterList(this.state.date)
    }

    onChange = date => { this.setState({ date }); this.props.filterList(date) }

    render() {
        return(
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
            </div>
        )
    }
}

export default DatePicker