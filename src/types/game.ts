import { ThunkDispatch } from "redux-thunk";
import { Bet, BetClient } from "./bet";
import { Team } from "./team";

export interface GameState {
  data: Game[];
  loading: boolean;
  error: string;
}

export interface Game {
  GameId: number;
  weekId: number;
  homeTeamId: number;
  awayTeamId: number;
  Result: number;
  HomeTeam: Team;
  AwayTeam: Team;
  GameBets: BetClient[]; 
  HomeWinPoint: number; 
  DrawPoint: number; 
  AwayWinPoint: number; 
}

export interface GameForm {
  name: string;
  type: "income" | "expense";
  color?: string;
}

interface GET_START {
  type: "GET_GAMES_START";
}

interface GET_SUCCESS {
  type: "GET_GAMES_SUCCESS";
  payload: Game[];
}

interface GET_ERROR {
  type: "GET_GAMES_ERROR";
}

interface ADD_START {
  type: "ADD_GAME_START";
}

interface ADD_SUCCESS {
  type: "ADD_GAME_SUCCESS";
  payload: Game;
}

interface ADD_ERROR {
  type: "ADD_GAME_ERROR";
}

export type GameAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR;
export type GameDispatch = ThunkDispatch<
  GameState,
  void,
  GameAction
>;
