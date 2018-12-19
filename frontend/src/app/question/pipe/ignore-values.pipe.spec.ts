import {IgnoreValuesPipe} from './ignore-values.pipe';

describe('IgnoreValuesPipe', () => {
  it('create an instance', () => {
    const pipe = new IgnoreValuesPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(['a', 'b', 'c'], ['a'])).toBe(['b', 'c']);
  });
});
