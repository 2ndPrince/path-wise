// src/components/Navbar.tsx
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from "@mui/material";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, User } from "firebase/auth";

interface NavbarProps {
    user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
    const handleLogin = () => {
        signInWithPopup(auth, provider);
    };

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#89B3C7" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontFamily: "Inter, sans-serif" }}>
                    Path Wise
                </Typography>

                {user ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography variant="body1">{user.displayName}</Typography>
                        <Avatar alt={user.displayName || "User"} src={user.photoURL || ""} />
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                ) : (
                    <Button color="inherit" onClick={handleLogin}>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
