import React from 'react';

/*
Summary loads description message showing the results and search hit time.
*/
const Summary = ({ last_hit_time, total }) => <div>
    Showing {total} records for the last search hit @ {last_hit_time}</div>;

export default Summary;