import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
export default function AddressFormArtist({formDataSignup,handleFormChange,handleNextPageArtist,handlePrevPage}) {
    return (
        <>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="first_name" value={formDataSignup.first_name} onChange={handleFormChange} placeholder="Firstname" />
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="last_name" value={formDataSignup.last_name} onChange={handleFormChange} placeholder="Lastname" />
            </div>
            <div className="input-field">
                <i className="fas fa-calendar"></i>
                <input type="date" name="date_of_birth" value={formDataSignup.date_of_birth} onChange={handleFormChange} placeholder="DateofBirth" />
            </div>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="female" name="gender" checked={formDataSignup.gender === 'female'}onChange={(event) => handleFormChange(event)} control={<Radio />} label="Female" />
                    <FormControlLabel value="male" name="gender" checked={formDataSignup.gender === 'male'}onChange={(event) => handleFormChange(event)} control={<Radio />} label="Male" />
                    <FormControlLabel value="other" name="gender" checked={formDataSignup.gender === 'other'}onChange={(event) => handleFormChange(event)} control={<Radio />} label="Other" />

                </RadioGroup>
            </FormControl>

            <div className="input-field">
                <i className="fas fa-phone"></i>
                <input type="text" name="phone" value={formDataSignup.phone} onChange={handleFormChange} placeholder="Contact Number" />
            </div>
            <div className="button-container" style={{ display: 'flex' }}>
                <input type="submit" className="btn-btn" value="<" style={{width:'50px',}} onClick={handlePrevPage}/>
                <input type="submit" className="btn-btn" value="Next" style={{ marginLeft: '150px' }} onClick={handleNextPageArtist}/>
            </div>        </>
    );
}