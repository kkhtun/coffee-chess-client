import "./App.css";
import { AuthContextProvider } from "./contexts/auth.context";
import Pages from "./pages/Pages";
import { useInterceptor } from "./hooks/token-interceptor.hook";

function App() {
    return (
        <AuthContextProvider>
            <Pages />
        </AuthContextProvider>
    );
}

export default App;
