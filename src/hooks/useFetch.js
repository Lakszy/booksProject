import {useQuery, UseQueryOptions, QueryFunction} from 'react-query';
import { useMemo} from 'react';
import { handleSuccess} from '../lib'


const useFetchData = (
  queryVariable,
  query,
  options,
  config
) => {
  options = options || {};

  const {
    data: response,
    isLoading,
    error,
    refetch,
    isFetched,
    ...rest
  } = useQuery(queryVariable, query, options);

  const data = useMemo(() => {
    if (!isFetched) {
      return;
    } 
    const res = handleSuccess(response);
    console.log('RESPONSE AFTER HANDLESUCCESS 123 ', res);
    if (res?.success){
      console.log('YES THE RESPONSE IS SUCCESS',res)
      return res?.data
    }
    return res;
  }, [isFetched, response]);

  return {data, isLoading, error, refetch,isFetched, ...rest};
};

export default useFetchData;