import React, { useState } from "react";

const styles = {
  SelectText: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '42px',
    textAlign: 'center',
    margin: '40px 0',
  },
  CardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', // Reduced gap between cards for smaller screens
    flexWrap: 'wrap', // Allow cards to wrap to the next line on smaller screens
    maxWidth: '800px', // Limit card container width for responsiveness
    margin: '0 auto', // Center align on larger screens
  },
  Card: {
    width: '350px',
    height: '232px',
    backgroundColor: '#282828',
    borderRadius: '24px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    marginBottom: '20px', // Add bottom margin between cards
    cursor: 'pointer', // Change cursor to pointer on hover
    transition: 'transform 0.3s ease-in-out, border-color 0.3s ease-in-out', // Add smooth transition on hover
    '&:hover': {
      transform: 'scale(1.05)', // Scale up card on hover
    },
  },
  SelectContainer: {
    marginTop: '20px',
  },
  SelectLabel: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#ffffff',
  },
  Select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#333',
    outline: 'none',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  },
};

const DobSelection = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Handler functions for updating selected values
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <div style={styles.SelectText}>Select Your Date of Birth</div>

      <div style={styles.CardContainer}>
        <div style={styles.Card}>
          <div style={styles.SelectContainer}>
            <div style={styles.SelectLabel}>Day:</div>
            <select
              style={styles.Select}
              value={selectedDay}
              onChange={handleDayChange}
            >
              <option value="">Select Day</option>
              {/* Generate options for days */}
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div style={styles.SelectContainer}>
            <div style={styles.SelectLabel}>Month:</div>
            <select
              style={styles.Select}
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">Select Month</option>
              {/* Generate options for months */}
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((month, index) => (
                <option key={index + 1} value={index + 1}>{month}</option>
              ))}
            </select>
          </div>

          <div style={styles.SelectContainer}>
            <div style={styles.SelectLabel}>Year:</div>
            <select
              style={styles.Select}
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="">Select Year</option>
              {/* Generate options for years, adjust as needed */}
              {Array.from({ length: 100 }, (_, i) => (
                <option key={2024 - i} value={2024 - i}>{2024 - i}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DobSelection;
