import { eeaRelations } from './reducers';
import EEARelations from './EEARelations';
import { runtimeConfig } from '@plone/volto/runtime_config';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    eeaRelations,
  };

  const appExtras = config.settings.appExtras || [];

  config.settings.eeaRelations = {
    maxAlbumsPerPanel: 4,
    parentNodeSelector: '#page-document',
    envParentNodeSelector:
      runtimeConfig['RAZZLE_EEA_RELATIONS_PARENT_SELECTOR'],
    ...(config.settings.eeaRelations || {}),
  };
  config.settings.eeaRelations.renderToNode =
    config.settings.eeaRelations.envParentNodeSelector ||
    config.settings.eeaRelations.parentNodeSelector;

  config.settings.appExtras = [
    ...appExtras,
    {
      match: '',
      component: EEARelations,
    },
  ];
  return config;
};

export default applyConfig;
