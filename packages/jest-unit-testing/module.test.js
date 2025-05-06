// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing sum -- handles large numbers', () => {
    const expected = 1e+308 + 1e+308; // Might be Infinity due to JS number limits
    const got = mut.sum(1e+308, 1e+308);
    expect(got).toBe(expected);
  });

test('Testing div -- success', () => {
    const expected = -12;
    const got = mut.sum(-30, 18);
    expect(got).toBe(expected);
  });

test('Testing div -- handles division by zero', () => {
    const expected = Infinity;
    const got = mut.div(10, 0);
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- catching bug (string with only spaces)', () => {
    const expected = false;
    const got = mut.containsNumbers('  ');
    expect(got).toBe(expected);
  });
  
test('Testing containsNumbers -- returns true for string with multi-digit number', () => {
    const expected = true;
    const got = mut.containsNumbers('ab c123x yz');
    expect(got).toBe(expected);
});