import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  FunctionComponent,
  Dispatch,
} from 'react';
import sortBy from 'lodash.sortby';
import { Employee, State, Actions, Action } from './types';

const initialState: State = {
  filteredEmployees: [],
  employees: [],
  loading: false,
  column: undefined,
  direction: undefined,
  query: '',
};

type Store = {
  state: State;
  dispatch: Dispatch<Action>;
};

const store = createContext<Store>({
  state: initialState,
  dispatch: (() => {}) as Dispatch<Action>,
});

export const ProvideEmployees: FunctionComponent = ({ children }) => {
  const service = useProvideEmployees();
  return <store.Provider value={service}>{children}</store.Provider>;
};

export const useEmployees = () => useContext(store);

function employeeReducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.START_SEARCH:
      return { ...state, query: action.query };
    case Actions.FILTER_EMPLOYEES:
      return { ...state, filteredEmployees: action.employees };
    case Actions.START_LOADING:
      return { ...state, loading: true };
    case Actions.STOP_LOADING:
      return { ...state, loading: false };
    case Actions.LOAD_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
        filteredEmployees: action.employees,
      };
    case Actions.CHANGE_SORT:
      if (state.column === action.column) {
        return {
          ...state,
          filteredEmployees: state.filteredEmployees.reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return {
        ...state,
        column: action.column,
        filteredEmployees: sortBy(state.filteredEmployees, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error('Action not implemented');
  }
}

function useProvideEmployees() {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  useEffect(() => {
    dispatch({ type: Actions.START_LOADING });
    fetch('https://randomuser.me/api/?results=200&nat=us')
      .then(response => response.json())
      .then(users => {
        dispatch({ type: Actions.STOP_LOADING });
        const employees: Employee[] = users.results.map((user: any) => ({
          first: user.name.first,
          last: user.name.last,
          email: user.email,
          phone: user.phone,
          location: `${user.location.city}, ${user.location.state}`,
          picture: user.picture.large,
        }));
        dispatch({
          type: Actions.LOAD_EMPLOYEES,
          employees,
        });
      })
      .catch(error => {
        dispatch({ type: Actions.STOP_LOADING });
        console.log(error);
      });
  }, [dispatch]);

  return {
    state,
    dispatch,
  };
}
