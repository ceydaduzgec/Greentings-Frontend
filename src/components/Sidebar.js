import React, {useRef,useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";
import { green } from '@material-ui/core/colors';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "200px",
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listitem: {
    width: '100%',
    maxWidth: 300,
    marginLeft: "1px",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  fixedlist: {
    height: 300,
    maxWidth: 300,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  applybutton: {
    backgroundColor: "#17ba9c",
    fontSize: 18,
  },
  input:
  {
    alignContent: "center",
    width: "150px",
  },
  rootforcheck: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    height: "10px"
  },
}));

const TextTypography = withStyles({
  root: {
    backgroundColor: "#17ba9c",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 500,
    textTransform: 'capitalize',
    maxWidth: 200,
    height: 30,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 18,
    justifyContent: "center",
  }
}
)(Typography);

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function Sidebar(props) {
  const classes = useStyles();

  const maxRef = useRef('')
  const minRef = useRef('')

  const [message,setMessage] = useState("");
  const [brands,setBrands] = useState([]);
  const [minPrice,setminPrice] = useState("0");
  const [maxPrice,setmaxPrice] = useState("10000");
  const [rating,setRating] = useState(0);
  const [checked, setChecked] = useState([]);                 // add checked brands to
  const [checkedNames, setCheckedNames] = useState([]);    
  const [flag,setFlag] = useState();

  useEffect(() => {if (flag) {console.log("Sending filter"); setFlag(); sendFilter();}}, [flag]);

  useEffect(() => {fetchBrands();}, [props.categoryid]);

  const fetchBrands = async () => {         
      const data = await fetch(`/categorynames/${props.categoryid}`);                         //    /category/${category.categories_id}

      const brands= await data.json();
      console.log("BRANDS");
      console.log(brands); 
      setBrands(brands);};         // name: 
  
  const getCheckedItems = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newCheckedNames = [...checkedNames];
    if (currentIndex === -1) {
      newChecked.push(value);
      newCheckedNames.push(value.name);
    } else {
      newChecked.splice(currentIndex, 1);
      newCheckedNames.splice(currentIndex, 1);
    }
    setChecked(newChecked); 
    setCheckedNames(newCheckedNames)
    console.log(newChecked)
    console.log(newCheckedNames)
  };

  function check(){
    if ((maxPrice === "") && (minPrice === "")) {
      console.log("both empty")
      setmaxPrice("10000");
      setminPrice("0");
      setFlag("go");
    }
    else if (maxPrice === "") {
      console.log("max empty")
      setmaxPrice("10000");
      setFlag("go");
    }
    else if (minPrice === "") {
      console.log("min empty")
      setminPrice("0");
      setFlag("go");
    }
    else{
      setFlag("go");
    }
    
  }

  async function sendFilter () {
    try {
        const response = await fetch (`/categoryitems/${props.categoryid}/`, {       
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
            "brand_name": checkedNames,               
            "rating": parseInt(rating),
            "price_upper": maxPrice,
            "price_lower": minPrice
        })
        });
        setminPrice("0");
        setmaxPrice("10000");
        setCheckedNames([]);
        setChecked([]);

        minRef.current.value="";
        maxRef.current.value="";

        console.log("New Filter sent")
        console.log(checkedNames, parseInt(rating), maxPrice,minPrice )
        console.log("Response Status: "+response.status)

        if (response.status === 202){
          response.json().then(data => {console.log({data}); sendItemsToCategory(data)})       
        }
        else {
          response.json().then(data => {setMessage(data.message)})
        }
    }
    catch (e)
    {
      console.log(e)
    } 
  }   

  const sendItemsToCategory = (items) => { // the callback function for categories page component
    console.log(items);
    props.onchange(items);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper, }} >
        <Toolbar className={classes.toolbar}/>
        <div className={classes.drawerContainer}>
        <TextTypography>Price</TextTypography>
        <TextField className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Minimum"
            inputRef={minRef}          
            onChange={e => {setminPrice(e.target.value)}} 
          />
          <TextField className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Maximum"
            inputRef={maxRef} 
            onChange={e => {setmaxPrice(e.target.value)}}
          />
            <ListItem><ListItemText primary="" /></ListItem>

            <TextTypography>Brand</TextTypography>
            <div key={"brand"} className={classes.fixedlist}>
              

              {brands.map((index) => {
                const labelId = `checkbox-list-label-${index}`;

                return (
                <List className={classes.rootforcheck}>
                  <ListItem key={index} role={undefined} dense button onClick= {getCheckedItems(index)}>
                    <ListItemIcon>
                      <GreenCheckbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${index.name}`} />
                  </ListItem>
                  </List>
                );
              })}

            </div>

          <ListItem><ListItemText primary="" /></ListItem>
  
        <TextTypography>Rating</TextTypography>
          <Rating
            name="simple-controlled"
            defaultValue={null}
            onChange={e => {setRating(e.target.value);}}/>

            <ListItem><ListItemText primary="" /></ListItem>
          
          <Button className={classes.applybutton} variant="contained" 
            onClick={check}>Apply Filters</Button>

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Filter in Related Category
              </ListSubheader>}
            className={classes.listitem}>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main>
    </div>
  );
}


export default Sidebar;





