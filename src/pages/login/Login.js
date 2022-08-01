import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../firebase/firebase";

function Login() {
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => signInWithPopup(getAuth(app), provider);
    const triggerGoogleSignIn = async () => {
        try {
            // setLoading(true);
            const result = await signInWithGoogle();
            if (result) {
                console.log("You are successfully logged in!");
            } else {
                throw new Error("Something went wrong during login");
            }
            // setLoading(false);
        } catch (e) {
            // trigger if user close the popup
            // toast("Something went wrong during login");
            // setLoading(false);
            console.log(e);
        }
    };

    return (
        <div
            style={{
                height: `${window.innerHeight / 2}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Button
                onClick={triggerGoogleSignIn}
                variant="outlined"
                size="large"
            >
                Sign In With Google
            </Button>
        </div>
    );
}

export default Login;
