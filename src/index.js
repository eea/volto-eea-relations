import { eeaRelations } from './reducers';
import EEARelations from './EEARelations';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    eeaRelations,
  };

  const appExtras = config.settings.appExtras || [];

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
