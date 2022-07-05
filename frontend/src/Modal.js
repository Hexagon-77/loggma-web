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
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { onSave } = this.props;
    const { onExit } = null;

    return (
      <Modal isOpen={true}>
        <ModalHeader>Customer</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="first-name">First name</Label>
              <Input
                type="text"
                id="first-name"
                name="title"
                value={this.state.activeItem.first_name}
                onChange={this.handleChange}
                placeholder="Enter first name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="last-name">Last name</Label>
              <Input
                type="text"
                id="last-name"
                name="description"
                value={this.state.activeItem.last_name}
                onChange={this.handleChange}
                placeholder="Enter last name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="tr-id">Turkish ID number</Label>
              <Input
                type="text"
                id="tr-id"
                name="description"
                value={this.state.activeItem.tr_id}
                onChange={this.handleChange}
                placeholder="Enter turkish ID"
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone number</Label>
              <Input
                type="text"
                id="phone"
                name="description"
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
                name="description"
                value={this.state.activeItem.city}
                onChange={this.handleChange}
                placeholder="Enter city"
              />
            </FormGroup>
            <FormGroup>
              <Label for="district">District</Label>
              <Input
                type="text"
                id="district"
                name="description"
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