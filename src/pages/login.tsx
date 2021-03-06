import React, { useState } from 'react';
import Link from 'next/link'
import Router from 'next/router'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginHandler } from '../common/backend/auth'
import { errorResponse } from '../common/backend/error';
import { isEmail, isPassword } from '../common/validation/validation'
import Layout from '../components/templates/Layout'

// CSSコンポーネント
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// エラーメッセージ用のコンポーネント
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  // Hooks 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Click Handler
  const sumitHundler = async (e) => {
    e.preventDefault()

    // バリデーション
    let ErrorData = isEmail(email)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isPassword(password)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    try {
      // ログイン処理
      const loginResult = await loginHandler({ email, password })
      const responseType = loginResult.status.toString().slice(0, 1)
      if (responseType !== '2') {
        throw (loginResult)
      } else {
        Router.push('/home')
      }
    } catch (e) {
      // レスポンスコードに異常があればエラーメッセージ表示
      setError(await errorResponse(e))
      return
    }
  }

  return (
    <Layout
      title={"ログイン｜技術書籍感想文"}
      Header={false}>

      <Container component="main" maxWidth="xs">

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          {error && <Alert className={classes.error} severity="warning">{error}</Alert>}

          <Typography component="h1" variant="h5"> サインイン </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={((e) => { sumitHundler(e) })}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            > ログイン </Button>

            <Grid container justify="center">
              <Grid item>
                <Link href="/signup">
                  ユーザー登録はこちらへ
                </Link>
              </Grid>
            </Grid>

          </form>

        </div>
      </Container >
    </Layout>
  );
}

export default Login
