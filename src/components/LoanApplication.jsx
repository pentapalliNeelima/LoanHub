import React, { useState } from 'react';
import '../index.css';
import { User, DollarSign, Building } from 'lucide-react';

function LoanApplication({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    loanAmount: '',
    loanTerm: '',
    loanPurpose: '',
    annualIncome: '',
    employmentStatus: '',
    creditScore: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.loanAmount) newErrors.loanAmount = 'Loan amount is required';
    if (!formData.loanTerm) newErrors.loanTerm = 'Loan term is required';
    if (!formData.loanPurpose) newErrors.loanPurpose = 'Loan purpose is required';
    if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';
    if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <User className="icon" />
          <h2>Loan Application</h2>
          <p>Complete the form below to apply for a loan</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {/* Personal Information */}
          <div className="section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'input error' : 'input'}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'input error' : 'input'}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input error' : 'input'}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input error' : 'input'}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="section">
            <h3><DollarSign className="icon-small" /> Loan Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Loan Amount (₹)</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className={errors.loanAmount ? 'input error' : 'input'}
                  placeholder="0"
                />
                {errors.loanAmount && <p className="error-message">{errors.loanAmount}</p>}
              </div>

              <div className="form-group">
                <label>Loan Term (months)</label>
                <select
                  name="loanTerm"
                  value={formData.loanTerm}
                  onChange={handleChange}
                  className={errors.loanTerm ? 'input error' : 'input'}
                >
                  <option value="">Select loan term</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                </select>
                {errors.loanTerm && <p className="error-message">{errors.loanTerm}</p>}
              </div>

              <div className="form-group full-width">
                <label>Loan Purpose</label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  className={errors.loanPurpose ? 'input error' : 'input'}
                >
                  <option value="">Select loan purpose</option>
                  <option value="home">Home Purchase</option>
                  <option value="car">Car Purchase</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                  <option value="personal">Personal</option>
                  <option value="debt">Debt Consolidation</option>
                </select>
                {errors.loanPurpose && <p className="error-message">{errors.loanPurpose}</p>}
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="section">
            <h3><Building className="icon-small" /> Financial Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Annual Income (₹)</label>
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className={errors.annualIncome ? 'input error' : 'input'}
                  placeholder="0"
                />
                {errors.annualIncome && <p className="error-message">{errors.annualIncome}</p>}
              </div>

              <div className="form-group">
                <label>Employment Status</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className={errors.employmentStatus ? 'input error' : 'input'}
                >
                  <option value="">Select employment status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                  <option value="student">Student</option>
                </select>
                {errors.employmentStatus && <p className="error-message">{errors.employmentStatus}</p>}
              </div>

              <div className="form-group">
                <label>Credit Score (Optional)</label>
                <input
                  type="number"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter your credit score"
                  min="300"
                  max="850"
                />
              </div>
            </div>
          </div>

          <div className="submit-area">
            <button type="submit" className="button-primary">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoanApplication;
