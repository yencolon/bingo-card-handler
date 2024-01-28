import { Camera, CameraType, ImageType } from "expo-camera";
import { Link, useFocusEffect, router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { GoogleVisionApi } from "../../services/GoogleVisionApi";
import { Text, View } from "../../components/Themed";
import BingoCardComponent from "../../components/card/BingoCardComponent";
import { useBingoContext } from "../../state/BingoContext";

export default function CameraView() {
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);
  const [cameraIsReady, setCameraIsReady] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraBase64, setCameraBase64] = useState<string | undefined>();
  const [result, setResult] = useState<BingoBox[]>();
  const { dispatch } = useBingoContext();

  useFocusEffect(() => {
    console.log("useFocusEffect");
    if (cameraRef.current && cameraIsReady) {
      cameraRef.current.resumePreview();
    }
  });

  useEffect(() => {
    console.log("permission");
    console.log(permission);
    return () => {
      console.log("cleanup");
      if (cameraRef.current && cameraIsReady) {
        cameraRef.current.stopRecording();
        cameraRef.current.pausePreview();
      }
    };
  }, [permission]);

  function getInfoFromImage() {
    console.log("getInfoFromImage");
    if (!cameraBase64) {
      return;
    }

    GoogleVisionApi.readImageText(cameraBase64).then(
      (response: VisionApiResponse | undefined) => {
        console.log("response");
        if (response !== undefined) {
          if (response?.textAnnotations === undefined) return null;
          // Filter objects with numeric descriptions
          const cardSymbols = (response?.textAnnotations || []).reduce(
            (accumulator: BingoBox[], obj) => {
              if (/^\d+$/.test(obj.description)) {
                accumulator.push({
                  description: obj.description,
                  locale: obj.locale,
                  boundingPoly: obj.boundingPoly,
                  checked: false,
                });
              }
              return accumulator;
            },
            []
          );

          // Sort numeric objects based on x-coordinate
          cardSymbols.sort(
            (a, b) =>
              a.boundingPoly.vertices[0].x - b.boundingPoly.vertices[0].x
          );
          // Add a free space object to the array
          cardSymbols.splice(12, 0, {
            description: "Free",
            locale: "",
            boundingPoly: { vertices: [{ x: 0, y: 0 }] },
            checked: true,
          });

          setResult(cardSymbols);
        }
      }
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function cameraReady() {
    console.log("cameraReady");
    setCameraIsReady(true);
  }

  function takePicture() {
    if (cameraRef.current) {
      cameraRef.current
        .takePictureAsync({
          imageType: ImageType.jpg,
          quality: 0.1,
          base64: true,
        })
        .then((data) => {
          ///getInfoFromImage(data.base64);
          setCameraBase64(data.base64);
        })
        .finally(() => {
          if (cameraRef.current && cameraIsReady) {
            cameraRef.current.pausePreview();
            /// router.replace('/home');
          }
        });
    }
  }

  function processImage() {
    console.log("processImage");
    if (cameraRef.current && cameraIsReady) {
      cameraRef.current.pausePreview();
      result?.forEach((textAnnotation) => {
        console.log(textAnnotation.description);
      });
    }
  }

  function discardImage() {
    setCameraBase64(undefined);
    setResult(undefined);
    cameraRef.current?.resumePreview();
  }

  function saveBingoCard() {
    if (result === undefined) return;

    dispatch({
      type: "SET_CARDS",
      payload: {
        id: 1,
        title: "Hola",
        boxes: result,
      },
    });

    discardImage();
  }

  function tryRenderBingCard() {
    console.log("tryRenderBingCard");
    if (result === undefined) return null;
    return <BingoCardComponent card={{
      boxes: result, 
      isBingo: false,
      id: 1,
      title: "Hola",
    }} />;
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text>No access to camera</Text>
        <Button onPress={requestPermission} title="Request" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {tryRenderBingCard()}
      {cameraBase64 ? (
        <View style={styles.bingoCardPhotoContainer}>
          <Image
            source={{ uri: `data:image/jpg;base64,${cameraBase64}` }}
            style={{ flex: 1 }}
          />
        </View>
      ) : (
        <Camera
          style={styles.camera}
          ref={cameraRef}
          type={type}
          onCameraReady={cameraReady}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      {result && (
        <View style={styles.actionButtonBar}>
          <TouchableOpacity style={styles.button} onPress={saveBingoCard}>
            <Text style={styles.text}> Save </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={discardImage}>
            <Text style={styles.text}> Discard </Text>
          </TouchableOpacity>
        </View>
      )}

      {!result && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: "100%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  actionButtonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "blue",
    alignItems: "center",
    height: "15%",
  },
  bingoCardPhotoContainer: {
    flex: 1,
    backgroundColor: "blue",
    width: "80%",
  },
});
