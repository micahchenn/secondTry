import React, { useEffect, useState } from 'react';
import '../CSS/AccountGeneralInformation.css';

function AccountGeneralInformation({ details, selectedTimePeriod }) {
  const { final_value, change_in_value, percentage_change, daily_values } = details;
  const [dailyChange, setDailyChange] = useState(0);
  const [dailyPercentageChange, setDailyPercentageChange] = useState(0);

  useEffect(() => {
    if (daily_values.length >= 2) {
      const latestValue = daily_values[daily_values.length - 1].value;
      const previousValue = daily_values[daily_values.length - 2].value;
      const change = latestValue - previousValue;
      const percentageChange = ((change / previousValue) * 100).toFixed(2);
      setDailyChange(change.toFixed(2));
      setDailyPercentageChange(percentageChange);
    }
  }, [daily_values]);

  return (
    <div className="account-general-information-unique-9">
      <div className="final-value-container-unique-9">
        <div className="final-value-unique-9">
          ${final_value.toFixed(2)}
        </div>
        <div className="daily-change-unique-9">
          <div className={`triangle-unique-9 ${dailyChange >= 0 ? 'up' : 'down'}`}></div>
          <span className="gradient-text-unique-9">
            ${Math.abs(dailyChange)} ({dailyPercentageChange}%)
          </span>
        </div>
      </div>
      <div className="returns-container-unique-9">
        <div className="change-container-unique-9">
          <div className="daily-change-line-unique-9">
            <div className={`triangle-unique-9 ${dailyChange >= 0 ? 'up' : 'down'}`}></div>
            <span className="gradient-text-unique-9">
              ${Math.abs(dailyChange)} ({dailyPercentageChange}%)
            </span>
            <span className="time-period-label-unique-9">Day Change</span>
          </div>
          <div className="return-change-unique-9">
            <div className="triangle-unique-9" style={{ transform: change_in_value >= 0 ? 'rotate(0deg)' : 'rotate(180deg)' }}></div>
            <span className="gradient-text-unique-9">
              ${change_in_value.toFixed(2)} ({percentage_change.toFixed(2)}%)
            </span>
            <span className="time-period-label-unique-9">{selectedTimePeriod}</span>
          </div>
        </div>
        <div className="line-unique-9"></div>
        <div className="return-calculations-unique-9">
          <div className="return-section-unique-9">
            <div className="label-unique-9">Return %:</div>
            <div className="value-unique-9 white-text-unique-9">{percentage_change.toFixed(2)}%</div>
          </div>
          <div className="return-section-unique-9">
            <div className="label-unique-9">Return $:</div>
            <div className="value-unique-9 white-text-unique-9">${change_in_value.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccountGeneralInformation.defaultProps = {
  details: {
    final_value: 0,
    change_in_value: 0,
    percentage_change: 0,
    daily_values: [],
  },
  selectedTimePeriod: 'Daily',
};

export default AccountGeneralInformation;
