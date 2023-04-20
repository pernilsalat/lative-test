import { Dispatch, useEffect, useReducer } from 'react';
import { ResponseState as State } from '../types';
import { identity } from '../utils';

interface Options<T> extends RequestInit {
  dataParser?(response: unknown): T;
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };
const getInitialState = <T>(): State<T> => ({
  error: null,
  data: null,
  loading: true,
});

const fetchReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  const initialState: State<T> = getInitialState<T>();

  switch (action.type) {
    case 'loading':
      return { ...initialState, loading: true };
    case 'fetched':
      return { ...initialState, data: action.payload, loading: false };
    case 'error':
      return { ...initialState, error: action.payload, loading: false };
    default:
      return state;
  }
};

export function useFetch<T = unknown>(url: string, options?: Options<T>): State<T> {
  const dataParser = options?.dataParser || identity;
  const [state, dispatch]: [State<T>, Dispatch<Action<T>>] = useReducer(
    fetchReducer<T>,
    getInitialState<T>()
  );

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      if (!state.loading) dispatch({ type: 'loading' });

      try {
        const response: Response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const responseJSON = await response.json();

        dispatch({ type: 'fetched', payload: dataParser(responseJSON) });
      } catch (error) {
        dispatch({ type: 'error', payload: error as Error });
      }
    };

    fetchData();
  }, [url]);

  return state;
}
