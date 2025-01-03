import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/form-controls/Button';
import Loading from '../../components/Loading';
import { Globe, Building2, Rss, Briefcase, Scroll, Shield } from 'lucide-react';
import InfoListItem from '../../components/ui/InfolistItem';
import { useTeamApi } from '../../hooks/useTeam';
import { ROUTES } from '../../routes/paths';
import Card from '../../components/ui/Card';

const View: React.FC = () => {
  const { id } = useParams();
  const { show, team, loading } = useTeamApi();

  useEffect(() => {
    const teamId = parseInt(id || '', 10);
    if (teamId) {
      show(teamId);
    }
  }, [id]);

  if (loading || !team) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Team Details</h2>

        <div className="flex gap-2">
          <Link
            to={ROUTES.TEAM.LIST}
            className="px-4 py-2 text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200"
          >
            Back to List
          </Link>

          <Link to={ROUTES.TEAM.EDIT(team.id)}>
            <Button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              Edit Team
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        <Card title="General Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoListItem
              icon={<Briefcase className="h-5 w-5 text-gray-600" />}
              label="Team Name"
              value={team.name}
            />
            <InfoListItem
              icon={<Shield className="h-5 w-5 text-gray-600" />}
              label="Access Level"
              value={team.accessLevel}
            />
            <InfoListItem
              icon={<Scroll className="h-5 w-5 text-gray-600" />}
              label="Description"
              value={team.description}
            />
          </div>
        </Card>

        {team?.workspace && (
          <Card title="Workspace Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoListItem
                icon={<Briefcase className="h-5 w-5 text-gray-600" />}
                label="Workspace Name"
                value={team.workspace.name}
              />
              <InfoListItem
                icon={<Scroll className="h-5 w-5 text-gray-600" />}
                label="Description"
                value={team.workspace.description}
              />
            </div>
          </Card>
        )}

        {team?.workspace?.organization && (
          <Card title="Organization Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoListItem
                icon={<Building2 className="h-5 w-5 text-gray-600" />}
                label="Organization Name"
                value={team.workspace.organization.name}
              />
              <InfoListItem
                icon={<Globe className="h-5 w-5 text-gray-600" />}
                label="Domain"
                value={team.workspace.organization.domain}
              />
              <InfoListItem
                icon={<Rss className="h-5 w-5 text-gray-600" />}
                label="Subscription Type"
                value={team.workspace.organization.subscriptionType}
              />
            </div>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
};

export default View;
