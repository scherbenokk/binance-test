const https = require('https');

const methodsMapper = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
};

function configureMethod({ method, headers, baseURL }) {
  return function request(url) {
    return new Promise((resolve, reject) => {
      const req = https.request(`${baseURL}${url}`, {
        method,
        headers,
      }, (res) => {
          const data = [];

          res.on('data', function(chunk) {
            data.push(chunk);
          }).on('end', function() {
            const buffer = Buffer.concat(data);
            resolve(JSON.parse(buffer.toString()));
          });

          res.on('error', (e) => {
            reject(e);
          });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.end();
    });
  }
}

module.exports = function configureRequest({ headers, baseURL }) {
  const simpleHttps = {
    get: configureMethod({ method: methodsMapper.get, headers, baseURL }),
    post: configureMethod({ method: methodsMapper.post, headers, baseURL }),
    put: configureMethod({ method: methodsMapper.put, headers, baseURL }),
  };

  return simpleHttps;
}
