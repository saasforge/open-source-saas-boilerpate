import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class ModalDemoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        };
        //this.openDefaultModal = this.openDefaultModal.bind(this);
    }
    openDefaultModal = ()=>{
        this.setState({modalShow: true});
    }
    handleClose = ()=>{
        this.setState({modalShow: false});
    }
    render() {
        const modal = (      
            <Modal show={this.state.modalShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>);
        return (
            <div className="panel-light">
                {modal}
                <div className="row">
                    <div className="col-md-6">
                        <h4>Simple modal window</h4>
                        <div>
                            <button className="btn btn-primary" onClick={this.openDefaultModal}>Open default Modal</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalDemoView;