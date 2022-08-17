import { FC } from "react";
import { Imessage } from "./Chat";
import styles from "./Chat.module.css";

interface IProps {
  message: Imessage;
  isRight: boolean;
}

const ChatMessage: FC<IProps> = ({ message, isRight }) => {
  const classesMessage = isRight
    ? [styles.message, styles.otherMessage, styles.floatRight]
    : [styles.message, styles.anotherMessage];

  const classesName = isRight
    ? [styles.messageData, styles.alignRight]
    : [styles.messageData];

  return (
    <li>
      <div className={classesName.join(" ")}>
        <span>{message.name}</span>
      </div>
      <div className={classesMessage.join(" ")}>{message.message}</div>
    </li>
  );
};

export default ChatMessage;
