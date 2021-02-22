import React from 'react'
import styled from 'styled-components'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PeopleIcon from '@material-ui/icons/People';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection('rooms'));
  const [user] = useAuthState(auth);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>AYUSH's FAM HQ</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentIcon} title='Threads' />
      <SidebarOption Icon={InboxIcon} title='Mentions & Reactions' />
      <SidebarOption Icon={DraftsIcon} title='Saved Items' />
      <SidebarOption Icon={BookmarkIcon} title='Channel Browser' />
      <SidebarOption Icon={PeopleIcon} title='People & User Groups' />
      <SidebarOption Icon={AppsIcon} title='Apps' />
      <SidebarOption Icon={FileCopyIcon} title='File Browser' />
      <SidebarOption Icon={ExpandLessIcon} title='Show Less' />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title='Channels' />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title='Add Channels' />
      <ChatContainer>
        {
          channels?.docs.map(doc => (
            <SidebarOption
              key={doc.id}
              id={doc.id}
              title={doc.data().name}
            />
          ))
        }
      </ChatContainer>
    </SidebarContainer>
  )
}

export default Sidebar

const ChatContainer = styled.div`
overflow: scroll;
max-height: 300px;
`;

const SidebarContainer = styled.div`
color: white;
flex: 0.3;
background-color: var(--slack-color);
border-top: 1px solid #49274b;
max-width: 260px;
margin-top: 60px;

>hr{
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #49274b;
}

`;

const SidebarHeader = styled.div`
display: flex;
flex: 1;
border-bottom: 1px solid #49274b;
padding: 13px;

>.MuiSvgIcon-root{
  padding: 8px;
  color: #49274b;
  font-size: 18px;
  background-color: white;
  border-radius: 999px;
}
`;

const SidebarInfo = styled.div`
flex: 1;

>h2{
  font-size: 15px;
  font-weight: 900;
  margin-bottom: 5px;
}

>h3{
  display: flex;
  font-size: 13px;
  font-weight: 400;
  align-items: center;
}

>h3 > .MuiSvgIcon-root{
  font-size: 14px;
  color: green;
  margin-top: 1px;
  margin-right: 2px;
}
`;
