module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Clarisights Journal', // Navigation and Site Title
  titleAlt: 'Clarisights Journal', // Title for JSONLD
  description: 'Where thoughts from clarisights come alive',
  headline: 'Clarisights - The next gen BI platform for data driven marketing teams', // Headline for schema.org JSONLD
  url: 'https://clarisights-journal.netlify.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  logo:
    'https://clarisights-journal.cdn.prismic.io/clarisights-journal%2F06efbb56-8b0f-469e-83f0-6c3acdcb17de_logo.svg', // Used for SEO
  ogLanguage: 'en_US', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'Clarisights', // shortname for manifest. MUST be shorter than 12 characters
  author: 'Clarisights', // Author for schemaORGJSONLD
  themeColor: '#3D63AE',
  backgroundColor: '#F7F7F7',

  twitter: '@clarisights', // Twitter Username
  facebook: 'Clarisights Journal', // Facebook Site Name
  googleAnalyticsID: 'UA-148226838-1',

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
