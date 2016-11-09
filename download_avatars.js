var request = require('request'); //dependencies
var fs = require('fs');

var GITHUB_USER = 'claytonschroeder';
var GITHUB_TOKEN = '08357d858988d04f39d7ce95381a38d8c2eeaf47';

var repoOwner = process.argv[2]; //takes in username
var repoName = process.argv[3];   //takes in repo name

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'git-hub avatar downloader', //assigns a value to User-Agent property in order to meet GitHubs's admin rules
    }
  };
//if there is a "Not Found" error, the user has entered an invalid username or repositort name: this is because the URL that is constructed above using repoOwner and ropeName.
  request(options, function(err, response, body) {
    if (err) throw err;
    console.log("Response status code: " + response.statusCode);
    console.log("Response message: " + response.statusMessage);
    if (response.statusMessage === 'Not Found') {
      console.log("Hey! Please enter a valid username and repository name")
    } else {
      console.log("Downloading Image..............")
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
    console.log("Download complete!")
  };
});
