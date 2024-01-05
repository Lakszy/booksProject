
import { handleSuccess } from '../lib'
import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
} from 'react-query';
import {useMemo} from 'react';

export default function usePost(
  mutationFunction,
  options,
) {
  const {
    data: response,
    error,
    isLoading,
    mutate,
    mutateAsync
  } = useMutation(mutationFunction, options);

  const data = useMemo(() => {
    console.log('RESPONSE CHANGED ', response);
    const res = handleSuccess(!!response?.data ? response?.data : response);
    console.log('RESPONSE CHANGED AFTER HANDLE SUCCESS USEPOST ', res)
    if (res?.success && res?.data) {
      console.log('YES THE RESPONSE IS SUCCESS', res)
      return res?.data
    }
    return res;
  }, [response]);


  return {mutateAsync, mutate, isLoading, error, data};
}

