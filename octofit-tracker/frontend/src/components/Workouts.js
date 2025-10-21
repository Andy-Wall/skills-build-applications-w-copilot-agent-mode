import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Workouts = () => {
  const { t } = useTranslation();
  const [workouts, setWorkouts] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results || data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title text-danger mb-3">{t('workouts.title')}</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">{t('workouts.headers.id')}</th>
                <th scope="col">{t('workouts.headers.name')}</th>
                <th scope="col">{t('workouts.headers.details')}</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.id || idx + 1}</td>
                  <td>{workout.name || '-'}</td>
                  <td>{JSON.stringify(workout)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-danger mt-2">{t('workouts.buttons.add')}</button>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
