import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Team from './team';

const useStyles =makeStyles(theme=>({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        },
      }
}))
const footers = [
  {
    title_: "Company",
    description: ["Team", "History", "Contact"],
  },
  {
    title_: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title_: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title_: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

const Footer = () => {
  const classes = useStyles ();
  return (
    <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={4} justify="space-evenly">
        
          <Grid item xs={6} sm={3} key="Company">
            <Typography variant="h6" color="textPrimary" gutterBottom>
             Company
            </Typography>
            <ul>
              
                <li key="Team">
                  <Link href="/team" variant="subtitle1" color="textSecondary">
                    Team
                  </Link>
                </li>
                <li key="History">
                  <Link href="/history" variant="subtitle1" color="textSecondary">
                    History
                  </Link>
                </li>
                <li key="Contact">
                  <Link href="/contact" variant="subtitle1" color="textSecondary">
                    Contact
                  </Link>
                </li>
              
            </ul>
          </Grid>
        

  
          <Grid item xs={6} sm={3} key="Legal">
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Legal
            </Typography>
            <ul>
            
                <li key="Privacy policy">
                  <Link href="/privacypolicy" variant="subtitle1" color="textSecondary">
                    Privacy policy
                  </Link>
                </li>
                <li key="Terms of use">
                  <Link href="/termsofuse" variant="subtitle1" color="textSecondary">
                    Terms of use
                  </Link>
                </li>
            
            </ul>
          </Grid>
      
      </Grid>
      <Box mt={5}>
        <p className="copyRight">Copyright © 2020. All Rights Reserved</p> 
      </Box>
    </Container>
  );
};

export default Footer;