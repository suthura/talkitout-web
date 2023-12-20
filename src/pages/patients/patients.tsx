import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout/layout";
import {
  Container,
  Loading,
  PressEvent,
  Spacer,
  Badge,
  Button,
  Col,
  Row,
  Table,
} from "@nextui-org/react";
import axios from "axios";
import { array } from "yup";

import dayjs from "dayjs";
import { Show } from "react-iconly";
import UserProfileComponent from "../../components/user-profile";
import api from "../../utils/api";

const PatientsPage = () => {
  const [loading, setLoading] = useState(false);
  //   const [profileLoading, setProfileLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  //   const [loadData, setLoadData] = useState(false);

  const columns = [
    {
      key: "id",
      label: "#",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone Number",
    },
    {
      key: "created",
      label: "Created On",
    },
    // {
    //   key: "status",
    //   label: "Status",
    // },
    // {
    //   key: "actions",
    //   label: "Actions",
    // },
  ];

  const renderCell = (user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return <UserProfileComponent user={user} />;
      case "status": {
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Badge>{user.isActive ? "Active" : "Inactive"}</Badge>
            </Col>
          </Row>
        );
      }
      case "created": {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCMilliseconds(user.created);
        return d.toLocaleDateString();
      }
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              {/* <Tooltip content="Details"></Tooltip> */}
              <Button
                auto
                icon={<Show set="bold" primaryColor="white" />}
                onPress={(e: PressEvent) => {
                  //handleViewPress(user);
                }}
              />
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  useEffect(() => {
    setLoading(true);
    // axios
    //   .get(`/Patients`)
    //   .then((res) => {
    //     if (res) {
    //       let tempData = [];
    //       for (let key in res.data) {
    //         if (typeof res.data[key] === typeof array) {
    //         }
    //         tempData.push({ ...res.data[key], key: key });
    //       }
    //       setData(tempData.sort((x) => x.status));
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    api
    .get('/api/user/getUsers', { })
    .then((res) => {
      if (res) {
        let tempData = res.data.data.map((element: { _id: any }) => ({
          ...element,
          key: element._id,
        }));
        setData(tempData.sort((x: { status: any }) => x.status));
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <Spacer y={1} />
          <h2>
            Patients
            {/* {profileLoading && <Loading size="sm" />} */}
          </h2>
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
              {data && (
                <Table.Body items={data}>
                  {(item) => (
                    <Table.Row>
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
    </>
  );
};

export default PatientsPage;
