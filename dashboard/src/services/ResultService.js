import axios from 'axios';

export default {
  
  //retrieve lists of Security Scan Result
  getResults: async (token) => {
    let res = await axios.get('http://localhost:3001/api/results', {
      cancelToken: token
    });
    return res.data || [];
  },
 
//get a Security Scan Redult by Id
  getResult: async (id) => {
    let res = await axios.get(`http://localhost:3001/api/result/${id}`);
    return res.data || [];
  },

  //create a Security Scan Result
  addResult: async (obj) => {
    let res = await axios.post('http://localhost:3001/api/result', obj)
    return res.data || [];
  },
}
