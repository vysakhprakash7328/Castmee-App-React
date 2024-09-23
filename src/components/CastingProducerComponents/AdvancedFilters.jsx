import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const styles = {
  container: {
    marginTop: "20px",
    width: "100%",
    display: "flex",
  },
  filtersColumn: {
    flex: "0 0 170px", // Decrease width of filter column
    overflowY: "auto", // Enable vertical scrolling if content overflows
    maxHeight: "calc(100vh - 20px)", // Adjust height based on viewport
    paddingRight: "20px",
  },
  filterButton: {
    cursor: "pointer",
    width: "100%",
    height: "48px",
    margin: "10px 0",
    padding: "0 12px",
    border: "0",
    boxSizing: "border-box",
    borderRadius: "5px",
    backgroundColor: "#F7C51C",
    color: "#ffffff",
    fontSize: "16px",
    fontFamily: "Nanum Gothic",
    fontWeight: 600,
    lineHeight: "48px",
    textAlign: "center",
    outline: "none",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "background-color 0.3s, box-shadow 0.3s",
  },
  filterButtonHover: {
    backgroundColor: "#357ABD", // Darker shade for active filter
  },
  optionsColumn: {
    flex: 1,
    overflowY: "auto", // Allow scrolling if needed
    maxHeight: "calc(100vh - 20px)", // Adjust height based on viewport
    padding: "20px", // Add padding for spacing
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
  },
  filterValueButton: {
    cursor: "pointer",
    minWidth: "71px",
    height: "36px",
    margin: "10px 0",
    padding: "0 12px",
    border: "1px solid transparent", // Default border
    color: "#161616", // Text color to match filter color
    fontSize: "14px",
    fontFamily: "Nanum Gothic",
    fontWeight: 800,
    lineHeight: "8px",
    textAlign: "center",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition:
      "background-color 0.3s, box-shadow 0.3s, color 0.3s, border 0.3s", // Transition for border as well
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center text horizontally and vertically
  },
  filterValueButtonSelected: {
    border: "3px solid #32a852", // Border for selected filter value
  },
  filterValueButtonHover: {
    backgroundColor: "#F7C51C", // Highlight color on hover
    color: "#ffffff", // Text color on hover
  },
};

const AdvancedFilters = ({
  filterData,
  handleApplyFilters,
  setSelectedOptions,
  selectedOptions,
}) => {
  const [selectedKey, setSelectedKey] = useState(null);

  const toggleDetails = (key) => {
    setSelectedKey(key === selectedKey ? null : key);
  };

  const handleOptionSelect = (filterKey, optionKey) => {
    setSelectedOptions(prev => {
      const newSelection = { ...prev };

      // Set the selected option for the filter key, clear any previously selected option
      newSelection[filterKey] = optionKey;

      return newSelection;
    });

    handleApplyFilters();
  };

  useEffect(() => {
    console.log("Selected options in AdvancedFilters:", selectedOptions);
  }, [selectedOptions]);

  return (
    <Container fluid style={styles.container}>
      <Row noGutters>
        <Col style={styles.filtersColumn}>
          {Object.keys(filterData).map((filterKey) => (
            <button
              style={{
                ...styles.filterButton,
                ...(selectedKey === filterKey && styles.filterButtonHover),
              }}
              onClick={() => toggleDetails(filterKey)}
              key={filterKey}
            >
              {filterKey} ({selectedOptions[filterKey] ? selectedOptions[filterKey].length : 0})
            </button>
          ))}
        </Col>
        <Col style={styles.optionsColumn}>
          {selectedKey && filterData[selectedKey] && (
            <div className="d-flex flex-wrap justify-content-center">
              {Object.entries(filterData[selectedKey]).map(([key, value], index) => (
                <Card
                  className="mb-3"
                  style={{
                    ...styles.filterValueButton,
                    ...(selectedOptions[selectedKey] && selectedOptions[selectedKey].includes(key)
                      ? styles.filterValueButtonSelected
                      : {}),
                  }}
                  key={index}
                  onClick={() => handleOptionSelect(selectedKey, key)}
                >
                  <Card.Body>{value}</Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdvancedFilters;
