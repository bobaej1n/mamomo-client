import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  createTheme,
  ThemeProvider,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import axios from 'axios';

import { SignInStore } from '../../../store/SignInPageStore';
import { authHeader } from '../../authenticationFunc';

// 닉네임 입력란
const Nickname = () => {
  const theme = createTheme({
    palette: {
      gray: {
        main: '#cecece',
        contrastText: '#fff',
      },

      lightGray: {
        main: '#a8a8a8'
      },

      green: {
        main: '#2db400'
      }
    },
  });

  const [ nickname, setNickname ] = useState('');
  const { email } = SignInStore();

  const isNickname = (nickname) => {
    const nicknameRegex = RegExp("^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,10}\$")

    return nicknameRegex.test(nickname);
  };

  useEffect(() => {
    axios
    .get(
      `http://localhost:8080/api/user/${email}`, {
        headers: authHeader()
      }
    )
    .then((res) => {
      setNickname(res.data.user.nickname);
      console.log('연결');
      console.log(res.data.user.nickname); // 사용자 생일
    })
    .catch((e) => {
      console.log(e);
    })
  }, [email]);

  return (
    <ThemeProvider theme={theme}>
        <Grid container justifyContent="center">
          <Box
            component="form"
            sx={{
              m: '30px 0 0 0',
              width: '650px',
              //border: 1
            }}
          >
            <Box
              sx={{
                fontSize: "15px",
                fontFamily: 'Noto Sans KR',
              }}
            >
              닉네임
            </Box>
            <TextField
              value={nickname}
              variant="standard"
              placeholder="특수문자, 공백 제외 2~10자"
              color="gray"
              sx={{
                m: '20px 0 0 0',
                width: '610px'
              }}
              onChange={ (e) => {
                setNickname(e.target.value)
              }}
            >
            </TextField>
            {
              isNickname(nickname) === true ?
              (
                <CheckCircleIcon
                  sx={{
                    m: "15px 0 0 10px",
                    color: "#2db400",
                  }}
                />
              ) : (
                <CheckCircleIcon
                  sx={{
                    m: "15px 0 0 10px",
                    color: "#a8a8a8",
                  }}
                />
              )
            }
          </Box>
        </Grid>
    </ThemeProvider>
  );
}

export default Nickname;