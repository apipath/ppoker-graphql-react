import React from 'react';
import GitHubButton from 'react-github-btn';

import { GithubIcon } from '../Icons';

const ORG_URL = 'https://github.com/apipath';

function Footer() {
  return (
    <footer className="p-4 text-center text-gray-700">
      <h2 className="mt-4 text-4xl font-semibold tracking-wide text-gray-800">
        Follow us
      </h2>
      <a
        href={ORG_URL}
        aria-label="Follow us on github"
        className="my-8 block w-32 mx-auto"
      >
        <GithubIcon />
      </a>
      <GitHubButton
        href={ORG_URL}
        data-size="large"
        data-show-count={true}
        aria-label="Follow @apipath on GitHub"
      >
        Follow @apipath
      </GitHubButton>
    </footer>
  );
}
export default Footer;
