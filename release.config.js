const { files: assets } = require('./package.json')

module.exports = {
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'eslint' }],
    ['@semantic-release/github', { assets }],
    '@semantic-release/npm',
    '@semantic-release/release-notes-generator'
  ]
}
