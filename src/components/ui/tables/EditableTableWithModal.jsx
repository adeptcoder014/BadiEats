import React, { useState, useEffect } from 'react';
import AddModal from '../modal/Modal';
import { s } from 'framer-motion/client';

const EditableTableWithModal = ({ columns, data, onSave, onAdd }) => {
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: '', email: '', mobile: '', password: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  console.log(showModal, 'showModal');

  const handleEdit = (index, row) => {
    setEditRowIndex(index);
    setEditRowData(row);
  };

  const handleChange = (key, value) => {
    setEditRowData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(editRowData);
    setEditRowIndex(null);
    setEditRowData({});
  };

  const handleCancel = () => {
    setEditRowIndex(null);
    setEditRowData({});
  };

  const handleAdd = () => {
    onAdd(newEntry);
    setShowModal(false);
    setNewEntry({ name: '', email: '', mobile: '', password: '' });
  };

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      row[col.key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (filteredData.length <= itemsPerPage) {
      setCurrentPage(1);
    }
  }, [searchQuery, data]);

  return (
    <div
      className="relative overflow-x-auto w-xs md:w-full lg:w-full xl:w-full  shadow-lg rounded-xl "
      style={{ background: 'var(--color-background)' }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center p-4">
        <h2
          className="text-xl font-semibold"
          style={{ color: 'var(--color-primary-text)' }}
        >
          User Management
        </h2>
        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          <div>

            <button
              onClick={() => {

                setShowModal((prev) => !prev)
              }}
              className="px-4 py-2 bg-[var(--color-accent)] text-primary-text-inverse font-bold rounded-lg hover:bg-white hover:text-[var(--color-accent)] hover:border hover:border-[var(--color-accent)] mr-4 sm:mb-6 md:mb-0 mb-4"
              >
              + Add New User
            </button>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-lg border bg-background-section focus:outline-none focus:ring-2 focus:ring-accent"
          />

        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left">
        <thead
          className="text-xs uppercase"
          style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-primary-text)' }}
        >
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-6 py-4">
                {col.label}
              </th>
            ))}
            <th scope="col" className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition-all">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        value={editRowData[col.key] || ''}
                        onChange={(e) => handleChange(col.key, e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    ) : col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}

                <td className="px-6 py-4">
                  {editRowIndex === index ? (
                    <div className="flex gap-2">
                      <button onClick={handleSave} style={{ color: 'var(--color-accent)' }}>
                        Save
                      </button>
                      <button onClick={handleCancel} style={{ color: 'var(--color-muted)' }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(index, row)}
                      style={{ color: 'var(--color-accent)' }}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-8"
                style={{ color: 'var(--color-muted)' }}
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end p-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-4 py-2 rounded-lg ${currentPage === i + 1
              ? 'bg-accent text-white'
              : 'bg-muted text-primary-text'
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal Component */}
      {showModal && (
        <AddModal
          isOpen={showModal}
          title="Add New User"
          // onClose={() => setShowModal(false)}
          onSubmit={handleAdd}
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      )}
    </div>
  );
};

export default EditableTableWithModal;
