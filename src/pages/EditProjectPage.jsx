import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {

  const { projectId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  // const title = "ajsdhajk"
  const [description, setDescription] = useState("");
  const [isFetching, setIsFetching] = useState(true)
  const [isShowingDeleteCheck, setIsShowingDeleteCheck] = useState(false)

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`)
    .then((response) => {

      console.log(response)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setIsFetching(false)

    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // ...updated logic should be here

    const updatedProject = {
      title, 
      description
    }

    try {

      await axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`, updatedProject)

      navigate(`/projects/${projectId}`)
      
    } catch (error) {
      console.log(error)
    }

  };

  const deleteProject = () => {
    // ...delete logic should be her

    axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`)
    .then(() => {
      navigate("/projects")
    })
    .catch((error) => {
      console.log(error)
    })
    
  }; 

  if (isFetching) {
    return (<h3>... buscando data</h3>)
  }

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>

        

      </form>

      <button onClick={() => setIsShowingDeleteCheck(true)}>Delete Project</button>  

      {isShowingDeleteCheck && (
         <div>
          <p>¿Estas seguro?</p>
          <button onClick={deleteProject}>Si</button>
          <button onClick={() => setIsShowingDeleteCheck(false)}>No</button>
        </div>
      )}

    </div>
  );
}

export default EditProjectPage;
