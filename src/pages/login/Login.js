import { Button, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import app from "../../firebase/firebase";
import GoogleIcon from "@mui/icons-material/Google";

function Login() {
    const [loading, setLoading] = useState(false);
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => signInWithPopup(getAuth(app), provider);
    const triggerGoogleSignIn = async () => {
        try {
            setLoading(true);
            const result = await signInWithGoogle();
            if (result) {
                console.log("You are successfully logged in!");
            } else {
                throw new Error("Something went wrong during login");
            }
            setLoading(false);
        } catch (e) {
            // trigger if user close the popup
            // toast("Something went wrong during login");
            setLoading(false);
            console.log(e);
        }
    };

    return (
        <>
            <div
                style={{
                    height: `${window.innerHeight / 2}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    onClick={triggerGoogleSignIn}
                    variant="outlined"
                    size="large"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <GoogleIcon />
                    <Typography ml={1}>Sign In With Google</Typography>
                </Button>

                <Loader loading={loading} />
            </div>
        </>
    );
}

export default Login;
