import React from 'react';

import ArrowsIcon from 'Assets/arrows.svg';
import ClientsIcon from 'Assets/clients.svg';
import ShopsIcon from 'Assets/shops.svg';

import Grid from '@material-ui/core/Grid';
import { Link } from 'gatsby';
import Typography from '@material-ui/core//Typography';

import Section from 'Layouts/Section';

import useStyles from 'Styles/components/about';

const About = () => {
  const classes = useStyles();

  return (
    <Section extraClasses={ classes }>
      <Typography variant="h4" marked="center" className={ classes.title } component="h2">
        You may be wondering, what is a #PublicProof?
      </Typography>

      <div className={ classes.descriptionWrapper }>
        <Typography className={ classes.description } variant="body1">
        Manipulated information varies greatly, from harmless comedy to meticulously planned 
        and strategically placed Fake News intended to steer public opinion or exploit consumers.
        </Typography>

        <Typography className={ classes.description } variant="body1">
        Digital content has a new safeguard thanks to decentrialized public ledgers. Now
        content can be made provable. 
        </Typography>

        <Grid container spacing={ 5 } className={ classes.itemsWrapper }>
          <Grid className={ classes.item } item xs={ 12 } md={ 6 }>
            <ClientsIcon className={ classes.icon } />
            <Typography variant="h5" className={ classes.sectionHeading }>
              Creators / Consumers
            </Typography>
            <Typography variant="body1" className={ classes.sectionDescription }>
              Any size data
            </Typography>
          </Grid>

          <ArrowsIcon className={ classes.arrows } />

          <Grid className={ classes.item } item xs={ 12 } md={ 6 }>
            <ClientsIcon className={ classes.icon } />
            <Typography variant="h5" className={ classes.sectionHeading }>
              Blockchains
            </Typography>
            <Typography variant="body1" className={ classes.sectionDescription }>
              Any source of truth
            </Typography>
          </Grid>
        </Grid>

        <Typography className={ classes.description } variant="body1">
        Tamper evident data that is easy to verify and share 
        could create a new standard for data integrity. 
        </Typography>
      </div>

      <Link
        className={ classes.button }
        to="/seallake/"
      >
        Search for Proofs
      </Link>
    </Section>
  );
};

export default About;
