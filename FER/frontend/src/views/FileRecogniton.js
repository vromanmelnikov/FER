import React, { useState } from "react"
import { Col, FormGroup, FormText, Input, Label } from "reactstrap"
import Chart from "react-apexcharts";
import { RangeStepInput } from 'react-range-step-input';
import axios from "axios";

let FileRecognition = (props) => {

    const [chartoptions, setChartOpt] = useState({
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

    const [sliderProps, setSliderProps] = useState({
        min: 0,
        max: 100,
        value: 20,
        label: 'This is a reusable slider'
    });
    const [sliderValue, setSliderValue] = useState(0);

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)
    const [time, setTime] = useState(49)

    const [file, setFile] = useState(0)

    let onFileChange = (event) => {

        // setLoader(true)
        setFile(event.target.files[0])

    }

    React.useEffect(
        () => {

            if (file != '') {

                const formData = new FormData()
                formData.append('file', file)

                axios.post(
                    "https://elif.miriteam.com/api/getfile",
                    formData,
                    {
                        headers: {
                            "Content-type": "multipart/form-data"
                        },
                    }
                )
                    .then(
                        (res) => {
                            console.log(res)
                        }
                    )
            }
        }, [file]
    )

    return (
        <div>
            <FormGroup className="margin-top-bottom ">
                <Label for="exampleFile">Загрузите файл для распознавания эмоций</Label>
                <Input id="exampleFile" name="file" type="file" onChange={onFileChange} />
            </FormGroup>
            <Col sm="12" lg="12" xl="12" xxl="12">
                <Chart
                    type="bar"
                    width="100%"
                    height="200"
                    options={chartoptions.options}
                    series={chartoptions.series}
                />
                <RangeStepInput
                    min={min}
                    max={max}
                    step={1}
                    value={time}
                    onChange={
                        (e) => {
                            console.log(e.target.value)
                            setTime(e.target.value)
                        }
                    }
                    id={'range'} />
                <p>
                    Секунда: {time}
                </p>
            </Col>
        </div>
    )
}

export default FileRecognition