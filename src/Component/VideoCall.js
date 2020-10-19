import React,{useState,useEffect, useRef} from 'react';
import AgoraRTC from 'agora-rtc-sdk';
import styled from "styled-components";
import uuid from 'react-uuid';


const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

function VideoCall() {
   const [client, setClient] = useState(null);
   const [joined, setJoined] = useState(false);
   const [published, setPublished] = useState(false);
   const [localStream, setLocalStream] = useState(null);
   const [remoteStream, setRemoteStream] = useState([]);
   const [params, setParams] = useState({});
   const [appID, setAppID] = useState("9219c106a4c346a2a79f37b745397758");
   const [channel, setChannel] = useState("");
   const [uid, setUid] = useState(null);
   const [token, setToken] = useState(uuid());
   const [id, setId] = useState('');
   
   const vref = useRef()
   


   useEffect(()=> {})

return (
    <div>
        <video ref={vref} id="agora-video" style={{ width: "400px", height: "400px" }}/>
    </div>
)}

export default  VideoCall;



