import React, { useEffect, useState } from "react";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import gif1 from "../assets/editGif1.gif";
import gif2 from "../assets/editGif2.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const history = useHistory();
  const [totalNotes, settotalNotes] = useState([]);

  const [noteColor, setNoteColor] = useState("white");

  const [findNoteColor, setfindNoteColor] = useState("");

  const [editId, seteditId] = useState("");

  const [findUserData, setfindUserData] = useState({
    title: "",
    note: "",
  });

  const [modalToggle, setmodalToggle] = useState(false);
  Modal.setAppElement("#root");

  const [userData, setUserData] = useState({
    title: "",
    note: "",
  });

  const initialNotes = async () => {
    try {
      const res = await fetch("/read", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 200) {
        history.push("/login");
      }

      const data = await res.json();

      settotalNotes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { title, note } = userData;
      let color = noteColor;
      
      const response = await fetch("/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, note, color }),
      });

      if (response.status === 400) {
        toast.error("Something Went Wrong", {
          position: "top-center",
        });
      } else if (response.status === 401) {
        toast.warn("Fill All The Details", {
          position: "top-center",
        });
      } else {
        initialNotes();
        toast.success("Note Added", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const FindSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(editId);
    try {
      const { title, note } = findUserData;
      const color = findNoteColor;
      const response = await fetch(`/update/${editId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, note, color }),
      });

      if (response.status === 400) {
        toast.error("Something Went Wrong", {
          position: "top-center",
        });
      } else {
        initialNotes();
        setmodalToggle(false);
        toast.success("Note Updated", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const FindInputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setfindUserData({ ...findUserData, [name]: value });
  };

  const radioHandler = (e) => {
    setNoteColor(e.target.value);
  };

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 400) {
        
        toast.error("Something Went Wrong", {
          position: "top-center",
        });
      } else {
        initialNotes();
        toast.warn("Note Deleted", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const findValueForEdit = async (id) => {
    seteditId(id);
    try {
      const response = await fetch(`/find/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 400) {
        
        toast.error("Something Went Wrong", {
          position: "top-center",
        });
      }
      const findData = await response.json();

      const { title, note, color } = findData[0];

      setfindUserData({ title: title, note: note });

      setfindNoteColor(color);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initialNotes();
  }, []);
  return (
    <div id="home">
      <div className={`homeCreateNote ${noteColor}`}>
        <form id="homeFormDiv">
          <input
            type="text"
            autoComplete="off"
            placeholder="Title"
            name="title"
            onChange={inputHandler}
          />
          <textarea
            type="text"
            placeholder="Note"
            name="note"
            rows="4"
            onChange={inputHandler}
          />
          <div onChange={radioHandler} className="colorMainDiv">
            <div className="inputLabel inputLabel1">
              <input type="radio" id="opt1" value="rice" name="color" />
              <label htmlFor="opt1"></label>
            </div>

            <div className="inputLabel inputLabel2">
              <input type="radio" id="opt2" value="purple" name="color" />
              <label htmlFor="opt2"></label>
            </div>

            <div className="inputLabel inputLabel3">
              <input type="radio" id="opt3" value="orange" name="color" />
              <label htmlFor="opt3"></label>
            </div>

            <div className="inputLabel inputLabel4">
              <input type="radio" id="opt4" value="green" name="color" />
              <label htmlFor="opt4"></label>
            </div>
          </div>
          <button onClick={submitHandler}>
            {/* <h2>+</h2> */}
            <h2>
              <Add />
            </h2>
          </button>
        </form>
      </div>

      <div id="homeNotesContainer">
        {totalNotes.map((value, index) => {
          return (
            <div key={value._id} className={`homeNote ${value.color}`}>
              <h2>
                {index + 1}. {value.title}
              </h2>
              <p>{value.note}</p>
              <button
                className="noteBtn1"
                onClick={() => {
                  setmodalToggle(true);
                  findValueForEdit(value._id);
                }}
              >
                <Edit/>
              </button>
              <button
                className="noteBtn2"
                onClick={() => {
                  deleteHandler(value._id);
                }}
              >
                <DeleteForever />
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <Modal
          id="modalMainDiv"
          isOpen={modalToggle}
          style={{
            overlay: {
              backgroundColor: "grey",
            },
          }}
        >
          <img className="modalGif1" src={gif1} alt="Gif" />
          <img className="modalGif2" src={gif2} alt="Gif" />
          <h1>Edit</h1>
          <button
            id="modalBtn1"
            onClick={() => {
              setmodalToggle(false);
            }}
          >
            <Close/>
          </button>
          <div className={`homeCreateNote ${findNoteColor}`}>
            <form id="homeFormDiv">
              <input
                type="text"
                autoComplete="off"
                placeholder="Title"
                name="title"
                onChange={FindInputHandler}
                value={findUserData.title}
              />
              <textarea
                type="text"
                placeholder="Note"
                name="note"
                rows="4"
                onChange={FindInputHandler}
                value={findUserData.note}
              />
              <button onClick={FindSubmitHandler}>
                <h2><Edit/></h2>
              </button>
            </form>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
