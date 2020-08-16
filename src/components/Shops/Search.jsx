import React from 'react';

import TextField from '@material-ui/core/TextField';

import useStyles from 'Styles/components/shops/search';

const ShopsSearch = ({ onChange }) => {
  const classes = useStyles();

  return (
    <TextField
      classes={ {
        root: classes.root,
      } }
      label={ (
        <span className={ classes.label }>Filter...</span>
      ) }
      onChange={ onChange }
    />
  );
};

export default ShopsSearch;
