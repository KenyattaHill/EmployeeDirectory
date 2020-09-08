import React from 'react';
import AppHeader from './components/header';
import DataTable from './components/data-table';
import EmployeeSearch from './components/employee-search';
import { useEmployees } from './hooks/use-employee';
import { Loader } from 'semantic-ui-react';

function App() {
  const { state } = useEmployees();
  const { loading } = state;
  return (
    <>
      <AppHeader />
      <div className='App'>
        <EmployeeSearch />
        {loading ? <Loader active /> : <DataTable />}
      </div>
    </>
  );
}

export default App;
