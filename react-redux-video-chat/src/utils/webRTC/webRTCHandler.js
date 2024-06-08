import {
    setLocalStream,
    setCallState,
    callStates,
    setCallingDialogVisible,
    setCallerUsername, setCallRejected
} from "../../store/actions/callActions";
import store from "../../store/store";
import * as wss from "../wssConnection/wssConnection";

const preOfferAnswers = {
    CALL_ACCEPTED: "CALL_ACCEPTED",
    CALL_REJECTED: "CALL_REJECTED",
    CALL_NOT_AVAILABLE: "CALL_NOT_AVAILABLE"
};

const defaultConstraints = {
    video: true,
    audio: true
};

export const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia(defaultConstraints)
        .then(stream => {
            store.dispatch(setLocalStream(stream));
            store.dispatch(setCallState(callStates.CALL_AVAILABLE));
        })
        .catch(err => {
            console.log('error occured when trying to get an access to get local stream');
            console.log(err);
        });
};

let connectedUserSocketId;

export const callToOtherUser = (calleeDetails) => {
    connectedUserSocketId = calleeDetails.socketId;
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
    store.dispatch(setCallingDialogVisible(true));
    wss.sendPreOffer({
        callee: calleeDetails,
        caller: {
            username: store.getState().dashboard.username
        }
    });
};

export const handlePreOffer = (data) => {
    if (checkIfCallIsPossible()) {
        connectedUserSocketId = data.callerSocketId;
        store.dispatch(setCallerUsername(data.callerUsername));
        store.dispatch(setCallState(callStates.CALL_REQUESTED));
    } else {
        wss.sendPreOfferAnswer({
            callerSocketId: data.callerSocketId,
            answer: preOfferAnswers.CALL_NOT_AVAILABLE
        });
    }
};

export const acceptIncomingCallRequest = () => {
    wss.sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_ACCEPTED
    });
};

export const rejectIncomingCallRequest= () => {
    wss.sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_REJECTED
    });

    resetCallData();
};

export const handlePreOfferAnswer = (data) => {
    store.dispatch(setCallingDialogVisible(false));

    if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
        // Send WebRTC offer
    } else {
        let rejectionReason;
        if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
            rejectionReason = "Callee is not able to pick up the call right now";
        } else {
            rejectionReason = "Call rejected by the callee";
        }
        store.dispatch(setCallRejected({
            rejected: true,
            reason: rejectionReason
        }));
    }
};

export const checkIfCallIsPossible = () => {
    if (store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE) {
        return false;
    } else {
        return true;
    }
};

export const resetCallData = () => {
    connectedUserSocketId = null;
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};