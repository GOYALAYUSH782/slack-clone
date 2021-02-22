import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {
  const chatRef = useRef(null);

  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
    db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
                <StarBorderOutlinedIcon />
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />Details
            </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map(doc => {
              const { message, user, timestamp, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  user={user}
                  userImage={userImage}
                  timestamp={timestamp}
                />
              )
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}
    </ChatContainer>
  )
}

export default Chat

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
padding-bottom: 176px;
`;


const Header = styled.div`
display: flex;
/* position: fixed;
width: 73%;
background-color: white; */
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
align-content: center;

>h4{
  display: flex;
  text-transform: lowercase;
}

>h4>.MuiSvgIcon-root{
  font-size: 20px;
  margin-left: 10px;
}
`;

const HeaderRight = styled.div`
> p{
  display: flex;
  font-size: 14px;
  align-items: center;
}
>p>.MuiSvgIcon-root{
  margin-right: 5px !important;
  font-size: 16px;
}
`;

const ChatContainer = styled.div`
flex: 0.7;
flex-grow: 1;
overflow-y: scroll;
margin-top: 60px;
`;