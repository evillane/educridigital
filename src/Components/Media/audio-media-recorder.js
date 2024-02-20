import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import audiorecorder from '../../Assets/audio/audiorecorderwhite.png';
import stopaudio from '../../Assets/audio/stopaudio.png';
import classes from './media-recorder.module.css';
import Aux from '../../Hoc/Aux2/Aux_';
import AudioReproducer from './audio-reproducer';

const AudioMediaRecorder = ( props ) => {

    const { 
      onHandleChangeBlob,
      isVisibleReproducer 
    } = props;
    
    const {
      status,
      startRecording,
      stopRecording,
      pauseRecording,
      mediaBlobUrl, 
    } = useReactMediaRecorder({
      video: false,
      audio: true,
      echoCancellation: true,
      onStop: onStopRecording
    });

    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      let intervalId;
  
      if (isActive) {
        intervalId = setInterval(() => {
          const secondCounter = counter % 60;
          const minuteCounter = Math.floor(counter / 60);
  
          let computedSecond =
            String(secondCounter).length === 1
              ? `0${secondCounter}`
              : secondCounter;
          let computedMinute =
            String(minuteCounter).length === 1
              ? `0${minuteCounter}`
              : minuteCounter;
  
          setSecond(computedSecond);
          setMinute(computedMinute);
  
          setCounter((counter) => counter + 1);
        }, 1000);
      }
      return () => clearInterval(intervalId);
    }, [isActive, counter]);

    function stopTimer() {
      setIsActive(false);
      setCounter(0);
      setSecond("00");
      setMinute("00");    
    }
  
    function onStopRecording(blobUrl,blob) {
      onHandleChangeBlob(blobUrl); 
    }
  
  return (<Aux>
    <div style={{ marginLeft: "10px", fontSize: "20px" }}>
        <div
          style={{
            textTransform: "capitalize",
            fontFamily: "sans-serif",
            fontSize: "12px",
            color: "white"
          }}
        >
          {status}
        </div>
    <span className="minute">{minute}</span>
    <span>:</span>
    <span className="second">{second}</span>
  </div>
    <div className= {classes.audiorecorder}>
   
        <Avatar 
                    alt="Start"
                    sx={{cursor: "pointer", width: 32, height: 32, paddingRight:1, color:"white"}}
                    src={!isActive?audiorecorder:stopaudio}
                    variant = "circular"
                    onClick={() => {
                      if (!isActive) {
                        startRecording();
                      } else {
                        stopRecording();
                        pauseRecording();
                        stopTimer();
                      }
                      setIsActive(!isActive);
                    }}
                    />
  
  </div>
  {isVisibleReproducer && 
    <AudioReproducer
    mediaBlobUrl = {mediaBlobUrl}>
    </AudioReproducer>}
    </Aux>
  )
}
export default AudioMediaRecorder;
