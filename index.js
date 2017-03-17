'use strict';

const bq = require('@google-cloud/bigquery')();
const auth = require('basic-auth')
const sha256 = require('js-sha256');
const usrHash = 'userhash'
const pswHash = 'pswhash'
exports.bqJsonExporter = function bqQueryExporter(req, res){
    
    var user = auth(req);
    if (!user || sha256(user.name) !== usrHash || sha256(user.pass) !== pswHash) {
      res.statusCode = 401
      res.setHeader('WWW-Authenticate', 'Basic realm="example"')
      res.end('Access denied')
    }

    var params = req.params['0'].replace(/^\//, ''); // params start with '/'
    params = params.split('/');
    var project = params[0] ? params[0] : null;
    var dataset = params[1] ? params[1] : null;
    var table = params[2] ? params[2] : null;
    if (!project || !dataset || !table) {
        return res.status(500).send('/{project}/{dataset}/{table} format must be specified');
    }
    var target = '`' + project + '.' + dataset + '.' + table + '`'
    var query = 'SELECT * FROM ' + target;
    bq.query({ query: query, useLegacySql: false}, 
      function(err, rows) {
        if(err){
	  res.status(500).send(err);
        } else {
	  res.status(200).send(rows);
        } 
      });
};
