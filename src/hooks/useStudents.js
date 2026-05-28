import { useState } from "react";

import api from "../api/axios";

function useStudents() {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const token = localStorage.getItem("access");

  const config = {

    headers: {

      Authorization: `Bearer ${token}`

    }

  };

  const fetchStudents = () => {

    setLoading(true);

    setError("");

    api.get("api/", config)

      .then((response) => {

        setStudents(response.data);

        setLoading(false);

      })

      .catch((error) => {

        setError("Failed to fetch students");

        setLoading(false);

        console.log(error);

      });

  };

  const addStudent = (

    editingId,
    name,
    age,
    department,
    setName,
    setAge,
    setDepartment,
    setEditingId

  ) => {

    if (editingId) {

      api.put(

        `updateapi/${editingId}/`,

        {

          name,
          age,
          department

        },

        config

      )

      .then(() => {

        fetchStudents();

        setName("");
        setAge("");
        setDepartment("");

        setEditingId(null);

      });

    }

    else {

      api.post(

        "api/",

        {

          name,
          age,
          department

        },

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

    api.delete(

      `deleteapi/${id}/`,

      config

    )

    .then(() => {

      fetchStudents();

    });

  };

  return {

    students,
    fetchStudents,
    addStudent,
    deleteStudent,
    loading,
    error

  };

}

export default useStudents;



