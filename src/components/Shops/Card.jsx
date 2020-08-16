import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import ShopsEmail from 'Components/Shops/Email';
import ShopsPhones from 'Components/Shops/Phones';
import ShopsSocialLinks from 'Components/Shops/SocialLinks';
import ShopsWebsite from 'Components/Shops/Website';
import ShopsWhatsApp from 'Components/Shops/WhatsApp';

import useStyles from 'Styles/components/shops/card';

const ShopsCard = ({ shop }) => {
  const classes = useStyles();

  const cardRef = useRef(null);
  const collapsedRef = useRef(null);
  const [ expanded, setExpanded ] = useState(false);

  const handleExpandClick = event => {
    if (collapsedRef.current
    && (collapsedRef.current === event.target || collapsedRef.current.contains(event.target))) {
      return;
    }

    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleWindowClick = event => {
      if (
        expanded
        && cardRef.current
        && !cardRef.current.contains(event.target)
        && cardRef.current.parentNode.contains(event.target)
      ) {
        setExpanded(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [ expanded ]);

  return (
    <Card
      className={ clsx(classes.card, {
        [classes.cardActive]: expanded,
      }) }
      ref={ cardRef }
    >
      <CardActionArea
        classes={ {
          focusHighlight: classes.focusHighlight,
          root: classes.actionArea,
        } }
        className={ clsx({
          [classes.actionAreaActive]: expanded,
        }) }
        disableRipple
        onClick={ handleExpandClick }
        id={ `click-tracker__${shop.name}__action-area` }
        data-shop={ shop.name }
      >
        <CardContent className={ classes.content } id={ `click-tracker__${shop.name}__card-content` } data-shop={ shop.name }>
          <Typography gutterBottom variant="h5" component="h2" className={ classes.title } id={ `click-tracker__${shop.name}__name` } data-shop={ shop.name }>
            { shop.name }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={ classes.location } id={ `click-tracker__${shop.location}__location` } data-shop={ shop.location }>
            { shop.location }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={ classes.type } id={ `click-tracker__${shop.offer}__business-type` } data-shop={ shop.offer }>
            { shop.offer }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={ classes.product } id={ `click-tracker__${shop.name}__product` } data-shop={ shop.name }>
            { shop.name }
          </Typography>
        </CardContent>

        <CardActions
          id={ `click-tracker__${shop.name}__card-actions` }
          data-shop={ shop.name }
          className={ clsx({
            root: classes.cardActions,
          }) }
          disableSpacing
        >
          <ExpandMoreIcon
            id={ `click-tracker__${shop.name}__expand-icon` }
            data-shop={ shop.name }
            className={ clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            }) }
          />
        </CardActions>
      </CardActionArea>

      <Collapse
        classes={ {
          container: classes.collapse,
          wrapper: classes.collapseWrapper,
        } }
        in={ expanded }
        ref={ collapsedRef }
        timeout="auto"
      >
        <CardContent>
          <Typography gutterBottom variant="h6" component="h5" color="textSecondary" className={ classes.offer }>
            { shop.name }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={ classes.offer }>
            { shop.name }
          </Typography>

          {/* <ShopsPhones phones={ shop.telephone } />
          <ShopsWhatsApp contact={ shop.whatsApp } />
          <ShopsEmail address={ shop.email } />
          <ShopsWebsite url={ shop.site } />
          <ShopsSocialLinks
            name={ shop.name }
            facebook={ shop.facebook }
            instagram={ shop.instagram }
          /> */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ShopsCard;
