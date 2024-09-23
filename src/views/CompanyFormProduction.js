import React from "react";

export default function CompanyFormProduction({formData, handleFormChange,handlePrevPage,handleNextSignup}) {
    return (
        <>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="company_name" value={formData.company_name} onChange={handleFormChange} placeholder="Company Name" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="company_registration" value={formData.company_registration} onChange={handleFormChange} placeholder="Compnay Registration" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="company_address" value={formData.company_address} onChange={handleFormChange} placeholder="Company Address" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="tid" value={formData.tid} onChange={handleFormChange} placeholder="Tax Identification No" />
            </div>
           
           
            <div className="button-container" style={{ display: 'flex' }}>
                <input type="submit" className="btn-btn" value="<" style={{width:'50px',}} onClick={handlePrevPage}/>
                <input type="submit" className="btn-btn" value="Next" style={{ marginLeft: '150px' }} onClick={handleNextSignup}/>
            </div>

        </>
    );
}