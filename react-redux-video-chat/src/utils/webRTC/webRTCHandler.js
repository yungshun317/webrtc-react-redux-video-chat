import {setLocalStream} from "../../store/actions/callActions";
import store from "../../store/store";

const defaultConstrains = {
    video: true,
    audio: true
};

export const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia(defaultConstrains)
        .then(stream => {
            store.dispatch(setLocalStream(stream));
        })
        .catch(err => {
            console.log('error occured when trying to get an access to get local stream');
            console.log(err);
        });
};