import { useQuery } from '@tanstack/react-query';

import { Issue, State } from '../api/interfaces/issue.interface';
import { githubApi } from '../api/githubApi';
import { sleep } from '../helper/sleep';
import { useEffect, useState } from 'react';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', `${page}`);
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery(['issues', { state, labels, page }], () =>
    getIssues({ labels, state, page })
  );

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  return {
    // Properties
    issuesQuery,
    // Getter
    page: issuesQuery.isFetching ? 'Loading...' : page,
    // Methods
    nextPage,
    prevPage,
  };
};
