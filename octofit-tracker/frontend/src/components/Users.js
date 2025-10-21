import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users:', data);
        setUsers(data.results || data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title text-warning mb-3">{t('users.title')}</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">{t('users.headers.id')}</th>
                <th scope="col">{t('users.headers.name')}</th>
                <th scope="col">{t('users.headers.details')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id || idx}>
                  <td>{user.id || idx + 1}</td>
                  <td>{user.name || '-'}</td>
                  <td>{JSON.stringify(user)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-warning mt-2">{t('users.buttons.add')}</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
