// Get data from localStorage
export const getFromStorage = (key) => {
  const value = localStorage.getItem(key);
  try {
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error('Storage parse error:', err);
    return null;
  }
};

// Set data to localStorage
export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Storage set error:', err);
  }
};

// Remove data from localStorage
export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
