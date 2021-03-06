'use strict';

const request = require('request');

const apiServer = {
  request_session_service: 'http://athmapi.westus.cloudapp.azure.com/athm/requestSession',
  request_payment_service: 'http://athmapi.westus.cloudapp.azure.com/athm/requestPayment',
  verify_payment_status: 'http://athmapi.westus.cloudapp.azure.com/athm/verifyPaymentStatus'
};

exports.requestSession = function (businessUsername, businessPassword, cb) {
  request({
    url: apiServer.request_session_service,
    method: 'post',
    body: {
      commUsername: businessUsername,
      commPassword: businessPassword
    },
    json: true
  }, function (err, res) {
    if (res.body.responseStatus !== 'SUCCESS') {
      return cb({
        response_status: res.body.responseStatus
      });
    }

    return cb(null, res.body);
  });
};

exports.requestPayment = function (token, phone, amount, cb) {
  request({
    url: apiServer.request_payment_service,
    method: 'post',
    body: {
      token: token,
      phone: phone,
      amount: amount
    },
    json: true
  }, function (err, res) {
    if (res.body.responseStatus !== 'SUCCESS') {
      return cb({
        response_status: res.body.responseStatus
      });
    }

    return cb(null, res.body);
  });
};

exports.verifyService = function (token, referenceNumber, cb) {
  request({
    url: apiServer.verify_payment_status,
    method: 'post',
    body: {
      token: token,
      referenceNumber: referenceNumber
    },
    json: true
  }, function (err, res) {
    if (res.body.responseStatus !== 'SUCCESS') {
      return cb({
        response_status: res.body.responseStatus
      });
    }

    return cb(null, res.body);
  });
};