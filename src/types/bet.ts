


export interface Bet {
  UserId: number;
  GameId: number;
  Bet: number;
}

export interface BetClient {
  UserId: number;
  GameId: number;
  Bet: number;
}



export interface BetServer {
  userId: number;
  gameId: number;
  bet: number;
}