import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useRef } from "react";


function InfoUser({ userId }) {
  const [todos, setTodos] = useState([]);
  const [postStatus, setPostStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingStatus, setEditingStatus] = useState({ id: null, stat: "" });
  let id = userId;
  const inputRef = useRef();



useEffect(() => {
  const fetchData = async () => {
    try {
      const userResponse = await axios.get(
        `http://localhost:3000/users?id=${id}`
      );

      const statusResponse = await axios.get(
        `http://localhost:3000/status?userId=${id}`
      );

      if (userResponse.data.length > 0) {
        setTodos(userResponse.data);
        
      }

      if (statusResponse.data.length > 0) {
        setPostStatus(statusResponse.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  fetchData();
}, [isLoading]);



function postStatusFunc(e) {
  e.preventDefault();
if(!inputRef.current.value.length>0){
  alert("You have not entered a status");
  return
}

  if (editingStatus.id === null) {
    axios
      .post(`http://localhost:3000/status?userId=${id}`, {
        stat: inputRef.current.value,
        userId: id,
      })
      .then((res) => {
        setPostStatus([...postStatus, res.data]);
        setIsLoading((prev) => !prev);
      setTimeout(() => {
        inputRef.current.value = "";
      }, 100);
      });
  } else {
    axios
      .patch(`http://localhost:3000/status/${editingStatus.id}`, {
        stat: inputRef.current.value,
        userId: id,
      })
      .then((res) => {
        const updatedStatus = postStatus.map((stts) =>
          stts.id === editingStatus.id ? res.data : stts
        );
        setPostStatus(updatedStatus);
        setIsLoading((prev) => !prev);
        inputRef.current.value = "";
        setEditingStatus({ id: null, stat: "" });
      });
  }
}



 function deleteFunc(param) {
   const newStatus = postStatus.filter((item) => item.id !== param);
   setPostStatus(newStatus);

   axios.delete(`http://localhost:3000/status/${param}`)
     .then((res) => {
       inputRef.current.value = "";
       setEditingStatus({ id: null, stat: "" });
     })
     .catch((error) => {
       console.error("error", error);
      setPostStatus(postStatus);
     });
 }



  return (
    <div className="info-main-div">
      <div className="info-inner-div">
        <h1>My Page</h1>
        {todos.map((todo, index) => {
          return (
            <div className="name-country-div" key={index}>
              <p className="name-p">{todo.fullname}</p>
              <p>{todo.country}</p>
            </div>
          );
        })}
        <div className="status-div">
          <form className="status-form" action="" onSubmit={postStatusFunc}>
            <input
              ref={inputRef}
              type="text"
              value={editingStatus.stat}
              onChange={(e) =>
                setEditingStatus({ ...editingStatus, stat: e.target.value })
              }
            />
            <input className="add-status-input" type="submit" value="Add Status"/>
          </form>
          <h2>Status List</h2>
          <table>
            <tbody>
              {postStatus.map((stts) => {
                return (
                  <tr key={stts.id}>
                    <td className="status-td">{stts.stat}</td>
                    <td className="action-td">
                      <div className="btn-div">
                        <img
                          onClick={() =>
                            setEditingStatus({ id: stts.id, stat: stts.stat })
                          }
                          src="https://static.thenounproject.com/png/4436557-200.png"
                          className="update-btn"
                        />
                        <img
                          onClick={() => deleteFunc(stts.id)}
                          src="https://icons.veryicon.com/png/o/miscellaneous/merchant-edition/delete-589.png"
                          className="delete-btn"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button>Logout</button>
      </div>

    </div>
  );
}

export default InfoUser;
