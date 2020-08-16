import React from 'react';
import { string } from 'prop-types';
import clsx from 'clsx';
import { Link } from 'gatsby';
import Section from 'Layouts/Section';
import useStyles from 'Styles/components/header';

const Header = ({ siteTitle }) => {
  const classes = useStyles();

  const isActiveLink = ({ isCurrent }) => ({
    className: clsx(classes.navigationLink, {
      [classes.activeLink]: isCurrent,
    }),
  });

  return (
    <Section extraClasses={ classes }>
      <Link className={ classes.title } to="/">
        { siteTitle }
      </Link>
      <nav className={ classes.navigation }>
       {/*  <Link to="/" getProps={ isActiveLink }>
          Home
        </Link> */}
        <Link to="/seallake/" getProps={ isActiveLink }>
          Proof Repository
        </Link>
        {/* <Link to="/articles/" getProps={ isActiveLink }>
          Tips and Tools
        </Link> */}
      </nav>
    </Section>
  );
};

Header.propTypes = {
  siteTitle: string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
