import React, { Component } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({activeItem: { ...this.state.activeItem, [name]: value }});
  };

  render() {
    var { onSave } = this.props;
    var { onExit } = this.props;

    return (
      <Modal isOpen = {true}>
        <ModalHeader>Customer</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="first_name">First name</Label>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                value={this.state.activeItem.first_name}
                onChange={this.handleChange}
                placeholder="Enter first name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last name</Label>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                value={this.state.activeItem.last_name}
                onChange={this.handleChange}
                placeholder="Enter last name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="tr_id">Turkish ID number</Label>
              <Input
                type="number"
                id="tr_id"
                name="tr_id"
                value={this.state.activeItem.tr_id}
                onChange={this.handleChange}
                placeholder="Enter turkish ID"
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone number</Label>
              <Input
                type="number"
                id="phone"
                name="phone"
                value={this.state.activeItem.phone}
                onChange={this.handleChange}
                placeholder="Enter phone number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={this.state.activeItem.city}
                onChange={this.handleChange}
                placeholder="Enter city"
              />
            </FormGroup>
            <FormGroup>
              <Label for="district">District</Label>
              <Input
                type="number"
                id="district"
                name="district"
                value={this.state.activeItem.district}
                onChange={this.handleChange}
                placeholder="Enter district"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-danger" title="Discard changes" onClick={() => onExit()}>Cancel</button>
            <button className="btn btn-primary" title="Save changes" onClick={() => onSave(this.state.activeItem)}>Save</button>
        </ModalFooter>
      </Modal>
    );
  }
}