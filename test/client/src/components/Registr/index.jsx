import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

function RegistrUser({ setRegistr, setLogin }) {
  const [postData, setPostData] = useState({
    fullname: "",
    birth: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  });

  const [listData, setListData] = useState([]);
   const [isRegLoading, setRegIsLoading] = useState(false);

  function registration(e) {
   const { name, value } = e.target;
  setPostData((prevFormData) => ({
       ...prevFormData,
       [name]: value,
     }));
   }
 


  function postDataFunc(e) {
    e.preventDefault();
    if (!postData.fullname || !postData.email || !postData.password || !postData.birth || !postData.confirmPassword ||!postData.country) {
      alert("Fill in all the fields");
      return;
    }

    if(!(postData.password===postData.confirmPassword)){
      alert("Enter the same password");
      return
    }
  let addUser = listData.find((user) => user.email === postData.email);

     {!addUser? axios.post("http://localhost:3000/users", postData)
      .then((res) => console.log(res.data)) : alert("This email have registration");
    }

    setPostData({
      fullname: "",
      birth: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
      
    });
     setRegIsLoading((prev) => !prev);
  }

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      setListData(res.data);
    });
  }, [isRegLoading]);

  return (
    <div className="registr-div">
      <div className="form-registr-div ">
        <form action="" onSubmit={postDataFunc}>
          <div>
            <input
              type="text"
              placeholder="Enter your fullname..."
              value={postData.fullname}
              onChange={registration}
              name="fullname"
            />
          </div>
          <div>
            <input
              type="date"
              placeholder="Enter date of birth..."
              value={postData.birth}
              onChange={registration}
              name="birth"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter your country..."
              value={postData.country}
              onChange={registration}
              name="country"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter your email..."
              value={postData.email}
              onChange={registration}
              name="email"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password..."
              value={postData.password}
              onChange={registration}
              name="password"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm your password..."
              value={postData.confirmPassword}
              onChange={registration}
              name="confirmPassword"
            />
          </div>
          <input type="submit" value="Registration" />
          <button
            className="login-btn"
            onClick={() => {
              setLogin(true);
              setRegistr(false);
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrUser;
