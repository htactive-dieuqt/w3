import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { firebase } from "../../../firebase/firebase";

const Contacts = () => {
  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebase
      .database()
      .ref("category")
      .on("value", (snapshot) => {
        if (snapshot.val() != null)
          setContactObjects({
            ...snapshot.val(),
          });
      });
  }, []);

  const addOrEdit = (obj) => {
    // eslint-disable-next-line eqeqeq
    if (currentId == "")
      firebase
        .database()
        .ref("category")
        .push(obj, (err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
    else
      firebase
        .database()
        .ref(`category/${currentId}`)
        .set(obj, (err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record???")) {
      firebase
        .database()
        .ref(`category/${key}`)
        .remove((err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-8">
          <ContactForm {...{ addOrEdit, currentId, contactObjects }} />
        </div>

        <div className="col-8">
          <table className="table table-border-left tablet-striped">
            <thead className="thead-light">
              <tr>
                <th>
                  <tr>Name Categories</tr>
                </th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td> {contactObjects[id].category} </td>
                    <td>
                      <button
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(id);
                        }}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
