
import axios from "axios";
import { useState } from "react";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // ...logic for creating a new Task should be here
    // ... the ID of the Project should be part of the Task data

    const newTask = {
      title,
      description,
      projectId: Number(props.projectId)
    }

    console.log(newTask)

    axios.post(`${import.meta.env.VITE_SERVER_URL}/tasks`, newTask)
    .then(() => {
      // hacer algo con el usuario
      console.log("se ha creado la tarea")
      props.getData()
    })
    .catch((err) => {
      console.log(err)
    })

  };
  
  return (
    <div className="AddTask">
      <h3>Add New Task</h3>
      
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;