import React, { useEffect, useState } from "react";
import classes from "./SentMail.module.css";
import SideBar from "../SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteSentItem, sentMail } from "../store/MailSlice";
import { NavLink } from "react-router-dom";

const fetchData = async () => {
  const email = localStorage.getItem("email");
  const newEmail = email.replace(/[^\w\s]/gi, "");

  if (!email) {
    console.error("Email not found in localStorage");
    return;
  }

  const response = await fetch(
    `https://mailbox-ac5ed-default-rtdb.firebaseio.com/${newEmail}sent.json`
  );

  if (!response.ok) {
    console.error("Failed to fetch cart items");
    return;
  }

  const data = await response.json();
  if (data && typeof data === "object") {
    const dataArray = Object.entries(data).map(([idd, entry]) => ({
      idd,
      ...entry,
    }));
    return dataArray;
  } else {
    return [];
  }
};

const SentMail = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const sentItems = useSelector((state) => state.mail.sentItems);

  useEffect(() => {
    fetchData().then((data) => {
      setItems(data);
      console.log("sent mails", data);

      dispatch(sentMail(data));
    });
  }, []);
  console.log("sentItems", sentItems);
  const deleteMailHandler = async (id) => {
    const email = localStorage.getItem("email");
    const newEmail = email.replace(/[^\w\s]/gi, "");

    console.log("Hi i'm in delete");
    try {
      const response = await fetch(
        `https://mailbox-ac5ed-default-rtdb.firebaseio.com/${newEmail}sent/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete email (HTTP ${response.status})`);
      }

      const updatedData = items.filter((item) => item.idd !== id);
      console.log("update data", updatedData);
      console.log("item id", id);
      console.log("hello");
      setItems(updatedData);
      dispatch(deleteSentItem(id));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={classes.div}>
      <SideBar />
      <div className={classes.inbox}>
        <h1>Sent Mails</h1>
        <ul className={classes.ul}>
          {items.map((item, index) => (
            <li key={index} className={classes.li}>
              <div className={classes.firstLine}>
                <NavLink to={`${item.id}`} className={classes.NavLink}>
                  <h5 className={classes.email}>{item.to}</h5>
                </NavLink>

                <h6>{item.time}</h6>
              </div>
              <div className={classes.secondLine}>
                <h6 className={classes.subject}>{item.subject}</h6>
                <p>{item.content}</p>
              </div>
              <p
                style={{ marginLeft: "90rem", zIndex: "1", cursor: "pointer" }}
                onClick={() => deleteMailHandler(item.idd)}
              >
                🗑️
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SentMail;
