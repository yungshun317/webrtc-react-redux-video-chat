import {setLocalStream, setCallState, callStates} from "../../store/actions/callActions";
import store from "../../store/store";

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