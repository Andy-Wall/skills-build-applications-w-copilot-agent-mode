import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Teams = () => {
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(data.results || data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title text-info mb-3">{t('teams.title')}</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">{t('teams.headers.id')}</th>
                <th scope="col">{t('teams.headers.name')}</th>
                <th scope="col">{t('teams.headers.details')}</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <td>{team.id || idx + 1}</td>
                  <td>{team.name || '-'}</td>
                  <td>{JSON.stringify(team)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-info mt-2">{t('teams.buttons.add')}</button>
        </div>
      </div>
    </div>
  );
};

export default Teams;
