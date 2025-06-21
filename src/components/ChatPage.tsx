import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    Timestamp,
} from "firebase/firestore";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from "@mui/material";

const ChatPage = ({ user }: { user: any }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        await addDoc(collection(db, "messages"), {
            user: user.displayName,
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
                            <strong>{msg.user}</strong>: {msg.text}
                        </Typography>
                    </Paper>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input */}
            <Box
                sx={{
                    display: "flex",
                    p: 2,
                    borderTop: "1px solid #ccc",
                    backgroundColor: "#F0F4F5",
                }}
            >
                <TextField
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your question about life..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                    onClick={sendMessage}
                    sx={{ ml: 1, backgroundColor: "#958DAD", color: "white" }}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatPage;
