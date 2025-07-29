// Utility functions for loan calculations

export const calculateLoanPayment = (principal, termInMonths, annualInterestRate) => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = termInMonths;
    
    if (monthlyInterestRate === 0) {
      return principal / numberOfPayments;
    }
    
    const monthlyPayment = principal * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };
  
  export const calculateTotalInterest = (principal, termInMonths, annualInterestRate) => {
    const monthlyPayment = calculateLoanPayment(principal, termInMonths, annualInterestRate);
    const totalPayment = monthlyPayment * termInMonths;
    return totalPayment - principal;
  };
  
  export const calculateAmortizationSchedule = (principal, termInMonths, annualInterestRate) => {
    const monthlyPayment = calculateLoanPayment(principal, termInMonths, annualInterestRate);
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const schedule = [];
    
    let remainingBalance = principal;
    
    for (let month = 1; month <= termInMonths; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }
    
    return schedule;
  };