import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getGames } from '../store/actions/gameActions';
import { getTeams } from "../store/actions/teamActions";
import Button from '@mui/material/Button';
import './Bet.css'
import { display } from '@mui/system';
import { User } from '../types/user';
import api from '../utils/api';
import { Bet, BetClient, BetServer } from '../types/bet';
import { Week } from '../types/week';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface ChildProps {
    user: User;
}


function addOrReplace(arr: BetClient[], newObj: BetClient) {
    //const newArray = arr.filter(obj => obj.GameId !== newObj.GameId).concat(newObj)
    var returnArray = [...arr.filter((obj) => obj.GameId !== newObj.GameId), { ...newObj }];
    return returnArray;
}


export default function BasicGrid({ user }: ChildProps) {

    const [age, setAge] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);

    const [weeks, setWeeks] = React.useState<Week[]>([]);

    const [currentWeek, setCurrentWeek] = React.useState<Week>({
        Id: 1,
        IsBetActive: false
    });

    const [userBets, setUserBets] = useState<BetClient[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const dispatch = useDispatch();

    const { data: teams } = useSelector(
        (state: AppState) => state.teams
    );

    const { data: games } = useSelector(
        (state: AppState) => state.games
    );


    // TEAMS
    useEffect(() => {
        !teams.length && dispatch(getTeams());
    }, []);

    // GAMES
    useEffect(() => {
        if (currentWeek) {
            dispatch(getGames(currentWeek.Id));
        }
    }, [currentWeek.Id]);

    // WEEKS
    useEffect(() => {
        api().get<Week[]>("/weeks").then((response) => {
            setWeeks(response.data);
            //setCurrentWeek(weeks[0])
        });
    }, []);

    // FILL USER BETS
    useEffect(() => {

        setIsLoading(true);
        const userBets1: BetClient[] = ([]);

        games.map(game => game.GameBets.filter(x => x.UserId === user.Id)?.map(bett => {
            userBets1.push({
                Bet: bett.Bet,
                GameId: bett.GameId,
                UserId: bett.UserId
            })
        }
        ))
        setUserBets(userBets1);
        setIsLoading(false);
    }, [games]);


    const options = [
        { label: 'Roketle', value: -1 },
        { label: '1', value: 1 },
        { label: '0', value: 0 },
        { label: '2', value: 2 },
    ];

    //const [value, setValue] = React.useState('fruit');

    /* const handleComboChange = (event: any) => {
         setValue(event.target.value);
     };
 */

    const [value, setSelectedOption] = React.useState(-1);

    // This function is triggered when the select changes
    const selectWeek = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value;
        var selectedWeek = weeks.find(x => x.Id === parseInt(value));
        if (selectedWeek) {
            setCurrentWeek(selectedWeek);
        }
    };

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>, gameId: number) => {
        //console.log(event.target.value);
        //console.log(gameId);
        //console.log(user.Id);
        //console.log(user.Name);

        /*setIsLoading(true);

        const betData: BetServer = {
            bet: parseInt(event.target.value),
            gameId: gameId,
            userId: user.Id
        };
        api().post<Bet>("/add-bet", betData).then(() => {
            dispatch(getGames(1));
            setIsLoading(false);
        });*/

        const betData: BetClient = {
            Bet: parseInt(event.target.value),
            GameId: gameId,
            UserId: user.Id
        };
        setUserBets(addOrReplace(userBets, betData));
    };

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (userBets && userBets.length > 0) {
            setIsLoading(true);

            console.log('games1');
            console.log(games);

            api().post<Bet[]>("/add-bulk-bets", userBets).then(() => {
                dispatch(getGames(currentWeek.Id));
                setIsLoading(false);
                setIsSaved(true);
                console.log('games2');
                console.log(games);
                //setUserBets(userBets);
            });
        }
    };

    return (
        <>

            <div className="container-1">
                <div className="two alt-two">
                    <h1>KANKOO LEAGUE
                        <span>Merhaba {user.Name}</span>
                    </h1>
                </div>
            </div>

            <div className="container-1">
                <select className='selectbox' 
                    onChange={(selectedOption) => selectWeek(selectedOption)}>
                    {weeks.map((week) => (
                        <option value={week.Id}>{week.Id}. Hafta</option>
                    ))}
                </select>
            </div>

            {games.map((game) => {
                //console.log(game)

                //console.log('bet gameIds')
                //console.log(userBets);
                //userBets.map(x => console.log('gameId' + x.GameId))
                return (
                    <div className="container-1" key={game.GameId + 'key'}>
                        <div className="grid_div">
                            <p className='teamName'>{game.HomeTeam.Name}</p>
                        </div>
                        <div className="grid_div">
                            <p className='teamName'>{game.AwayTeam.Name}</p>
                        </div>
                        {/* <div className="grid_div" style={{ display: 'none' }}>
                            <select className='selectbox'
                                value={value}
                                onChange={(selectedOption) => selectChange(selectedOption, game.GameId)}>
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div> */}
                        <div className="grid_div_betselect">
                            <div className="radiogroup">
                                <input type="radio" value="1" name={game.GameId.toString() + 'bet'}
                                    checked={userBets.find(x => x.GameId == game.GameId)?.Bet === 1}
                                    disabled={isLoading || !currentWeek.IsBetActive}
                                    className={((!currentWeek.IsBetActive && game.Result === 1 && game.Result === userBets.find(x => x.GameId == game.GameId)?.Bet) ? 'winner' : userBets.find(x => x.GameId == game.GameId)?.Bet === 1 ? 'looser' : '')}
                                    onChange={(selectedOption) => radioHandler(selectedOption, game.GameId)} /> 1 {game.HomeWinPoint > 0 ? '(' + game.HomeWinPoint / 100 + ')' : ''}

                                <input type="radio" value="0" name={game.GameId.toString() + 'bet'}
                                    checked={userBets.find(x => x.GameId == game.GameId)?.Bet === 0}
                                    disabled={isLoading || !currentWeek.IsBetActive}
                                    className={((!currentWeek.IsBetActive && game.Result === 0 && game.Result === userBets.find(x => x.GameId == game.GameId)?.Bet) ? 'winner' : userBets.find(x => x.GameId == game.GameId)?.Bet === 0 ? 'looser' : '')}
                                    onChange={(selectedOption) => radioHandler(selectedOption, game.GameId)} /> 0 {game.DrawPoint > 0 ? '(' + game.DrawPoint / 100 + ')' : ''}

                                <input type="radio" value="2" name={game.GameId.toString() + 'bet'}
                                    checked={userBets.find(x => x.GameId == game.GameId)?.Bet === 2}
                                    disabled={isLoading || !currentWeek.IsBetActive}
                                    className={((!currentWeek.IsBetActive && game.Result === 2 && game.Result === userBets.find(x => x.GameId == game.GameId)?.Bet) ? 'winner' : userBets.find(x => x.GameId == game.GameId)?.Bet === 2 ? 'looser' : '')}
                                     onChange={(selectedOption) => radioHandler(selectedOption, game.GameId)} /> 2 {game.AwayWinPoint > 0 ? '(' + game.AwayWinPoint / 100 + ')' : ''}
                            </div>
                        </div>

                    </div>
                );
            })}

            {isSaved &&
                <div className="container-1">
                    Kaydedildi.
                </div>
            }

            {!currentWeek.IsBetActive &&
                <div className="container-1">
                    Bahisler kapalidir.
                </div>
            }

            {currentWeek.IsBetActive &&
                <div className="container-1">
                    <button onClick={buttonHandler} disabled={isLoading || !currentWeek.IsBetActive}>{userBets.length > 0 ? 'GUNCELLE' : 'OYNA'}</button>.
                </div>
            }

        </>

    );
}
