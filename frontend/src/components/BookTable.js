import React, { useState } from 'react';

const BookTable = ({ books, onEdit, onDelete }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative h-[400px]">
      <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
        <thead>
          <tr className="text-left">
            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">ID</th>
            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">ISBN</th>
            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Title</th>
            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Author</th>
            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Price</th>
            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Qty</th>
            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="border-dashed border-t border-gray-200 px-6 py-3">
                {book.id ? (
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-700">{book.id.slice(0, 8)}...</code>
                    <button
                      onClick={() => copyToClipboard(book.id)}
                      className="text-gray-500 hover:text-gray-700 text-xs"
                      title="Copy full ID"
                    >
                      {copiedId === book.id ? '✓' : '📋'}
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">No ID</span>
                )}
              </td>
              <td className="border-dashed border-t border-gray-200 px-6 py-3">{book.isbn}</td>
              <td className="border-dashed border-t border-gray-200 px-6 py-3">{book.title}</td>
              <td className="border-dashed border-t border-gray-200 px-6 py-3">{book.author}</td>
              
              {/* Formatted Price */}
              <td className="border-dashed border-t border-gray-200 px-6 py-3">${Number(book.price).toFixed(2)}</td>
              
              <td className="border-dashed border-t border-gray-200 px-6 py-3 font-semibold text-gray-700">{book.quantity}</td>
              
              <td className="border-dashed border-t border-gray-200 px-6 py-3">
                <button 
                  onClick={() => onEdit(book)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(book.id)}
                  className="text-red-600 hover:text-red-900 mr-3"
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;