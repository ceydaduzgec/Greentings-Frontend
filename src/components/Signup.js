import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles, makeStyles} from '@material-ui/core/styles';

const SignupButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 30,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#008001',
    borderColor: '#008001',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#008001',
      borderColor: '#008001',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#008001',
      borderColor: '#008001',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.success.dark,
  }
}));





function SignUp () {
  // write javascipt here
  const classes = useStyles();

  let state = {
    fisrName:"",
    lastName:"",
    email:"",
    password:""
  }

  console.log(state)



  const postUser = async () => 
  {
    const data = JSON.stringify({
      "first_name": "Pazar ",
      "last_name": "DenemeSession",
      "email": "deniyoz.moruq@greentings.com",
      "username": "SugaMAMA",
      "password": "123",
      "phone_number": "05999995635",
      "user_type": "Customer",
    })

    console.log(data)


    const result = await fetch ('/user/', {
         method: "post",
         mode: "cors",
         headers:
         {
           "Accept": "*/*",
           "Content-Type": "application/json",
           "Connection": "keep-alive",
           "Content-Encoding": "gzip, deflate, br",
           "Accept-Encoding": "gzip, deflate, br"
         },
         body: data
       });
   }
  

  
  return (
    

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>      
          <LockOutlinedIcon />                          
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>    
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"             
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value = {state.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                //value = {this.state.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                //value = {this.state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                //value = {this.state.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <SignupButton 
            href="/emailconfirmation"
            onClick={postUser} 
            className={classes.submit} 
            type= "submit" 
            fullWidth variant="contained"  >
              Sign Up
          </SignupButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className={classes.link}>
                Already have an account? Login
              </Link>

            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}


export default SignUp;