// src/components/GroupTable.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const GroupTable = () => {
  const [groups, setGroups] = useState([]);
  const [editingTitle, setEditingTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL; // Make sure this is defined in your .env file

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admins/service`);
        const data = response.data;

        // Process the data to group by title and count the number of services
        const grouped = data.reduce((acc, service) => {
          if (!acc[service.title]) {
            acc[service.title] = 0;
          }
          acc[service.title] += 1;
          return acc;
        }, {});

        setGroups(Object.entries(grouped).map(([title, count]) => ({ title, count })));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchGroups();
  }, [apiUrl]);

  const handleEdit = (title) => {
    setEditingTitle(title);
    setNewTitle(title);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await axios.patch(`${apiUrl}/admins/service`, {
        oldTitle: editingTitle,
        newTitle: newTitle.trim(),
      });

      // Update local state
      setGroups(groups.map(group =>
        group.title === editingTitle ? { ...group, title: newTitle.trim() } : group
      ));

      setEditingTitle(null);
      setNewTitle('');
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Group Title</th>
            <th className="py-2 px-4 border-b">Number of Services</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.title}>
              <td className="py-2 px-4 border-b">
                {editingTitle === group.title ? (
                  <form onSubmit={handleUpdate} className="flex space-x-2">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="border p-1"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTitle(null);
                        setNewTitle('');
                      }}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  group.title
                )}
              </td>
              <td className="py-2 px-4 border-b">{group.count}</td>
              <td className="py-2 px-4 border-b">
                {editingTitle === group.title ? null : (
                  <button
                    onClick={() => handleEdit(group.title)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupTable;
