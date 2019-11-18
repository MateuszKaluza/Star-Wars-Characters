import React, {useEffect, useState} from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

import {getFilms} from "../utils";
import Film from "./Film";
import Error from "../common/Error";


function Films(props) {
    const {filmsUrls} = props;

    const [films, setFilms] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = false;
        const fetchData = async () => {
            try {
                const filmsPromises = filmsUrls.map(filmUrl => {
                    return axios.get(filmUrl);
                });

                const result = await axios.all(filmsPromises);
                const filmsData = result.map(el => el.data);
                if (!mounted) {
                    setFilms(filmsData);
                    setLoading(false);
                }

            } catch (e) {
                if (!mounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            mounted = true;
        };

        // getFilms(filmsUrls)
        //     .then((films) => {
        //         setFilms(films);
        //         setError(false);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         setError(true);
        //         setLoading(false);
        //         console.log(error);
        //     });

        // setFilms([{title: 'dupa', release_date: '324'},])
        // setLoading(false);
    }, [filmsUrls]);

    return (
        <div>
            <List dense>
                <Typography>Films:</Typography>

                {hasError && <Error/>}
                {isLoading && <LinearProgress color="secondary"/>}

                <ListItem>
                    <ListItemText>
                        {films.map((film, index) => {
                            return <Film film={film} key={index}/>
                        })}
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}

// Films.propTypes = {
//     filmsUrls: PropTypes.arrayOf(PropTypes.string)
// };

export default Films;