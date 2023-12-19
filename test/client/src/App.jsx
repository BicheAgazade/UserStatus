import { useState } from "react";
import "./App.css";
import InfoUser from "./components/Info";
import LoginUser from "./components/Login";
import RegistrUser from "./components/Registr";

function App() {
  const [infoUser, setInfoUser] = useState(false);
  const [login, setLogin] = useState(false);
  const [registr, setRegistr] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    pass: "",
  });

  return (
    <div>
      {registr && <RegistrUser setRegistr={setRegistr} setLogin={setLogin} />}
      {infoUser && <InfoUser  userId={userId} setInfoUser={setInfoUser}  setLogin={setLogin}/>}
      {login && (
        <LoginUser
        setRegistr={setRegistr}
          setUserId={setUserId}
          userData={userData}
          setLogin={setLogin}
          setInfoUser={setInfoUser}
          setUserData={setUserData}
        />
      )}
    </div>
  );
}

export default App;
