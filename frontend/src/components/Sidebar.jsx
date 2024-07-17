import React from 'react';
import SearchBar from './SearchBar';

const Sidebar = ({ search, setSearch, data, userEmail, openCreateForm }) => {
  return (
    <div className="sidebar1">
      <button onClick={openCreateForm}>Create Conference</button>
      <SearchBar search={search} setSearch={setSearch} /> {/* Verwende die neue SearchBar Komponente */}
      <div>
        <ol>
          {data.map(item => (
            (search && (item.description.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase()))) && item.participant_email === userEmail && (
              <li key={item.id} className="conference-item">
                <div className="conference-details">
                  <span><strong>Name:</strong> {item.name}</span><br />
                  <span><strong>Description:</strong> {item.description}</span><br />
                  <span><strong>Start Date:</strong> {new Date(item.startdate).toLocaleDateString()}</span><br />
                  <span><strong>End Date:</strong> {new Date(item.enddate).toLocaleDateString()}</span><br />
                  <span><strong>Start Time:</strong> {item.starttime}</span><br />
                  <span><strong>End Time:</strong> {item.endtime}</span><br />
                  <span><strong>Location:</strong> {item.location}</span><br />
                  <span><strong>Link:</strong> <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></span><br />
                  <span><strong>Participant Email:</strong> {item.participant_email}</span><br />
                </div>
              </li>
            )
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Sidebar;
