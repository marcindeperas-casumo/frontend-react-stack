import axios from 'axios'


const api = axios.create();

export default {
    async list () {
        return await api.get('/api/lobby/state', { auth: {
            username: 'casumo0000000001',
            password: 'test123'
          }
        });
    }
}