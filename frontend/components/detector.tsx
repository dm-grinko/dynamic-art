"use client"

import { connectToSocket, sendImageToServer } from '../services/websockets';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';

import React, { useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";

const SCREENSHOT_INTERVAL = 5000; // TODO: env variable

// it sends screenshots to server
const Detector = ({ onFaceDetected }: any) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const isConnected = useAppSelector((state) => state.socket.isConnected);
  const adminId = useAppSelector((state) => state.users.admin.adminId);

  const webRef = useRef<Webcam>(null);

  // when webcam is ready, set loading - false
  const handleUserMedia = () => {
    if (webRef.current) {
      setLoading(false);
    }
  };

  const getScreenshot = () => {
    try {
      if (webRef.current) {
        return webRef.current.getScreenshot();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // when webcam is ready, we start sending screenshots
  useEffect(() => {
    // For production:
    if (!loading) {
      const screenshotInterval = setInterval(() => {
        const screenshot = getScreenshot();
        if (screenshot) {
          dispatch(sendImageToServer(adminId, screenshot));
        }
      }, SCREENSHOT_INTERVAL);

      return () => clearInterval(screenshotInterval);
    }
  }, [loading, adminId, dispatch]);

  // For testing
  const takeScreenshot = () => {
    console.log('screenshot')
    const screenshot = getScreenshot();
    if (screenshot) {
      dispatch(sendImageToServer(adminId, screenshot));
    }
  }

  return (
    <>
      
      {/* display: none for camera. We don't need to show it */}
      <div className="camera">
        <Webcam
          ref={webRef}
          audio={false}
          height={480}
          width={640}
          screenshotFormat="image/png"
          style={{ display: 'block' }}
          onUserMedia={handleUserMedia}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* {isConnected && <button type="submit" className="btn btn-primary" onClick={takeScreenshot}>Scan</button> } */}
      
    </>
  );
};
export default Detector;