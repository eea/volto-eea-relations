/**
 * EEA relations reducer.
 * @module reducers/eeaRelations
 */

import { EEA_RELATIONS } from '@eeacms/volto-eea-relations/actionTypes';

const initialState = {
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  subrequests: {},
};

/**
 * Get request key
 * @function getRequestKey
 * @param {string} actionType Action type.
 * @returns {string} Request key.
 */
function getRequestKey(actionType) {
  return actionType.split('_')[0].toLowerCase();
}

/**
 * EEA relations  reducer.
 * @function eeaRelations
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export function eeaRelations(state = initialState, action = {}) {
  let { result } = action;
  switch (action.type) {
    case `${EEA_RELATIONS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${EEA_RELATIONS}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        result,
      };
    case `${EEA_RELATIONS}_FAIL`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
