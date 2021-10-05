import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import List from '.';

describe('LaureateList', () => {
  it('shows nothing when list is empty', () => {
    render(<List laureates={[]} />);

    return expect(screen).toMatchSnapshot();
  });

  it('shows laureates when not empty', async () => {
    render(
      <List
        laureates={[
          {
            fullName: { en: 'Test laureate' },
            birth: {
              place: {
                city: { en: 'Test city' },
                cityNow: { en: 'Test city now' },
                country: { en: 'Test country now' },
                countryNow: { en: 'Test country now' },
                continent: { en: 'Test continent' },
                locationString: { en: 'Test location string' },
              },
              date: '1970-01-01',
            },
            nobelPrizes: [],
          },
        ]}
      />
    );
    return waitFor(() => screen.getByText('Test laureate'));
  });
});
