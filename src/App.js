import logo from "./logo.svg";
import AddIcon from "@mui/icons-material/Add";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Removebtn from "./Removebtn";
import List from "./List";
import ListIcon from "./Icon";
import { useEffect, useState } from "react";
function App() {
  const [item, setItem] = useState("");
  const [webTask, setWebTask] = useState(localStorage.getItem("localtask"));
  const [taskObj, setTaskObj] = useState([]);
  const [changeIcon, setChangeIcon] = useState(true);
  const [isEdit, setisEdit] = useState(null);
  // console.log(taskObj);
  // console.log(webTask);

  useEffect(() => {
    if (localStorage.getItem("localtask")) {
      const storedList = JSON.parse(localStorage.getItem("localtask"));
      setTaskObj(storedList);
    }
  }, []);
  const addList = () => {
    if (item !== null && item !== "") {
      const newItem = { id: new Date().getTime().toString(), name: item };
      setTaskObj([...taskObj, newItem]);
      setWebTask(
        localStorage.setItem("localtask", JSON.stringify([...taskObj, newItem]))
      );
      setItem("");
    }
  };

  const inputFieldtext = (event) => {
    setItem(event.target.value);
  };
  const deleteTask = (id) => {
    const removeItem = taskObj.filter((element) => {
      return element.id != id;
    });
    setTaskObj(removeItem);
    setWebTask(localStorage.setItem("localtask", JSON.stringify(removeItem)));
  };

  const removeWork = () => {
    setTaskObj([]);
    setWebTask(localStorage.setItem("localtask", JSON.stringify([])));
  };

  const updateTask = (id) => {
    const getUpdateElement = taskObj.find((ele) => {
      return id == ele.id;
    });
    console.log(getUpdateElement);
    setChangeIcon(false);
    setItem(getUpdateElement.name);
    setisEdit(getUpdateElement.id);
  };

  window.addEventListener("keydown", (e) => {
    if (e.which == 13) {
      if (changeIcon) {
        addList();
      } else if (!changeIcon) {
        updateWork();
      }
    }
  });
  const updateWork = () => {
    if (item !== null && item !== "" && !changeIcon) {
      const element = taskObj.map((ele) => {
        if (ele.id === isEdit) {
          return { ...ele, name: item };
        }
        return ele;
      });
      setTaskObj(element);
      setItem("");
      setisEdit(null);
      setChangeIcon(true);
      setWebTask(localStorage.setItem("localtask", JSON.stringify(element)));
    }
  };
  return (
    <>
      <ListIcon />
      <div className="hii">
        <h1>
          <span className="title"></span>
        </h1>
        <div className="inputdiv">
          <input
            type="text"
            className="input"
            placeholder="Add Notes ..."
            onChange={inputFieldtext}
            value={item}
          />
          <input type="hidden" id="saveindex" />
          {changeIcon ? (
            <button id="add" onClick={addList}>
              <AddIcon />
            </button>
          ) : (
            <button id="save" onClick={updateWork}>
              <SaveAsIcon />
            </button>
          )}
        </div>
        <div className="container">
          {taskObj.map((element, ind) => {
            return (
              <List
                title={element.name}
                key={ind}
                id={element.id}
                taskdelete={deleteTask}
                taskUpdate={updateTask}
              />
            );
          })}
          <Removebtn removeAll={removeWork} />
        </div>
      </div>
    </>
  );
}

export default App;
