import { useState, useEffect } from "react";
import axios from "axios";

const MemberTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const url = `${apiUrl}/admins/team`;
      const response = await axios.get(url);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("name", editingMember.name);
    formData.append("description", editingMember.description);

    if (editingMember.photo && typeof editingMember.photo === "object") {
      formData.append("photo", editingMember.photo);
    }

    try {
      const url = `${apiUrl}/admins/team/${id}`;
      await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setEditingMember(null);
      fetchMembers();
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );
    if (userConfirmed) {
      try {
        const url = `${apiUrl}/admins/team/${id}`;
        await axios.delete(url);
        fetchMembers();
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Team Members</h1>
      <div className="table-wrapper">
        <table className="team-member-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td className="border px-4 py-2" data-label="Name">
                  {editingMember && editingMember._id === member._id ? (
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    member.name
                  )}
                </td>
                <td className="border px-4 py-2" data-label="Description">
                  {editingMember && editingMember._id === member._id ? (
                    <textarea
                      value={editingMember.description}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    member.description
                  )}
                </td>
                <td className="border px-4 py-2" data-label="Photo">
                  <div className="flex items-center">
                    <img
                      src={apiUrl + `/${member.photo}`}
                      alt="photo"
                      width="100"
                    />
                    {editingMember && editingMember._id === member._id && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setEditingMember({
                            ...editingMember,
                            photo: e.target.files[0],
                          })
                        }
                      />
                    )}
                  </div>
                </td>
                <td className="border px-4 py-2" data-label="Actions">
                  {editingMember && editingMember._id === member._id ? (
                    <button
                      onClick={() => handleUpdate(member._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingMember(member)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;
