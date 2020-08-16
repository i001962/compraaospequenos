import React from 'react';

import SEO from 'Components/SEO';
import Hero from 'Components/Hero';
import Shops from 'Components/Shops/Shops';

import PageWrapper from 'Layouts/PageWrapper';

export default ({ location }) => (
  <PageWrapper>
    <SEO title="List of Seals" location={ location } />
    <Hero background="shopsBg" />
    <Shops />
  </PageWrapper>
);
