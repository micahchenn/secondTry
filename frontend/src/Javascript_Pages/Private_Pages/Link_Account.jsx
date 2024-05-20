import React from 'react';
import api from '../../api';
import '../../Styling_Pages/Private_Pages/Link_Account.css'; // Import the CSS file

class Link_Account extends React.Component {
  linkAccount = async () => {
    try {
      const response = await api.post('/link-account', {
        // Add any data you need to send here
      });
      console.log(response.data);
    } catch (error) {
      console.error('Failed to link account:', error);
    }
  }

  render() {
    return (
      <div className="link-account">
        <h1>Link Accountasd</h1>
        <button className="link-account-button" onClick={this.linkAccount}>Link Account</button>
      </div>
    );
  }
}

export default Link_Account;