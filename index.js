// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
/*
var ParseServer = require('parse-server').ParseServer;
var AzureStorageAdapter = require('parse-server-azure-storage').AzureStorageAdapter;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

 var account = process.env.STORAGE_ACCOUNT_NAME;		
 var container = process.env.STORAGE_CONTAINER_NAME;		
 var options = {		
     accessKey: process.env.FILE_ACCESS_KEY || 'key',		
     directAccess: true // If set to true, files will be served by Azure Blob Storage directly		
 }

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  maxUploadSize: process.env.MAX_UPLOAD_SIZE,
   filesAdapter: new AzureStorageAdapter(account, container, options),
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey
*/
var app = express();

// Serve static assets from the /public folder
//app.use('/public', express.static(path.join(__dirname, '/public')));
/*
// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

var mountPath2 = process.env.PARSE_MOUNT2 || '/parse';
app.use(mountPath2, api);
*/
// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app

app.post('/parse', function(req, res) {
   res.redirect(307, 'http://ec2-52-43-213-79.us-west-2.compute.amazonaws.com:80' + req.path);
});

app.get('/parse', function(req, res) {
  //res.sendFile(path.join(__dirname, '/public/test.html'));
  res.redirect(307, 'http://ec2-52-43-213-79.us-west-2.compute.amazonaws.com:80' + req.path);
//   res.redirect(307, 'http://ec2-52-43-213-79.us-west-2.compute.amazonaws.com:80/parse');
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
//ParseServer.createLiveQueryServer(httpServer);
