import React from "react";
export default function AddressFormProducer({formData, handleFormChange,handleNextPage,handlePrevPage}) {
    return (
        <>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} placeholder="Firstname" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} placeholder="Lastname" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username" />
            </div>
           

            <div className="input-field">
                <i className="fas fa-phone"></i>
                <input type="text" name="contact_no" value={formData.contact_no}
            onChange={handleFormChange} placeholder="Contact Number" />
            </div>

            <div className="button-container" style={{ display: 'flex' }}>
                <input type="submit" className="btn-btn" value="<" style={{width:'50px',}} onClick={handlePrevPage}/>
                <input type="submit" className="btn-btn" value="Next" style={{ marginLeft: '150px' }} onClick={handleNextPage}/>
            </div>

        </>
    );
}