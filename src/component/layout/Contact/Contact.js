import React, { Fragment } from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";
const Contact = () => {
  return (
    <Fragment>
      <MetaData title={`JUSTBUY- Contact`} />
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:justbuy.india.co@gmail.com">
        <Button>Contact: justbuy.india.co@gmail.com</Button>
      </a>
    </div>
    </Fragment>
  );
};

export default Contact;