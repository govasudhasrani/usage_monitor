import React, { Component } from 'react';
import moment from 'moment';
import fetchData from '../../data_handler/fetchData';

import DataTable from '../DataTable';
import Summary from '../Summary';
import SearchForm from '../SearchForm';
import './index.css';

// Note: Currently it uses default timezone of the client browser.
// It needs to be upgraded to use moment library to set the
// server or user specified timezone.
const today = new Date()
const default_from_date = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
const default_to_date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`

/*
1. App layouts webpage with sections like header, search, summary and grid.
2. It maintains user query parameters and its result in its internal state as it shares some
   its state with children components.
3. Communicates with data layers to fetch data from backend server.
*/
class App extends Component {

  constructor(props) {
    super(props);

    // Internal state maintains search query, summary and results.
    this.state = {
      result: [],
      from_date: default_from_date,
      to_date: default_to_date,
      last_hit_time: moment().format('YYYY/MM/DD HH:mm:SS')
    };

    this.fetchSearchResult = this.fetchSearchResult.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  updateResult(result) {
    this.setState({ result });
  }

  fetchSearchResult(from_date, to_date) {
    fetchData(from_date, to_date, result => this.updateResult(result))
  }

  componentDidMount() {
    this.fetchSearchResult(default_from_date, default_to_date)
  }

  doSearch(from_date, to_date) {
    this.setState({ from_date, to_date });
    this.fetchSearchResult(from_date, to_date)
    this.setState({ last_hit_time: moment().format('YYYY/MM/DD HH:mm:SS') })
  }

  render() {
    return (
      <div className="page">
        <div class="head">
          <h2>MiniClick</h2>
          <h4>Games usage Monitor</h4>
        </div>
        <div className="interactions">
          <SearchForm
            default_from_date={this.state.from_date}
            default_to_date={this.state.to_date}
            onClick={this.doSearch} />
        </div>
        <div className="summary">
          <Summary total={this.state.result.length} last_hit_time={this.state.last_hit_time} />
        </div>
        <div className="table">
          {this.state.result && <DataTable data={this.state.result} />}
        </div>
      </div>
    )

  }
}

export default App;
