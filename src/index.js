import './index.less'
import {httpGet} from './common/request'

httpGet('/api/info').then(res=>{
    console.log(res.data);
})