import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
