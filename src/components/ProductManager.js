import React from "react";
import  {useRef,useState, useEffect} from 'react';
import '../App.css';
import { Grid, Typography, Divider, Button  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import {yellow,green,orange} from '@material-ui/core/colors';


import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from "react-router-dom";
import Paper from '@material-ui/core/Paper';


const styles = {
  spaperContainer: { 
   
    //margin: "10px 200px",
    marginTop: "10px",
    marginRight: "60px",
    marginLeft: "50px"
    

  },

};
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "50px",
  },
  itemContainer: {
    padding: "20px",
    color: "0000",
    fontSize: "20px"

  },
  formControl: {
    marginTop: "-12px",
    minWidth: 120,
  },
  p:{
    fontSize: "14px",
    color: "black",
},
button: {
  margin: theme.spacing(1),
  backgroundColor:orange[500],
  fontSize: 16,
  '&:hover': {
    backgroundColor: orange[800],
  },
},
approve_button: {
  margin: theme.spacing(1),
  backgroundColor: yellow[500],
  fontSize: 16,
  '&:hover': {
    backgroundColor: yellow[800],
  },
},
commentStyle: {
  width: '100%',
  maxWidth: '36ch',
  backgroundColor: theme.palette.background.paper,
},
inline: {
  display: 'inline',
},
root: {
  flexGrow: 1,
  marginTop: "200px",
},

}));

function ProductManager() {
  useEffect(() => {fetchComments();},[]);
  const[visible,setVisible] = useState(false);
  const[comments,setComments] = useState([]);
  const fetchComments = async () => {             
    const data = await fetch(`/commentapproval`);
    const comments= await data.json();
    setComments(comments);
    console.log(comments);

}
const showComments = () => { 
  setVisible(!visible);
}
async function ApproveComment (id) {
  try {

    const res = await fetch (`/commentapproval`, {
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
      body: 
        id,
      
     
    });
    console.log("response:",res)
    alert("Comment is approved");
    window. location. reload();
  }
  catch (e)
  {
    console.log(e)
  }

}

const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        

        <Grid item xs={6}>
        <Paper style={styles.spaperContainer} elevation={10}>
        <Button className={classes.button} onClick={() => {showComments() }} variant="contained">
          See Comments
        </Button>
        {visible ? (
        <List className={classes.commentStyle}>
              {comments.map (comment => (
                
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={comment.nickname} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.text}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {comment.nickname}
                        </Typography>
                        {"\n"+comment.date}
                        <Rating
                            name="simple-controlled"
                            defaultValue={comment.rating}
                            disabled="true"
                          />
                         <Button className={classes.approve_button}  onClick={() => {ApproveComment(comment.comment_id) }}variant="contained">
                            Approve
                        </Button> 
                      </React.Fragment>
                      
                      
                    }
                  />
                </ListItem>
                                 
              ))}
              </List> ) : null }
              </Paper>
              </Grid>
              <Grid item xs={6} >
                <Paper style={styles.spaperContainer} elevation={10}>
                <Button className={classes.button}  variant="contained">
                 Add Product
                </Button>
                <Button className={classes.button}  variant="contained">
                 Delete Product
                </Button>
                <Button className={classes.button}  variant="contained">
                 Edit Product
                </Button>
                </Paper>
              </Grid>
  
        </Grid>
    </div>
  );
}

export default withRouter(ProductManager);
