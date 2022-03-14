import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

function Search() {
  const [usersData, setUsersData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [attr, setAttr] = useState("name");
  const [order, setOrder] = useState(true);

  const apiUrl = 'https://retoolapi.dev/NM1xLV/data';

  useEffect(() => {
    axios
    .get(apiUrl)
    .then((res) => {
      setUsersData(res.data);
      const sortedList = sortUserList(attr, order, res.data);
      setUserList(sortedList)
    })
    .catch((error) => {
      console.log(error);
      setError(error);
    });
  }, [attr, order]);

  const sortUserList = (attr, order, list) => {
    if (order) {
      list.sort((a, b) => {
        const el1 = attr === 'joinedOn' ? new Date(a[attr]) : a[attr].toLowerCase();
        const el2 = attr === 'joinedOn' ? new Date(b[attr]) : b[attr].toLowerCase();

        if (el1 < el2) {
          return -1;
        }
        if (el1 > el2) {
          return 1;
        }
        return 0;
      });
    } else {
      list.sort((a, b) => {
        const el1 = attr === 'joinedOn' ? new Date(a[attr]) : a[attr].toLowerCase();
        const el2 = attr === 'joinedOn' ? new Date(b[attr]) : b[attr].toLowerCase();
        
        if (el1 < el2) {
          return 1;
        }
        if (el1 > el2) {
          return -1;
        }
        return 0;
      });
    }
    return list;
  };

  const filterUserList = (val, userList = usersData) => {
    let myList = [];
    userList.forEach((user) => {
      if (user.name.toLowerCase().includes(val.toLowerCase()) || user.profession.toLowerCase().includes(val.toLowerCase())) {
        myList.push(user);
      }
    });
    setUserList(myList);
  };

  const handleClick = (order) => {
    setOrder(order);
  }

  const resetFilters = () => {
    setAttr("name");
    setUserList(sortUserList(attr, true, usersData));
    setError("");
  };

  return (
    <div>
      <header className="header">Welcome to the Portal</header>
      <div className="container">
        <div className="filters">
          <input
            className="form-control"
            placeholder="Search For anything..."
            onChange={(e) => filterUserList(e.target.value)}
          ></input>
          <button onClick={() => handleClick(true) } className={order ? 'active-btn' : ''}>
            <i className={"fas fa-solid fa-arrow-down"}></i>
          </button>
          <button onClick={() => handleClick(false)} className={!order ? 'active-btn' : ''}>
            <i className="fas fa-solid fa-arrow-up"></i>
          </button>

          <select
            className="form-control"
            value={attr}
            onChange={(e) => {
              setAttr(e.target.value);
            }}
          >
            <option value="name" defaultValue={"name"}>
              name
            </option>
            <option value="joinedOn">JoinedOn</option>
            <option value="profession">profession</option>
          </select>
          <button className="form-control" onClick={() => resetFilters()}>
            Reset
          </button>
        </div>
        {!error ? 
        (userList && userList.length > 0 ? 
          userList.map((user) => (
            <Link key={user.id} to={`/empdata/${user.id}`}    className="emp-list">
              Name: {user.name}, 
              Joined: <Moment format='Do MMMM, YYYY'>{user.joinedOn}</Moment>, 
              Profession: {user.profession}
            </Link>
          )) 
          : <h4>Loading...</h4>) 
        : <h4>No Data Found</h4> }
        {error ? error : null}
      </div>
    </div>
  );
}

export default Search;