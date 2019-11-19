import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';

import useFetchFilms from "../hooks/useFetchFilms";
import Film from "./Film";
import Error from "../common/Error";


function Films(props) {
    const {filmsUrls} = props;
    const {films, hasError, isLoading} = useFetchFilms(filmsUrls);

    return (
        <div>
            <List dense>
                <Typography>Films:</Typography>

                {hasError && <Error/>}
                {isLoading && <LinearProgress color="secondary"/>}

                <ListItem>
                    <ListItemText>
                        {films && films.map((film, index) => {
                            return <Film film={film} key={index}/>
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