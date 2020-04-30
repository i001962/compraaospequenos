import React, { useRef, useState } from 'react';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ShopsEmail from 'Components/Shops/Email';
import ShopsPhones from 'Components/Shops/Phones';
import ShopsSocialLinks from 'Components/Shops/SocialLinks';
import ShopsWebsite from 'Components/Shops/Website';
import ShopsWhatsApp from 'Components/Shops/WhatsApp';

import useStyles from 'Styles/components/shops/card';

const ShopsCard = ({ shop }) => {
  const classes = useStyles();

  const collapsedRef = useRef(null);
  const [ expanded, setExpanded ] = useState(false);

  const handleExpandClick = event => {
    if (collapsedRef.current
    && (collapsedRef.current === event.target || collapsedRef.current.contains(event.target))) {
      return;
    }

    setExpanded(!expanded);
  };

  return (
    <Card
      className={ clsx(classes.card, {
        [classes.cardActive]: expanded,
      }) }
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
      >
        <CardContent className={ classes.content }>
          <Typography gutterBottom variant="h5" component="h2" className={ classes.title }>
            { shop.name }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={ classes.location }>
            { shop.location.join(', ') }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={ classes.businessType }>
            { shop.businessType.join(', ') }
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <ExpandMoreIcon
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
          <Typography gutterBottom variant="h6" component="h5" color="textSecondary" className={ classes.offerType }>
            { shop.offerType.join(', ') }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={ classes.offer }>
            { shop.offer }
          </Typography>

          <ShopsPhones phones={ shop.telephone } />
          <ShopsWhatsApp contact={ shop.whatsApp } />
          <ShopsEmail address={ shop.email } />
          <ShopsWebsite url={ shop.site } />
          <ShopsSocialLinks
            name={ shop.name }
            facebook={ shop.facebook }
            instagram={ shop.instagram }
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ShopsCard;
