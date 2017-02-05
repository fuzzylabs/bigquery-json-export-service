'use strict';

const express = require('express');
const bq = require('@google-cloud/bigquery')();
const app = express();

app.get('/:project/:dataset/:table', (req, res) => {
  var p = req.params
  var target = '`' + p.project + '.' + p.dataset + '.' + p.table + '`'
  var query = 'SELECT * FROM ' + target;
  bq.query({ query: query, useLegacySql: false}, 
    function(err, rows) {
      if(err){
        res.status(500).json(err);
      } else {
        res.json(rows);
      } 
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
