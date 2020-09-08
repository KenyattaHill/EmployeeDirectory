import React, { createContext, useContext, useEffect, useReducer } from 'react';
import sortBy from 'lodash.sortby';

const employeeContext = createContext();

export function ProvideEmployees({ children }) {
  const service = useProvideEmployees()
  return <employeeContext.Provider value={service}>{children}</employeeContext.Provider>
}

export const useEmployees = () => {
  return useContext(employeeContext);
}

const actions = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  LOAD_EMPLOYEES: 'LOAD_EMPLOYEES',
  CHANGE_SORT: 'CHANGE_SORT',
  START_SEARCH: 'START_SEARCH',
  FILTER_EMPLOYEES: 'FILTER_EMPLOYEES',
}

function employeeReducer(state, action) {
  switch (action.type) {
    case actions.START_SEARCH:
      return { ...state, query: action.query }
    case actions.FILTER_EMPLOYEES:
      return { ...state, filteredEmployees: action.employees }
    case actions.START_LOADING:
      return { ...state, loading: true }
    case actions.STOP_LOADING:
      return { ...state, loading: false }
    case actions.LOAD_EMPLOYEES:
      return { ...state, employees: action.employees, filteredEmployees: action.employees }
    case actions.CHANGE_SORT:
      if (state.column === action.column) {
        return {
          ...state,
          filteredEmployees: state.filteredEmployees.reverse(),
          direction: state.direction === 'ascending' ? 'descending' : 'ascending'
        }
      }
      return {
        ...state,
        column: action.column,
        filteredEmployees: sortBy(state.filteredEmployees, [action.column]),
        direction: 'ascending'
      }
    default:
      throw new Error('Action not implemented')
  }
}

function useProvideEmployees() {
  const [state, dispatch] = useReducer(employeeReducer, {
    filteredEmployees: [],
    employees: [],
    loading: false,
    column: null,
    direction: null,
    query: ''
  })

  useEffect(() => {
    dispatch({ type: actions.START_LOADING })
    fetch('https://randomuser.me/api/?results=200&nat=us')
      .then(response => response.json())
      .then(users => {
        dispatch({ type: actions.STOP_LOADING })
        const mappedUsers = users.results.map(employee => ({
          first: employee.name.first,
          last: employee.name.last,
          email: employee.email,
          phone: employee.phone,
          location: `${employee.location.city}, ${employee.location.state}`,
          picture: employee.picture.large
        }))
        dispatch({
          type: actions.LOAD_EMPLOYEES,
          employees: mappedUsers,
          filteredEmployees: mappedUsers
        })
      }).catch(error => {
        dispatch({ type: actions.STOP_LOADING })
        console.log(error)
      });
  }, [dispatch])

  return {
    state,
    dispatch,
    actions
  }
}