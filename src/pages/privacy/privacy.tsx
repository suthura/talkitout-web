import { Row, Col, Container, Text, Image } from "@nextui-org/react";
import React from "react";
import { Document, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PrivacyPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Image src="/assets/main_logo.png" alt="logo" width={320} />
          <Text h1>Privacy Policy</Text>
          <Document file="https://firebasestorage.googleapis.com/v0/b/talk-it-out-app-2e99f.appspot.com/o/admin%2FAgreement-08.05.2022.doc.pdf?alt=media&token=c10a6078-4415-4d7e-987d-e67cb05cec2b" />
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPage;
