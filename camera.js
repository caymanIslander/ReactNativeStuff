import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function cameraScreen() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [capturedImage, setCapturedImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const cameraRef = useRef(null);
  
    if (!permission) {
      // Camera permissions are still loading
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
  
    async function shootPhoto() {
      // If camera is not available; return.
      if(!cameraRef.current) return;
      const photo = await cameraRef.takePictureAsync();
      setPreviewVisible(true);
      setCapturedImage(photo);
    }
  
    return (
      <View style={styles.container}>
        <Camera ref={cameraRef} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={shootPhoto}>
              <Text style={styles.text}>📷</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });