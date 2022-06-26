import { Button, Col, Row } from "reactstrap";
import Webcam from 'react-webcam'
import React, { useEffect } from "react";
import Loader from "../layouts/loader/Loader";
import Chart from "react-apexcharts";
import { addReasons, addUser, setPhoto } from "../store/photosReducer";
import { connect } from "react-redux";
import RegFace from "./ui/RegFace.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

declare const faceapi: any;

let WebCamRecognition = (props) => {

    const navigate = useNavigate()

    const webcamRef: any = React.useRef()
    const canvasRef: any = React.useRef(null)

    const [imageURL, setImageURL] = React.useState('')
    const [findFlag, setFind] = React.useState(true)
    const [reasonFlag, setReason] = React.useState(false)
    const [loader, setLoader] = React.useState(true)
    const [chartLoader, setChartLoader] = React.useState(true)
    const [name_1, setName] = React.useState('')

    const [detData, setDetData] = React.useState({
        age: null,
        gender: null,
        expressions: [
            {
                name: 'neutral',
                rus: 'Нейтральный',
                value: 0
            },
            {
                name: 'happy',
                rus: 'Счастливый',
                value: 0
            },
            {
                name: 'sad',
                rus: 'Грустный',
                value: 0
            },
            {
                name: 'angry',
                rus: 'Злой',
                value: 0
            },
            {
                name: 'fearful',
                rus: 'Испуганный',
                value: 0
            },
            {
                name: 'disgusted',
                rus: 'Отвращение',
                value: 0
            },
            {
                name: 'surprised',
                rus: 'Удивленный',
                value: 0
            },

        ]
    })

    let dict = {
        'neutral': 'Нейтральный',
        'happy': 'Счастливый',
        'sad': 'Грустный',
        'angry': 'Злой',
        'fearful': 'Испуганный',
        'disgusted': 'Отвращение',
        'surprised': 'Удивленный',
    }

    const [chartoptions, setChartOpt] = React.useState({
        series: [
            {
                name: "Совпадение эмоции в %",
                data: [0, 0, 0, 0, 0, 0, 0],
            }
        ],
        options: {
            chart: {
                type: "bar",
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: [
                    'Нейтральный',
                    'Счастливый',
                    'Грустный',
                    'Злой',
                    'Испуганный',
                    'Отвращение',
                    'Удивленный',
                ],
            },
        },
    })

    React.useEffect(
        () => {

            // console.log(props)
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
                    getFaceExpressions()
                    // faceDetection()
                }
            )
        }, [null]
    )

    const takePhoto = React.useCallback(
        () => {
            setImageURL(webcamRef.current.getScreenshot())
        }, [webcamRef]
    )

    useEffect(
        () => {
            // console.log(imageURL)
        }, [imageURL]
    )

    let startVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then(stream => {
                webcamRef.current.srcObject = stream
            })
    }

    let stopVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then((stream: any) => {
                stream.active = false
            })
    }

    let getFaceExpressions = () => {

        setInterval(

            async () => {

                let data = await faceapi.detectSingleFace(document.getElementById('vid'), new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks().withAgeAndGender().withFaceDescriptor().withFaceExpressions()

                if (data) {

                    let image = document.createElement('img')
                    image.src = webcamRef.current.getScreenshot()

                    const load = await loadInfo()
                        .then(
                            async (load) => {
                                if (load.length == 0) {
                                    return
                                }
                                const faceMatcher = new faceapi.FaceMatcher(load, 0.6)
                                const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
                                    .then(
                                        det => {
                                            const result = det.map(
                                                d => faceMatcher.findBestMatch(d.descriptor)
                                            )
                                            if (result[0] == undefined) {
                                                console.log('нет лица')
                                            }
                                            else {
                                                if (result[0]._label == "unknown") {
                                                    setImageURL(image.src)
                                                    props.setPhoto(image.src)
                                                    setFind(false)
                                                }
                                                else {

                                                    setFind(true)

                                                    let name = result[0]._label
                                                    let users = props.users

                                                    setName(name)

                                                    for (let i = 0; i < users.length; i++) {

                                                        if (users[i].name == name) {

                                                            // console.log(users[i].reason)
                                                            if (users[i].reason > 2) {

                                                                props.addReasons(-users[i].reason, name)
                                                                setReason(true)
                                                            }
                                                            else {

                                                                if (name_1 != name) {

                                                                    var link = new FormData();
                                                                    link.append('user_link', users[i].vk);

                                                                    var config = {
                                                                        method: 'get',
                                                                        url: 'http://185.225.35.17/get_user_wall_info',
                                                                        headers: {
                                                                        },
                                                                        data: link
                                                                    };

                                                                    axios(config)
                                                                        .then(function (response) {
                                                                            console.log(JSON.stringify(response.data));
                                                                        })
                                                                        .catch(function (error) {
                                                                            console.log(error);
                                                                        });
                                                                }
                                                            }

                                                        }
                                                    }

                                                    let count = 0

                                                    if (data.expressions.angry > 0.5) {
                                                        alert(name + ' злой')
                                                        count++
                                                    }
                                                    if (data.expressions.sad > 0.5) {
                                                        alert(name + ' грустный')
                                                        count++
                                                    }

                                                    props.addReasons(count, name)
                                                }
                                            }
                                        }

                                    )
                            }
                        )



                    if (chartLoader == true) {
                        setChartLoader(false)
                    }

                    let age = Math.floor(data.age)
                    let gender = data.gender
                    let expressions = data.expressions

                    let expData = []

                    expressions = Object.keys(expressions).map(
                        (key) => {
                            let obj = {
                                name: key,
                                value: expressions[key].toFixed(2),
                                rus: dict[key]
                            }
                            expData.push(expressions[key].toFixed(2))
                            return obj
                        }
                    )

                    // console.log(expData)
                    // console.log(chartoptions.series)

                    for (let i = 0; i < 7; i++) {
                        expData[0] += chartoptions.series[0].data[i]
                    }

                    // console.log(expressions)

                    setChartOpt(
                        {
                            ...chartoptions,
                            series: [
                                {
                                    name: "Совпадение эмоции в %",
                                    data: expData,
                                }
                            ]
                        }
                    )
                }
                else {
                    setChartLoader(true)
                    console.log('нет лица!')
                }
            }, 1500)
    }

    let loadInfo = () => {
        if (props.users.length == 0) {
            return Promise.all([])
        }
        return Promise.all(
            props.users.map(
                async user => {
                    const descriptions = []
                    const image = await faceapi.fetchImage(user.photo)
                    const detections = await faceapi
                        .detectSingleFace(image)
                        .withFaceLandmarks()
                        .withFaceDescriptor()
                    descriptions.push(detections?.descriptor)

                    return new faceapi.LabeledFaceDescriptors(user.name, descriptions)
                }
            )
        )
    }

    let faceDetection = () => {
        setInterval(
            async () => {
                const detections = await faceapi.detectAllFaces
                    (document.getElementById('vid'), new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions();
                //@ts-ignore
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(document.getElementById('vid'));
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

    return (
        <div>
            {
                props.currPhoto !== '' &&
                // <RegFace />
                <></>
            }
            {
                loader === false
                    ?
                    <>
                        {/* <h6 className="card-subtitle">Hello #2</h6> */}
                        <div className="webcam">
                            <div className="webcam-container">
                                <canvas ref={canvasRef} id="cvs" className="webcam-cvs"></canvas>
                                <Webcam
                                    videoConstraints={{
                                        facingMode: "user"
                                    }}
                                    audio={false}
                                    autoPlay
                                    screenshotFormat='image/png'
                                    ref={webcamRef}
                                    id={'vid'}
                                    className='webcam-rec'
                                />
                            </div>
                            {
                                findFlag == false &&
                                <Button
                                    style={{
                                        'marginTop': '1rem'
                                    }}
                                    className="btn"
                                    outline
                                    color="primary"
                                    onClick={
                                        () => {
                                            navigate("/reg", { replace: true });
                                        }
                                    }>
                                    Вас нет в системе. Нажмите для регистрации
                                </Button>
                            }
                            {
                                reasonFlag == true &&
                                <Button
                                    style={{
                                        'marginTop': '1rem'
                                    }}
                                    className="btn"
                                    outline
                                    color="primary"
                                    onClick={
                                        () => {
                                            navigate("/test", { replace: true });
                                        }
                                    }>
                                    Мы заметили, что у Вас нестабильное состояние.<br />
                                    Нажмите для прохождения психологического теста
                                </Button>
                            }
                            {/* <video ref={webcamRef} autoPlay muted width={300}></video> */}
                        </div>
                        <div className="data">
                            {
                                detData.age == null
                                    ?
                                    detData.expressions.map(
                                        (exp) => {
                                            return (
                                                <p className={exp.value > 0.5 ? "mostly-attr" : ""}>
                                                    {/* {exp?.rus}: {exp?.value} */}
                                                </p>
                                            )
                                        }
                                    )
                                    :
                                    <></>
                                // <Loader/>
                            }
                            {
                                chartLoader === false
                                    ?
                                    <Col sm="12" lg="12" xl="12" xxl="12">
                                        <Chart
                                            type="bar"
                                            width="100%"
                                            height="200"
                                            options={chartoptions.options}
                                            series={chartoptions.series}
                                        />
                                    </Col>
                                    :
                                    <Loader />
                            }
                        </div>
                    </>
                    :
                    <Loader />
            }

        </div>
    )
}

let MapStateToProps = (state) => {
    return {
        users: state.photoData.users,
        currPhoto: state.photoData.currPhoto
    }
}
let MapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch(addUser(user)),
        setPhoto: (photo) => dispatch(setPhoto(photo)),
        addReasons: (count, name) => dispatch(addReasons(count, name))
    }
}

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(WebCamRecognition);