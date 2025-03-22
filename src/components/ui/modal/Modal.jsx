import React from 'react';
import PropTypes from 'prop-types';

const AddModal = ({ title, isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-50">
      <div className="bg-background p-8 rounded-2xl shadow-2xl w-full max-w-lg transition-transform transform scale-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary-text)' }}>{title}</h3>
          <button
            onClick={onClose}
            className="text-xl font-semibold hover:scale-110 transition-transform"
            style={{ color: 'var(--color-secondary-text)' }}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">{children}</div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-muted text-primary-text hover:bg-opacity-80 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 rounded-lg bg-accent text-white font-semibold hover:scale-105 transition-transform"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AddModal;