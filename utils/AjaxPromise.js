/**
 * Created by fannairu on 2016/7/30.
 */

var BluebirdPromise = require('bluebird');
var $ = require('jquery');

var AjaxPromise = {
    ajax: function (type, url, data) {
        return new BluebirdPromise(function (resolve, reject) {
            var opts = {
                type: type,
                dataType: 'JSON',
                data: data,
                contentType: 'application/json',
                success: resolve,
                error: function (jqXHR) {
                    reject(jqXHR.responseJSON);
                }
            };
            return $.ajax(url, opts);
        });
    },
    get: function (url, data) {
        return this.ajax('GET', url, data);
    },
    post: function (url, data) {
        return this.ajax('POST', url, data);
    },
    put: function (url, data) {
        return this.ajax('PUT', url, data);
    },
    patch: function (url, data) {
        return this.ajax('PATCH', url, data);
    },
    delete: function (url, data) {
        return this.ajax('DELETE', url, data);
    }
};

module.exports = AjaxPromise;
