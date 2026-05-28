function StudentCard({ student, editStudent, deleteStudent }) {

  return (

    <div className="student-card">

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

  );

}

export default StudentCard;


