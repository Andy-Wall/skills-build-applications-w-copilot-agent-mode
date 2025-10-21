import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Leaderboard = () => {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaderboard(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title text-success mb-3">{t('leaderboard.title')}</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">{t('leaderboard.headers.id')}</th>
                <th scope="col">{t('leaderboard.headers.name')}</th>
                <th scope="col">{t('leaderboard.headers.details')}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry.id || idx}>
                  <td>{entry.id || idx + 1}</td>
                  <td>{entry.name || '-'}</td>
                  <td>{JSON.stringify(entry)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-2">{t('leaderboard.buttons.refresh')}</button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
