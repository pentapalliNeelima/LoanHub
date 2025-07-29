// Simple localStorage utilities for loan data persistence

const STORAGE_KEY = 'loanHub_loans';

export const saveLoans = (loans) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loans));
  } catch (error) {
    console.error('Error saving loans to localStorage:', error);
  }
};

export const loadLoans = () => {
  try {
    const savedLoans = localStorage.getItem(STORAGE_KEY);
    return savedLoans ? JSON.parse(savedLoans) : [];
  } catch (error) {
    console.error('Error loading loans from localStorage:', error);
    return [];
  }
};

export const clearLoans = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing loans from localStorage:', error);
  }
};