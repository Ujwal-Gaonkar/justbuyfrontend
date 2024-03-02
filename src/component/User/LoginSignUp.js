import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Profile from '../../images/Profile.png'
import MetaData from "../layout/MetaData";
import emailjs from '@emailjs/browser';
import apikeys from './apikeys'
const LoginSignUp = ({history , location}) =>{
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [otp ,setotp]=useState("");
  const [genOtp,setgenOtp] = useState( Math.floor(1000 + Math.random() * 9000));
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const[sent,setsent]=useState(false);

  const loginSubmit = (e) =>{
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  }
    const getOtp =(e)=>{
    e.preventDefault();
    var templateParams = {
    name: name,
    otp:genOtp,
    send:email,
    };
    
    emailjs.send(apikeys.SERVICE_ID,apikeys.TEMPLATE_ID, templateParams,apikeys.PUBLIC_KEY)
    .then(function(response) {
     window.alert("Otp is sent to your mail-ID");
    }, function(error) {
      window.alert('Invalid Email-ID .. please refresh the page and enter valid email-Id');
    });
    setsent(true);
  }

  const handleChange = (e)=>{
    e.preventDefault();
    setotp(e.target.value);
  }
  const registerSubmit = (e) => {
    e.preventDefault(); 
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    if(parseInt(otp) === genOtp)
    {
      dispatch(register(myForm)); 
    }
    else
    {
      window.alert('incorrect otp entered');
      history.push('/login');
    }
    
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
    
  }, [dispatch, error, alert,redirect ,isAuthenticated,history]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
        {loading? <Loader/> :(

          <Fragment>
          <MetaData title="JUSTBuy"/>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    aria-label="Name"
                    pattern="^[A-Za-z ]{4,16}"
                    required
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <input disabled={sent} type="submit" value="Get Otp" className="getOtp" onClick={getOtp}/>
                <div className="signUpOtp">
                  <input
                    type="text"
                    placeholder="Enter Otp"
                    required
                    name="otp"
                    value={otp}
                    onChange={handleChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input disabled={parseInt(otp)!==genOtp}  type="submit"  value="Register" className="signUpBtn" />
              </form>

            </div>
          </div>
          </Fragment>
        )}

       
    </Fragment>
  );
};

export default LoginSignUp;