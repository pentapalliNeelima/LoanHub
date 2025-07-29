import React, { useState, useEffect } from 'react';
import { FileText, BarChart3, Users, Calculator } from 'lucide-react';
import LoanApplication from './components/LoanApplication';
import LoanDashboard from './components/LoanDashboard';
import LoanManagement from './components/LoanManagement';
import { loadLoans, saveLoans } from './utils/storage';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('apply');
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    const savedLoans = loadLoans();
    setLoans(savedLoans);
  }, []);

  const handleLoanSubmit = (loanData) => {
    const newLoan = {
      ...loanData,
      id: Date.now().toString(),
      applicationDate: new Date().toISOString(),
      status: 'pending',
    };

    const updatedLoans = [...loans, newLoan];
    setLoans(updatedLoans);
    saveLoans(updatedLoans);
    setActiveTab('dashboard');
  };

  const handleLoanUpdate = (updatedLoan) => {
    const updatedLoans = loans.map((loan) =>
      loan.id === updatedLoan.id ? updatedLoan : loan
    );
    setLoans(updatedLoans);
    saveLoans(updatedLoans);
    setSelectedLoan(updatedLoan);
  };

  const handleLoanSelect = (loan) => {
    setSelectedLoan(loan);
    setActiveTab('management');
  };

  const navigation = [
    { id: 'apply', label: 'Apply for Loan', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'management', label: 'Loan Management', icon: Users },
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-section">
            <div className="logo-icon">
              <Calculator className="icon-white" />
            </div>
            <h1 className="logo-title">LoanHub</h1>
          </div>
          <nav className="nav-buttons">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`nav-button ${isActive ? 'active' : ''}`}
                >
                  <Icon className="icon" />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'apply' && (
          <LoanApplication onSubmit={handleLoanSubmit} />
        )}
        {activeTab === 'dashboard' && (
          <LoanDashboard loans={loans} onLoanSelect={handleLoanSelect} />
        )}
        {activeTab === 'management' && (
          <LoanManagement
            loan={selectedLoan}
            onUpdate={handleLoanUpdate}
            onBack={() => setActiveTab('dashboard')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
