import { useEffect, useState } from "react";
import { Button, Container, Input } from "reactstrap";
import { useTypedSelector } from "../../app/store";
import styles from "./Chat.module.css";
import ChatMessage from "./ChatMessage";

export interface Imessage {
  method: "connection" | "send";
  message: string;
  name?: string;
  id?: number;
}

let socket: WebSocket;
const Chat = () => {
  const [messages, setMessages] = useState<Imessage[]>([]);
  const [sendingMessage, setSendingMessage] = useState("");
  const user = useTypedSelector((state) => state.user.user);
  const userName = user.email.split("@")[0];

  const onSendingMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSendingMessage(e.target.value);
 
  const onSendMessageHandler = () => {
    socket.send(JSON.stringify({ method: "send", message: sendingMessage, name: userName }))
    setSendingMessage("");
  }

  useEffect(() => {
    socket = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}/chat`);
    socket.onopen = (event) => {
      socket.send(JSON.stringify({ method: "connection", name: userName, id: 2 }));
    };
    socket.onmessage = (message) => {
      console.log(message);
      const parsedMessage = JSON.parse(message.data);
      setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Container>
      <div className={styles.chat}>
        <div className={styles.history}>
          <ul>
            {messages.map((message, index) => {
              return (
                <ChatMessage
                  key={`${message.id}-${(Math.random() + 1)
                    .toString(36)
                    .substring(7)}`}
                  message={message}
                  isRight={index % 2 == 0}
                />
              );
            })}
            {/* <li>
                   <div className={[styles.messageData, styles.alignRight].join(" ")}><span>Yan</span></div> 
                   <div className={[styles.message, styles.otherMessage, styles.floatRight].join(" ")}>Hi Ivan, how are you? How is the project coming along?</div>
                </li>
                <li>
                   <div className={[styles.messageData].join(" ")}><span>Ivan</span></div> 
                   <div className={[styles.message, styles.anotherMessage].join(" ")}>Hi Yan, how are you? How is the project coming along?</div>
                </li> */}
          </ul>
        </div>
        <div className={styles.chatMessage}>
          <Input
            type="textarea"
            placeholder="Message"
            value={sendingMessage}
            onChange={onSendingMessageHandler}
          />
          <Button onClick={onSendMessageHandler} color="primary">SEND</Button>
        </div>
      </div>
    </Container>
  );
};

export default Chat;
