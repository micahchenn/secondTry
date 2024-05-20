import React from 'react';
import api from '../../api';

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
      <div>
        <h1>Link Account</h1>
        <button onClick={this.linkAccount}>Link Account</button>
      </div>
    );
  }
}

export default Link_Account;