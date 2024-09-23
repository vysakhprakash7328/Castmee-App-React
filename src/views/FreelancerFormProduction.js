import React, { useState } from "react";
import MembershipFormProduction from "./MembershipFormProduction";


export default function FreelancerFormProduction({formData, setActivePage, handleFormChange,handlePrevPage,handleNextSignup}) {
    const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option

    // Function to handle option selection
    const handleOptionChange = (option) => {
        setSelectedOption(option);
        const newValue = option === 'Yes'; // If 'Yes' is clicked, set to true, otherwise false
        handleFormChange({ target: { name: 'offcl_mmbrship_or_assction_rltd_to_film_prdction', value: newValue } });

        
    };

    const handleActivePageNull = () => {
        setActivePage(null)
    }

    const handlePrevPageFreelancer = () => {
        setSelectedOption(null);
    }
    return (
        <>
            {selectedOption === 'Yes' ?<>                                                                    <h2 className="title">Membership Details</h2>
 <MembershipFormProduction formData={formData} handleActivePageNull = {handleActivePageNull} handleFormChange={handleFormChange} handlePrevPageFreelancer = {handlePrevPageFreelancer} handleNextSignup={handleNextSignup}/></> :
                <>
                                                                    <h2 className="title">Freelancer Details</h2>

                    <div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" name="worked_projects" value={formData.worked_projects} onChange={handleFormChange} placeholder="Worked Projects" />
                        </div>
                        <div >
                            <label>Official Membership or Association<br /> related to Film Production:</label>
                            <br />
                            <button
                                style={{
                                    marginRight: '8px',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    backgroundColor: selectedOption === 'Yes' ? '#007bff' : '#ccc', // Adjust background color based on selected option
                                    color: selectedOption === 'Yes' ? '#fff' : '#000', // Adjust text color based on selected option
                                    border: 'none',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                                onClick={() => handleOptionChange('Yes')} // Handle click event for "Yes" button
                            >
                                Yes
                            </button>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    backgroundColor: selectedOption === 'No' ? '#007bff' : '#ccc', // Adjust background color based on selected option
                                    color: selectedOption === 'No' ? '#fff' : '#000', // Adjust text color based on selected option
                                    border: 'none',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                                onClick={() => handleOptionChange('No')} // Handle click event for "No" button
                            >
                                No
                            </button>
                        </div>
                    </div>




                    <div className="button-container" style={{ display: 'flex' }}>
                        <input type="submit" className="btn-btn" value="<" style={{ width: '50px', }}  onClick={handlePrevPage}/>
                        {selectedOption === 'No'? <input type="submit" className="btn-btn" value="next" style={{ marginLeft: '150px' }} onClick={handleActivePageNull}/>
                        : <input type="submit" className="btn-btn" value="Next" style={{ marginLeft: '150px' }} disabled />

}
                    </div>

                </>

            }
        </>
    );
}