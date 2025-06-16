import axios from 'axios';

const handleError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 401) {
      console.log('Unauthorized: Logging out...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (status === 403) {
      alert('Forbidden: You do not have permission to perform this action.');
    } else {
      const errorMessage = data?.message || 'An error occurred. Please try again.';
      showToast(errorMessage, 'error');
    }
  } else {
    console.error('Network error:', error);
    showToast('Network error. Please check your connection and try again.', 'error');
  }
};

const post = (path, params) => {
  return axios.post(path, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    handleError(error);
    throw error;
  });
};

const get = (path, query) => {
  const queryString = query ? `?${new URLSearchParams(query).toString()}` : '';
  return axios.get(`${path}${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    handleError(error);
    throw error;
  });
};

const put = (path, params) => {
  return axios.put(path, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data)
  .catch(error => {
    handleError(error);
    throw error;
  });
};

const delete1 = (path, params) => {
  return axios.delete(path, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  })
  .then(response => response.data)
  .catch(error => {
    handleError(error);
    throw error;
  });
};

const showToast = (message, type) => {
  console.log(`Toast [${type}]: ${message}`);
};

export { post, get, put, delete1 };