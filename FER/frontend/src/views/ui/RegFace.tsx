import { useState } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { addUser, setPhoto } from "../../store/photosReducer"

let RegFace = (props) => {

    const [name, setName] = useState('')
    const [vk, setVK] = useState('')

    const navigate = useNavigate()

    useEffect(
        () => {
            if (props.currPhoto == '') {
                navigate("/webcam", { replace: true });
            }
        }, [null]
    )

    return (
        <div>
            <Form onSubmit={
                (e) => {
                    e.preventDefault()

                    if (name == '' || vk == '') {
                        alert('Некорректные данные!')
                    }
                    else {
                        let user = {
                            name,
                            vk,
                            reason: 0,
                            photo: props.currPhoto
                        }
                        props.addUser(user)
                        navigate("/webcam", { replace: true });
                    }
                }
            }>
                <FormGroup style={{ 'margin-top': '1rem' }}>
                    <Label for="name">Имя</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Введите имя"
                        type="text"
                        value={name}
                        onChange={
                            (e) => {
                                setName(e.target.value)
                            }
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="vk" style={{ 'margin-top': '0.5rem' }}>Ссылка на VK:</Label>
                    <Input
                        id="vk"
                        name="vk"
                        placeholder="Введите ссылку на VK"
                        type="text"
                        value={vk}
                        onChange={
                            (e) => {
                                setVK(e.target.value)
                            }
                        }
                    />
                </FormGroup>
                <Button>Зарегистрироваться</Button>
            </Form>

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
        setPhoto: (photo) => dispatch(setPhoto(photo))
    }
}

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(RegFace);