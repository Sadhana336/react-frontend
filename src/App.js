import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("access") ? true : false
  );

  const token = localStorage.getItem("access");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // FIXED useEffect (no ESLint error)
  useEffect(() => {
    if (isLoggedIn) {
      fetchStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const fetchStudents = () => {
    axios
      .get("http://127.0.0.1:8000/api/", config)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addStudent = () => {
    if (!name || !age || !department) {
      alert("Fill all fields");
      return;
    }

    if (editingId) {
      axios
        .put(
          `http://127.0.0.1:8000/updateapi/${editingId}/`,
          { name, age, department },
          config
        )
        .then(() => {
          fetchStudents();
          setName("");
          setAge("");
          setDepartment("");
          setEditingId(null);
        });
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/api/",
          { name, age, department },
          config
        )
        .then(() => {
          fetchStudents();
          setName("");
          setAge("");
          setDepartment("");
        });
    }
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/deleteapi/${id}/`, config)
      .then(() => {
        fetchStudents();
      });
  };

  const editStudent = (student) => {
    setName(student.name);
    setAge(student.age);
    setDepartment(student.department);
    setEditingId(student.id);
  };

  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      {!isLoggedIn && (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}

      {isLoggedIn && (
        <div>
          <h1>Student List ✨</h1>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>

          <button onClick={logoutUser}>Logout 🚪</button>

          <input
            type="text"
            placeholder="Search Student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <button onClick={addStudent}>
            {editingId ? "Update Student" : "Add Student"}
          </button>

          {students
            .filter((student) =>
              student.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((student) => (
              <div key={student.id} className="student-card">
                <h2>{student.name}</h2>
                <p>Age: {student.age}</p>
                <p>Department: {student.department}</p>

                <button onClick={() => editStudent(student)}>
                  Edit
                </button>

                <button onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;