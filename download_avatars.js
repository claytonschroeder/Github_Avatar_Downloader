var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!')

var GITHUB_USER = "claytonschroeder";
var GITHUB_TOKEN = "08357d858988d04f39d7ce95381a38d8c2eeaf47";

  function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
console.log(requestURL);
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

