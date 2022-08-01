export const HOST =
    process.env.REACT_APP_ENV === "development"
        ? "https://chess-dev.herokuapp.com"
        : "http://localhost:8080";
