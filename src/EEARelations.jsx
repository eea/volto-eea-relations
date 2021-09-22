import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEEARelations } from './actions';
import { getBaseUrl } from '@plone/volto/helpers';

import './less/EEARelations.less';

import { Portal } from 'react-portal';
import config from '@plone/volto/registry';
import { Tab } from 'semantic-ui-react';
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

  const eeaRelationsConfig = config.settings.eeaRelations;
  const [node, setNode] = React.useState('');
  React.useEffect(() => {
    setNode(document.querySelector(eeaRelationsConfig.parentNodeSelector));
  }, [eeaRelationsConfig.parentNodeSelector]);

  const relation_labels = Object.keys(eeaRelationsItems || {});

  useEffect(() => {
    dispatch(getEEARelations(basePathname));
  }, [dispatch, basePathname]);

  const createTab = React.useCallback(
    (label, index) => {
      const objs = eeaRelationsItems[label];
      return {
        menuItem: label,
        pane: (
          <Tab.Pane className={'eea-tabs-panel'}>
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
                        <div className={'ribbon-wrapper expired'}>
                          <div className="ribbon">{ribbon_message}</div>
                        </div>
                      )}
                      <span className="photoAlbumEntryTitle">{obj.title}</span>
                    </div>
                  </a>
                </div>
              );
            })}
          </Tab.Pane>
        ),
      };
    },
    [eeaRelationsItems],
  );

  return eeaRelationsItems ? (
    <Portal node={node}>
      <div id="relatedItems" className={'relatedItems ui segment'}>
        <h3 className={'notoc relatedItems-header'}>Related content</h3>

        <Tab
          menu={{
            fluid: true,
            vertical: true,
            secondary: true,
            pointing: true,
            className: 'eea-tabs',
          }}
          renderActiveOnly={false}
          grid={{ paneWidth: 10, tabWidth: 2 }}
          panes={relation_labels.map(createTab)}
          className={'eea-tabs-panels'}
        />
      </div>
    </Portal>
  ) : null;
};

EEARelations.propTypes = {
  content: PropTypes.object,
};

export default EEARelations;
