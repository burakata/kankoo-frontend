import { combineReducers } from "redux";
import { TeamState } from "../types/team";
import { GameState } from "../types/game";
import teamReducer from "./reducers/teamReducer";
import gameReducer from "./reducers/gameReducer";

export interface AppState {
  teams: TeamState;
  games: GameState;
}

const rootReducer = combineReducers<AppState>({
  teams: teamReducer,
  games: gameReducer,
});

export default rootReducer;
