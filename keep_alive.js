var http=require('http');

http.createServer(function (req,res) {
  res.write("I'm alive");
  res.end();
}).listen(process.env.PORT || 8080, () => {
  console.log(`🌐 Keep-Alive server listening on port ${process.env.PORT || 8080}`);
});
