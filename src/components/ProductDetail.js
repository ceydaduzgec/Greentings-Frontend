import React from "react";
import  {useRef,useState, useEffect} from 'react';
import '../App.css';
import { Grid, Typography, Divider, Button  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {green} from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
//import Carousel from 'react-material-ui-carousel'
import { Carousel } from 'react-responsive-carousel';
import ImageGallaryComponent from "./ImageGallaryComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Comment, Icon, Form} from 'semantic-ui-react';
import {TextField} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const styles = {
  paperContainer: {
  
      margin: "10px 200px",
      marginTop: "150px"
      
  },

  spaperContainer: { 
   
    //margin: "10px 200px",
    marginTop: "10px",
    marginRight: "50px",
    marginLeft: "50px"

  }
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
  backgroundColor: green[500],
  fontSize: 16,
  '&:hover': {
    backgroundColor: green[800],
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
}));
function ProductDetail({match}) {
    useEffect(() => {fetchItem(); console.log(match); sendPhoto(); fetchComments();},[]);
   
    const [comment, setComment] = useState("")
    const [nickname, setNickname] = useState("")
    const [rating, setRating] = useState(0)
    const [item, setItem] = useState({});
    const [photos, setPhoto] = useState([]);
    const[comments,setComments] = useState([]);
    const [value, setValue] = React.useState(2);

    const fetchItem =async() => {
      const fetchItem = await fetch (`/product/${match.params.product_id}`);
      const item = await fetchItem.json();
      setItem(item);
      console.log(item);
    }
    
   
    const fetchComments = async () => {             
        const data = await fetch(`/comments/${match.params.product_id}/`);
        const comments= await data.json();
        setComments(comments);
        console.log(comments);

    }

    async function sendPhoto () {
      try {
        const response = await fetch ('/photos/', {       
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
          body: JSON.stringify({
            "product_id": 1
  
          })
        });

        await response.json().then(data => {setPhoto(data)})

      }
      catch (e)
      {
        console.log(e)
      }

    }

    async function sendProducttoCart () {
      try {

        const res = await fetch (`/basket/${localStorage.getItem("user_id")}/`, {
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
          body: JSON.stringify({
            "product": item.product_id,
            "quantity": 1,
          
          })
        });
        console.log("response:",res)
      }
      catch (e)
      {
        console.log(e)
      }

    }
    async function sendComment () {
      try {
        const res = await fetch (`/comments/${match.params.product_id}/`, {
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
          body: JSON.stringify({
            "nickname":nickname,
            "text":comment,
            "rating":rating,
            "validation":false
            })
        });
        if(res.status === 201){
          console.log("response:",res)
          localStorage.setItem("nickname", "")
          localStorage.setItem("rating", "")
          localStorage.setItem("comment", "")
          setComment('')
          setNickname('')
          setRating("")
          window.location.reload();
        }
      }
      catch (e)
      {
        console.log(e)
      }

    }
    const getComment = value => {
      localStorage.setItem('comment',value);
      
      setComment(value);
    };
    const getNickname = value => {
      localStorage.setItem('nickname',value);
      
      setNickname(value);
    };
    const getRating = value => {
      localStorage.setItem('rating',value);
      
      setRating(value);
    };

  // function getAllImages ( item_img, photos) {
  //   let allPhotos = []
  //   allPhotos.push(item_img)
  //   for (var key in photos) {
  //     allPhotos.push(photos.image_url)
  //  }
  //  return allPhotos;
  // }
  
  const classes = useStyles();
  return (
    <Paper style={styles.paperContainer} elevation={10}>
    <Grid container>
      
      <Grid item xs={12} sm={6}>
      {/* <Paper style={styles.spaperContainer} elevation={10}>

      <Zoom>
      <Carousel autoPlay interval="5000" transitionTime="1000">
        <img
          src={ item.img}
          width="100%"
          height="500px"
          flex="1"
          resizeMode= "contain"
        />
        </Carousel>
         </Zoom> 
         </Paper> */}
    <Paper style={styles.spaperContainer} elevation={10}>
      <Carousel autoPlay interval="5000" transitionTime="500">
      {photos.map (photo => ( 
         <Zoom>
        <img
          src={ photo.image_url}
          width="100%"
          height="100%"
          flex="1"
          resizeMode= "contain"
        />
       </Zoom>
      ))}
      </Carousel>
   </Paper>
      
     {/* <ImageGallaryComponent images={getAllImages(item.img, photos)} /> */}
       
      </Grid>
      
      <Grid
        item
        xs={12}
        sm={6}
        container
        direction="column"
        className={classes.gridContainer}
      >
        <Grid item className={classes.itemContainer}>
          <Typography variant="h5" >
          {item.product_name}
          </Typography>
          <Grid>
            Brand: {item.brand_name}
          </Grid>
          <Rating name="read-only" defaultValue={2} value={parseInt(item.rating)} readOnly='true' /> 
        </Grid>
        <Divider />
       
        

        <Grid item>
          <p className={classes.p}>
          {item.description}
          </p>
        </Grid>
        <Divider />
        <Grid item className={classes.itemContainer} container spacing={2}>
          <Grid item>
            <Typography variant="h4" style={{ display: "inline" }}>
            {item.price}$
            </Typography>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Select Size
              </InputLabel>
              
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                placeholder="Select" //buraya sonra renk size secenegi gelcek
              >
                <MenuItem >size 1</MenuItem>
                <MenuItem >size 2</MenuItem>
                <MenuItem >size 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Select Color
              </InputLabel>
              
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                placeholder="Select" //buraya sonra renk size secenegi gelcek
              >
                <MenuItem >{item.brand_name}</MenuItem>
                <MenuItem >item.color</MenuItem>
                <MenuItem >item.color</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>
        <Grid item className={classes.itemContainer}>    
        <Button onClick={() => {sendProducttoCart() }} variant="contained" color="primary" className={classes.button}  endIcon={<ShoppingCartOutlinedIcon fontSize="medium" />}>
            Add To Cart
        </Button>
        <Button variant="contained" color="primary" className={classes.button} endIcon={<FavoriteBorderSharpIcon fontSize="medium" />}>
            Add To Favorites
        </Button>
 
        
        </Grid>
      </Grid>
    </Grid>
          <Divider />
          <Paper  style={styles.spaperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Comment on </Typography>
            <Rating
                name="simple-controlled"
                defaultValue={null}
                onChange={(event, newValue) => {
                  getRating(newValue);
                }}
              />
              <Grid item xs={12} sm={12} md={6}>
                <TextField 
                label="nickname"
                defaultValue={localStorage.getItem('nickname') === null ? ("") : localStorage.getItem('nickname')}
                onChange={(event) => getNickname(event.target.value)}
                fullWidth/>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField 
                label="comment"
                defaultValue={localStorage.getItem('comment') === null ? ("") : localStorage.getItem('comment')}
                onChange={(event) => getComment(event.target.value)}
                fullWidth/>
              </Grid>



              <Button onClick={() => {sendComment() }} variant="contained">
                submit
              </Button>
              <Divider />
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
                      </React.Fragment>
                      
                    }
                  />
                </ListItem>
                
              ))}
              </List>
           </Box>
          </Paper>
    </Paper>
    
  );
};

export default ProductDetail;
