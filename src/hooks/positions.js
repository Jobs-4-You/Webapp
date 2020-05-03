import { useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { POSITIONS } from 'gql/queries';

export default (avamCode) => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(POSITIONS, {
    variables: { professionCodes: [avamCode], page },
  });

  console.log(error);
  if (loading || error) return { positions: [], loading };

  const {
    positions: { positions, totalCount },
  } = data;
  return { positions, totalCount, page, setPage };
};
