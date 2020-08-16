import React from 'react';

import SEO from 'Components/SEO';

import About from 'Components/About';
import Hero from 'Components/Hero';
import Register from 'Components/Register';
import SurvivalKit from 'Components/SurvivalKit';
import MediaCoverage from 'Components/MediaCoverage';

import PageWrapper from 'Layouts/PageWrapper';

import useStyles from 'Styles/pages/home';

const IndexPage = ({ location }) => {
  const classes = useStyles();

  return (
    <PageWrapper>
      <SEO title="PublicProof" location={ location } />
      <Hero
        background="homeBg"
        callToAction={ {
          label: 'Search for Proofs',
          to: '/seallake/',
        } }
        className={ classes.hero }
      />
      <About />
      <Register />
   {/*    <SurvivalKit />
      <MediaCoverage /> */}
    </PageWrapper>
  );
};

export default IndexPage;
