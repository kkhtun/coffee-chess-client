export const HOST =
    process.env.NODE_ENV === "production"
        ? "https://coffee-chess-server.onrender.com"
        : "http://localhost:8080";
