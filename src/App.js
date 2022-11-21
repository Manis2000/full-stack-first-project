import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { addTask, deleteTask, fetchTasks } from "./helpers/axiosHelper";

const ttlHrPerWek = 24 * 7;
function App() {
  const [tasks, setTasks] = useState([]);
  const [response, setResponse] = useState({});
  const [idsToDelete, setIdsToDelete] = useState([]);

  const totalHrs = tasks.reduce((acc, item) => acc + item.hr, 0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetchTasks();
    console.log(res.data.data);
    setTasks(res.data.data);
  };

  const taskEntry = async (taskObj) => {
    if (totalHrs + taskObj.hr > ttlHrPerWek) {
      setResponse({
        status: "error",
        message: "Yo Boss, too many hours, can't fit the task.",
      });
      return;
    }
    // console.log(taskObj);
    // instead of adding in the array, add to the server
    // setTasks([...tasks, taskObj]);


    const { data } = await addTask(taskObj);

    if (data.status === "success") {
      getData();
    }

    setResponse(data);
  };
// remove soon
  // const handleOnDelete = (_id) => {
  //   if (!window.confirm("Are you sure you want to delete?")) {
  //     return;
  //   }

  //   const filteredArg = tasks.filter((item) => item._id !== _id);

  //   setTasks(filteredArg);
  // };

  const handleOnManyDelete = async() => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    console.log(idsToDelete);

     const {data} = await deleteTask(idsToDelete)
     
        setResponse(data);
      data.status === 'success' && getData();
      setIdsToDelete([]);

    // const filteredArg = tasks.filter((item) => !idsToDelete.includes(item._id));

    // setTasks(filteredArg);
    // setIdsToDelete([]);
  };

  const taskSwitcher = (_id, type) => {
    console.log(tasks);

    const updatedArg = tasks.map((item) => {
      if (_id === item._id) {
        item.type = type;
      }

      return item;
    });
    console.log(updatedArg);
    setTasks(updatedArg);
  };

  const handleOnCheck = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setIdsToDelete([...idsToDelete, value]);
    } else {
      const tempArg = idsToDelete.filter((item) => item !== value);
      setIdsToDelete(tempArg);
    }
  };

  console.log(response);
  return (
    <div className="wrapper">
      <div className="container">
        {/* <!-- top title --> */}
        <div className="row">
          <div className="col text-center mt-5">
            <h1>Not To Do List</h1>
          </div>
        </div>

        {response.message && (
          <div
            className={
              response.status === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {response.message}
          </div>
        )}

        <Form taskEntry={taskEntry} />

        <List
          tasks={tasks}
          // handleOnDelete={handleOnDelete}
          taskSwitcher={taskSwitcher}
          handleOnCheck={handleOnCheck}
        />

        {idsToDelete.length > 0 && (
          <div className="d-grid py-4">
            <button
              className="btn btn-lg btn-danger"
              onClick={handleOnManyDelete}
            >
              Delete selected tasks
            </button>
          </div>
        )}

        {/* <!-- total hr area --> */}
        <div className="row fw-bold">
          <div className="col">The total hours allocated = {totalHrs} Hrs</div>
        </div>
      </div>
    </div>
  );
}

export default App;
