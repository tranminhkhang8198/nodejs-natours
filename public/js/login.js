import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        // set cookie
        if (res.data.status === 'success') {
            const JWT_COOKIE_EXPIRES_IN = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
            const jwt = res.data.token;
            document.cookie = `jwt=${jwt};expires=${JWT_COOKIE_EXPIRES_IN};path=/`;

            showAlert('success', 'Logged in successfully!');

            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout'
        });

        if((res.data.status == 'success')) {
            // MY OWN CODE
            const JWT_COOKIE_EXPIRES_IN = new Date(Date.now() + 10 * 1000);
            document.cookie = `jwt=loggedOut;expires=${JWT_COOKIE_EXPIRES_IN};path=/`;

            location.reload(true);
        }

    } catch (err) {
        showAlert('error', 'Error logging out! Try again.');
    }
}
