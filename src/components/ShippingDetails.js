import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import {
    Typography,
    Grid,
    Divider,
    TextField
  } from "@material-ui/core";
import { SettingsOverscanOutlined } from "@material-ui/icons";
import ShippingAddresses from "./ShippingAddresses";

const useStyles = makeStyles({
  gridContainer: {
    padding: "50px",
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 0,
    
  },
  media: {
    height: "100%",
    width: "111px",
  },
  itemTotal:{
    padding: "10px 0"
},
shippingContainer:{
    marginTop: "15px",
    borderTop: "1px solid grey",
    borderBottom: "1px solid grey"
}
});

const ShippingDetailsTap = () => {
  const classes = useStyles();

  const [shipping, setShipping] = useState("standard")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [addressLine, setAddressLine] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [phone_number, setTelephone] = useState(0)
  const [page,setPage] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setShipping(event.target.value);
  };
  const[products,setProducts] = useState([]);
  
  
  useEffect(() => {fetchProducts();}, [])
 
  const fetchProducts = async () => {            

      const data = await fetch(`/basket/${localStorage.getItem("user_id")}/`);

      const products= await data.json();
     
      setProducts(products);

     
  }

  const getTotal = () =>
  {
    var total = 0;
    for (var key in products) {
      total = total + products[key].price *  products[key].quantity ;
    }
    return Number(total.toFixed(2));
  }
  const calculateShippingCost= () =>
  {
    if(getTotal()>100)
    {
      return 0;
    }
    else{return 13;}
      
  }
  const calculateTax = () =>
  {
    let tax=0;
    tax= 0.18* getTotal();
    return Number(tax.toFixed(2));
  }
  const getTotalforOrder= () => {
    
    
    return Number((getTotal()+calculateShippingCost()+calculateTax()).toFixed(2));
  };

  const getFirstName = value => {
    localStorage.setItem('first_name',value);
    
    setFirstName(value);
  };
  const getLastName = value => {
    localStorage.setItem('last_name',value);
    
    setLastName(value);
  };
  const getTelephone = value => {
    localStorage.setItem('phone_number',value);
    
    setTelephone(value);
  };
  const getAddressLine = value => {
    localStorage.setItem('address_line',value);
    
    setAddressLine(value);
  };
  const getCity = value => {
    localStorage.setItem('city',value);
    
    setCity(value);
  };
  const getPostalCode = value => {
    localStorage.setItem('postal_code',value);
    
    setPostalCode(value);
  };
  const getCountry = value => {
    localStorage.setItem('country',value);
    
    setCountry(value);
  };



  // const getSummaryCard = (product, price, imageUrl) => {
  //   return (
  //     <CardActionArea>
  //       <Card className={classes.card}>
  //         <div className={classes.cardDetails}>
  //           <CardMedia image={imageUrl} className={classes.media} />
  //         </div>

  //         <CardContent style={{ marginLeft: "0" }}>
  //           <Typography variant="h6">{product}</Typography>
            
  //           <Typography variant="subtitle2">{price}</Typography>
  //         </CardContent>
  //       </Card>
  //     </CardActionArea>
  //   );
  // };

  return (
    <Grid container className={classes.gridContainer} spacing={4} alignItems="flex-start">
      <Grid item xs={12} sm={6} md={8} container  spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
                Shipping Details
            </Typography>
            <Divider />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="First name"
            defaultValue={localStorage.getItem('first_name') === null ? ("") : localStorage.getItem('first_name')}
            onChange={(event) => getFirstName(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Last name"
            defaultValue={localStorage.getItem('last_name') === null ? ("") : localStorage.getItem('last_name')}
            onChange={(event) => getLastName(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} >
            <TextField required
            label="Address line "
            defaultValue={localStorage.getItem('address_line') === null ? ("") : localStorage.getItem('address_line')}
            onChange={(event) => getAddressLine(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="City"
            defaultValue={localStorage.getItem('city') === null ? ("") : localStorage.getItem('city')}
            onChange={(event) => getCity(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Postal code"
            defaultValue={localStorage.getItem('postal_code') === null ? ("") : localStorage.getItem('postal_code')}
            onChange={(event) => getPostalCode(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Country"
            defaultValue={localStorage.getItem('country') === null ? ("") : localStorage.getItem('country')}
            onChange={(event) => getCountry(event.target.value)}
            fullWidth/>
            
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Telephone Number"
            defaultValue={localStorage.getItem('phone_number') === null ? ("") : localStorage.getItem('phone_number')}
            onChange={(event) => getTelephone(event.target.value)}
            fullWidth/>
        </Grid>
        {(localStorage.getItem("isLogged")==='false') ? ( 
        
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Email"
            defaultValue={localStorage.getItem('email') === null ? ("") : localStorage.getItem('email')}
            onChange={(event) => localStorage.setItem('email', event.target.value)}
            fullWidth/>
        </Grid>) : null}
      
        

      </Grid>
        
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" gutterBottom>
              Summary
          </Typography>
       
          <Divider />
          <table width="100%">
              <tr>
                  <td align="left" className={classes.itemTotal}>SUBTOTAL</td>
          <td align="right" className={classes.itemTotal}>{getTotal()+"$"}</td>
              </tr>
              <tr>
                  <td align="left" className={classes.itemTotal}>SHIPPING</td>
                  <td align="right" className={classes.itemTotal}>{calculateShippingCost()+"$"}</td>
              </tr>
              <tr>
                  <td align="left" className={classes.itemTotal}>TAXES</td>
                  <td align="right" className={classes.itemTotal}>{calculateTax()+"$"}</td>
              </tr>
              

          </table>
          <Divider />
          <table width="100%">
              <tr>
                  <td align="left" className={classes.itemTotal}>
                      <Typography variant="h5" component="p"> TOTAL</Typography>
                      </td>
                  <td align="right" className={classes.itemTotal}><Typography variant="h5" component="span"> {getTotalforOrder()+"$"}</Typography></td>
              </tr>
              
          </table>
          
          {(localStorage.getItem("isLogged")==='true') ? (   
          <Button variant="contained" onClick={() => setPage('Forward')}> Select From My Addresses</Button> ) : null}
          
          {page === 'Forward'? <ShippingAddresses user_id= {localStorage.getItem("user_id")} />: null }



      </Grid>
    </Grid>
  );
};

export default ShippingDetailsTap;
