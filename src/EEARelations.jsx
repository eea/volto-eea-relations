import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEEARelations } from './actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { isEqual } from 'lodash';

import './less/EEARelations.less';

import { Portal } from 'react-portal';
import config from '@plone/volto/registry';
import { Tab, Pagination } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
const messages = defineMessages({
  draft: {
    id: 'Draft',
    defaultMessage: 'Draft',
  },
  archived: {
    id: 'Archived',
    defaultMessage: 'Archived',
  },
  related_content: {
    id: 'Related Content',
    defaultMessage: 'Related Content',
  },
});

/**
 * @summary The React component that shows the related items of the current object.
 */
const EEARelations = (props) => {
  const { content, pathname, intl } = props;
  const dispatch = useDispatch();
  const contentId = content?.['@id'] || '';

  const basePathname = getBaseUrl(pathname);
  const contentContainsPathname = contentId && contentId.endsWith(pathname);
  const fetchCondition = pathname === basePathname;
  const browserCondition =
    (__CLIENT__ && window.location.href.endsWith(basePathname)) || false;

  const eeaRelationsItems = useSelector((state) => {
    if (state?.eeaRelations?.eea?.loaded === true) {
      return state?.eeaRelations?.result?.items;
    }
    return null;
  });
  const pageWidth = useSelector((state) => {
    return state?.screen?.page?.width;
  });

  const [options, setOptions] = React.useState({});

  const currentPageRef = useRef({});

  React.useEffect(() => {
    if (pageWidth <= 568) {
      const mobileOptions = {
        menu: { vertical: true },
        grid: { tabWidth: 12, paneWidth: 12 },
      };
      if (!isEqual(options, mobileOptions)) {
        setOptions(mobileOptions);
      }
    } else if (pageWidth <= 1024) {
      const tabletOptions = {
        menu: { vertical: false },
      };
      if (!isEqual(options, tabletOptions)) {
        setOptions(tabletOptions);
      }
    } else {
      if (Object.keys(options).length) {
        setOptions({});
      }
    }
  }, [pageWidth, options]);

  const eeaRelationsConfig = config.settings.eeaRelations;
  const portal_node = eeaRelationsConfig.renderToNode;

  const relation_labels = Object.keys(eeaRelationsItems || {});

  const handleQueryPaginationChange = (e, { activePage }) => {
    const values = currentPageRef.current;
    const target = e.target;
    const panel = target.closest('.eea-tabs-panel');
    const albums = panel.querySelectorAll('.photoAlbumEntry');
    const panelSize = values.maxPanelSize;
    const startIndex = (activePage - 1) * panelSize - 1;
    const endIndex = activePage * panelSize - 1;
    albums.forEach((album, index) => {
      if (index > startIndex && index <= endIndex) {
        album.classList.remove('is-hidden');
      } else {
        album.classList.add('is-hidden');
      }
    });
  };

  useEffect(() => {
    if (fetchCondition && contentContainsPathname && browserCondition) {
      dispatch(getEEARelations(basePathname));
    }
  }, [
    dispatch,
    basePathname,
    browserCondition,
    fetchCondition,
    contentContainsPathname,
  ]);

  const createTab = React.useCallback(
    (label, index) => {
      const objs = eeaRelationsItems[label];
      const totalObjs = objs.length;
      const maxPanelSize = eeaRelationsConfig.maxAlbumsPerPanel;
      const hasManyObjs = totalObjs > maxPanelSize;
      const totalPages = Math.ceil(totalObjs / maxPanelSize);
      currentPageRef.current = {
        totalPages: totalPages,
        totalObjs: totalObjs,
        maxPanelSize: maxPanelSize,
      };
      return {
        menuItem: label,
        pane: (
          <Tab.Pane className={'eea-tabs-panel'} key={label} as={'div'}>
            {objs.map((obj, index) => {
              const review_state = obj['review_state'];
              const is_expired = obj['is_expired'];
              const show_ribbon =
                is_expired || review_state !== 'published' ? true : false;
              const ribbon_message = is_expired
                ? intl.formatMessage(messages.archived)
                : intl.formatMessage(messages.draft);
              return (
                <div
                  className={
                    index >= maxPanelSize
                      ? 'photoAlbumEntry is-hidden'
                      : 'photoAlbumEntry'
                  }
                  data-title={obj.title}
                  key={obj.title}
                >
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
            {hasManyObjs ? (
              <Pagination
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                boundaryRange={0}
                totalPages={totalPages}
                onPageChange={handleQueryPaginationChange}
              />
            ) : (
              ''
            )}
          </Tab.Pane>
        ),
      };
    },
    [eeaRelationsItems, eeaRelationsConfig.maxAlbumsPerPanel, intl],
  );

  return browserCondition && fetchCondition && eeaRelationsItems ? (
    <Portal node={document.querySelector(portal_node)}>
      <div className="related-wrapper fullwidth-bg eea-block bg-secondary">
        <div id="relatedItems" className={'relatedItems'}>
          <h3 className={'notoc relatedItems-header'}>
            {intl.formatMessage(messages.related_content)}
          </h3>
          <Tab
            menu={{
              fluid: true,
              vertical: true,
              secondary: true,
              pointing: true,
              className: 'eea-tabs',
              ...(options.menu || {}),
            }}
            renderActiveOnly={false}
            grid={{
              paneWidth: 10,
              tabWidth: 2,
              stackable: true,
              relaxed: true,
              ...(options.grid || {}),
            }}
            panes={relation_labels.map(createTab)}
            className={'eea-tabs-panels'}
          />
        </div>
      </div>
    </Portal>
  ) : null;
};

EEARelations.propTypes = {
  content: PropTypes.object,
};
export default injectIntl(EEARelations);
