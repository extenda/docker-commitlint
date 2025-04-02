const enableFormatCheck = process.env.FORMAT_CHECK === "true";

module.exports = {
  extends: [
    '@commitlint/config-conventional',
  ],
  plugins: [
    'tense',
    'format'
  ],
  rules: {
    'imperative-tense': [2, 'always'],
    'scope-case': [0, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'format': [enableFormatCheck ? 2 : 0 , 'always'],
  }
};
