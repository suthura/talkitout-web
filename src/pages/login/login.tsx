import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Input,
  Row,
  Spacer,
  Image,
  Text,
  Modal,
} from "@nextui-org/react";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { TickSquare, User } from "react-iconly";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../models/userData";

import "./login.css";
import Footer from "../../components/footer";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import api from "../../utils/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const ref: any = useRef(null);

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => {
      if (ref && ref.current) ref.current.continuousStart();

      api.post(`/api/counselor/login`, { emailOrPhone: values.email }).then(
        (res) => {
          // save user in shared data
          const data = res.data.data;
          const currentUser: UserData = {
            email: values.email,
            phoneNumber: data.phone_no,
            uid: data.user_id,
          };
          if (data.account_status === "NEW") {
            if (ref && ref.current) ref.current.complete();
            return setVisible(true);
          }
          if (data.account_status === "REJECTED") {
            if (ref && ref.current) ref.current.complete();
            return toast("Your account is rejected", {
              type: "error",
            });
          }
          api.post(`/api/user/getotp`, data).then(
            (res) => {
              if (ref && ref.current) ref.current.complete();
              otpForm.setFieldValue("userId", data.user_id);
              setShowOTP(true);
            },
            (error) => {
              if (ref && ref.current) ref.current.complete();
              toast("Error sending OTP", {
                type: "warning",
              });
            }
          );
        },
        (error) => {
          if (ref && ref.current) ref.current.complete();
          toast("We cannot find an account. Please register to continue", {
            type: "warning",
          });
        }
      );
    },
  });

  const otpForm = useFormik({
    initialValues: {
      otpCode: "",
      userId: "",
    },
    onSubmit: (values) => {
      api
        .post("/api/user/verifyotp", {
          user_id: values.userId,
          enteredOTP: values.otpCode,
          user_type: "COUNSELOR",
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.user.token);
          navigate("/dashboard");
        });
    },
  });

  const closeModalHandler = () => {};

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />

      <Container className="login-container">
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
                        Counsellor Portal
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
                        style={{
                          backgroundColor: "#33CC99",
                          color: "#FFFFFF",
                          borderColor: "33CC99",
                          marginLeft: 8,
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        light
                        rounded
                        color="primary"
                        type="submit"
                        onPress={() => {
                          // clear localstorage
                          localStorage.removeItem("currentUser");
                          navigate("/register");
                        }}
                      >
                        Create an Account
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
                <Spacer y={1} />
              </form>
            </Card>
          </Grid>
        </Grid.Container>
        <Modal closeButton blur onClose={closeModalHandler}>
          <Modal.Header>
            <TickSquare
              set="bold"
              primaryColor="limegreen"
              style={{ marginRight: 8 }}
            />
            <Text>Registration Success</Text>
          </Modal.Header>
          <Modal.Body>
            <p>
              Thank you for submitting your details. Your details are submitted
              to the verification process. Once the verification is completed,
              you will get and email to the email address you provided.
            </p>
          </Modal.Body>
        </Modal>
      </Container>
      {/* FOOTER AREA */}
      <Footer />
      {/* Pending Modal */}
      <Modal closeButton blur open={visible} onClose={closeHandler}>
        <Modal.Header>
          <TickSquare
            set="bold"
            primaryColor="limegreen"
            style={{ marginRight: 8 }}
          />
          <Text>Pending Approval</Text>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your details are submitted to the verification process and pending
            approval
          </p>
        </Modal.Body>
      </Modal>
      {/* OTP Modal */}
      <Modal closeButton blur open={showOTP} onClose={() => setShowOTP(false)}>
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

export default LoginPage;
