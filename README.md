Supported Features:
===================
1. UI displays records from backend with client side pagination support (page size can be selected at the page bottom).
2. Data grid has support to sort the records on clicking the columns (Ascending/Descending indicated by underline to the column header)
3. Has support to filter data from the columns.
4. Provides support to group data based on username and game.

Tech Stack:
===========
Backend: Elasticsearch6
Fronend: HTML5, CSS, ES6, react16, react-table6

Architecture:
=============
This project uses two-tier architecture [Client (browser) and Elasticsearch (backend)]. For the requirements specified/features required, 'Elasticsearch' has the support to log (persist), server side pagination, analyze and scale. Also for the visualization features, frontend stack has frameworks/libraries like Highcharts, D3.js help to build charting at the frontend.

Note: Kibana provides rich interface support for Elasticsearch for the features required. Also, Treegrid provides all the required frontend features.

Code Design:
===========
* Backend:  Since 'Elasticsearch' provides Javascript client API to access its data, server side implementation is not required for the current spec.
* Frontend: Has 2 layers - Data Handler and UI components. UI components are react components and they are available under 'components' directory. The components are 'App', 'SearchForm' and 'DataTable'. And the code related to data communication with backend server is available under 'data_handler' modules. 

How to run:
===========
1. Start Elastic search server
2. (optional) Use Kibana or python client end tool to dump sample data
3. Clone github repository
4. Run npm start 

Notes:
======
1. Currently UI is built with simple design. Needs to be improved for provision to add visualizations like charting and analytics. Also, UI look and feel need to be improved.
2. Text boxes input for date values need to be replaced with 'DateRangePicker' tool by Airbnb. Due to compatability issue, this was not added in the current version. Also, date values validation is not implemented
because 'DateRangePicker' will handle this.
3. Since the given input is given in Date values, it does not have 'timezone' concern. But it should be considered to use either 'user demanded' or browser end timezone or server end timezone.
4. This project uses third party tool 'React-Table' for data grid. This component has support for all the required
features like server side pagination, client side pagination, grouping, filtering and sorting support. But it
has missing column selectable feature to extract data for charting visualization. So, This table needs to be
extended to add the missing support.
5. Filters are working based on 'starts with' and 'case sensitive' search. It should be changed to reg-ex based.
6. Sorting and multi-sorting support is available. Icons to indicate that values are displayed in ascending or
descending order need be marked for better user experience.
7. Grouping support is available but its UI look and feel needed to be improved.
8. Currently grouping shows only mean values. Need to add max and min. 
9. Server side pagination should be used as the expected number of users grow on monthly basis as per given Spec.
10. Ideally grid data should be updated in real time based on user search interval (for example: current date). Now, the results are not refreshed or real time. This depends on user requirement.
11. Caching needs to be added to avoid backend communication if the query matches with earlier queries in the session.
12. Support for hiding columns will be helpful for readability on small screens
13. User customizations and preferences need to be persisted for future visits and history tracking
14. Summary section should include total number of users also for the given search window.
15. Authentication and authorization need to be added.
16. Automated test setup is created with create-react bootstrap. Unit test cases need to be added.
 