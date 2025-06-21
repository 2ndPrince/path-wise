import { useEffect, useState } from "react";
import { auth } from "./firebase";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import { onAuthStateChanged, User } from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return (
      <>
        <Navbar user={user} />
        {user ? <ChatPage user={user} /> : <LoginPage />}
      </>
  );
}

export default App;
