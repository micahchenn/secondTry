import React, { useEffect, useState } from 'react';
import '../../Styling_Pages/Static_Elements/CompanyProfile.css';
import api from '../../api'; // replace with the actual path to your API

function CompanyProfile({ symbol }) {
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`stocks/get-company-profile/${symbol}`);
        setData(response.data[0]); // Assuming the response is an array and we need the first element
      } catch (error) {
        console.error('Error fetching company profile:', error);
      }
    };

    fetchData();
  }, [symbol]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="company-profile-container">
      <h2 className="company-profile-header">
        About {data && data.companyName}
        {data && <img src={data.image} alt={`${data.companyName} logo`} />}
      </h2>
      <hr className="company-profile-divider" />
      {data ? (
        <div>
          <p className="company-profile-description">
            {showMore ? data.description : `${data.description.substring(0, 200)}...`}
            <button onClick={handleShowMore} className="show-more-button">
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          </p>
          <div className="company-profile-details">
            <div>
              <p><strong>Sector</strong> {data.sector}</p>
              <p><strong>Industry</strong> {data.industry}</p>
              <p><strong>Founded</strong> {data.ipoDate.split('-')[0]}</p>
            </div>
            <div>
              <p><strong>CEO</strong> {data.ceo}</p>
              <p><strong>Headquarters</strong> {data.city}, {data.state}</p>
              <p><strong>IPO Date</strong> {data.ipoDate}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="company-profile-filler-text">Loading...</p>
      )}
    </div>
  );
}

export default CompanyProfile;
