import React, { useState } from "react";

export default function SignupFormArtist({ formDataSignup, handleFormChange, handleSubmit, handlePrevPageArtist }) {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [verificationError, setVerificationError] = useState('');

    const sendOtp = () => {
        // Call your OTP service here to send OTP to the user's email
        // You need to replace this with actual code to send OTP
        // For example, using a third-party service like Twilio, Nexmo, or Firebase
        // Once OTP is sent successfully, set otpSent to true
        setOtpSent(true);
    };

    const verifyOtp = () => {
        // Call your OTP service here to verify the OTP entered by the user
        // You need to replace this with actual code to verify OTP
        // For example, if you're using Firebase, you can use Firebase Authentication
        // If OTP is verified successfully, proceed with form submission or other actions
        // Otherwise, set an error message
        if (otp === '123456') { // Replace '123456' with the actual OTP received
            // OTP is correct, proceed with next step
            handleNextPageArtist();
        } else {
            setVerificationError('Invalid OTP. Please try again.');
        }
    };

    return (
        <>
            <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" value={formDataSignup.email} onChange={handleFormChange} placeholder="Email" />
            </div>
            {!otpSent ? (
                <div className="button-container">
                    <button className="btn-btn" onClick={sendOtp}>Send OTP</button>
                </div>
            ) : (
                <>

                    <div className="input-field">
                        <i className="fas fa-key"></i>
                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    {verificationError && <p style={{ color: 'red' }}>{verificationError}</p>}
                    <div className="button-container">
                        <button className="btn-btn" onClick={verifyOtp}>Verify OTP</button>
                    </div>
                </>
            )}

            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="username" value={formDataSignup.username} onChange={handleFormChange} placeholder="Username" />
            </div>

            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="password" value={formDataSignup.password} onChange={handleFormChange}  placeholder="Password" />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="confirm_password" value={formDataSignup.confirm_password} onChange={handleFormChange} placeholder="Repeat Password" />
            </div>
            <div className="button-container" style={{ display: 'flex' }}>
                <input type="submit" className="btn-btn" value="<" style={{ width: '50px', }} onClick={handlePrevPageArtist} />
                <input type="submit" className="btn-btn" value="Submit" style={{ marginLeft: '150px' }} onClick={handleSubmit} />
            </div>
        </>
    );
}
