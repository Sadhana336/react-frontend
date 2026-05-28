function StudentForm({

  name,
  setName,

  age,
  setAge,

  department,
  setDepartment,

  addStudent,

  editingId

}) {

  return (

    <div>

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

    </div>

  );

}

export default StudentForm;

