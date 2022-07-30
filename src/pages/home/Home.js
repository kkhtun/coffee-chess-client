import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import app from "../../firebase/firebase";
function Home() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = (e) => {
        // just a quick workaround for devflow, need to implement more elegant way
        getAuth(app).signOut();
    };

    const startGame = () => {
        navigate("/game");
    };

    return (
        <div>
            Welcome {auth.name}! this is home page
            <button onClick={handleLogout}>Sign Out</button>
            <button onClick={startGame}>Start Game</button>
        </div>
    );
}
export default Home;
