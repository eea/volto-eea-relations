import { EEA_RELATIONS } from '@eeacms/volto-eea-relations/actionTypes';

/**
 * getEEARelations function.
 * @function getEEARelations
 * @param {item} url URL.
 * @returns {Object} Object.
 */
export function getEEARelations(item) {
  return {
    type: EEA_RELATIONS,
    request: {
      op: 'get',
      path: `${item}/@eea.relations`,
      headers: {
        Accept: 'application/json',
      },
    },
  };
}
