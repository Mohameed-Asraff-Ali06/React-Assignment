import "./App.css";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header section */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-2">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
