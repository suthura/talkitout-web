import React from "react";
import { Row, Stack } from "react-bootstrap";

const Footer = () => {
  return (
    <Row
      style={{
        width: "100%",
        color: "whitesmoke",
        backgroundColor: "#000",
        textAlign: "center",
        justifyContent: "center",
        padding: 12,
      }}
    >
      <Stack>
        <span> &copy;2023 Talk It Out </span>
        <a
          href="https://firebasestorage.googleapis.com/v0/b/talk-it-out-app-2e99f.appspot.com/o/admin%2FTerms_and_Conditions_updated.pdf?alt=media&token=2bfbfa5c-3c95-4841-a69b-c02a8a9b2657"
          target="_blank"
          rel="noreferrer"
        >
          Terms and Conditions
        </a>
        &nbsp; and&nbsp;
        <a
          href="https://firebasestorage.googleapis.com/v0/b/talk-it-out-app-2e99f.appspot.com/o/admin%2FPrivacy_Policy_TalkItOut.pdf?alt=media&token=ed8386c4-8170-48ce-a73e-43322be6b9ab"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        <br/>
        <span>
          Email:&nbsp;
          <a href="mailto:hello@talkitoutapp.com">hello@talkitoutapp.com </a>
        </span>
        <span>
          WhatsApp:&nbsp;
          <a href="https://wa.me/+94778897525" target="_blank" rel="noreferrer">
            +94 77 889 7525
          </a>
        </span>
      </Stack>
    </Row>
  );
};

export default Footer;
