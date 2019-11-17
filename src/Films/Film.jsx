import React from "react";

function Film(props) {
    const {title, release_date} = props;

    return (
      <div>{title} - {release_date}</div>
    );
}

export default Film;