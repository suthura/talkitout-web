import {
  Col,
  Container,
  Text,
  Link,
  Textarea,
  Row,
  Spacer,
  Table,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { Layout } from "../../components/layout/layout";
import UserAvatarComponent from "../../components/user-avatar";
import { Card } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import useUser from "../../hooks/useUser";
import api, { API_URL } from "../../utils/api";

const ProfilePage = () => {
  const { user, reFetch } = useUser();
  const formik = useFormik({
    initialValues: {
      ...user,
      user_id: user._id,
      fname: user.fname,
      lname: user.lname,
      age: user.age,
      email: user.email,
      expofeinterest: user.expofeinterest,
      selfIntroduction: "",
      website: user.website,
      linkedin: user.linkedin,
      phone: user.phone,
      proPic: API_URL + "/uploads/" + user.photo_file_path,
      nic: user.idproof,
      singlerate: user.singlerate,
      couple: user.couple,
      groupRate: user.grouprate,
      permitFile: API_URL + "/uploads/" + user.permit_file_path,
      cvFile: API_URL + "/uploads/" + user.cv_file_path,
      nicFile: API_URL + "/uploads/" + user.id_file_path,
      bankAccountName: "",
      bankAccountNumber: "",
      bankName: "",
      branchName: "",
      specialized: user.specialized,
      languages: user.languages,
      serviceLetterFiles: [API_URL + "/uploads/" + user.service_file_path],
      educationFiles: [API_URL + "/uploads/" + user.certificate_file_path],
    },
    onSubmit: (values) => {
      api.post(`/api/counselor/edit`, values).then(async (res) => {
        await reFetch();
        toast("Updated successfully");
      });
    },
    onReset: (values) => {
      formik.resetForm();
    },
  });

  const onSubmit = () => {
    formik.submitForm();
  };

  return (
    <>
      <Layout>
        <Container>
          <Spacer y={1} />
          <h2>Profile</h2>
          <Card>
            <Card.Body>
              <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <Row>
                  <Col>
                    <UserAvatarComponent link={formik.values.proPic} />
                  </Col>
                </Row>
                <Spacer y={1} />
                <Row>
                  <Col>
                    <Text h3>
                      {formik.values.fname} {formik.values.lname}{" "}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text>
                      Age: <strong>{formik.values.age}</strong>
                    </Text>
                    <Text>
                      Email: <strong>{formik.values.email}</strong>
                    </Text>
                    <Text>
                      Mobile Number: <strong>{formik.values.phone}</strong>
                    </Text>
                    <Text>
                      Identity Document Number:{" "}
                      <strong>{formik.values.nic}</strong>
                    </Text>
                    <Text>
                      Website:{" "}
                      <Link target="_blank">
                        <strong>{formik.values.website}</strong>
                      </Link>
                    </Text>
                    <Text>
                      LinkedIn:{" "}
                      <Link target="_blank">
                        <strong>{formik.values.linkedin}</strong>
                      </Link>
                    </Text>
                    <Spacer y={1} />
                  </Col>
                  <Col>
                    <Text h5>Specialized Areas</Text>
                    {formik.values.specialized &&
                      formik.values.specialized.join(", ")}
                    <Spacer y={1} />
                    <Text h5>Languages</Text>
                    <Checkbox.Group
                      orientation="horizontal"
                      value={formik.values.languages}
                      onChange={formik.handleChange}
                    >
                      <Checkbox value="EN">English</Checkbox>
                      <Checkbox value="SI">Sinhala</Checkbox>
                      <Checkbox value="TA">Tamil</Checkbox>
                    </Checkbox.Group>
                  </Col>
                </Row>
                <Spacer y={1} />
                <Row>
                  <Col>
                    <Text h5>Self Introduction</Text>
                    <Input
                      bordered
                      rounded
                      required
                      type="text"
                      width="50%"
                      id="selfIntroduction"
                      name="selfIntroduction"
                      onChange={formik.handleChange}
                      value={formik.values.selfIntroduction}
                    />
                    <Spacer y={1} />
                    <Text h5>Expression of Interest</Text>
                    <Textarea
                      bordered
                      readOnly
                      width="50%"
                      onChange={formik.handleChange}
                      value={formik.values.expofeinterest}
                    ></Textarea>
                  </Col>
                </Row>
                <Spacer y={1} />
                <Row>
                  <Col>
                    <Text h5>
                      Availability (In Sri Lankan Timezone, add N/A if not
                      available)
                    </Text>
                    <Table
                      aria-label="Example table with static content"
                      css={{
                        height: "auto",
                        minWidth: "100%",
                      }}
                    >
                      <Table.Header>
                        <Table.Column>Day</Table.Column>
                        <Table.Column>Monday</Table.Column>
                        <Table.Column>Tuesday</Table.Column>
                        <Table.Column>Wednesday</Table.Column>
                        <Table.Column>Thursday</Table.Column>
                        <Table.Column>Friday</Table.Column>
                        <Table.Column>Saturday</Table.Column>
                        <Table.Column>Sunday</Table.Column>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row key="1">
                          <Table.Cell>Start Time</Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="monday.fromhour"
                              name="monday.fromhour"
                              placeholder="Ex: 7am"
                              onChange={formik.handleChange}
                              value={formik.values?.monday?.fromhour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="tuesday.fromhour"
                              name="tuesday.fromhour"
                              onChange={formik.handleChange}
                              value={formik.values?.tuesday?.fromhour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="wednesday.fromhour"
                              name="wednesday.fromhour"
                              onChange={formik.handleChange}
                              value={formik.values?.wednesday?.fromhour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="thursday.fromhour"
                              name="thursday.fromhour"
                              onChange={formik.handleChange}
                              value={formik.values?.thursday?.fromhour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="friday.fromhour"
                              name="friday.fromhour"
                              onChange={formik.handleChange}
                              value={formik.values?.friday?.fromhour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="saturday.fromhour"
                              name="saturday.fromhour"
                              onChange={formik.handleChange}
                              value={formik.values?.saturday?.fromhour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="sunday.fromhour"
                              name="sunday.fromhour"
                              onChange={formik.handleChange}
                              value={formik.values?.sunday?.fromhour}
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row key="2">
                          <Table.Cell>End Time</Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="monday.tohour"
                              name="monday.tohour"
                              placeholder="Ex: 6pm"
                              onChange={formik.handleChange}
                              value={formik.values?.monday?.tohour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="tuesday.tohour"
                              name="tuesday.tohour"
                              onChange={formik.handleChange}
                              value={formik.values?.tuesday?.tohour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="wednesday.tohour"
                              name="wednesday.tohour"
                              onChange={formik.handleChange}
                              value={formik.values?.wednesday?.tohour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="thursday.tohour"
                              name="thursday.tohour"
                              onChange={formik.handleChange}
                              value={formik.values?.thursday?.tohour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="friday.tohour"
                              name="friday.tohour"
                              onChange={formik.handleChange}
                              value={formik.values?.friday?.tohour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="saturday.tohour"
                              name="saturday.tohour"
                              onChange={formik.handleChange}
                              value={formik.values?.saturday?.tohour}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              bordered
                              rounded
                              type="text"
                              required
                              id="sunday.tohour"
                              name="sunday.tohour"
                              onChange={formik.handleChange}
                              value={formik.values?.sunday?.tohour}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Col>
                </Row>
                <Spacer y={1} />
                <Row>
                  <Col>
                    <Text h5>Counselling Rates</Text>
                    <Input
                      bordered
                      rounded
                      label="Individual Session*"
                      type="text"
                      required
                      id="singlerate"
                      name="singlerate"
                      placeholder="Minimum LKR1000"
                      onChange={formik.handleChange}
                      value={formik.values.singlerate}
                      style={{ marginRight: 8 }}
                    />
                    <Input
                      bordered
                      rounded
                      label="Couple Session*"
                      type="text"
                      required
                      id="couple"
                      name="couple"
                      placeholder="Minimum LKR2000"
                      onChange={formik.handleChange}
                      value={formik.values.couple}
                    />
                    <Input
                      bordered
                      rounded
                      label="Group Session*"
                      type="text"
                      required
                      id="groupRate"
                      name="groupRate"
                      placeholder="Minimum LKR4000"
                      onChange={formik.handleChange}
                      value={formik.values.groupRate}
                    />
                  </Col>
                </Row>
                <Spacer />
                <Row>
                  <Col>
                    <Text h5>Bank Infomation</Text>
                    <Input
                      bordered
                      rounded
                      label="Bank Name"
                      type="text"
                      required
                      id="bankName"
                      name="bankName"
                      onChange={formik.handleChange}
                      value={formik.values.bankName}
                      style={{ marginRight: 8 }}
                    />
                    <Input
                      bordered
                      rounded
                      label="Branch Name"
                      type="text"
                      required
                      id="branchName"
                      name="branchName"
                      onChange={formik.handleChange}
                      value={formik.values.branchName}
                      style={{ marginRight: 8 }}
                    />
                    <Input
                      bordered
                      rounded
                      label="Account Name"
                      type="text"
                      required
                      id="bankAccountName"
                      name="bankAccountName"
                      onChange={formik.handleChange}
                      value={formik.values.bankAccountName}
                      style={{ marginRight: 8 }}
                    />
                    <Input
                      bordered
                      rounded
                      label="Account Number"
                      type="text"
                      required
                      id="bankAccountNumber"
                      name="bankAccountNumber"
                      onChange={formik.handleChange}
                      value={formik.values.bankAccountNumber}
                      style={{ marginRight: 8 }}
                    />
                  </Col>
                </Row>
              </form>
            </Card.Body>
            <Spacer />
            <Link href={formik.values.cvFile} download>
              Download CV File
            </Link>
            {" | "}
            {user.id_file_path && (
              <>
                <Link href={formik.values.nicFile} download>
                  Download NIC File
                </Link>

                {" | "}
              </>
            )}
            {user.permit_file_path && (
              <Link href={formik.values.permitFile} download>
                Download Permit File
              </Link>
            )}
            <Spacer />
            <Card.Footer>
              <Button type="submit" onPress={onSubmit}>
                Update
              </Button>
            </Card.Footer>
            <Spacer y={1} />
          </Card>
        </Container>
      </Layout>
    </>
  );
};

export default ProfilePage;
