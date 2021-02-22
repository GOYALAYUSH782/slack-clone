import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .catch(err => alert(err.message));
  }
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg' alt='' />
        <h2>Sign in to the Ayush's FAM</h2>
        <p>ayush.slack.com</p>
        <Button onClick={signIn}>
          Sign In with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
display: grid;
height: 100vh;
background-color: #f8f8f8;
place-items: center;
`;

const LoginInnerContainer = styled.div`
padding: 100px;
text-align: center;
background-color: white;
border-radius: 10px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

>img{
  object-fit: contain;
  height: 100px;
  margin-bottom: 40px;
}

>button{
  text-transform: inherit !important;
  background-color: green !important;
  margin-top: 50px;
  color: white;
}
`;
