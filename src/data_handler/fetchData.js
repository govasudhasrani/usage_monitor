// Client API to request data from backend datastore 'elasticsearch'

import elasticsearch from "elasticsearch";

// Construct default URL path and params for the REST services
// used for accessing games usage records from
// backend datastore (elastic search).
const DATASTORE_URL = "localhost:9200";
const LOG_LEVEL = "trace";
const INDEX_NAME = "miniclick";
const DOC_TYPE = "usage";

let client = new elasticsearch.Client({
    host: DATASTORE_URL,
    log: LOG_LEVEL
});

// Client API to interact with Elasticsearch server for fetching the
// data matching the given filters.
function fetchData(from_date, to_date, callback) {
    client.search({
        index: INDEX_NAME,
        type: DOC_TYPE,
        size: 40,
        body: {
            query: {
                "bool": {
                    "filter": {
                        "bool": {
                            "must":
                                [{
                                    "range": {
                                        "started": { "gte": from_date }
                                    }
                                },
                                {
                                    "range": {
                                        "ended": { "lte": to_date }
                                    }
                                }
                                ]
                        }
                    }
                }
            }
        }
    }).then(response => callback(response.hits.hits.map(item => item._source)),
        error => console.trace(error.message))
}

export default fetchData;