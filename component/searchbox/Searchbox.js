import React, { useEffect, useState } from "react";
import styles from "../../styles/invitationbox.module.scss";
//import styles from "./invitationbox.module.scss";
import axios from "axios";
import Selectmentorinviteecontroller from "../selectmentorinvite/Selectmentorinvitee.controller";

function Searchbox(props) {
  const baseUrl = "https://www.ujustbe.com/";
  const [uniqnumber, setUniqnumber] = useState("");
  const [curentDate, setDates] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [disablebtn, setDisablebtn] = useState(false);
  const [meetingId, setmeetingId] = useState(null);
  const [title, settitle] = useState("");
  const [Agenda, setAgenda] = useState(null);
  const [MOM, setMOM] = useState(null);
  const [createdBy, setcreatedBy] = useState(null);
  const [fromUserId, setfromUserId] = useState(null);
  const [meetingDate, setmeetingDate] = useState(null);
  const [toUsersList, settoUsersList] = useState(null);
  const [statustype, setStatustype] = useState(true)

  const onChangeAgenda = (e) => {
    const Agenda = e.target.value;
    if (Agenda.length < 1) {
      //setErruser(true);
      setDisablebtn(false);
    } else {
      //setErruser(false);
      //setFocususer(true);
      setDisablebtn(true);
    }
    setAgenda(Agenda);
  };

  function savedata() {
    var MessageList = JSON.parse(localStorage.getItem("user"));
    console.log("local storage", MessageList.data);
    setcreatedBy(MessageList.data._id);
    setfromUserId(MessageList.data._id); 
  }

  useEffect(() => {
    savedata();
  }, []);

  console.log("invitation 3", props);
  useEffect(() => {
    setmeetingId(props.uniqueId);
    setmeetingDate(dateTime.toLocaleDateString());
    setMOM("");
  }, []);

  function handlemeeting() {
    const meetingdata = {
      meetingId: "",
      title: "Meeting Testing",
      Agenda: Agenda,
      MOM: "",
      meetingCode: props.uniqueId,
      createdBy: createdBy,
      fromUserId: fromUserId,
      meetingDate: "",
      toUsersList: props.sendmeeting,
    };
    console.log("meeting data", meetingdata);
    axios
      .post("https://api-test.ujustbe.com/AddNewMeeting", meetingdata)
      .then((response) => {
        if (response.data.message[0].type === "SUCCESS") {
          setStatustype(false);

        }
      });
    //.then(response => setArticleId(response.data.id));
  }

  function hidesuccess(){
    setStatustype(true);
    setAgenda("");
    setDisablebtn(false)
  }

  return (
    console.log(),
    (
      <>
        {props.openbox ? (
          <>
            <div className={styles.boxWrapper}>
              {props.data.map(() => (
                <div
                  onClick={() => props.removedall()}
                  className={styles.bgwrapper} 
                > </div>
              ))}
              {
                statustype ? 
                
              <div className={styles.boxContainer}>
              {props.groupinvitee ? null : (
                props.data.map((parterdata) => (
                  <div className={styles.CardWrapper}>
                    <div className={styles.listingCard}>
                      <div className={styles.profileimage}>
                        {parterdata.imageURL ? (
                          <img
                            src={
                              "https://api-test.ujustbe.com/" +
                              parterdata.imageURL
                            }
                          />
                        ) : (
                          <p>NO img</p>
                        )}
                      </div>

                      <div className={styles.description}>
                        {/* <div className={styles.buzcategory}>
                          {parterdata.categories.map((cats) => (
                            <span>{cats}</span>
                          ))}
                        </div> */}
                        <h2>
                          <h2>{parterdata.firstName} {parterdata.lastName}</h2>
                        </h2>
                        <h6>
                          <img src="/images/add-icon.png" />
                          {parterdata.address.flat_Wing}{" "}
                          {parterdata.address.locality}{" "}
                          {parterdata.address.location}
                        </h6>
                      </div>
                    </div>
                    {/* <h2>
                    {parterdata.firstName} {parterdata._id}{" "}
                   
                  </h2>
                  <h6>{parterdata.role}</h6>
                  <h6>{parterdata.emailId}</h6> */}
                  </div>
                ))
              )}
              <div className={styles.textareaBox}>
                <h5>
                  <strong>Agenda of meeting test</strong>
                </h5>
                <textarea
                  value={Agenda}
                  onChange={onChangeAgenda}
                  name="Agenda"
                  autocomplete="false"
                ></textarea>
                <abbr>150 Characters</abbr>
              </div>

              <h5>
                <strong>Meeting Code:</strong> {props.uniqueId}
              </h5>
              {/* <h5>
                <strong>Link:</strong>
                {baseUrl}
                {props.data.id}-{props.uniqueId}
              </h5> */}
              <h5>
                <strong>Date & Time:</strong>
                {dateTime.toLocaleDateString()} |  {dateTime.toLocaleTimeString()}
              </h5>
              <div className={styles.actionRow}>
                <button
                  onClick={() => handlemeeting()}
                  disabled={!disablebtn}
                  className={styles.donebtn}
                >
                  Confirm
                </button>
                <button
                  className={styles.canclebtn}
                  onClick={() => { props.removedall(); hidesuccess();}}
                >
                  Cancel
                </button>
              </div>
            </div>:<div className={styles.boxContainer}>
                  <div className={styles.iconSucces}>
                    <img src="images/done.png" />
                  </div>
                  <h3 className={styles.headings}>Invitation Send Successfully</h3>
                  <div className={styles.sucessList}>
                    {
                      props.data.map((parterdata) =>
                        <h4>{parterdata.businessName}</h4>
                      )
                    }
                  </div>
                  <div >
                    <>
                      <h5>
                        <strong>Meeting Code:</strong> {props.uniqueId}
                      </h5>
                      {/* <h5>
                        <strong>Link:</strong>
                        {baseUrl}
                        {props.data.id}-{props.uniqueId}
                      </h5> */}
                      <h5>
                        <strong>Date & Time:</strong>
                        {dateTime.toLocaleDateString()} | {dateTime.toLocaleTimeString()}
                      </h5>
                      <div className= {`${styles.actionRow} ${styles.centeralign}`}>
                        <button
                          //onClick={() => handlemeeting()}
                          onClick={() => { props.removedall(); hidesuccess();}}
                          className={styles.donebtn}
                        >
                          Back
                        </button>
                      </div>
                    </>
                  </div>
                </div>          
              }
            </div>
          </>
        ) : null}
      </>
    )
  );
}

export default Searchbox;