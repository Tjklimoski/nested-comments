import { useCallback, useEffect, useState } from "react";

export function useAsync(func, dependecies = []) {
  // a function that returns an execute function to request the data, and will return the state (loading, error, value) of that request
  const { execute, ...state } = useAsyncInternal(func, dependecies, true);

  // When used as a hook, call immediately when an execute func is returned.
  useEffect(() => {
    execute();
  }, [execute]);

  // return loading, error, value
  return state;
}

// a function version of the hook, where user can execute the function whenever they want in the component.
export function useAsyncFn(func, dependecies = []) {
  return useAsyncInternal(func, dependecies);
}

function useAsyncInternal(func, dependecies, initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  // params are whatever values are passed to the execute() function when called
  // dependecies are passed by user when using the hook or function version, and are scoped to the component / page it's being called in.
  const execute = useCallback((...params) => {
    setLoading(true);
    return func(...params)
      .then(data => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch(err => {
        setValue(undefined);
        setError(err);
        return Promise.reject(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependecies); // eslint-disable-line

  return { loading, error, value, execute };
}
