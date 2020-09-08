export type Header = { display: string; name: string };

export type Employee = {
  first: string;
  last: string;
  email: string;
  phone: string;
  location: string;
  picture: string;
};


export type State = {
  filteredEmployees: Employee[];
  employees: Employee[];
  loading: boolean;
  column: string | undefined;
  direction: 'ascending' | 'descending' | undefined;
  query: string;
};

export enum Actions {
  START_LOADING = 'START_LOADING',
  STOP_LOADING = 'STOP_LOADING',
  LOAD_EMPLOYEES = 'LOAD_EMPLOYEES',
  CHANGE_SORT = 'CHANGE_SORT',
  START_SEARCH = 'START_SEARCH',
  FILTER_EMPLOYEES = 'FILTER_EMPLOYEES',
}

export type Action =
  | { type: Actions.CHANGE_SORT; column: string | undefined }
  | { type: Actions.STOP_LOADING }
  | { type: Actions.START_LOADING }
  | { type: Actions.LOAD_EMPLOYEES; employees: Employee[] }
  | { type: Actions.START_SEARCH; query: string }
  | { type: Actions.FILTER_EMPLOYEES; employees: Employee[] };
