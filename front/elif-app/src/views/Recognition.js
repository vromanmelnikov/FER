import { Button, ButtonGroup, Col, Row } from "reactstrap";
import Loader from "../layouts/loader/Loader";
import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, Route, Router, Routes, useLocation } from "react-router-dom";

let Recognition = (props) => {


    const [loader, setLoader] = useState(true)
    const [rSelected, setRSelected] = useState(1);

    useEffect(
        () => {
            setLoader(false)
        }, []
    )

    const location = useLocation()

    useEffect(
        () => {
            setRSelected(location.pathname)
        }, [null]
    )

    const onRadioBtnClick = (rSelected) => {
        setRSelected(rSelected);
    };

    return (
        <div>
            {
                loader === false
                    ?
                    <Row>
                        <Col sm="12" lg="12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Распознавание лица</h5>
                                    <ButtonGroup>
                                        <Button
                                            color="primary"
                                            outline
                                            onClick={() => onRadioBtnClick('/webcam')}
                                            active={rSelected === '/webcam'}
                                        >
                                            <Link
                                                to='/webcam'
                                                className="link"
                                            >
                                                Потоковое распознавание
                                            </Link>
                                        </Button>
                                        <Button
                                            color="primary"
                                            outline
                                            onClick={() => onRadioBtnClick('/filerec')}
                                            active={rSelected === '/filerec'}
                                        >
                                            <Link
                                                to='/filerec'
                                                className="link"
                                            >
                                                Видеофайл
                                            </Link>
                                        </Button>
                                        <Button
                                            color="primary"
                                            outline
                                            onClick={() => onRadioBtnClick('/test')}
                                            active={rSelected === '/test'}
                                        >
                                            <Link
                                                to='/test'
                                                className="link"
                                            >
                                                Тест
                                            </Link>
                                        </Button>
                                    </ButtonGroup>
                                    <Outlet />
                                </div>
                            </div>


                        </Col>
                    </Row>
                    :
                    <Loader />
            }
        </div>
    )
}

export default Recognition