import React, {useEffect, useState} from "react";
import {getFilms} from "../utils";
import Film from "./Film";

function Films(props) {
    const {filmsUrls} = props;
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const filmTitles = getFilms(filmsUrls);
        setFilms(filmTitles);
    }, [filmsUrls]);

    return (
        <div>
            {films.map(film => {
              return  <Film film={film}/>
            })}
        </div>
    );
}

export default Films;