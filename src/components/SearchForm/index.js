import React, { Component } from 'react';
import './index.css';

/*
SearchForm loads search query input elements and maintains user 
query parameters in its internal state.
*/
class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            from_date: this.props.default_from_date,
            to_date: this.props.default_to_date
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onSearchDateChange(key, event) {
        this.setState({ [key]: event.target.value });
    }

    handleSubmit(event) {
        this.props.onClick(this.state.from_date, this.state.to_date);
    }
    render() {

        return (
            <form>
                <label>
                    From: <input type="text"
                        defaultValue={this.props.default_from_date}
                        onChange={(event) => this.onSearchDateChange("from_date", event)}
                    />
                </label>
                <label>
                    To: <input type="text"
                        defaultValue={this.props.default_to_date}
                        onChange={(event) => this.onSearchDateChange("to_date", event)}
                    />
                </label>
                <button type="button" onClick={this.handleSubmit}>Search</button>
            </form>

        );
    }
}

export default SearchForm;