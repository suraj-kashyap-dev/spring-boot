import React, { useEffect } from 'react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/form-controls/Button';
import { confirmDialog } from '../../utils/eventBus';
import { Input } from '../../components/ui/form-controls/Input';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
import Tooltip from '../../components/Tooltip';
import { useUserApi } from '../../hooks/useUserApi';

const Index: React.FC = () => {
  const { users, fetch, destroy } = useUserApi();

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = (id: number) => {
    confirmDialog({
      title: 'Delete User',
      description: 'Are you sure you want to delete this user?',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: () => destroy(id),
    });
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>

        <Link
          to={ROUTES.USER.NEW}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
        >
          <div className="flex gap-2">
            <span>Add User</span>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg border overflow-x-auto border-gray-200 shadow-sm">
        <div className="px-6 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="">
              <Input
                type="text"
                placeholder="Search user"
                className="w-[360px] px-4 py-2"
              />
            </div>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.id}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.fullName}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.phone}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.status}</div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex justify-center items-center gap-3">
                      <Link
                        to={ROUTES.USER.VIEW(user.id)}
                        className="text-gray-800 focus:ring-0 focus:ring-offset-0"
                      >
                        <div className="flex justify-center gap-2 items-center">
                          <Eye className="h-4 w-4" />
                          <span className="font-medium">View</span>
                        </div>
                      </Link>
                      <Link
                        to={ROUTES.USER.EDIT(user.id)}
                        className="text-blue-700 focus:ring-0 focus:ring-offset-0"
                      >
                        <div className="flex justify-center gap-2 items-center">
                          <Edit className="h-4 w-4" />
                          <span className="font-medium">Edit</span>
                        </div>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 !p-0"
                        leftIcon={<Trash2 className="h-4 w-4" />}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-sm text-center text-gray-500"
                >
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Index;
