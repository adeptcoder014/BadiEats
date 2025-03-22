import axios from 'axios';
import { devURL } from '../../config/server';

// Super Admin Login API with internal loading handling
export const superAdminLogin = async (email, password, setLoading) => {
  try {
    // Start loader
    if (setLoading) setLoading(true);

    const response = await axios.post(`${devURL}/super-admin/auth/login`, {
      email,
      password,
    });

    return { success: true, data: response.data };
  } catch (err) {
    return {
      success: false,
      error: err?.response?.data?.message || 'Something went wrong. Please try again.',
    };
  } finally {
    // Stop loader
    // Redirect after 3 seconds

    if (setLoading) {
      setLoading(false);
      // setTimeout(() => {
      //   setLoading(false);
      //   navigate('/dashboard')
      // }, 1000);

    };
  }
};


