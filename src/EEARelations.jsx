import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEEARelations } from './actions';
import { getBaseUrl } from '@plone/volto/helpers';
// import { defineMessages } from 'react-intl';
//
// const messages = defineMessages({
//   draft: {
//     id: 'Draft',
//     defaultMessage: 'Draft',
//   },
//   archived: {
//     id: 'Archived',
//     defaultMessage: 'Archived',
//   },
// });

/**
 * @summary The React component that shows the related items of the current object.
 */
const EEARelations = (props) => {
  const { pathname } = props;
  const dispatch = useDispatch();
  const basePathname = getBaseUrl(pathname);

  const eeaRelationsItems = useSelector((state) => {
    if (state?.eeaRelations?.eea?.loaded === true) {
      return state?.eeaRelations?.result?.items;
    }
    return null;
  });

  const relation_labels = Object.keys(eeaRelationsItems || {});

  useEffect(() => {
    dispatch(getEEARelations(basePathname));
  }, [dispatch, basePathname]);

  return eeaRelationsItems ? (
    <>
      <div id="relatedItems" className={'relatedItems'}>
        <h2 className={'notoc'}>Related content</h2>
        <ul className="eea-tabs">
          {relation_labels.map((val) => {
            const tab_id = 'tab-' + val.toLowerCase().replace(' ', '-');
            return (
              <li key={tab_id}>
                <a href={tab_id} id={tab_id}>
                  {val}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="eea-tabs-panels">
          {relation_labels.map((val) => {
            const objs = eeaRelationsItems[val];
            return (
              <div className="eea-tabs-panel">
                <div className="page">
                  {objs.map((obj) => {
                    const review_state = obj['review_state'];
                    const is_expired = obj['is_expired'];
                    const show_ribbon =
                      is_expired || review_state !== 'published' ? true : false;
                    const ribbon_message = is_expired ? 'Archived' : 'Draft';
                    return (
                      <div className="photoAlbumEntry" data-title={obj.title}>
                        <a
                          href={obj['@id']}
                          title={obj.title}
                          className={'photoAlbumEntryLink'}
                        >
                          <div className="photoAlbumEntryWrapper">
                            <span
                              className="photoAlbumEntryWrapperImg lazy"
                              style={{
                                backgroundImage: `url("${obj['@id']}/image_mini")`,
                              }}
                            />
                          </div>
                          <div className="photoAlbumEntryTitleWrapper">
                            {show_ribbon && (
                              <div className={'ribbon-wrapper'}>
                                {ribbon_message}
                              </div>
                            )}
                            <span className="photoAlbumEntryTitle">
                              {obj.title}
                            </span>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : null;
};

EEARelations.propTypes = {
  content: PropTypes.object,
};

export default EEARelations;
