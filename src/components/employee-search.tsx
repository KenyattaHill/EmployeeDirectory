import React, { ChangeEvent } from 'react';
import { Input } from 'semantic-ui-react';
import { useEmployees } from '../use-employee';
import { Employee, Actions } from '../types';

export default function EmployeeSearch() {
  const { state, dispatch } = useEmployees();
  const { query, employees } = state;

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target?.value;
    dispatch({ type: Actions.START_SEARCH, query: searchText })
    const filter = (row: Employee) => {
      const value = Object.values(row).join('').toLowerCase();
      return value.includes(searchText.toLowerCase());
    }
    dispatch({type: Actions.FILTER_EMPLOYEES, employees: employees.filter(filter)})
  }
  return (
    <div>
      <Input icon='search' value={query} placeholder='Search...' onChange={handleSearch} />
    </div>
  );
}
