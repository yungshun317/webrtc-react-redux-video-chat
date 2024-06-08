import React from 'react';

import './IncomingCallDialog.css';
import {acceptIncomingCallRequest, rejectIncomingCallRequest} from "../../../utils/webRTC/webRTCHandler";

const IncomingCallDialog = () => {
    const handleAcceptButtonPressed = () => {
        acceptIncomingCallRequest();
    };

    const handleRejectButtonPressed = () => {
        rejectIncomingCallRequest();
    };

    return (
        <div className='direct_call_dialog background_secondary_color'>
            <span className='direct_call_dialog_caller_name'>Caller</span>
            <div className='direct_call_dialog_button_container'>
                <button className='direct_call_dialog_accept_button' onClick={handleAcceptButtonPressed}>
                    Accept
                </button>
                <button className='direct_call_dialog_reject_button' onClick={handleRejectButtonPressed}>
                    Reject
                </button>
            </div>
        </div>
    );
};

export default IncomingCallDialog;