import AjaxPromise from './AjaxPromise'
const baseUrl = '/api';
const wxBaseUrl = '/wx/api';

function fetch(url, data, method, isWx) {
    const base = isWx ? wxBaseUrl : baseUrl;
    if (method === 'POST') {
        return AjaxPromise.post(base + url, data);
    }
    return AjaxPromise.get(base + url, data);
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

export {fetch, getQueryString}
