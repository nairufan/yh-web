
import AjaxPromise from './AjaxPromise'
const baseUrl = '/api';
function fetch(url, data, method) {
    if (method === 'POST') {
        return AjaxPromise.post(baseUrl + url, data);
    }
    return AjaxPromise.get(baseUrl + url, data);
}

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    else {
        return null;
    }
}

export { fetch , getQueryString }
