// import { Typography } from '@mui/material';
// import React from 'react';

// const CameraCaptureMain = () => {
//     return (
//         <div>
//             <Typography variant='h2'>Camera Capture Main</Typography>
//         </div>
//     );
// };

// export default CameraCaptureMain;



import React, { useRef, useState } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Capture image
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setImages((prev) => [imageData, ...prev]);
  };

  // Stop camera (optional)
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Camera View
      </Typography>

      <Box
        sx={{
          border: "2px solid #ccc",
          borderRadius: 2,
          width: 400,
          height: 300,
          overflow: "hidden",
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </Box>

      <Grid container spacing={2} mb={4}>
        <Grid item>
          {!cameraActive ? (
            <Button variant="contained" color="primary" onClick={startCamera}>
              Start Camera
            </Button>
          ) : (
            <Button variant="outlined" color="error" onClick={stopCamera}>
              Stop Camera
            </Button>
          )}
        </Grid>
        {cameraActive && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={captureImage}
            >
              Capture
            </Button>
          </Grid>
        )}
      </Grid>

      {images.length > 0 && (
        <Box>
          <Typography variant="h6" mb={2}>
            Gallery
          </Typography>
          <Grid container spacing={2}>
            {images.map((img, index) => (
              <Grid item key={index}>
                <Box
                  component="img"
                  src={img}
                  alt={`Captured ${index}`}
                  sx={{
                    width: 150,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "1px solid #ccc",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CameraCapture;
