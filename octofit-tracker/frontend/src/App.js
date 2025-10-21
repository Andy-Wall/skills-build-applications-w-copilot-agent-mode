
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { useTranslation } from './hooks/useTranslation';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import Profile from './components/Profile';
import LanguageSelector from './components/LanguageSelector';

function AppContent() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              <img src="/octofitapp-small.png" alt="Octofit Logo" />
              {t('app.title')}
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><Link className="nav-link" to="/activities">{t('app.navigation.activities')}</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/leaderboard">{t('app.navigation.leaderboard')}</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/teams">{t('app.navigation.teams')}</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/users">{t('app.navigation.users')}</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/workouts">{t('app.navigation.workouts')}</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">{t('app.navigation.profile')}</Link></li>
              </ul>
              <LanguageSelector />
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <Routes>
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/users" element={<Users />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Activities />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
