import React, { useEffect, useRef, useState } from "react";

import "./setup.css";

import {
  Card,
  Col,
  Container,
  Row,
  Spacer,
  Image,
  Input,
  Checkbox,
  Text,
  Textarea,
  Button,
  Modal,
  Grid,
} from "@nextui-org/react";
import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
// import { getStorage, ref as fileRef, uploadBytes } from "firebase/storage";

import { TickSquare } from "react-iconly";
import { Step, Stepper } from "react-form-stepper";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import api from "../../utils/api";

const SetupPage = () => {
  const [selectedSpeciality, setSelectedSpecialities] = useState<string[]>([]);
  const [selectedLang, setSelectedLang] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [cvFile, setCvFile] = useState<Blob>();
  const [permitFile, setPermitFile] = useState<Blob>();
  const [nicFile, setNicFile] = useState<Blob>();
  const [proPic, setProPic] = useState<Blob>();
  const [educationFiles, setEducationFiles] = useState<Blob>();
  const [serviceLetterFiles, setServiceLetterFiles] = useState<Blob>();

  const navigate = useNavigate();
  const ref: any = useRef(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");
    if (email && phone) {
      setEmail(email);
      setPhoneNumber(phone);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lanme: "",
      age: "",
      specialized: [],
      languages: [],
      selfIntroduction: "",
      website: "",
      linkedin: "",
      expofeinterest: "",
      idproof: "",
      singlerate: "",
      couple: "",
      grouprate: "",
    },

    onSubmit: (values) => {
      if (ref && ref.current) ref.current.continuousStart();
      updateDb({
        ...values,
        email: email,
        phone: phoneNumber,
        specialized: selectedSpeciality,
        languages: selectedLang,
      });
    },
  });

  const updateDb = async (data: any) => {
    var bodyFormData = new FormData();
    Object.keys(data).forEach((key) => {
      bodyFormData.append(key, data[key]);
    });
    if (cvFile) bodyFormData.append("cvfile", cvFile);
    if (permitFile) bodyFormData.append("permitfile", permitFile);
    if (nicFile) bodyFormData.append("idfile", nicFile);
    if (proPic) bodyFormData.append("propicfile", proPic);
    if (educationFiles) bodyFormData.append("certfile", educationFiles);
    if (serviceLetterFiles) bodyFormData.append("servfile", serviceLetterFiles);
    api({
      method: "post",
      url: "/api/counselor/create",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setVisible(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        if (ref && ref.current) ref.current.complete();
        localStorage.clear();
      });
  };

  const onCvFileChange = (e: any) => {
    setCvFile(e.target.files[0]);
  };

  const onPermitFileChange = (e: any) => {
    setPermitFile(e.target.files[0]);
  };

  const onNicFileChange = (e: any) => {
    setNicFile(e.target.files[0]);
  };

  const onEducationFilesChange = (e: any) => {
    setEducationFiles(e.target.files[0]);
  };

  const onServiceLetterFilesChange = (e: any) => {
    setServiceLetterFiles(e.target.files[0]);
  };

  const onProPicChange = (e: any) => {
    setProPic(e.target.files[0]);
  };

  const closeHandler = () => {
    setVisible(false);
    navigate("/login");
  };

  const nextStep = () => {
    if (
      activeStep === 0 &&
      (formik.values.fname === "" ||
        formik.values.lanme === "" ||
        formik.values.age === "" ||
        formik.values.idproof === "")
    ) {
      toast("Please fill the required field(s)", {
        type: "warning",
      });
    } else if (
      activeStep === 1 &&
      (selectedSpeciality.length === 0 ||
        selectedLang.length === 0 ||
        formik.values.selfIntroduction === "" ||
        formik.values.expofeinterest === "" ||
        formik.values.singlerate === "" ||
        formik.values.couple === "" ||
        formik.values.grouprate === "" ||
        parseInt(formik.values.singlerate) < 1000 ||
        parseInt(formik.values.couple) < 2000 ||
        parseInt(formik.values.grouprate) < 4000)
    ) {
      toast("Please fill the required field(s)", {
        type: "warning",
      });
    } else {
      if (activeStep >= 1) setActiveStep(2);
      else setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep <= 0) setActiveStep(0);
    else setActiveStep(activeStep - 1);
  };

  const onSubmit = () => {
    // check file selection
    if (
      !cvFile ||
      !nicFile ||
      !proPic ||
      !educationFiles ||
      !serviceLetterFiles
    ) {
      toast("Please select required file(s) to upload", {
        type: "warning",
      });
    } else {
      formik.submitForm();
    }
  };

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />
      <Container>
        <Spacer y={1} />
        <Image
          src="/assets/main_logo.png"
          alt="logo"
          width={300}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/register");
          }}
        />
        <Stepper activeStep={activeStep}>
          <Step label="Personal Information" />
          <Step label="Counselling Information" />
          <Step label="Document(s) Upload and Submit" />
          {/* <Step label="Finalize and Submit" /> */}
        </Stepper>
        <Card id="step0">
          <Card.Body>
            {activeStep === 0 && (
              <React.Fragment>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Text h2>Personal Information</Text>
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Input
                      bordered
                      rounded
                      label="First Name*"
                      type="text"
                      width="100%"
                      required
                      id="fname"
                      name="fname"
                      onChange={formik.handleChange}
                      value={formik.values.fname}
                      tabIndex={1}
                    />
                    <Spacer y={1} />
                    <Input
                      bordered
                      rounded
                      label="Age*"
                      type="text"
                      width="100%"
                      required
                      id="age"
                      name="age"
                      onChange={formik.handleChange}
                      value={formik.values.age}
                      tabIndex={3}
                    />
                    <Spacer y={1} />
                  </Col>
                  <Col>
                    <Input
                      bordered
                      rounded
                      label="Last Name*"
                      type="text"
                      width="100%"
                      required
                      id="lanme"
                      name="lanme"
                      onChange={formik.handleChange}
                      value={formik.values.lanme}
                      tabIndex={2}
                    />
                    <Spacer y={1} />
                    <Input
                      bordered
                      rounded
                      label="Proof of Identity Document Number* (NIC/DL/Passport)"
                      type="text"
                      width="100%"
                      required
                      id="idproof"
                      name="idproof"
                      onChange={formik.handleChange}
                      value={formik.values.idproof}
                      tabIndex={4}
                    />
                    <Spacer y={1} />
                  </Col>
                </Row>
                <Spacer y={1} />
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Input
                      bordered
                      disabled
                      rounded
                      label="Email Address*"
                      type="email"
                      width="100%"
                      readOnly
                      id="email"
                      name="email"
                      value={email}
                    />
                    <Spacer y={1} />
                    <Input
                      bordered
                      rounded
                      label="Website"
                      type="url"
                      width="100%"
                      id="website"
                      name="website"
                      onChange={formik.handleChange}
                      value={formik.values.website}
                      tabIndex={5}
                    />
                    <Spacer y={1} />
                  </Col>
                  <Col>
                    <Input
                      bordered
                      rounded
                      label="Mobile Number*"
                      type="tel"
                      disabled
                      width="100%"
                      readOnly
                      id="mobile"
                      name="mobile"
                      value={phoneNumber}
                    />
                    <Spacer y={1} />
                    <Input
                      bordered
                      rounded
                      label="LinkedIn Profile"
                      type="url"
                      width="100%"
                      id="linkedin"
                      name="linkedin"
                      onChange={formik.handleChange}
                      value={formik.values.linkedin}
                      tabIndex={6}
                    />
                    <Spacer y={1} />
                  </Col>
                </Row>
              </React.Fragment>
            )}

            {activeStep === 1 && (
              <React.Fragment>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Text h2>Counselling Information</Text>
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <h5>Specialized Areas (Select at least one)</h5>
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Checkbox.Group
                      orientation="horizontal"
                      value={selectedSpeciality}
                      onChange={setSelectedSpecialities}
                    >
                      <Row>
                        <Col span={4}>
                          <Checkbox className="list-w-100" value="Addiction">
                            Addiction
                          </Checkbox>
                          <Checkbox className="list-w-100" value="ADHD">
                            ADHD
                          </Checkbox>
                          <Checkbox
                            className="list-w-100"
                            value="Anger Management"
                          >
                            Anger Management
                          </Checkbox>
                          <Checkbox className="list-w-100" value="Anxiety">
                            Anxiety
                          </Checkbox>
                          <Checkbox
                            className="list-w-100"
                            value="Bipolar Disorder"
                          >
                            Bipolar Disorder
                          </Checkbox>
                          <Checkbox
                            className="list-w-100"
                            value="Career Counselling"
                          >
                            Career Counselling
                          </Checkbox>
                        </Col>
                        <Col span={4}>
                          <Checkbox
                            className="list-w-100"
                            value="Chronic Illness"
                          >
                            Chronic Illness
                          </Checkbox>
                          <Checkbox className="list-w-100" value="Depression">
                            Depression
                          </Checkbox>
                          <Checkbox
                            className="list-w-100"
                            value="Eating Disorders"
                          >
                            Eating Disorders
                          </Checkbox>
                          <Checkbox
                            className="list-w-100"
                            value="Family Conflicts"
                          >
                            Family Conflicts
                          </Checkbox>
                          <Checkbox value="Grief and Loss">
                            Grief and Loss
                          </Checkbox>
                          <Checkbox className="list-w-100" value="LGBT+ Issues">
                            LGBT+ Issues
                          </Checkbox>
                        </Col>

                        <Col span={4}>
                          <Checkbox
                            className="list-w-100"
                            value="Military Counselling"
                          >
                            Military Counselling
                          </Checkbox>
                          <Checkbox className="list-w-100" value="OCD">
                            OCD
                          </Checkbox>

                          <Checkbox className="list-w-100" value="Parenting">
                            Parenting
                          </Checkbox>
                          <Checkbox
                            className="list-w-100"
                            value="Relationship issues"
                          >
                            Relationship issues
                          </Checkbox>
                          <Checkbox className="list-w-100" value="Self-esteem">
                            Self-esteem
                          </Checkbox>
                          <Checkbox
                            className="list-w-100"
                            value="Sleeping Disorders"
                          >
                            Sleeping Disorders
                          </Checkbox>
                        </Col>
                        <Col span={4}>
                          <Checkbox
                            className="list-w-100"
                            value="Social Anxiety"
                          >
                            Social Anxiety
                          </Checkbox>
                          <Checkbox className="list-w-100" value="Stress">
                            Stress
                          </Checkbox>
                          <Checkbox
                            className="list-w-100"
                            value="Trauma and Abuse"
                          >
                            Trauma and Abuse
                          </Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                    <Spacer y={1} />
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <h5>
                      Which language(s) are you providing services? (Select at
                      least one)
                    </h5>
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Checkbox.Group
                      orientation="horizontal"
                      value={selectedLang}
                      onChange={setSelectedLang}
                    >
                      <Checkbox value="en">English</Checkbox>
                      <Checkbox value="si">Sinhala</Checkbox>
                      <Checkbox value="ta">Tamil</Checkbox>
                    </Checkbox.Group>
                    <Spacer y={1} />
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <h5>
                      Self Introduction* (This will be mentioned in the App)
                    </h5>
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Input
                      bordered
                      rounded
                      type="text"
                      width="80%"
                      id="selfIntroduction"
                      name="selfIntroduction"
                      onChange={formik.handleChange}
                      value={formik.values.selfIntroduction}
                      tabIndex={7}
                    />
                    <Spacer y={1} />
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <h5>Please include your expression of interest*</h5>
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Textarea
                      bordered
                      width="80%"
                      id="expofeinterest"
                      name="expofeinterest"
                      onChange={formik.handleChange}
                      value={formik.values.expofeinterest}
                      maxLength={500}
                    />
                    <Spacer y={1} />
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <h5>Counselling Hourly Rates (LKR)</h5>
                  </Col>
                </Row>
                <Row gap={2} css={{ margin: 0 }}>
                  <Col>
                    <Grid.Container gap={2} style={{ paddingLeft: 0 }}>
                      <Grid>
                        <Input
                          bordered
                          rounded
                          label="Individual Session* (Minimum LKR 1000)"
                          type="text"
                          required
                          id="singlerate"
                          name="singlerate"
                          onChange={formik.handleChange}
                          value={formik.values.singlerate}
                        />
                      </Grid>

                      <Grid>
                        <Input
                          bordered
                          rounded
                          label="Couple Session* (Minimum LKR 2000)"
                          type="text"
                          required
                          id="couple"
                          name="couple"
                          onChange={formik.handleChange}
                          value={formik.values.couple}
                        />
                      </Grid>

                      <Grid>
                        <Input
                          bordered
                          rounded
                          label="Group Session* (Minimum LKR 4000)"
                          type="text"
                          required
                          id="grouprate"
                          name="grouprate"
                          onChange={formik.handleChange}
                          value={formik.values.grouprate}
                        />
                      </Grid>
                    </Grid.Container>
                  </Col>
                </Row>
              </React.Fragment>
            )}

            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              {activeStep === 2 && (
                <React.Fragment>
                  <Row gap={2} css={{ margin: 0 }}>
                    <Col>
                      <Text h2>Document(s) Upload</Text>
                    </Col>
                  </Row>
                  <Row gap={2} css={{ margin: 0 }}>
                    <Col>
                      <Input
                        label="Upload your CV*"
                        type="file"
                        onChange={onCvFileChange}
                        width="80%"
                      />
                      <Spacer y={1} />
                      <Input
                        label="Proof of Identity (NIC/DL/Passport)*"
                        type="file"
                        onChange={onNicFileChange}
                        width="80%"
                      />
                      <Spacer y={1} />
                      <Input
                        label="Upload Educational Certificate(s)* (Certified copies of the original certiifcates are required to upload)"
                        type="file"
                        onChange={onEducationFilesChange}
                        width="80%"
                      />
                      <Spacer y={1} />
                      <Input
                        label="Upload Service Letter(s) (At least one service letter is essential)"
                        type="file"
                        onChange={onServiceLetterFilesChange}
                        width="80%"
                      />
                      <Spacer y={1} />
                      <Input
                        label="Counsellor Permit (Optional)"
                        type="file"
                        onChange={onPermitFileChange}
                        width="80%"
                      />
                      <Spacer y={1} />
                    </Col>

                    <Col span={6}>
                      <Input
                        label="Upload Profile Picture*"
                        type="file"
                        onChange={onProPicChange}
                        width="80%"
                        required
                      />
                      <Spacer y={1} />
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </form>
          </Card.Body>
          <Card.Footer>
            <Row gap={2} css={{ marginX: 16 }}>
              <Button
                auto
                rounded
                ghost
                color="default"
                type="button"
                id="backButton"
                onPress={prevStep}
              >
                Back
              </Button>
              {activeStep === 2 ? (
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
                  onPress={onSubmit}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  auto
                  rounded
                  type="button"
                  id="nextButton"
                  style={{
                    backgroundColor: "#33CC99",
                    color: "#FFFFFF",
                    borderColor: "33CC99",
                    marginLeft: 8,
                  }}
                  onPress={nextStep}
                >
                  Next
                </Button>
              )}
            </Row>
          </Card.Footer>
          <Spacer y={1} />
        </Card>
        <Spacer y={1} />
        {/* Success Modal */}
        <Modal closeButton blur open={visible} onClose={closeHandler}>
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
    </>
  );
};

export default SetupPage;
