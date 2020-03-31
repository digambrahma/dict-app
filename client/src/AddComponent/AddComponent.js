import React, { Component } from "react";
import "./AddComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { ConfirmAdded } from "../comfirmAdded/confirmAdded";

class AddComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMeaning = this.onChangeMeaning.bind(this);
    this.onhandleSubmit = this.onhandleSubmit.bind(this);
    this.state = {
      name: "",
      meaning: "",
      alreadyAdded: 0
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeMeaning(e) {
    this.setState({
      meaning: e.target.value
    });
  }

  onhandleSubmit(e) {
    e.preventDefault();
    console.log(this.state.name);
    console.log(this.state.meaning);
    const dictionary = {
      name: this.state.name,
      meaning: this.state.meaning
    };

    if (this.state.name != "" && this.state.meaning != "") {
      axios
        .post(`/dictionary/add`, dictionary)
        .then(res => {
          console.log(res.data);
          if (res.data === "Same name found!!") {
            this.setState({
              alreadyAdded: 1
            });
            console.log(this.state.alreadyAdded);
          } else {
            this.setState({
              alreadyAdded: 2
            });
            console.log(this.state.alreadyAdded);
          }
          console.log(res.data);
          this.setState({
            name: "",
            meaning: ""
          });
        })
        .catch(err => {
          console.log("Error is " + err);
          this.setState({
            alreadyAdded: 4
          });
        });
    } else {
      this.setState({
        alreadyAdded: 3
      });
    }
  }

  render() {
    return (
      <div>
        <div className="addheading">
          <Link to="/">
            <h1>Online Boro Dictionary App</h1>
          </Link>
        </div>
        <div>
          <Container fluid="md">
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Alert variant="warning">
                  Please do not add unnecessary definition for the word.
                </Alert>
                <Form>
                  <Form.Group>
                    <Form.Label>Word </Form.Label>
                    <sup className="required" title="Required">
                      {" "}
                      *
                    </sup>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter word"
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Definition</Form.Label>
                    <sup class="required" title="Required">
                      {" "}
                      *
                    </sup>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter definition"
                      value={this.state.meaning}
                      onChange={this.onChangeMeaning}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    size="lg"
                    className="addButton"
                    onClick={this.onhandleSubmit}
                  >
                    Add to a database
                  </Button>{" "}
                </Form>
                <ConfirmAdded added={this.state.alreadyAdded} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default AddComponent;
