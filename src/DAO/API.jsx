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

const postApi = async (path, params) => {
  try {
    const response = await axios.post(path, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const getApi = async (path, query) => {
  try {
    const queryString = query ? `?${new URLSearchParams(query).toString()}` : '';
    const response = await axios.get(`${path}${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const putApi = async (path, params) => {
  try {
    const response = await axios.put(path, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const deleteApi = async (path, params) => {
  try {
    const response = await axios.delete(path, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const showToast = (message, type) => {
  console.log(`Toast [${type}]: ${message}`);
};

export { postApi, getApi, putApi, deleteApi };