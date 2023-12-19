import { useState } from "react";
import "./style.css";
import axios from "axios";



function LoginUser({setLogin,setInfoUser,setUserData,userData,setUserId,setRegistr,}) {

const [isShow, setIsShow] = useState(false);




  function loginFunc(e) {
    e.preventDefault();

    axios
      .get(
        `http://localhost:3000/users?email=${userData.email}&password=${userData.pass}`
      )
      .then((res) => {
        if (res.data.length) {
          setInfoUser(true);
          setLogin(false);
          setUserId(res.data[0].id);
       
        } else {
          alert("The password or login is incorrect");
        }
      });
  }

  return (
    <div className="login-div">
      <div className="form-login-div">
        <form action="" onSubmit={loginFunc}>
          <input
            type="email"
            placeholder="Enter your email..."
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <input
            type={isShow ? "text" : "password"}
            placeholder="Enter your password..."
            onChange={(e) => setUserData({ ...userData, pass: e.target.value })}
          />
          <div className="show-pass">
            <label htmlFor="show_input">
              {isShow ? "Hiden password" : "Show password"}
            </label>
            <input
              id="show_input"
              type="checkbox"
              onChange={() => setIsShow(!isShow)}
            />
          </div>
          <input type="submit" value="Login" />
          <button
            onClick={() => {
              setLogin(false);
              setRegistr(true);
            }}
            className="back-btn"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
