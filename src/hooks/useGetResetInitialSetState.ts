import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

import useFrequencyEffect from './useFrequencyEffect';
type GetStateAction<S> = () => S;
type ResetStateAction = () => void;

type GetInitStateAction<S> = () => S;

type State<S> = [
  S,
  Dispatch<SetStateAction<S>>,
  GetStateAction<S>,
  ResetStateAction,
  GetInitStateAction<S>,
  Dispatch<SetStateAction<S>>,
];
/**
 * @function useGetResetInitialSetState
 * @description 一次满足 useGetState 和 useResetState 和 useInitialState 和 useSetState
 * @param initialState 初始值
 * @returns {State}
 */
export default function useGetResetInitialSetState<S>(initialState: S): State<S> {
  const [state, setState] = useState(initialState);
  const data = useRef<S>(initialState);

  const getState = () => data.current;

  const restState = useCallback(() => {
    setState(initialState);
  }, []);
  
  const setSetState = (value: S | ((value: S) => S)) => {
    setState({
      ...state,
      ...value,
    });
  };
  useFrequencyEffect(
    () => {
      data.current = state;
    },
    1,
    [state],
  );
  const getInitState = () => data?.current as S;
  return [
    state,
    setState,
    getState,
    restState,
    getInitState,
    setSetState
  ];
}
