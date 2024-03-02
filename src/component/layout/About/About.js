import React, { Fragment } from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import logo from '../../../images/logo.png'
import { LinkedIn } from "@material-ui/icons";
import MetaData from "../MetaData";
const About = () => {
  const github = () => {
    window.location = "https://github.com/Ujwal-Gaonkar";
  };
  return (
    <Fragment>
      <MetaData title={`JUSTBUY- About`} />
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={logo}
              alt="Founder"
            />
            <Typography>JUSTBUY</Typography>
            <Button onClick={github} color="primary">
              Visit GitHub
            </Button>
            <span> JUSTBuy.co.in
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect With us...</Typography>
            <a
              href="https://www.youtube.com/channel/UCNaPKF1SRjTs94UpeYJa6Fw"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/ujwal-gaonkar-6746aa1a7/" target="blank">
              <LinkedIn className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default About;