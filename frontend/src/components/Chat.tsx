import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from "@minchat/react-chat-ui";
import useChat from "../hooks/useChat";
function ChatComponent() {
  const { messages, sendMessage } = useChat()
  return (
    <MinChatUiProvider theme="#6ea9d7">
      <MainContainer style={{ height: '100%' }}>
        <MessageContainer>
          <MessageHeader showBack={false} children={<div>Room Chat</div>} />
          <MessageList
            currentUserId='dan'
            messages={
              messages.messages.map((val) => {
                return {
                  text: val.message,
                  user: {
                    id: val.id,
                    name: val.nickname,
                  }
                }
              })
            }
          />
          <MessageInput onSendMessage={sendMessage} showAttachButton={false} showSendButton={true} placeholder="Type message here" />
        </MessageContainer>
      </MainContainer>
    </MinChatUiProvider>
  )
}

export default ChatComponent