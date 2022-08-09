import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getGames } from '../store/actions/gameActions';
import { getTeams } from "../store/actions/teamActions";
import Button from '@mui/material/Button';
import './Bet.css'
import { display } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid1() {

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };


    const { data: teams } = useSelector(
        (state: AppState) => state.teams
    );

    const { data: games } = useSelector(
        (state: AppState) => state.games
    );


    const dispatch = useDispatch();

    useEffect(() => {
        !teams.length && dispatch(getTeams());
    }, []);

    useEffect(() => {
        !games.length && dispatch(getGames(1));
    }, []);

    console.log(teams);
    console.log(games);

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
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>, gameId:number) => {
        const value = event.target.value;
        setSelectedOption(parseInt(value));
    };

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>, gameId:number) => {
        console.log(event.target.value);
        console.log(gameId);
      };

    return (
        <>

            {games.map((game) => {
                console.log(game)
                console.log(game.HomeTeam)
                return (

                    <Box sx={{ flexGrow: 1 }} key={game.GameId}>
                        <Grid container spacing={2} justifyContent="center" columns={{ xs: 4, sm: 8, md: 12 }}>


                            <Grid item xs={3} justifyContent="center">
                                <Item sx={{ height: 72, width: 260 }}>{game.HomeTeam.Name}</Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item sx={{ height: 72, width: 260 }}>{game.AwayTeam.Name}</Item>
                            </Grid>

                            <Grid item xs={2}>
                                <Item sx={{ height: 72, width: 260 }}>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small">Tahmin</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={age}
                                            label="Tahmin"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Item>
                            </Grid>



                        </Grid>



                    </Box>
                );
            })}
            <Box
                m={1}
                //margin
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
                <Button variant="contained" color="primary" sx={{ height: 40 }}>
                    BAHIS BAS
                </Button>
            </Box>


            {games.map((game) => {
                console.log(game)
                return (
                    <div className="container-1">
                        <div className="grid_div">
                            <p>{game.HomeTeam.Name}</p>
                        </div>
                            <p> - </p>
                        <div className="grid_div">
                            <p>{game.AwayTeam.Name}</p>
                        </div>
                        <div className="grid_div" style={{display:'none'}}>
                                <select className='selectbox'
                                    value={value}
                                    onChange={(selectedOption) => selectChange(selectedOption, game.GameId)}>
                                    {options.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                </div>

                        <div className="grid_div">
                        <div  className="radiogroup">
                            <input type="radio" value="1" name={game.GameId.toString() + 'bet'} onChange={(selectedOption) => radioHandler(selectedOption, game.GameId)}/> 1
                            <input type="radio" value="0" name={game.GameId.toString() + 'bet'} onChange={(selectedOption) => radioHandler(selectedOption, game.GameId)}/> 0
                            <input type="radio" value="2" name={game.GameId.toString() + 'bet'} onChange={(selectedOption) => radioHandler(selectedOption, game.GameId)}/> 2
                        </div>
                        </div>
                    </div>
                );
            })}  


        </>

    );
}