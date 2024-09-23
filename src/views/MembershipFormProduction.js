import React from "react";

export default function MembershipFormProduction({formData,handleActivePageNull, handleFormChange,handlePrevPageFreelancer,handleNextSignup}) {
    return (
        <>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="membership_id" value={formData.membership_id} onChange={handleFormChange} placeholder="Membership ID" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="membership_name" value={formData.membership_name} onChange={handleFormChange} placeholder="Membership Name" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="reference_id" value={formData.reference_id} onChange={handleFormChange} placeholder="Reference ID" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="reference_contact_no" value={formData.reference_contact_no} onChange={handleFormChange} placeholder="Reference Contact No" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="project_name" value={formData.project_name} onChange={handleFormChange} placeholder="Project Name" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="project_type" value={formData.project_type} onChange={handleFormChange} placeholder="Project Type" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="project_location" value={formData.project_location} onChange={handleFormChange} placeholder="Project Location" />
            </div>
           

            <div className="button-container" style={{ display: 'flex' }}>
                <input type="submit" className="btn-btn" value="<" style={{width:'50px',}} onClick={handlePrevPageFreelancer}/>
                <input type="submit" className="btn-btn" value="Next" style={{ marginLeft: '150px' }}  onClick={handleActivePageNull} />
            </div>
        </>
    );
}