import {
  Badge,
  Button,
  Col,
  Container,
  Loading,
  PressEvent,
  Row,
  Spacer,
  Table,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout/layout";
import { Play } from "react-iconly";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import UserProfileComponent from "../../components/user-profile";
import api from "../../utils/api";
import useUser from "../../hooks/useUser";
import AgoraUIKit from "agora-react-uikit";
import { Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

const AppointmentsPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [videoCall, setVideoCall] = useState<string | undefined>(undefined);
  const { user } = useUser();

  const callbacks = {
    EndCall: async () => {
      setVideoCall(undefined);
      window.location.reload();
    },
  };

  const columns = [
    {
      key: "_id",
      label: "#",
    },
    {
      key: "type",
      label: "Type",
    },
    {
      key: "p",
      label: "Patient",
    },
    {
      key: "date",
      label: "Scheduled Date",
    },
    // {
    //   key: "cost",
    //   label: "Cost",
    // },
    // {
    //   key: "paymentReference",
    //   label: "Payment Ref",
    // },
    {
      key: "created",
      label: "Created On",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const renderCell = (data: any, columnKey: any) => {
    const cellValue = data[columnKey];
    console.log({ data, cellValue });
    switch (columnKey) {
      case "p":
        return <UserProfileComponent user={data.user_id} />;
      case "cost":
        return `LKR ${data.cost}`;
      case "status": {
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Badge color={data.status === "APPROVED" ? "primary" : "default"}>
                {data.status}
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
              {data.status === "APPROVED" ? (
                <Tooltip title="Join Video Conference">
                  <Button
                    color="success"
                    style={{ marginRight: 4 }}
                    auto
                    icon={<Play set="bold" primaryColor="white" />}
                    onPress={(e: PressEvent) => {
                      setVideoCall(data._id);
                    }}
                  />
                </Tooltip>
              ) : (
                <>
                  <Tooltip title="Approve">
                    <Button
                      color="default"
                      style={{ marginRight: 4 }}
                      auto
                      icon={<TiTick size={30} />}
                      onPress={(e: PressEvent) => {
                        changeStatus(data._id, "APPROVED");
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Reject">
                    <Button
                      color="error"
                      style={{ marginRight: 4 }}
                      auto
                      icon={<RxCross2 size={30} />}
                      onPress={(e: PressEvent) => {
                        changeStatus(data._id, "REJECTED");
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const fetchData = () => {
    setLoading(true);
    var fetchLink =
      user && user.ac_super === true
        ? `/api/appointment/getall`
        : `/api/appointment/getCounselorAppointments`;

    api
      .post(fetchLink, { counselor_id: user._id })
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
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStatus = (
    appointment_id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    setLoading(true);
    api
      .post("/api/appointment/changestatus", { appointment_id, status })
      .then((res) => {
        if (res) {
          toast.success("Appointment " + status);
          setLoading(false);
          fetchData();
        }
      })
      .catch(() => {
        toast.error("Error changing the appointment status");
        setLoading(false);
      });
  };

  if (videoCall)
    return (
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AgoraUIKit
          rtcProps={{
            appId: "5e1244dbc9454abcb9d2dc8cb35fcb8a",
            channel: videoCall,
            dualStreamMode: 2,
          }}
          callbacks={callbacks}
        />
      </div>
    );

  return (
    <Layout>
      <Container>
        <Spacer y={1} />
        <h2>Sessions</h2>
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
  );
};

export default AppointmentsPage;
