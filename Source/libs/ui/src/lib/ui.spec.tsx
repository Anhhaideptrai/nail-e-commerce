import { render } from '@testing-library/react';

import { Button } from './ui';

describe('Button', () => {
  it('should render successfully', () => {
    const { getByRole } = render(<Button>Save</Button>);
    expect(getByRole('button', { name: 'Save' })).toBeTruthy();
  });
});
