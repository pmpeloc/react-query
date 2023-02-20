import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../api/githubApi';
import { IssueCommentI } from '../api/interfaces/issue.comment.interface';
import { Issue } from '../api/interfaces/issue.interface';

export const getIssueDetail = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);

  return data;
};

export const getIssueComments = async (
  issueNumber: number
): Promise<IssueCommentI[]> => {
  const { data } = await githubApi.get<IssueCommentI[]>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(['issue', issueNumber], () =>
    getIssueDetail(issueNumber)
  );

  const issueCommentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issueQuery.data!.number),
    { enabled: issueQuery.data !== undefined }
  );

  return { issueQuery, issueCommentsQuery };
};
