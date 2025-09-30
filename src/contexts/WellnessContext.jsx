import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { generateTips, getTipDetail } from '../aiService/index.js';
import {
  SET_PROFILE,
  SET_CURRENT_SCREEN,
  FETCH_TIPS_LOADING,
  FETCH_TIPS_SUCCESS,
  FETCH_TIPS_FAILURE,
  FETCH_DETAIL_SUCCESS,
  SAVE_TIP,
  REMOVE_TIP,
} from './actions';

// Context Definitions 
const WellnessStateContext = createContext(null);
const WellnessDispatchContext = createContext(null);

// State Initialization
const initialTransientState = {
  profile: null,
  currentTips: [], 
  selectedTip: null,
  selectedTipDetail: null,
  currentScreen: 'Profile',
  isLoading: false,
  error: null,
  savedTips: [],
};

// Reducer Logic
const wellnessReducer = (state, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        error: null,
        isLoading: true,
      };
    case SET_CURRENT_SCREEN:
      return { ...state, currentScreen: action.payload };
    case FETCH_TIPS_LOADING:
      return { ...state, isLoading: true, error: null };
    case FETCH_TIPS_SUCCESS:
      return {
        ...state,
        currentTips: action.payload,
        isLoading: false,
        currentScreen: 'TipBoard',
      };
    case FETCH_TIPS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        selectedTip: action.payload.tip,
        selectedTipDetail: action.payload.detail,
        isLoading: false,
        currentScreen: 'Detail',
      };
    case SAVE_TIP:
      if (state.savedTips.find((tip) => tip.id === action.payload.id)) {
        return state;
      }
      return { ...state, savedTips: [...state.savedTips, action.payload] }; 
    case REMOVE_TIP:
      return {
        ...state,
        savedTips: state.savedTips.filter((tip) => tip.id !== action.payload),
      };
    case 'HYDRATE_SAVED_TIPS':
      return { ...state, savedTips: action.payload || [] };
    default:
      return state;
  }
};

// Provider Component
export const WellnessProvider = ({ children }) => {
  const [savedTips, setSavedTips] = useLocalStorage('aiWellnessBoardTips', []);

  const [state, dispatch] = useReducer(
    (currentState, action) => {
      const newState = wellnessReducer(currentState, action);
      if (action.type === SAVE_TIP || action.type === REMOVE_TIP) {
        setSavedTips(newState.savedTips);
      }
      return newState;
    },
    initialTransientState,
    (initialState) => ({ ...initialState, savedTips })
  );

  useEffect(() => {
    dispatch({ type: 'HYDRATE_SAVED_TIPS', payload: savedTips });
  }, [savedTips]); 

  const fetchTips = useCallback(
    async (profile) => {
      dispatch({ type: FETCH_TIPS_LOADING });
      try {
        const tips = await generateTips(profile);
        dispatch({ type: FETCH_TIPS_SUCCESS, payload: tips });
      } catch (err) {
        dispatch({
          type: FETCH_TIPS_FAILURE,
          payload: err.message || 'Failed to generate tips.',
        });
      }
    },
    [dispatch]
  );

  const fetchTipDetail = useCallback(
    async (tip) => {
      dispatch({ type: FETCH_TIPS_LOADING });
      try {
        const detail = await getTipDetail(tip);
        dispatch({ type: FETCH_DETAIL_SUCCESS, payload: { tip, detail } });
      } catch (err) {
        dispatch({
          type: FETCH_TIPS_FAILURE,
          payload: err.message || 'Failed to fetch tip details.',
        });
      }
    },
    [dispatch]
  );

  const dispatchers = React.useMemo(
    () => ({
      dispatch,
      fetchTips,
      fetchTipDetail,
    }),
    [dispatch, fetchTips, fetchTipDetail]
  );

  return (
    <WellnessDispatchContext.Provider value={dispatchers}>
      <WellnessStateContext.Provider value={state}>
        {children}
      </WellnessStateContext.Provider>
    </WellnessDispatchContext.Provider>
  );
};

// Custom Hooks
export const useWellnessState = () => {
  const context = useContext(WellnessStateContext);
  if (context === null) {
    throw new Error('useWellnessState must be used within a WellnessProvider');
  }
  return context;
};

export const useWellnessDispatch = () => {
  const context = useContext(WellnessDispatchContext);
  if (context === null) {
    throw new Error('useWellnessDispatch must be used within a WellnessProvider');
  }
  return context;
};
