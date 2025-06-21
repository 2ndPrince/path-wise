import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Button } from "@mui/material";

const LoginPage = () => {
    const handleLogin = () => signInWithPopup(auth, provider);

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Welcome to Path Wise</h1>
            <Button variant="contained" onClick={handleLogin}>
                Sign in with Google
            </Button>
        </div>
    );
};

export default LoginPage;
