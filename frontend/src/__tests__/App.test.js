import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from '../App';
import store from '../store';

describe('rendering <App />', () => {
  it('renders app components', () => {
    render(<Provider store = {store}><App /></Provider>);
    expect(screen.getByTestId('container')).toBeTruthy();
  });
});
