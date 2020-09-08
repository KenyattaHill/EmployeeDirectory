import React from 'react';
import Header from './components/header';
import DataTable from './components/data-table';
import EmployeeSearch from './components/employee-search';
import { useEmployees } from './use-employee';
import { Loader } from 'semantic-ui-react';

function App() {
  const { state } = useEmployees();
  const { loading } = state;
  return (
    <>
      <Header />
      <div className='App'>
        <EmployeeSearch />
        {loading ? (
          <Loader active />
        ) : (
          <DataTable
            headers={[
              { display: '', name: 'picture' },
              { display: 'First Name', name: 'first' },
              { display: 'Last Name', name: 'last' },
              { display: 'Email', name: 'email' },
              { display: 'Phone', name: 'phone' },
              { display: 'Location', name: 'location' },
            ]}
          />
        )}
      </div>
    </>
  );
}

export default App;
