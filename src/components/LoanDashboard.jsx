import React from 'react';
import '../index.css';
import { Eye, Calendar, DollarSign, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';

function LoanDashboard({ loans, onLoanSelect }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="icon-approved" />;
      case 'rejected':
        return <AlertCircle className="icon-rejected" />;
      default:
        return <Clock className="icon-pending" />;
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loans.length === 0) {
    return (
      <div className="dashboard-empty">
        <DollarSign className="empty-icon" />
        <h3 className="empty-title">No Loan Applications</h3>
        <p className="empty-text">You haven't submitted any loan applications yet.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Loan Dashboard</h2>
        <p className="dashboard-subtitle">Manage and track all your loan applications</p>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Applications</p>
              <p className="stat-value">{loans.length}</p>
            </div>
            <div className="stat-icon-container blue">
              <User className="stat-icon" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Approved Loans</p>
              <p className="stat-value green">
                {loans.filter((loan) => loan.status === 'approved').length}
              </p>
            </div>
            <div className="stat-icon-container green">
              <CheckCircle className="stat-icon" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Amount</p>
              <p className="stat-value">
                {formatCurrency(
                  loans.reduce((sum, loan) => sum + parseFloat(loan.loanAmount || 0), 0)
                )}
              </p>
            </div>
            <div className="stat-icon-container yellow">
              <DollarSign className="stat-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Loan Applications List */}
      <div className="loan-table-card">
        <div className="loan-table-header">
          <h3 className="loan-table-title">Loan Applications</h3>
        </div>
        <div className="loan-table-scroll">
          <table className="loan-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Loan Amount</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>
                    <div className="applicant-cell">
                      <div className="applicant-avatar">
                        <User className="avatar-icon" />
                      </div>
                      <div className="applicant-info">
                        <div className="applicant-name">
                          {loan.firstName} {loan.lastName}
                        </div>
                        <div className="applicant-email">{loan.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="loan-amount">{formatCurrency(loan.loanAmount)}</div>
                    <div className="loan-term">{loan.loanTerm} months</div>
                  </td>
                  <td className="capitalize">{loan.loanPurpose}</td>
                  <td>
                    <span className={`status-badge ${getStatusColorClass(loan.status)}`}>
                      {getStatusIcon(loan.status)}
                      <span className="status-text">{loan.status}</span>
                    </span>
                  </td>
                  <td>
                    <div className="date-applied">
                      <Calendar className="calendar-icon" />
                      {formatDate(loan.applicationDate)}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => onLoanSelect(loan)}
                      className="view-button"
                    >
                      <Eye className="view-icon" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LoanDashboard;
