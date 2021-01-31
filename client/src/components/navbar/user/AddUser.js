import React, { useState } from 'react';
import './AddUser.css';

import Modal from 'react-modal';
import { Form, Button, Card } from "react-bootstrap";
import axios from 'axios';

// Modal issue
Modal.setAppElement('div');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-30%',
        transform: 'translate(-50%, -50%)',
        background: '#2C3A47',
        color: '#2C3A47',
        borderRadius: '10%',
        textAlign: 'center'
    }

};

function ChangeFile({ modalIsOpen, setModalIsOpen }) {

    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true)
            const user = await axios.put(`/fcc/users/add-user/${username}`)
            console.log(user)
            if (user.data) {
                if (user.data === "User Already Exists" || user.data === "No Such User" || user.data === "Not a Public Profile") {
                    setError(user.data)
                    setLoading(false)
                } else {
                    setModalIsOpen(false)
                    setLoading(false)
                    window.location.assign(`/users/${username}`);
                }
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const exitModal = () => {
        setModalIsOpen(false)
        setError()
        setLoading(false)
    }

    const changeUserName = (name) => {
        setUsername(name)
        setError()
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => exitModal()}
            style={customStyles}
        >
            <Card className="card">
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="userAddForm" >
                        <Form.Label id="userLabel">Username:</Form.Label>
                        <Form.Control id="userUpload" type="text" onChange={(e) => changeUserName(e.target.value)} required />
                        {error ? <div className="error">{error}</div> : null}
                    </Form.Group>
                    {loading && <div className="miniLoader"></div>}
                    <Button disabled={loading} className="w-20" type="submit" variant="outline-secondary">
                        Submit
                        </Button>
                </Form>
            </Card>
        </Modal>
    )
}

export default ChangeFile


