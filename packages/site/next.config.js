const withDoctocat = require('@primer/doctocat-nextjs/doctocat.config.js')

module.exports = {
  ...withDoctocat({
    output: 'export',
    basePath: process.env.GITHUB_ACTIONS === 'true' ? '/doctocat-nextjs' : '',
    publicRuntimeConfig: {
      siteTitle: 'Doctocat',
      repo: 'https://github.com/primer/doctocat-nextjs',
      repoSrcPath: 'packages/site', // folder path to your site root. Helpful for monorepos.
      sidebarLinks: [
        {
          title: 'GitHub',
          href: 'https://github.com/primer/doctocat-nextjs',
          leadingIcon: 'repo',
        },
        {
          title: 'Primer',
          href: 'https://primer.style',
          leadingIcon: 'org',
        },
      ],
    },
  }),
}
