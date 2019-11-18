import React, { useEffect, useState } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from 'axios';

import { getFilms } from "../utils";
import Film from "./Film";
import Error from "../common/Error";

function Films(props) {
    const { filmsUrls } = props;

    const [films, setFilms] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const sources = filmsUrls.map(() => {
            const cancelToken = axios.CancelToken;
            return cancelToken.source();
        });

        const axiosCancelToken = axios.CancelToken.source();
        axios.defaults.cancelToken = axiosCancelToken.token;

        getFilms(filmsUrls, sources)
            .then((films) => {
                setFilms(films);
                setError(false);
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
                console.log(error);
            });

        return () => {
           axiosCancelToken.cancel();
        };

    }, [filmsUrls]);

    return (
        <div>
            <List dense>
                <Typography>Films:</Typography>

                {hasError && <Error />}
                {isLoading && <LinearProgress color="secondary" />}

                <ListItem>
                    <ListItemText>
                        {films.map((film, index) => {
                            return <Film film={film} key={index} />
                        })}
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}

Films.propTypes = {
    filmsUrls: PropTypes.arrayOf(PropTypes.string)
};

export default Films;