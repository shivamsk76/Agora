import React, { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk';
import uuid from 'react-uuid';





function VideoCall2(props) {
    const [rtc, setRtc] = useState({ client: null, joined: false, published: false, localStream: null, remoteStreams: [], params: {} });
    const [option, setoption] = useState({ appID: "9219c106a4c346a2a79f37b745397758", channel: "shivam", uid: null, token: uuid() });
    const USER_ID = Math.floor(Math.random() * 1000000001);
  
    useEffect(() => {
                       setRtc.client = initClient()
                       setRtc.localStream = createVideo();
    },[] );


 function initClient() {
        rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
        rtc.client.init(option.appID, function () {
            console.log("init success");
        }, (err) => { console.log(err); });
         
        
    }
 
  function createVideo() {
        rtc.localStream = AgoraRTC.createStream({
            streamID: USER_ID,
            audio: true,
            video: true,
            screen: false
        });
        rtc.localStream.init(
            function () {
                console.log("getUserMedia successfully");
                rtc.localStream.play("video");
            },
            function (err) {
                console.log("getUserMedia failed", err);
            }
        );
    }

function joinVideo(){
    rtc.client.join(option.token, option.channel, option.uid, function (uid) {
        console.log("join channel" + option.channel + "success,uid" + uid);
        rtc.params.uid = uid
    }, function (err) {
        console.error("client join failed", err);
    }
    );
}





    return (
        <div>
           <div id="video" style={{ width: "400px", height: "400px" }} />
        </div>
    )
}

export default VideoCall2;
