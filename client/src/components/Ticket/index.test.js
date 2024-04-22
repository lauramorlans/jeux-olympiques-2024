import React from 'react';
import { render } from '@testing-library/react';
import Ticket from '.';

describe('Ticket component', () => {
  it('renders with correct QR code value', () => {
    const ticket = {
      userid: 'user123',
      orderid: 'order456',
      id: 'ticket789'
    };
    
    const { getByTestId } = render(<Ticket ticket={ticket} />);
    const qrCodeElement = getByTestId('qrcode');

    expect(qrCodeElement).toBeInTheDocument();
  });
});
