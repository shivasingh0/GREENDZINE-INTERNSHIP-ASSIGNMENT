import React, { useState, useEffect } from 'react';
import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then(response => response.json())
      .then(data => setUsers(data.data))
      .catch(error => console.log(error));
  }, []);

  const handleSearchValueChange = (value) => {
    setSearchUser(value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchUser.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2>List View</h2>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchUser}
        onChange={(e) => handleSearchValueChange(e.target.value)}
      />
      {visibleUsers.map((user) => (
        <div key={user.id}>
          <h3>{user.first_name} {user.last_name}</h3>
          <p>Email: {user.email}</p>
          <img src={user.avatar} alt="User Avatar" />
        </div>
      ))}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};
export default App;
