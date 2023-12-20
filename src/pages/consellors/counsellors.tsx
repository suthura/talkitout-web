import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Loading,
  Modal,
  PressEvent,
  Row,
  Spacer,
  Table,
  useModal,
  Text,
  Link,
  Textarea,
} from "@nextui-org/react";

import { Layout } from "../../components/layout/layout";
import { array } from "yup";
import { Paper, Show } from "react-iconly";
import UserAvatarComponent from "../../components/user-avatar";
import UserProfileComponent from "../../components/user-profile";
import axios from "axios";
import { Tooltip } from "react-bootstrap";
import { Play } from "react-iconly";
import { RxCross2 } from "react-icons/rx";

import { TiTick } from "react-icons/ti";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import api, { API_URL } from "../../utils/api";

dayjs.extend(relativeTime);

const CounsellorsPage = () => {
  const [dataa, setData] = useState<any[]>([]);
  const [loadData, setLoadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();

  const { setVisible, bindings } = useModal();

  const columns = [
    {
      key: "_id",
      label: "#",
    },
    {
      key: "fname",
      label: "First Name",
    },
    {
      key: "lname",
      label: "Last Name",
    },
    // // {
    // //   key: "p",
    // //   label: "Patient",
    // // },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "created",
      label: "Created On",
    },
    {
      key: "account_status",
      label: "Status",
    },
    {
      key: "actions",
      label: "Actions",
    }
  ];

  useEffect(() => {
    setLoading(true);

    api
      .get("/api/counselor/getall",)
      .then((res) => {
        if (res) {
          // console.log("===============");
          // console.log(res.data.data);
          // console.log("***************");

          //         let tempData = [];
          // for (let key in res.data.data) {
          //   if (typeof res.data.data[key] === typeof array) {
          //   }
          //   tempData.push({ ...res.data[key], key: key });
          // }
          setData(res.data.data);
          // setData(res.data.data);
        } else {
          setData([]);

          console.log("No data available");
        }
      }
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadData]);

  const downloadFile = (fileName: string, type = "") => {
    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    // xhr.responseType = "blob";
    // xhr.onload = (event) => {
    //   const blob = xhr.response;

    //   saveOrOpenBlob(
    //     blob,
    //     `${selectedUser.firstName}_${selectedUser.lastName}_${type}`
    //   );
    // };
    xhr.open("GET", API_URL + "/uploads/" + fileName);
    xhr.send();
  };

  const saveOrOpenBlob = (blob: any, fileName: string) => {
    var tempEl = document.createElement("a");
    document.body.appendChild(tempEl);
    const url = window.URL.createObjectURL(blob);
    tempEl.href = url;
    tempEl.download = fileName;
    tempEl.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (account_status: string) => {
    let color:
      | "primary"
      | "success"
      | "warning"
      | "default"
      | "secondary"
      | "error" = "primary";
    switch (account_status) {
      case "NEW":
        // new
        color = "success";
        break;
      case "APPROVED":
        // approved
        color = "secondary";
        break;
      case "REJECTED":
        // rejected
        color = "error";
        break;
      case "NEW":
        // pending
        color = "warning";
        break;
      default:
        color = "primary";
        break;
    }
    return color;
  };

  // const renderCell = (user: any, columnKey: any) => {
  //   console.log(user)
  //   const cellValue = user[columnKey];
  //   switch (columnKey) {
  //     case "name":
  //       return <UserProfileComponent user={user} />;
  //     case "status": {
  //       return (
  //         <Row justify="center" align="center">
  //           <Col css={{ d: "flex" }}>
  //             <Badge color={getStatusColor(user.account_status)}>
  //               {user.account_status}
  //             </Badge>
  //           </Col>
  //         </Row>
  //       );
  //     }
  //     case "createdDate": {
  //       return dayjs(user.createdDate).fromNow();
  //     }
  //     case "actions":
  //       return (
  //         <Row justify="center" align="center">
  //           <Col css={{ d: "flex" }}>
  //             {/* <Tooltip content="Details"></Tooltip> */}
  //             <Button
  //               auto
  //               icon={<Show set="bold" primaryColor="white" />}
  //               onPress={(e: PressEvent) => {
  //                 handleViewPress(user);
  //               }}
  //             />
  //           </Col>
  //         </Row>
  //       );
  //     default:
  //       return cellValue;
  //   }
  // };

  const renderCell = (data: any, columnKey: any) => {
    // console.log("==========");
    // console.log(data);
    // console.log("***********")


    const cellValue = data[columnKey];
    // console.log({ data, cellValue });
    switch (columnKey) {
      case "p":
        return <UserProfileComponent user={data.user_id} />;
      case "cost":
        return `LKR ${data.cost}`;
      case "account_status": {
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Badge color={getStatusColor(data.account_status)}>
                {data.account_status}
              </Badge>
            </Col>
          </Row>
        );
      }
      case "created":
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCMilliseconds(data.created);
        return d.toLocaleDateString();
      case "actions":
        if (data.status === "REJECTED") return;

        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              {/* <Tooltip content="Details"></Tooltip> */}
              <Button
                auto
                icon={<Show set="bold" primaryColor="white" />}
                onPress={(e: PressEvent) => {
                  handleViewPress(data);
                }}
              />
            </Col>
          </Row>
        );
      // return (
      //   <Row justify="center" align="center">
      //     <Col css={{ d: "flex" }}>
      //       {data.status === "APPROVED" ? (
      //         <Tooltip title="Join Video Conference">
      //           <Button
      //             color="success"
      //             style={{ marginRight: 4 }}
      //             auto
      //             icon={<Play set="bold" primaryColor="white" />}
      //             onPress={(e: PressEvent) => {
      //               // setVideoCall(data._id);
      //             }}
      //           />
      //         </Tooltip>
      //       ) : (
      //         <>
      //           <Tooltip title="Approve">
      //             <Button
      //               color="default"
      //               style={{ marginRight: 4 }}
      //               auto
      //               icon={<TiTick size={30} />}
      //               onPress={(e: PressEvent) => {
      //                 // changeStatus(data._id, "APPROVED");
      //               }}
      //             />
      //           </Tooltip>
      //           <Tooltip title="Reject">
      //             <Button
      //               color="error"
      //               style={{ marginRight: 4 }}
      //               auto
      //               icon={<RxCross2 size={30} />}
      //               onPress={(e: PressEvent) => {
      //                 // changeStatus(data._id, "REJECTED");
      //               }}
      //             />
      //           </Tooltip>
      //         </>
      //       )}
      //     </Col>
      //   </Row>
      // );
      default:
        return cellValue;
    }
  };

  const handleViewPress = (user: any) => {
    setProfileLoading(true);
    setSelectedUser(user);
    setVisible(true);
    setProfileLoading(false);
    // axios.get(`/Counsellor/GetByUserId?id=${user.userId}`).then((res) => {
    //   setSelectedUser(res.data);
    //   setVisible(true);
    //   setProfileLoading(false);
    // });
  };

  // const updateUser = (data: any, status: boolean) => {
  //   // axios
  //   //   .post(
  //   //     `/Counsellor/UpdateStatusById?id=${data.id}&status=${status ? "APPROVED" : "REJECTED"
  //   //     }`
  //   //   )
  //   //   .then((res) => {
  //   //     toast("Updated successfully");
  //   //     setVisible(false);
  //   //     setSelectedUser(null);
  //   //     setLoadData(!loadData);
  //   //   });
  // };

  const changeStatus = (
    counselor_id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    setLoading(true);
    api
      .post("/api/counselor/changestatus", { user_id:counselor_id, status })
      .then((res) => {
        if (res) {
          toast.success("Counselor " + status);
          setVisible(false);
          setSelectedUser(null);
          setLoadData(!loadData);
        }
      })
      .catch(() => {
        toast.error("Error changing the  status");
        setLoading(false);
      });
  };

  return (

    <>
      <Layout>
        <Container>
          <Spacer y={1} />
          <h2>Counsellors {profileLoading && <Loading size="sm" />}</h2>

          {!loading && (
            <Table
              css={{
                minWidth: "100%",
              }}
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
              </Table.Header>
              {dataa && (
                <Table.Body items={dataa}>
                  {(item) => (
                    <Table.Row key={item}>

                      {(columnKey) => (
                        <Table.Cell key={columnKey}>
                          {renderCell(item, columnKey)}
                        </Table.Cell>
                      )}
                    </Table.Row>
                  )}
                </Table.Body>
              )}
            </Table>
          )}
          {loading && <Loading />}
        </Container>
      </Layout>
      {/* View User Modal */}
      {selectedUser && (
        <Modal closeButton {...bindings} width="75vw">
          <Modal.Body>
            <Row>
              <Col>
                {/* <UserAvatarComponent link={selectedUser.proPic} /> */}

                <Text h3>
                  {selectedUser.fname} {selectedUser.lname}{" "}
                  {
                    <Badge  color={getStatusColor(selectedUser.account_status)}>
                      {selectedUser.account_status}
                    </Badge>
                  }
                </Text>
              </Col>
            </Row>

            <Row>
              <Col>
                <Text>
                  Age: <strong>{selectedUser.age}</strong>
                </Text>
                <Text>
                  Email: <strong>{selectedUser.email}</strong>
                </Text>
                <Text>
                  Mobile Number: <strong>{selectedUser.phone}</strong>
                </Text>
                <Text>
                  Identity Document Number: <strong>{selectedUser.idproof}</strong>
                </Text>
                <Text>
                  Website:{" "}
                  <Link target="_blank">
                    <strong>{selectedUser.website}</strong>
                  </Link>
                </Text>
                <Text>
                  LinkedIn:
                  <Link target="_blank">
                    <strong>{selectedUser.linkedin}</strong>
                  </Link>
                </Text>
              </Col>
              <Col>
                <Text h5>Specialized Areas</Text>
                {selectedUser.specialized.join(", ")}
                <Spacer y={1} />
                <Text h5>Languages</Text>
                {selectedUser.languages
                  .map((x: string) => x.toUpperCase())
                  .join(", ")}
                <Spacer y={1} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Text h5>Expression of Interest</Text>
                <Textarea
                  readOnly
                  width="100%"
                  value={selectedUser.expofeinterest}
                ></Textarea>
                <Spacer y={1} />
                {/* <Text h5>Self Introduction</Text>
                <Text>{selectedUser.selfIntroduction}</Text> */}
                <Spacer y={1} />
                <Text h5>Documents</Text>
                <Link href={selectedUser.cvFile} download>
              Download CV File
            </Link>
            {" | "}
            {selectedUser.id_file_path && (
              <>
                <Link href={selectedUser.nicFile} download>
                  Download NIC File
                </Link>

                {" | "}
              </>
            )}
            {selectedUser.permit_file_path && (
              <Link href={selectedUser.permitFile} download>
                Download Permit File
              </Link>
            )}
                {/* <Row>
                  <Button
                  // onPress={() => downloadFile(selectedUser.cv_file_path, "CV")}
                  >

                    <Link target="_blank"  style={{ color: 'white' }}  href={API_URL + "/uploads/" + selectedUser.cv_file_path} download>
                      <Paper set="bold" />  CV
                    </Link>

                    
                  </Button>
                  <Spacer x={1} />
                  <Button
                    // onPress={() => downloadFile(selectedUser.nicFile, "ID")}
                  >
                    <Link target="_blank"  style={{ color: 'white' }}  href={API_URL + "/uploads/" + selectedUser.id_file_path} download>
                      <Paper set="bold" />   NIC/DL/Passport
                    </Link>
                  </Button>
                  <Spacer x={1} />
                  
                    <Link target="_blank"  style={{ color: 'white' }}  href={API_URL + "/uploads/" + selectedUser.certificate_file_path} download>
                      <Paper set="bold" />   PERMIT
                    </Link>
                </Row> */}
              </Col>
            </Row>

            <Row>
              <Col>
                <Text h5>Education Certificates</Text>
                <Link href={selectedUser.certificate_file_path} download>
              Download Certificates
            </Link>
            {/* {" | "}
            {selectedUser.id_file_path && (
              <>
                <Link href={selectedUser.nicFile} download>
                  Download NIC File
                </Link>

                {" | "}
              </>
            )}
            {selectedUser.permit_file_path && (
              <Link href={selectedUser.permitFile} download>
                Download Permit File
              </Link>
            )} */}

                {/* <Button.Group>
                  {selectedUser.educationFiles?.map(
                    (file: any, index: number) => {
                      return (
                        <Button
                          key={index}
                          onPress={() =>
                            downloadFile(file, `CERTIFICATE_${index + 1}`)
                          }
                        >
                          <Paper set="bold" />
                        </Button>
                      );
                    }
                  )}
                </Button.Group> */}
              </Col>
              <Col>
                <Text h5>Service Letters</Text>
                <Link href={selectedUser.service_file_path} download>
                SERVICE  File
            </Link>
                {/* <Button.Group>
                  {selectedUser.serviceLetterFiles?.map(
                    (file: any, index: number) => {
                      return (
                        <Button
                          key={index}
                          onPress={() =>
                            downloadFile(file, `SERVICE_${index + 1}`)
                          }
                        >
                          <Paper set="bold" />
                        </Button>
                      );
                    }
                  )}
                </Button.Group> */}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Button
                color="success"
                onPress={() => changeStatus(selectedUser._id,"APPROVED")}
              >
                Approve
              </Button>
              <Spacer x={1} />
              <Button
                color="error"
                onPress={() => changeStatus(selectedUser._id, "REJECTED")}
              >
                Reject
              </Button>
            </Row>
          </Modal.Footer>
          <Spacer y={1} />
        </Modal>
      )}
    </>
  );
};

export default CounsellorsPage;
