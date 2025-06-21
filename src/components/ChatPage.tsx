import {useEffect, useRef, useState} from "react";
import {db} from "../firebase";
import {addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, Timestamp} from "firebase/firestore";
import {Box, Button, Paper, TextField, Typography,} from "@mui/material";

const ChatPage = ({user}: { user: any }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [userInfo, setUserInfo] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // ✅ 추가: 사용자 정보 doc 존재하지 않으면 생성
    const ensureUserDoc = async () => {
        const userRef = doc(db, "messages", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            await setDoc(userRef, {
                displayName: user.displayName,
                email: user.email,
                createdAt: Timestamp.now(),
            });
        }

        setUserInfo(docSnap.exists() ? docSnap.data() : {
            displayName: user.displayName,
        });
    };

    useEffect(() => {
        if (!user?.uid) return;

        ensureUserDoc();

        const q = query(collection(db, "messages", user.uid, "chats"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
        });

        return unsubscribe;
    }, [user?.uid]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        await addDoc(collection(db, "messages", user.uid, "chats"), {
            text: input,
            createdAt: Timestamp.now(),
        });

        setInput("");
    };

    return (
        <Box
            sx={{
                height: "calc(100vh - 64px)", // subtract Navbar height (default AppBar height is 64px)
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F0F4F5",
                fontFamily: "Inter, sans-serif",
            }}
        >
            {/* Chat Messages */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 2,
                }}
            >
                {messages.map((msg) => (
                    <Paper
                        key={msg.id}
                        sx={{
                            p: 1,
                            mb: 1,
                            maxWidth: "80%",
                            backgroundColor: msg.user === user.displayName ? "#e0f7fa" : "#fff",
                            alignSelf: msg.user === user.displayName ? "flex-end" : "flex-start",
                        }}
                    >
                        <Typography variant="body2">
                            <strong>{userInfo?.displayName || user.displayName}</strong>: {msg.text}
                        </Typography>
                    </Paper>
                ))}
                <div ref={messagesEndRef}/>
            </Box>

            {/* Input */}
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // ✅ 중복 방지
                    sendMessage();
                }}
                style={{
                    display: "flex",
                    padding: "16px",
                    borderTop: "1px solid #ccc",
                    backgroundColor: "#F0F4F5",
                }}
            >
                <TextField
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your question about life..."
                />
                <Button
                    type="submit" // ✅ 변경: 버튼을 submit으로
                    sx={{ml: 1, backgroundColor: "#958DAD", color: "white"}}
                >
                    Send
                </Button>
            </form>
        </Box>
    );
};

export default ChatPage;
