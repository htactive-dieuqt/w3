import React from "react";
import { firebase } from "../../../firebase/firebase";

import {
  //   Navbar,
  Row,
  Container,
  Col,
  Form,
  Button,
  Table,
} from "react-bootstrap";

function Categories() {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [updateTask, setUpdateTask] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();

      db.collection("tasks").onSnapshot(function (data) {
        console.log(data);
        setTasks(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    };
    fetchData();
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("tasks").add({ name: newTask });
  };

  const onDelete = (id) => {
    const db = firebase.firestore();
    db.collection("tasks").doc(id).delete();
  };

  const onUpdate = (id) => {
    const db = firebase.firestore();
    db.collection("tasks").doc(id).set({ name: updateTask });
  };
  return (
    <div>
      {/* <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">dieu dieu</Navbar.Brand>
      </Navbar> */}

      <br></br>
      <Container>
        <Row>
          <Col>
            <h2>ADD NEW</h2>
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Control
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={onCreate}>
                Create Task
              </Button>
            </Form>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task Name</th>
                  <th>Delete Task</th>
                  <th>Update Task</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((spell) => (
                  <tr key={spell.id}>
                    <td> {spell.id}</td>
                    <td> {spell.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => onDelete(spell.id)}
                      >
                        Delete Task
                      </Button>
                    </td>
                    <td>
                      <input
                        type="text"
                        className=""
                        placeholder={spell.name}
                        onChange={(e) => setUpdateTask(e.target.value)}
                      ></input>

                      <Button
                        className="text-white ml-4"
                        variant="warning"
                        onClick={() => onUpdate(spell.id)}
                      >
                        {" "}
                        Update Task
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Categories;
