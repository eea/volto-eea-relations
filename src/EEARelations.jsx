import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEEARelations } from './actions';
import { getBaseUrl } from '@plone/volto/helpers';

/**
 * @summary The React component that shows the related items of the current object.
 */
const EEARelations = (props) => {
  const { content, pathname } = props;
  const dispatch = useDispatch();
  const basePathname = getBaseUrl(pathname);

  const eeaRelationsItems = useSelector((state) => {
    if (state?.eeaRelations?.eea?.loaded === true) {
      return state?.eeaRelations?.result?.items;
    }
    return null;
  });

  useEffect(() => {
    dispatch(getEEARelations(basePathname));
  }, [dispatch, basePathname]);

  return eeaRelationsItems ? <></> : null;
};

EEARelations.propTypes = {
  content: PropTypes.object,
};

export default EEARelations;
