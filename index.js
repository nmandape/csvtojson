var csv = require( "fast-csv" );
var express=require( "express" );
var request = require('request');
var app=new express();

app.get('/convert/csv/to/json', function(req, res) {
   var url=req.query.q;
   console.log("Reading file...");
   var result = [];
   var i=0;
   var headers=new Array();
   var data1=new Array();
     csv.fromStream(request(url))
      .on("data", function(data){
		if(i==0)
		 headers=data;
		else
		{
			var obj = {};
			  var currentline=data;
			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }
		result.push(obj);
		}
		i++;
	  })
	  .on("end", function(){
		console.log("Conversion Done!");		 
		res.send(JSON.stringify(result));
	});
});



var server = app.listen(5000, function() {
//    host = server.address().address;
    port = server.address().port;
    console.log("App listening at port %s", port);
})
