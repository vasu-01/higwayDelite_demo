import React, { useEffect, useState } from "react";
import { icon } from "../assets/image.js";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { verificationResponse } = location.state || {};

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getNotes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/addNote`,
        { content: newNote },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const newcreatedNote = response.data.noteDetail;

      setNotes((prev) => [...prev, newcreatedNote]);

      setNewNote("");
      alert("Note created successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/deleteNote/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotes(notes.filter((note) => note._id !== id));
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.log(error);
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error in logging out");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className=" text-2xl">
            <img src={icon} alt="" />
          </span>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <button
          onClick={logoutHandler}
          className="text-blue-600 cursor-pointer font-medium hover:underline"
        >
          Sign Out
        </button>
      </header>

      {/* Welcome Card */}
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold">
          Welcome, {verificationResponse?.loggedInuser?.fullName} !
        </h2>
        <p className="text-gray-600">
          Email: {verificationResponse?.loggedInuser?.email}
        </p>
      </div>

      {/* Add Note Input */}
      <div className="w-full max-w-md flex gap-2 mb-6">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note..."
          className="flex-1 border rounded-lg p-2 shadow-sm focus:outline-blue-500"
        />
        <button
          onClick={addNote}
          className="bg-blue-600 cursor-pointer text-white px-4 rounded-lg shadow hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Notes Section */}
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Notes</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="text-gray-500">No notes found</p>
        ) : (
          <div className="flex flex-col gap-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow"
              >
                <span>{note.content}</span>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
