/* eslint-disable react/prop-types */
import React from 'react';
import QRCode from "react-qr-code";

const Ticket = (props) => {
    const { ticket } = props;

    return (
        <QRCode
            value={`${ticket?.userid}-${ticket?.orderid}-${ticket?.id}`}
            data-testid="qrcode"
        />
    );
}

export default Ticket;