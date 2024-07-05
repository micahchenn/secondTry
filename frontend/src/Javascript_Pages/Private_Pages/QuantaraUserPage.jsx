import React from 'react';
import '../../Styling_Pages/Private_Pages/QuantaraUserPage.css';
import QuantaraPicture from '../../Styling_Pages/Public_Pictures/QuantaraPicture.png';

function QuantaraUserPage() {
  return (
    <div className="quantara-user-page">
      <img src={QuantaraPicture} alt="Quantara" />
    </div>
  );
}

export default QuantaraUserPage;
