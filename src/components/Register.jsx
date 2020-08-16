import React from 'react';
import clsx from 'clsx';

import Button from '@material-ui/core//Button';
import Typography from '@material-ui/core/Typography';

import Section from 'Layouts/Section';
import SectionBackground from 'Layouts/SectionBackground';

import useStyles from 'Styles/components/register';

const Register = () => {
  const classes = useStyles();

  return (
    <Section extraClasses={ classes }>
      <div className={ classes.content }>
        <Typography variant="h4" marked="center" className={ classes.title }>
          Ok. Sounds good but how does this work?
        </Typography>

        <div className={ clsx(classes.description, 'ie-fix') }>
          <Typography variant="body1">
          The trustworthiness of information is assured thanks to two innovations 
          </Typography>

          <Typography component="span">
            <ol className={ classes.list }>
              <li>
              Cryptography - Mathmatical methods create a unique digital finger print for any size data.
              </li>
              <li>
              Blockchains - A network of independent computers calculate consensus and chain together immutable records.
              </li>
              <li>
               Cryptowerk Seal - A shareable digital proof that is quickly created to link massive amounts of grainular data to any blockchain. 
              </li>
            </ol>
          </Typography>
          <Typography variant="body1">
          Independent verification that data hasn't been manipulated becomes a reality.
          </Typography>
        </div>

        <Button
          size="large"
          variant="contained"
          className={ classes.button }
          component="a"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Try it with your data
        </Button>
      </div>

      <SectionBackground image="registerBg" />
    </Section>
  );
};

export default Register;
