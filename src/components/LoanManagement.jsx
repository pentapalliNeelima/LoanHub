import React, { useState } from 'react';
import '../index.css';
import {
  ArrowLeft, User, DollarSign, Calendar, Building, Phone, Mail,
  CheckCircle, XCircle, Clock, Calculator
} from 'lucide-react';
import { calculateLoanPayment } from '../utils/calculations';

function LoanManagement({ loan, onUpdate, onBack }) {
  const [status, setStatus] = useState(loan?.status || 'pending');
  const [notes, setNotes] = useState(loan?.notes || '');

  if (!loan) {
    return (
      <div className="loan-empty">
        <div className="icon-wrapper">
          <User />
        </div>
        <h3>No Loan Selected</h3>
        <p>Please select a loan from the dashboard to manage it.</p>
        <button onClick={onBack}>Back to Dashboard</button>
      </div>
    );
  }

  const handleStatusUpdate = () => {
    const updatedLoan = {
      ...loan,
      status,
      notes,
      lastUpdated: new Date().toISOString()
    };
    onUpdate(updatedLoan);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle />;
      case 'rejected': return <XCircle />;
      default: return <Clock />;
    }
  };

  const monthlyPayment = calculateLoanPayment(
    parseFloat(loan.loanAmount),
    parseInt(loan.loanTerm),
    7.5
  );

  return (
    <div className="loan-management">
      <div className="loan-header">
        <button onClick={onBack}>
          <ArrowLeft /> Back to Dashboard
        </button>
        <div className={`loan-status ${loan.status}`}>
          {getStatusIcon(loan.status)}
          <span>{loan.status}</span>
        </div>
      </div>

      <div className="loan-card">
        <div className="loan-info-header">
          <div className="avatar-wrapper">
            <User />
          </div>
          <h2>{loan.firstName} {loan.lastName}</h2>
          <p>Loan Application Details</p>
        </div>

        <div className="loan-info-grid">
          {/* Personal Info */}
          <div className="info-section">
            <h3><User /> Personal Information</h3>
            <ul>
              <li><Mail /> {loan.email}</li>
              <li><Phone /> {loan.phone}</li>
              <li><Calendar /> Applied on {formatDate(loan.applicationDate)}</li>
            </ul>
          </div>

          {/* Financial Info */}
          <div className="info-section">
            <h3><Building /> Financial Information</h3>
            <ul>
              <li>
                <span>Annual Income:</span>
                <span>{formatCurrency(loan.annualIncome)}</span>
              </li>
              <li>
                <span>Employment Status:</span>
                <span>{loan.employmentStatus}</span>
              </li>
              {loan.creditScore && (
                <li>
                  <span>Credit Score:</span>
                  <span>{loan.creditScore}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Loan Details */}
          <div className="info-section">
            <h3><DollarSign /> Loan Details</h3>
            <ul>
              <li><span>Loan Amount:</span><span>{formatCurrency(loan.loanAmount)}</span></li>
              <li><span>Loan Term:</span><span>{loan.loanTerm} months</span></li>
              <li><span>Purpose:</span><span>{loan.loanPurpose}</span></li>
            </ul>
          </div>

          {/* Payment Calculation */}
          <div className="info-section calculation">
            <h3><Calculator /> Payment Calculation</h3>
            <ul>
              <li><span>Interest Rate:</span><span>7.5% APR</span></li>
              <li><span>Monthly Payment:</span><span>{formatCurrency(monthlyPayment)}</span></li>
              <li><span>Total Payment:</span><span>{formatCurrency(monthlyPayment * loan.loanTerm)}</span></li>
            </ul>
          </div>
        </div>

        {/* Status Update Section */}
        <div className="status-update">
          <h3>Loan Status Management</h3>
          <div className="status-form">
            <div className="form-group">
              <label>Update Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add notes about this loan application..."
              />
            </div>
          </div>
          <button onClick={handleStatusUpdate}>
            Update Loan Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoanManagement;
