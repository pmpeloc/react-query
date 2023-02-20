import { Link, Navigate, useParams } from 'react-router-dom';

import { useIssue } from '../../hooks/useIssue';
import { LoadingIcon } from '../../shared/LoadingIcon';
import { IssueComment } from '../components/IssueComment';

export const IssueView = () => {
  const params = useParams();
  const { id = '0' } = params;

  const { issueQuery, issueCommentsQuery } = useIssue(+id);

  if (issueQuery.isLoading) {
    return <LoadingIcon />;
  }

  if (!issueQuery.data) {
    return <Navigate to='./issues/list' />;
  }

  return (
    <div className='row mb-5'>
      <div className='col-12 mb-3'>
        <Link to='./issues/list'>Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {/* Comentario de otros */}
      {issueCommentsQuery.isLoading && <LoadingIcon />}
      {issueCommentsQuery.data?.map((comment) => (
        <IssueComment key={comment.id} issue={comment} />
      ))}
    </div>
  );
};
