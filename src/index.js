import './index.less'
import axios from 'axios'

console.log("ok123");

axios.get('/api/info').then(res=>{
    return res.data;
}).then(res=>{
    console.log(res);
})