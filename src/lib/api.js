import axios from 'axios';

import {cmsBaseURL} from './constants';

const Handlers = {
  home: {
    get: () => {
      return axios.get(`${cmsBaseURL}/cms/home`).then((res) => res.data);
    },
  },
};

export default Handlers;
