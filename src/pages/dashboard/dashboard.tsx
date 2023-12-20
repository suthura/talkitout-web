import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout/layout";
import { Card, Container, Grid, Loading, Spacer } from "@nextui-org/react";
import useUser from "../../hooks/useUser";
import api from "../../utils/api";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [sessiondata, setsessiondata] = useState<any>();
  const [patientdata, setpatientdata] = useState<any>();
  const [counselorData, setcounselorData] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    // console.log(user);

    try{
      if (user && user.ac_super === true) {
        api
        .post("/api/appointment/getall", {
              
            })
            .then((res) => {
              if (res) {
                setsessiondata(res.data.data.length);
              } else {
                console.log("No data available");
                setsessiondata(0);

              }
            }       
          )

          api
          .get("/api/user/getUsers",)
              .then((res) => {
                if (res) {
                  setpatientdata(res.data.data.length);
                } else {
                  setpatientdata(0);

                  console.log("No data available");
                }
              }       
            )

            api
          .get("/api/counselor/getcounselors",)
              .then((res) => {
                if (res) {
                  setcounselorData(res.data.data.length);
                } else {
                  setcounselorData(0);

                  console.log("No data available");
                }
              }       
            )

      }else{

          //get session length
          api
          .post("/api/appointment/getCounselorAppointments", {
            counselor_id: user._id,
          })
          .then((res) => {
            if (res) {
              setsessiondata(res.data.data.length);
            } else {
              console.log("No data available");
            }
          }       
        )
        //end get session length

      }
    }
    catch{

    }
    finally{
      setLoading(false);
    }
   
  }, []);

  return (
    <Layout>
      <Container>
        <Spacer y={1} />
        <h2>Welcome {user?.fname + " " + user?.lname}</h2>
        {!loading && (
          <Grid.Container gap={1}>
            {user && user.ac_super === true && (
              <Grid xs={4}>
                <Card>
                  <Card.Body>
                    <h4>Counsellors</h4>
                    <h2>{counselorData}</h2>
                  </Card.Body>
                </Card>
              </Grid>
            )}

            {user && user.ac_super === true && (
              <Grid xs={4}>
                <Card>
                  <Card.Body>
                    <h4>Patients</h4>
                    <h2>{patientdata}</h2>
                  </Card.Body>
                </Card>
              </Grid>
            )}

            <Grid xs={4}>
              <Card>
                <Card.Body>
                  <h4>Sessions</h4>
                  <h2>{sessiondata}</h2>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        )}
        {loading && <Loading />}
      </Container>
    </Layout>
  );
};

export default DashboardPage;
