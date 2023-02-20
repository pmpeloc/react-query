import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { IssueCommentI } from '../../api/interfaces/issue.comment.interface';
import { Issue } from '../../api/interfaces/issue.interface';

interface Props {
  issue: Issue | IssueCommentI;
}

export const IssueComment: FC<Props> = ({ issue }) => {
  return (
    <div className='col-12'>
      <div className='card border-white mt-2'>
        <div className='card-header bg-dark'>
          <img
            src={issue.user.avatar_url}
            alt='User Avatar'
            className='avatar'
          />
          <span className='mx-2'>{`${issue.user.login} commented`}</span>
        </div>
        <div className='card-body text-dark'>
          <ReactMarkdown>{issue.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
