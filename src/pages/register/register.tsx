import {
  Container,
  Grid,
  Card,
  Row,
  Col,
  Spacer,
  Input,
  Button,
  Image,
  Text,
  Modal,
} from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { Call, User } from "react-iconly";
import LoadingBar from "react-top-loading-bar";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import Footer from "../../components/footer";
import api from "../../utils/api";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const ref: any = useRef(null);
  const [visible, setVisible] = useState(false);

  const otpForm = useFormik({
    initialValues: {
      otpCode: "",
    },
    onSubmit: async (values) => {
      const res = await api
        .post("/api/user/verifyotp", {
          user_id: formik.values.mobile,
          enteredOTP: values.otpCode,
          user_type: "REG",
        })
        .catch((e) => {
          toast.error("Invalid OTP");
        });
      if (res) {
        localStorage.setItem("email", formik.values.email);
        localStorage.setItem("phone", formik.values.mobile);
        navigate("/setup");
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      mobile: "",
    },
    onSubmit: async (values) => {
      if (ref && ref.current) ref.current.continuousStart();
      await api.post("/api/user/getotp", {
        user_id: values.mobile,
        phone_no: values.mobile,
      });
      ref.current.complete();
      setVisible(true);
    },
  });

  const closeHandler = () => {
    setVisible(false);
  };

  const openHandler = () => {};

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />
      <Container className="register-container">
        <Grid.Container gap={2} justify="center" style={{ marginTop: "8vh" }}>
          <Grid xs={12} md={4} xl={4}>
            <Card>
              <form onSubmit={formik.handleSubmit}>
                <Spacer y={1} />
                <Card.Header>
                  <Link to={"/"} style={{ width: "100%" }}>
                    <Image src="/assets/main_logo.png" alt="logo" width={300} />
                  </Link>
                </Card.Header>
                <Card.Body>
                  <Row gap={1} css={{ margin: 0 }}>
                    <Col>
                      <Text
                        h2
                        style={{ textAlign: "center", color: "#33cc99" }}
                      >
                        Create an account
                      </Text>
                      <Spacer y={1} />
                    </Col>
                  </Row>
                  <Row gap={1} css={{ margin: 0 }}>
                    <Col>
                      <Input
                        bordered
                        rounded
                        label="Email Address*"
                        type="email"
                        contentRight={<User set="curved" />}
                        width="100%"
                        required
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="youremail@company.com"
                      />
                      <Spacer y={1} />
                      <Input
                        bordered
                        rounded
                        label="Mobile Number*"
                        type="tel"
                        contentRight={<Call set="curved" />}
                        width="100%"
                        required
                        id="mobile"
                        name="mobile"
                        onChange={formik.handleChange}
                        value={formik.values.mobile}
                        placeholder="+947XXXXXXXX"
                      />
                      <Spacer y={1} />
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row gap={1}>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        auto
                        rounded
                        type="submit"
                        id="submitButton"
                        style={{
                          backgroundColor: "#33CC99",
                          color: "#FFFFFF",
                          borderColor: "33CC99",
                          marginLeft: 8,
                        }}
                      >
                        Register
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        light
                        rounded
                        color="primary"
                        type="button"
                        onPress={() => {
                          navigate("/login");
                        }}
                      >
                        Sign In
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
                <Spacer y={1} />
              </form>
            </Card>
          </Grid>
        </Grid.Container>
      </Container>
      {/* FOOTER AREA */}
      <Footer />
      {/* OTP Modal */}
      <Modal
        closeButton
        blur
        open={visible}
        onOpen={openHandler}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text>Enter the OTP code</Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={otpForm.handleSubmit}>
            <Row>
              <Col>
                <Input
                  bordered
                  rounded
                  type="text"
                  width="100%"
                  required
                  id="otpCode"
                  name="otpCode"
                  onChange={otpForm.handleChange}
                  value={otpForm.values.otpCode}
                  placeholder="XXXXXX"
                />
                <Spacer y={1} />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    light
                    rounded
                    color="primary"
                    type="submit"
                    style={{
                      backgroundColor: "#33CC99",
                      color: "#FFFFFF",
                      borderColor: "33CC99",
                    }}
                  >
                    Verify
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterPage;
