import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    Timestamp,
} from "firebase/firestore";
import { TextField, Button, Box, Typography } from "@mui/material";

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

        // TODO: Vertex AI 호출 후 답변 저장
        setInput("");
    };

    return (
        <Box
            sx={{
                backgroundColor: "#F0F4F5",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                padding: 2,
                fontFamily: "Inter, sans-serif",
            }}
        >
            <Typography variant="h5" mb={2} color="#89B3C7">
                Path Wise
            </Typography>

            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                {messages.map((msg) => (
                    <Box key={msg.id} sx={{ mb: 1 }}>
                        <strong>{msg.user}</strong>: {msg.text}
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ display: "flex", mt: 2 }}>
                <TextField
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your question about life..."
                />
                <Button onClick={sendMessage} sx={{ ml: 1, backgroundColor: "#958DAD", color: "white" }}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatPage;
