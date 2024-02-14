import React from 'react';
import { QRCode } from 'qrcode.react';

function QRCodeDisplay({ url }) {
  return (
    <div>
      <QRCode value={url} size={128} level={"H"} includeMargin={true} />
    </div>
  );
}

export default QRCodeDisplay;
