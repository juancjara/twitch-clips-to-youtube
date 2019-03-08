import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT
});

const getVideo = date => client.get(`/video/${date}`).then(r => r.data);

const createVideo = data => client.post('/video', data);

const getClips = date => client.get(`/clip/${date}`).then(r => r.data);

export default {
  getVideo,
  createVideo,
  getClips
};
