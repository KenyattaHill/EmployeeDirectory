import React from 'react';
import AppHeader from './components/header';
import DataTable from './components/data-table';
import EmployeeSearch from './components/employee-search';
import { useEmployees } from './use-employee';
import { Loader } from 'semantic-ui-react';
import { Header } from './types';

function App() {
  const { state } = useEmployees();
  const { loading } = state;
  const headers: Header[] = [
    { display: '', name: 'picture' },
    { display: 'First Name', name: 'first' },
    { display: 'Last Name', name: 'last' },
    { display: 'Email', name: 'email' },
    { display: 'Phone', name: 'phone' },
    { display: 'Location', name: 'location' },
  ]
  return (
    <>
      <AppHeader />
      <div className='App'>
        <EmployeeSearch />
        {loading ? (
          <Loader active />
        ) : (
          <DataTable
            headers={headers}
          />
        )}
      </div>
    </>
  );
}

export default App;
