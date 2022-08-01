import "./App.css";
import { AuthContextProvider } from "./contexts/auth.context";
import Pages from "./pages/Pages";
import { useInterceptor } from "./hooks/interceptor.hook";
import { SocketContextProvider } from "./contexts/socket.context";

function App() {
    useInterceptor();
    return (
        <AuthContextProvider>
            <SocketContextProvider>
                <Pages />
            </SocketContextProvider>
        </AuthContextProvider>
    );
}

export default App;
