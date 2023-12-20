import { Card, Container, Image, Modal, Spacer, Text } from "@nextui-org/react";
import React, { useState } from "react";

import "./welcome.css";
import Footer from "../../components/footer";
import { Send } from "react-iconly";
import { useNavigate } from "react-router-dom";
import { Col, Row, Stack } from "react-bootstrap";

const WelcomePage = () => {
  const [showAppModal, setShowAppModal] = useState(false);
  const navigate = useNavigate();

  const closeHandler = () => {
    setShowAppModal(false);
  };

  return (
    <>
      <Container className="welcome-container">
        <Row>
          <Col
            xs={12}
            md={6}
            style={{ backgroundColor: "#00000080", borderRadius: 16 }}
          >
            <Image src="/assets/main_logo.png" alt="logo" width={320} />
          </Col>
        </Row>
        <Spacer />
        <Row>
          <Col>
            <Text h2 style={{ textAlign: "center", color: "whitesmoke" }}>
              Discover a convenient and confidential counseling app designed for
              Sri Lanka.
            </Text>
          </Col>
        </Row>
        <Spacer />
        <Row gap={1}>
          <Col>
            <Card
              style={{
                backgroundColor: "#42424290",
                padding: 8,
                margin: 8,
              }}
            >
              <Text h3 style={{ textAlign: "center", color: "whitesmoke" }}>
                Connect with qualified counselors fluent in Sinhala, Tamil, and
                English.
              </Text>
              <Text h3 style={{ textAlign: "center", color: "whitesmoke" }}>
                Get the support you need for relationships, mental health, and
                personal challenges.
              </Text>
            </Card>
          </Col>

          <Col>
            <Card
              style={{
                backgroundColor: "#42424280",
                padding: 8,
                margin: 8,
              }}
            >
              <Text h3 style={{ textAlign: "center", color: "whitesmoke" }}>
                Schedule sessions at your convenience and find guidance from
                compassionate professionals.
              </Text>
              <Text h3 style={{ textAlign: "center", color: "whitesmoke" }}>
                Take the first step towards a happier life today.
              </Text>
            </Card>
          </Col>
        </Row>

        <Stack
          direction="horizontal"
          gap={1}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div
            className="selector-icon"
            onClick={() => {
              setShowAppModal(true);
            }}
          >
            <Image src="/assets/ineedhelp_img.png" alt="logo" />
            <Text
              h3
              style={{
                textAlign: "center",
                color: "whitesmoke",
                cursor: "pointer",
              }}
            >
              I Need Help
            </Text>
          </div>
          <div
            className="selector-icon"
            onClick={() => {
              navigate("/login");
            }}
          >
            <Image src="/assets/heretohelp_img.png" alt="logo" />
            <Text
              h3
              style={{
                textAlign: "center",
                color: "whitesmoke",
                cursor: "pointer",
              }}
            >
              I Am Here To Help
            </Text>
          </div>
        </Stack>
      </Container>
      {/* FOOTER AREA */}
      <Footer />
      {/* App Download Modal */}
      <Modal
        closeButton
        blur
        open={showAppModal}
        onClose={closeHandler}
        width="320"
      >
        <Modal.Header>
          <Send set="bold" primaryColor="#0072F5" style={{ marginRight: 8 }} />
          <Text h3>Download App</Text>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Text h4>Download the app to register with us for help</Text>
            </Col>
          </Row>
          <Row
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Image src="/assets/applestore_img.png" alt="logo" width={240} />
            <Image src="/assets/playstore_img.png" alt="logo" width={240} />
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WelcomePage;
