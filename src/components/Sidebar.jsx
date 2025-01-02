import React from 'react';

const Sidebar = ({ search, setSearch, sort, setSort }) => {
  return (
    <div className="sidebar bg-white p-4 w-64 border-r border-gray-200 shadow-lg">
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search by name
        </label>
        <input
          id="search"
          type="text"
          placeholder="Enter name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
          Sort by
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
