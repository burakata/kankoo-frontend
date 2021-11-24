import { ThunkDispatch } from "redux-thunk";

export interface TeamState {
  data: Team[];
  loading: boolean;
  error: string;
}

export interface Team {
  Id: number;
  Name: string;
}

export interface TeamForm {
  name: string;
}

interface GET_START {
  type: "GET_TEAMS_START";
}

interface GET_SUCCESS {
  type: "GET_TEAMS_SUCCESS";
  payload: Team[];
}

interface GET_ERROR {
  type: "GET_TEAMS_ERROR";
}

export type TeamAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR;
export type TeamDispatch = ThunkDispatch<
  TeamState,
  void,
  TeamAction
>;
