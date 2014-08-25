//Ti.App.Properties.removeProperty("userProfile");
//Ti.App.Properties.removeProperty("coreValues");
var userProfile = JSON.parse(Ti.App.Properties.getString("userProfile"));

//Test to see if there is already info about User
if(userProfile==null)
{
var pers=Alloy.createController("Personalize",{}).getView();
pers.open();
}
else 
{
	args={name:userProfile.name,image:userProfile.image};
	var menu=Alloy.createController("MenuPage",args).getView();
menu.open();
}
 