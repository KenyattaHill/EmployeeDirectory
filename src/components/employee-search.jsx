import React from 'react';
import { Input } from 'semantic-ui-react';
import { useEmployees } from '../use-employee';

export default function EmployeeSearch() {
  const { state, dispatch, actions } = useEmployees();
  const { query, employees } = state;

  const handleSearch = event => {
    const searchText = event.target.value.toLowerCase();
    dispatch({ type: actions.START_SEARCH, query: searchText })
    const filter = row => {
      const value = Object.values(row).join('').toLowerCase();
      return value.includes(searchText);
    }
    dispatch({type: actions.FILTER_EMPLOYEES, employees: employees.filter(filter)})
  }
  return (
    <div>
      <Input icon='search' value={query} placeholder='Search...' onChange={handleSearch} />
    </div>
  );
}
