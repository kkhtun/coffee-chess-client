export const HOST =
    process.env.NODE_ENV === "production"
        ? "https://chess-dev.herokuapp.com"
        : "http://localhost:8080";
