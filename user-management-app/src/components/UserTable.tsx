import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { useToastConfirm } from '../hooks/useToastConfirm.ts';

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => Promise<void>;
  deletingIds: Set<number>;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, deletingIds }) => {
  const { confirm } = useToastConfirm();

  const handleDelete = (user: User) => {
    confirm({
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      onConfirm: async () => {
        await onDelete(user.id);
      }
    });
  };

  return (
    <div className="db-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 sm:px-6">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-lg font-medium text-gray-900">Users Database</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Total: {users.length}</span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Active</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-wrapper">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="db-table-header-cell sticky left-0 bg-gray-50 z-10 min-w-[120px] sm:min-w-[140px]">
                  Actions
                </th>
                <th className="db-table-header-cell min-w-[60px]">ID</th>
                <th className="db-table-header-cell min-w-[120px]">Name</th>
                <th className="db-table-header-cell min-w-[100px] hidden sm:table-cell">Username</th>
                <th className="db-table-header-cell min-w-[180px] hidden md:table-cell">Email</th>
                <th className="db-table-header-cell min-w-[120px] hidden lg:table-cell">Phone</th>
                <th className="db-table-header-cell min-w-[100px] hidden lg:table-cell">City</th>
                <th className="db-table-header-cell min-w-[120px] hidden xl:table-cell">Company</th>
                <th className="db-table-header-cell min-w-[80px] hidden sm:table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  {/* Actions - Always Visible */}
                  <td className="db-table-cell sticky left-0 bg-white z-10">
                    <div className="actions-container">
                      <Link
                        to={`/user/${user.id}`}
                        className="action-button-view"
                        title="View Details"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="hidden sm:inline">View</span>
                      </Link>
                      
                      <Link
                        to={`/edit/${user.id}`}
                        className="action-button-edit"
                        title="Edit User"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(user)}
                        disabled={deletingIds.has(user.id)}
                        className="action-button-delete disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete User"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="hidden sm:inline">
                          {deletingIds.has(user.id) ? 'Deleting...' : 'Delete'}
                        </span>
                      </button>
                    </div>
                  </td>

                  {/* ID - Always Visible */}
                  <td className="db-table-cell">
                    <span className="text-gray-900 font-medium">#{user.id.toString().padStart(3, '0')}</span>
                  </td>

                  {/* Name - Always Visible */}
                  <td className="db-table-cell">
                    <div className="text-gray-900 font-medium truncate max-w-[120px] sm:max-w-none">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 sm:hidden">
                      @{user.username}
                    </div>
                  </td>

                  {/* Username - Hidden on small screens */}
                  <td className="db-table-cell hidden sm:table-cell">
                    <span className="text-gray-600">@{user.username}</span>
                  </td>

                  {/* Email - Hidden on small screens */}
                  <td className="db-table-cell hidden md:table-cell">
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800 truncate block max-w-[180px]">
                      {user.email}
                    </a>
                  </td>

                  {/* Phone - Hidden on medium screens and below */}
                  <td className="db-table-cell text-gray-600 hidden lg:table-cell">
                    {user.phone}
                  </td>

                  {/* City - Hidden on medium screens and below */}
                  <td className="db-table-cell text-gray-600 hidden lg:table-cell">
                    {user.address.city}
                  </td>

                  {/* Company - Hidden on large screens and below */}
                  <td className="db-table-cell text-gray-600 hidden xl:table-cell">
                    <span className="truncate block max-w-[120px]">
                      {user.company.name}
                    </span>
                  </td>

                  {/* Status - Hidden on small screens */}
                  <td className="db-table-cell hidden sm:table-cell">
                    <span className="status-active">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center py-12 px-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new user.</p>
          <div className="mt-6">
            <Link to="/create" className="db-button-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New User
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
