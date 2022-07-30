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
        <div>
            <button
                onClick={triggerGoogleSignIn}
                className="login-with-google-btn"
            >
                Sign In With Google
            </button>
        </div>
    );
}

export default Login;
