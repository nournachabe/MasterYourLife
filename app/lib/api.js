var backend=require('parse');

exports.getCoreValues=function(fn){
	backend.get("COREVALUES",fn);
};

exports.getInspiration=function(fn){
	backend.get("Inspiration",fn);
};
