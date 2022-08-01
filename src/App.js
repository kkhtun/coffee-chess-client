import "./App.css";
import { AuthContextProvider } from "./contexts/auth.context";
import Pages from "./pages/Pages";
import { useInterceptor } from "./hooks/interceptor.hook";
import { SocketContextProvider } from "./contexts/socket.context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
function App() {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });
    useInterceptor();
    return (
        <AuthContextProvider>
            <SocketContextProvider>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Pages />
                </ThemeProvider>
            </SocketContextProvider>
        </AuthContextProvider>
    );
}

export default App;
