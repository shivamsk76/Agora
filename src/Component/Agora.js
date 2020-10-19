import React from 'react';
import AgoraRTC from 'agora-rtc-sdk';


function Agora(){

var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
};

var option = {
    appID: "",
    channel: "",
    uid: null,
    token: "your Token"
}

rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
rtc.client.init(option.appID, function () {
    console.log("init success");
}, (err) => { console.log(err); })


rtc.client.join(option.token, option.channel, option.uid, function (uid) {
    console.log("join channel" + option.channel + "success,uid" + uid);
    rtc.params.uid = uid
}, function (err) {
    console.error("client join failed", err);
}
)

rtc.localStream = AgoraRTC.createStream({
    streamID: rtc.params.uid,
    audio: true,
    video: true,
    screen: false
});

rtc.localStream.init(function () {
    console.log("init local stream success");
    rtc.localStream.play("local_stream")
}, function (err) {
    console.error("init local stream failed", err);
});
rtc.client.publish(rtc.localStream,function(err){
    console.log("publish failed");
    console.error(err);
});

rtc.client.on("stream-added",function(evt){
    var remoteStream = evt.stream;
    var id = remoteStream.getID();
    if (id !==rtc.params.uid) {
        rtc.client.subscribe(remoteStream,function(err){
            console.log("stream subscribe failed",err);
        })
        
    }console.log("stream-added remote uid ",id);
});

rtc.client.on("stream-subscribed", function(evt){
    var remoteStream = evt.stream;
    var id = remoteStream.getID();
    
    addView(id);
    remoteStream.play("remote_video_"+id)
    console.log("stream subscribe remote uid", id);
});

rtc.client.on("stream-removed",function(evt){
    var remoteStream = evt.stream;
    var id = remoteStream.getID();

    remoteStream.stop("remote_video_"+id);
    removeView(id);
    console.log("stream removed remote uid",id);
});

rtc.client.leave(function(){
    rtc.localStream.stop();
    rtc.localStream.close();
    while(rtc.remoteStreams.length > 0){
        var stream = rtc.remoteStreams.shift();
        var id = stream.getID();
        stream.stop();
        removeView(id);

    }console.log("client leave channel success");
},function(err){
    console.log('channel leaved failed');
    console.error(err)
});


}

export default Agora;
