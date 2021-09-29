import { eeaRelations } from './reducers';
import EEARelations from './EEARelations';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    eeaRelations,
  };

  const appExtras = config.settings.appExtras || [];

  config.settings.eeaRelations = {
    parentNodeSelector: '#page-document',
    envParentNodeSelector: 'RAZZLE_EEA_RELATIONS_PARENT_SELECTOR',
  };

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
