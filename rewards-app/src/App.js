import './App.css';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-2">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
