import React, { useDeferredValue, useEffect, useState } from "react"
// import * as faceapi from 'face-api.js';
import Loader from "../layouts/loader/Loader";
import { Alert } from "reactstrap";
import WebGazer from '../components/WebGazer/WebGazer'

declare const faceapi: any;

let Test = (props) => { 

    const webcamRef: any = React.useRef(null)
    const canvasRef: any = React.useRef(null)

    const [loader, setLoader] = React.useState(true)
    const [peopleAlert, setPeopleAlert] = useState(1)
    const [seeAlert, setSeeAlert] = useState(false)

    let seeTimeCounter = 0
    let gaze: any;
    let listener: any;

    let width: Number = window.screen.width
    let height: Number = window.screen.height

    // console.log(width, height)

    let startVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then(stream => {
                webcamRef.current.srcObject = stream
            })
    }

    useEffect(
        () => {
            if (seeAlert == false) {
                seeTimeCounter = 0
            }
        }, [seeAlert]
    )

    useEffect(
        () => {

            Promise.all([,
                faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
                faceapi.nets.tinyFaceDetector.loadFromUri('/models/'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models'),
                faceapi.nets.ageGenderNet.loadFromUri('/models')
            ]).then(
                () => {
                    setLoader(false)
                    startVideo()
                    findFaces()
                    faceDetection()
                    startGaze()
                }
            )
        }, [null]
    )

    useEffect(
        () => {
            return () => {
                listener.end()
            }
        }, []
    )

    let startGaze = () => {
        //@ts-ignore
        gaze = window.webgazer
        gaze.showVideoPreview(false)
        listener = gaze.setGazeListener(
            () => {

            }
        );
        listener.begin()
    }

    let findFaces = () => {

        setInterval(
            async () => {
                let data = await faceapi.detectAllFaces(webcamRef.current)

                if (data.length == 1) {
                    setPeopleAlert(1)
                }
                else if (data.length > 1) {
                    setPeopleAlert(2)
                }
                else if (data.length == 0) {
                    setPeopleAlert(0)
                }

                getTime()

            }, 1000
        )

    }

    let faceDetection = () => {
        setInterval(
            async () => {
                const detections = await faceapi.detectAllFaces
                    (webcamRef.current, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions();
                //@ts-ignore
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(webcamRef.current);
                faceapi.matchDimensions(canvasRef.current, {
                    width: 940,
                    height: 650,
                })
                console.log(faceapi.resizeResults)
                const resized = faceapi.resizeResults(detections, {
                    width: 940,
                    height: 650,
                });
                faceapi.draw.drawDetections(canvasRef.current, resized);
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
                faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
            }, 100
        )
    }

    let getTime = () => {

        gaze.getCurrentPrediction().then(
            (data) => {
                let x = data.x
                let y = data.y

                if (x < width && x > 0 && y < height && y > 0) {
                    setSeeAlert(false)
                }
                else {
                    seeTimeCounter++
                    if (seeTimeCounter > 2) {
                        setSeeAlert(true)
                    }
                }
            }
        )

    }

    return (
        <div className="Test">
            <iframe
                src="https://eliftest.herokuapp.com/online-appointment-patient/online-step-tree?id=18"
                className="test-frame">
            </iframe>
            {
                loader === false
                    ?
                    <div className="test-webcam">
                        <div className="test-webcam-container">
                            <video ref={webcamRef} autoPlay muted></video>
                            <canvas ref={canvasRef} id="cvs" className='webcam-cvs'></canvas>
                        </div>
                        {
                            peopleAlert === 2 &&
                            <div className="show-alert">
                                <Alert color="danger">В кадре находятся посторонние люди!</Alert>
                            </div>
                        }
                        {
                            peopleAlert === 0 &&
                            <div className="show-alert">
                                <Alert color="danger">Тестируемый вышел из кадра!</Alert>
                            </div>
                        }
                        {
                            seeAlert == true &&
                            <div className="show-alert">
                                <Alert color="danger">Тестируемый не смотрит в экран в течении продолжительного времени!</Alert>
                            </div>
                        }
                    </div>
                    :
                    <Loader />
            }
        </div>
    )
}

export default Test