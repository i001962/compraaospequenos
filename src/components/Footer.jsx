import React from 'react';
import MarzeeLabsLogo from 'Assets/marzeelabs.svg';
import SocialIcon from 'Components/SocialIcon';
import Section from 'Layouts/Section';
import useStyles from 'Styles/components/footer';

const Footer = () => {
  const classes = useStyles();

  return (
    <Section WrapperComponent="footer" extraClasses={ classes }>
      <span className={ classes.title }>Website made with love in San Mateao, California.</span>
      <a
        className={ classes.mainLink }
        href="https://cryptowerk.com"
        target="_blank"
        rel="noopener noreferrer"
        title="Cryptowerk"
      >
       {/* <MarzeeLabsLogo className={ classes.mzLogo } /> */}
        cryptowerk.com
      </a>

      <div>
        <SocialIcon
          extraClasses={ classes }
          icon="faTwitter"
          link="https://www.twitter.com/publicproof"
          title="PublicProof Twitter Page"
        />
        <SocialIcon
          extraClasses={ classes }
          icon="faLinkedinIn"
          link="https://www.linkedin.com/company/cryptowerk"
          title="Cryptowerk LinkedIn Page"
        />
        <SocialIcon
          extraClasses={ classes }
          icon="faGithub"
          link="https://github.com/marzeelabs/compraaospequenos"
          title="Marzee Labs Facebook Page"
        />
      </div>
    </Section>
  );
};

export default Footer;
