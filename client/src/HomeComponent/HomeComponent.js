import React, { Component } from "react";
import "./HomeComponent.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { MySpinner } from "../Spinner/spinner";
class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onhandleSubmit = this.onhandleSubmit.bind(this);

    this.state = {
      name: "",
      meaning: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onhandleSubmit(e) {
    e.preventDefault();
    console.log(this.state.name);
    this.setState({ meaning: "" });
    if (this.state.name != "") {
      let url = "/dictionary/search/" + this.state.name;
      trackPromise(
        axios
          .get("/dictionary/search/" + this.state.name, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            if (res.data != "No data found") {
              var mean = res.data.map(d => d.meaning);
              this.setState({ meaning: mean });
              console.log(this.state.meaning);
            } else {
              this.setState({
                meaning: "Sorry, Definition not yet added. Please add below!"
              });
              console.log(this.state.meaning);
            }
          })
          .catch(err => {
            console.log("Error is here" + err);
            this.setState({
              meaning: "Connect to the internet."
            });
          })
      );
    }
  }

  render() {
    return (
      <div>
        <div className="heading">
          <Container>
            <h1>Online Boro Dictionary App</h1>
            <br />
            <Form onSubmit={this.onhandleSubmit}>
              <Row>
                <Col sm={8}>
                  <Form.Group>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Search for definition"
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={this.onhandleSubmit}
                  >
                    Search Meaning
                  </Button>{" "}
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
        <div className="meaning">
          <Container>
            <Row>
              <Col sm={8}>
                <h4>Definition:</h4>
                {/* SHOW DEFINITION */}
                <div className="definition">
                  <MySpinner />
                  <h5> {this.state.meaning}</h5>
                </div>
              </Col>

              <Col sm={4}>
                <Card
                  bg="light"
                  text="dark"
                  style={{ width: "18rem", marginTop: "30px" }}
                >
                  <Card.Body>
                    <Card.Title>Add definition here!</Card.Title>
                    <Card.Text>
                      There are some words that are not yet added in our
                      database. You can help us by adding the words in our
                      database. It will be very grateful of you.
                    </Card.Text>
                    <Link to="/add">
                      {" "}
                      <Button variant="link">Click here!</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
