var backend=require('parse');

/*exports.getCoreValues=function(fn){
	backend.get("COREVALUES",fn);
};

exports.getInspiration=function(fn){
	backend.get("Inspiration",fn);
};*/

exports.getAllData = function(params,fn) {
  backend.post(backend.GETDATA,params, fn);
};
exports.getUpdateDate = function(fn) {
  backend.post(backend.UPDATEDATE,{},fn);
};
exports.postEmailAddress = function(params,fn) {
  backend.post(backend.EMAILADDRESSES,params,fn);
};