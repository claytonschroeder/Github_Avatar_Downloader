var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'claytonschroeder';
var GITHUB_TOKEN = '08357d858988d04f39d7ce95381a38d8c2eeaf47';

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';



  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'git-hub avatar downloader', //assigns a value to User-Agent property in order to meet GitHubs's admin rules
    }
  }

  request(options, function(err, response, body) {
    if (err) throw err;
    console.log("Response status code: " + response.statusCode);
    console.log("Response message: " + response.statusMessage);
    if (response.statusMessage === 'Not Found') {
      console.log("Invalid Username")
    }
    gitData = JSON.parse(body);
    cb(gitData);
  });
    return;
};

getRepoContributors(repoOwner, repoName, function(result) {
  result.forEach(function(avJPG) {
    downloadImageByURL(avJPG.avatar_url, avJPG.login);
  });

  function downloadImageByURL(url, filePath) {
    request.get(url)
    .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
  };
});
