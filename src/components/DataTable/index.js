import React from 'react';
import _ from 'lodash'
import './index.css';

// Third party library for loading games usage records on an interactive grid.
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// Column header configurations for data table.
const COLUMNS = [{
    Header: getHeaderFormatter('User Name'),
    accessor: 'username',
}, {
    Header: getHeaderFormatter('Game'),
    accessor: 'game',
}, {
    Header: getHeaderFormatter('Difficulty Level'),
    accessor: 'difficulty_level',
}, {
    Header: getHeaderFormatter('Start Time'),
    accessor: 'started',
}, {
    Header: getHeaderFormatter('End Time'),
    accessor: 'ended',
}, {
    Header: getHeaderFormatter('Score'),
    accessor: 'score',
    aggregate: vals => findAggregate(vals),
    Cell: props => <span className='number'>{props.value}</span>
}];

// Helper method to find the mean value for the aggregated values as part of grouping
function findAggregate(vals) {
    if (vals && vals.length) {
        let mean = _.mean(vals)
        if (!isNaN(mean)) {
            return `Mean:${mean} `
        }
    }

    return ""
}

// Format component for table header columns. 
function getHeaderFormatter(title) {
    return props => <span className="colHeader">{title}</span>
}

/* 
Loads the given search results into the table with the features like pagination, sorting, filtering and grouping.
*/
const DataTable = (props) => <ReactTable
    data={props.data}
    filterable={true}
    columns={COLUMNS}
    defaultPageSize={10}
    pageSizeOptions={[10, 30, 50, 100]}
    //pivotBy={["username", "game"]}
    className="-striped -highlight"
/>;

export default DataTable;