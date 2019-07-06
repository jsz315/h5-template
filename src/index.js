import './index.less'
import {httpGet, httpPost} from './common/request'

httpPost('/api/info').then(res=>{
    console.log(res);
})