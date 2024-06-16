import React from 'react';
import '../CSS/AccountGeneralInformation.css'; // Adjust the import path to where your CSS file is located

function AccountGeneralInformation({ details }) {
    return (
      <div className="account-general-information">
        <h2 className="account-type-general-information">{details.type + ' ' + details.subtype}</h2>
        <h2 className="account-value-general-information">{'$' + details.balances[0].current}</h2>
        <div className="account-detail">
          <pre>{JSON.stringify(details, null, 2)}</pre> {/* Display the JSON content */}
        </div>
      </div>
    );
  }
  
  export default AccountGeneralInformation;
