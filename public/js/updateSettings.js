import axios from 'axios';
import { showAlert } from './alerts';

export const updateData = async (name, email) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:3000/api/v1/users/updateMe`,
            data: {
                name,
                email
            }
        });

        if (res.data.status === 'success') {
            console.log(res);

            // document.getElementById('name').value = res.data.data.u
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}
