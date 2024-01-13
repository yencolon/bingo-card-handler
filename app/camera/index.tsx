import { Camera, CameraType, ImageType } from 'expo-camera';
import { Link, useFocusEffect, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function CameraView() {
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);
  const [cameraIsReady, setCameraIsReady] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraBase64, setCameraBase64] = useState<string | undefined>();
  const [result, setResult] = useState<VisionApiResponse>();

  useFocusEffect(() => {
    console.log('useFocusEffect');
    if (cameraRef.current && cameraIsReady) {
      cameraRef.current.resumePreview();
    }
  });

  useEffect(() => {
    console.log('permission');
    console.log(permission);
    return () => {
      console.log('cleanup');
      if (cameraRef.current && cameraIsReady) {
        cameraRef.current.stopRecording();
        cameraRef.current.pausePreview();
      }
    }
  }, [permission]);

  function getInfoFromImage() {
    console.log('getInfoFromImage');
    if (!cameraBase64) {
      return;
    }
    const body = {
      requests: [
        {
          image: {
            content: cameraBase64,
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION',
            },
          ],
        },
      ],
    };

    fetch('https://vision.googleapis.com/v1/images:annotate?key=', {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        // transform response to VisionApiResponse
        console.log("response");
        setResult(response);
        processImage();
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function cameraReady() {
    console.log('cameraReady');
    setCameraIsReady(true);
  }

  function takePicture() {
    if (cameraRef.current) {
      cameraRef.current.takePictureAsync({
        imageType: ImageType.jpg,
        quality: 0.1,
        base64: true,
      }).then((data) => {
        ///getInfoFromImage(data.base64);
        setCameraBase64(data.base64);
      }).finally(() => { 
        if(cameraRef.current && cameraIsReady) {
           cameraRef.current.pausePreview()
           /// router.replace('/home');
        }
      });
     
    }
  }

  function processImage() {
    console.log('processImage');
    if(cameraRef.current && cameraIsReady) {
      cameraRef.current.pausePreview();
      result?.responses[0].textAnnotations?.forEach((textAnnotation) => {
        console.log(textAnnotation.description);
      });
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>No access to camera</Text>
        <Button onPress={requestPermission} title="Request" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {
        cameraBase64 ? (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text>{cameraBase64}</Text>
          </View>
        ) :
        <Camera style={styles.camera} ref={cameraRef} type={type} onCameraReady={cameraReady}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      }
      
      <View style={styles.actionButtonBar}>
        <TouchableOpacity style={styles.button} onPress={getInfoFromImage}>
          <Text style={styles.text}>process</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>take</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Link href="/home">
            <Text style={styles.text}>cancel</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%'
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent```',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  actionButtonBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: 100,
  },
}); 