// For IE
import 'Polyfills/string-normalize';

import React, { useCallback, useEffect, useState } from 'react';
import {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import useStyles from 'Styles/components/shops/filters';

const FIELDS = require('Data/fields');

const sortBuckets = (original, filter) => {
  // Array sorting is done in-place, we don't want to alter the original in this case.
  const buckets = [ ...original ];
  buckets.sort((a, b) => {
    // Found at https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    const aKey = a.key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const bKey = b.key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (aKey < bKey) {
      return -1;
    }

    if (aKey > bKey) {
      return 1;
    }

    return 0;
  });

  // 'all' item is always first.
  if (FIELDS.filters[filter].all) {
    const allItemIdx = buckets.findIndex(item => item.key === FIELDS.filters[filter].all);
    if (allItemIdx !== -1) {
      const removed = buckets.splice(allItemIdx, 1);
      buckets.unshift(removed[0]);
    }
  }

  return buckets;
};

const ShopsFilters = ({
  activeFilters,
  aggregations,
  filter,
  filtersChange,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [ expanded, setExpanded ] = useState(false);
  const [ sorted, setSorted ] = useState([]);

  useEffect(() => {
    const _sorted = sortBuckets(aggregations.buckets, filter);

    setSorted(_sorted);
  }, [ aggregations, filter ]);

  const mb = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = useCallback(() => {
    if (mb) {
      setExpanded(!expanded);
    }
  }, [ expanded, mb, setExpanded ]);

  const summary = mb && !expanded && activeFilters && activeFilters.length
    ? `${FIELDS.filters[filter].label} - ${activeFilters.join(', ')}`
    : FIELDS.filters[filter].label;

  return (
    <Accordion
      className={ classes.panel }
      expanded={ !mb || expanded }
      onChange={ handleToggle }
    >
      <AccordionSummary
        expandIcon={ mb && <ExpandMoreIcon /> }
      >
        <span className={ classes.summary }>{ summary }</span>
      </AccordionSummary>

      <AccordionDetails className={ classes.items }>
        { sorted.map(bucket => (
          <div
            key={ `filter-option-${bucket.key}` }
            className={ classes.item }
          >
            <FormControlLabel
              control={ (
                <Checkbox
                  checked={ bucket.selected }
                  onChange={ event => filtersChange(filter, event) }
                  name={ bucket.key }
                />
                ) }
              label={ `${bucket.key} (${bucket.doc_count})` }
            />
          </div>
        )) }
      </AccordionDetails>
    </Accordion>
  );
};

ShopsFilters.propTypes = {
  activeFilters: arrayOf(string),
  aggregations: shape({
    buckets: arrayOf(shape({
      doc_count: number,
      key: string,
      selected: bool,
    })),
  }).isRequired,
  filter: string.isRequired,
  filtersChange: func.isRequired,
};

ShopsFilters.defaultProps = {
  activeFilters: [],
};

export default ShopsFilters;
