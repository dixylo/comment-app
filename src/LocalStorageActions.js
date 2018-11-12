import React, { Component } from 'react'

export default (WrappedComponent, name) => {
    class LocalStorageActions extends Component {
        constructor () {
            super()
            this.state = { data: null }
        }

        componentWillMount () {
            let data = localStorage.getItem(name)
            try {
                // Try parsing as a JSON object
                this.setState({ data: JSON.parse(data)})
            } catch (e) {
                // If any error, read as a common string
                this.setState({ data })
            }
        }

        saveData (data) {
            try {
                // Try saving as a JSON object
                localStorage.setItem(name, JSON.stringify(data))
            } catch (e) {
                // If any error, save as a common string
                localStorage.setItem(name, `${data}`)
            }
        }

        render () {
            return (
                <WrappedComponent
                    data={this.state.data}
                    saveData={this.saveData.bind(this)}
                />
            )
        }
    }

    return LocalStorageActions
}