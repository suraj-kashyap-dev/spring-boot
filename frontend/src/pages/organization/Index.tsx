import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CirclePlus, Edit, Filter, RefreshCcw, Trash2 } from 'lucide-react';
import { useOrganizationApi } from '../../hooks/useOrganization';
import { Button } from '../../components/ui/form-controls/Button';
import { ButtonGroup } from '../../components/ui/form-controls/ButtonGroup';
import { confirmDialog } from '../../utils/eventBus';
import { Input } from '../../components/ui/form-controls/Input';
import { Select } from '../../components/ui/form-controls/Select';
import OrganizationTableShimmer from '../../components/shimmer/OrganizationTableShimmer';

const Index: React.FC = () => {
  const { organizations, loading, fetchOrganization, deleteOrganization } =
    useOrganizationApi();

  useEffect(() => {
    fetchOrganization();
  }, []);

  const handleDelete = (id: number) => {
    confirmDialog({
      title: 'Delete Organization',
      description: 'Are you sure you want to delete this organization?',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: async () => deleteOrganization(id),
    });
  };

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="py-6 space-y-6">
          <div className="bg-white border border-neutral-200/30 rounded-lg">
            <div className="overflow-x-auto">
              {loading ? (
                <OrganizationTableShimmer></OrganizationTableShimmer>
              ) : (
                <table className="w-full">
                  <thead className="bg-neutral-200 border-b border-neutral-200/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                        Domain
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                        Subscription Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200/30">
                    {organizations && organizations.length > 0 ? (
                      organizations.map((organization) => (
                        <tr
                          key={organization.id}
                          className="hover:bg-neutral-50"
                        >
                          <td className="px-6 py-4 text-sm">
                            {organization.name}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {organization.domain}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {organization.subscriptionType}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex space-x-3">
                              <ButtonGroup alignment="center" gap="md">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-700 focus:ring-0 focus:ring-offset-0"
                                  leftIcon={<Edit className="h-4 w-4" />}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 focus:ring-0 focus:ring-offset-0"
                                  leftIcon={<Trash2 className="h-4 w-4" />}
                                  onClick={() => handleDelete(organization.id)}
                                >
                                  Delete
                                </Button>
                              </ButtonGroup>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-4 text-sm text-center text-neutral-500"
                        >
                          No organizations found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="px-6 py-4 border-t border-neutral-200/30">
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-500">
                  Showing 1 to 3 of 50 entries
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-neutral-200/30 rounded hover:bg-neutral-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">
                    1
                  </button>
                  <button className="px-3 py-1 border border-neutral-200/30 rounded hover:bg-neutral-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-neutral-200/30 rounded hover:bg-neutral-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-neutral-200/30 rounded hover:bg-neutral-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
