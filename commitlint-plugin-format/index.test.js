const { rules } = require('./index.js');
const format = rules['format'];

describe('Commit header Format', () => {
  
  test('It accepts valid format with feat', () => {
    expect(format({ headers: 'feat(MCPE-1234): Add new feature' })).toEqual(expect.arrayContaining([true]));
  });

  test('It accepts valid format with fix', () => {
    expect(format({ header: 'fix(PROJ-5678): Fix bug in feature' })).toEqual(expect.arrayContaining([true]));
  });

  test('It accepts valid format with other git suffix', () => {
    expect(format({ header: 'chore(MCPE-111): Add contribution guidelines' })).toEqual(expect.arrayContaining([true]));
  });

  test('It rejects invalid format without parentheses around the task ID', () => {
    expect(format({ header: 'feat-MCPE-1234: Add new feature' })).toEqual(expect.arrayContaining([false]));
  });

  test('It rejects invalid format without task ID', () => {
    expect(format({ header: 'feat: Add new feature' })).toEqual(expect.arrayContaining([false]));
  });

  test('It rejects missing colon after the task ID', () => {
    expect(format({ header: 'feat(MCPE-1234) Add new feature' })).toEqual(expect.arrayContaining([false]));
  });

  test('It rejects invalid task ID format', () => {
    expect(format({ header: 'feat(ABC-xyz): Add new feature' })).toEqual(expect.arrayContaining([false]));
  });

  test('It rejects invalid commit type (not in the allowed list)', () => {
    expect(format({ header: 'update(MCPE-1234): Update the system' })).toEqual(expect.arrayContaining([false]));
  });

  test('It rejects commit without space after colon', () => {
    expect(format({ header: 'feat(MCPE-1234):Add new feature' })).toEqual(expect.arrayContaining([false]));
  });

  test('It accepts commit with optional exclamation mark', () => {
    expect(format({ header: 'feat(MCPE-1234)!: Add breaking change' })).toEqual(expect.arrayContaining([true]));
  });

  test('It accepts commit with optional question mark', () => {
    expect(format({ header: 'feat(MCPE-1234)?: Add new experimental feature?' })).toEqual(expect.arrayContaining([true]));
  });

  test('It rejects empty body after colon', () => {
    expect(format({ header: 'feat(MCdasdPEw-44126):' })).toEqual(expect.arrayContaining([false]));
  });

  test('It rejects body with only spaces after colon', () => {
    expect(format({ header: 'feat(MCdasdPEw-44126):         ' })).toEqual(expect.arrayContaining([false]));
  });

});