import {useEffect, useRef, useState} from "react";
import {db} from "../firebase";
import {addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, Timestamp} from "firebase/firestore";
import {Box, Button, Paper, TextField, Typography, CircularProgress} from "@mui/material";

const ChatPage = ({user}: { user: any }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [userInfo, setUserInfo] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

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
    }, [messages, isLoading]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();

        await addDoc(collection(db, "messages", user.uid, "chats"), {
            text: userMessage,
            user: user.displayName,
            createdAt: Timestamp.now(),
        });

        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("https://askvertexai-xijzpv4ydq-uc.a.run.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            const answer = data.response || data.message || "응답이 없습니다.";

            // 3️⃣ 응답 메시지를 Firestore에 저장
            await addDoc(collection(db, "messages", user.uid, "chats"), {
                text: answer,
                user: "agent", // 시스템/AI 응답자
                createdAt: Timestamp.now(),
            });
        } catch (error) {
            console.error("에이전트 호출 실패:", error);
            await addDoc(collection(db, "messages", user.uid, "chats"), {
                text: "⚠️ 응답을 불러오는 데 실패했어요.",
                user: "agent",
                createdAt: Timestamp.now(),
            });
        } finally {
            setIsLoading(false);
        }
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
                            <strong>{msg.user === user.displayName ? userInfo?.displayName : "Agent"}</strong>: {msg.text}
                        </Typography>
                    </Paper>
                ))}

                {/* ✅ 로딩 스피너 표시 */}
                {isLoading && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            py: 2,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            Agent is typing...
                        </Typography>
                        <CircularProgress size={20} thickness={4} />
                    </Box>
                )}

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
