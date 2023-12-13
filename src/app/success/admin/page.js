"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []); // Fetch data when the component mounts

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/admin/get-admins"
      );
      setAdmins(response.data);
    } catch (error) {
      console.error("Fetch Admins Error:", error.response || error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/admin/me/${searchTerm}`
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error("Search Error:", error.response || error);
      setSearchResult(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/admin/delete-admin/${id}`);
      fetchAdmins(); // Refresh the data after deletion
    } catch (error) {
      console.error("Delete Error:", error.response || error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search by Email
        </label>
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter email to search"
            className="p-2 border border-gray-300 w-full"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-[red] text-white py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Count</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Permissions</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResult ? (
            <tr>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">
                {searchResult.name}
              </td>
              <td className="border border-gray-300 p-2">
                {searchResult.username}
              </td>
              <td className="border border-gray-300 p-2">
                {searchResult.email}
              </td>
              <td className="border border-gray-300 p-2">
                {searchResult.role}
              </td>
              <td className="border border-gray-300 p-2">
                {searchResult.permissions.join(", ")}
              </td>
              <td className="border border-gray-300 p-2">
                {searchResult.photo &&
                searchResult.photo.startsWith("data:image/") ? (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Image
                      src={searchResult.photo}
                      width={20}
                      height={20}
                      alt={`Avatar for ${searchResult.name}`}
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                ) : (
                  "No photo detected"
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(searchResult.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ) : (
            admins.map((admin, index) => (
              <tr key={admin.id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{admin.name}</td>
                <td className="border border-gray-300 p-2">{admin.username}</td>
                <td className="border border-gray-300 p-2">{admin.email}</td>
                <td className="border border-gray-300 p-2">{admin.role}</td>
                <td className="border border-gray-300 p-2">
                  {admin.permissions.join(", ")}
                </td>
                <td className="border border-gray-300 p-2">
                  {admin.photo && admin.photo.startsWith("data:image/") ? (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Image
                        src={admin.photo}
                        width={20}
                        height={20}
                        alt={`Avatar for ${admin.name}`}
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                  ) : (
                    "No photo detected"
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
