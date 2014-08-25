exports.share = function(sharer, dataToShare, moduleName) {
	if (OS_IOS) {
		if (moduleName === 'tiSocial') {
			var Social = require('dk.napp.social');
			if (sharer === 'Facebook') {
				if (Social.isFacebookSupported()) {
					Ti.API.info(JSON.stringify(dataToShare));
					Social.facebook(dataToShare);
				} else {
					alert('facebook sharing unsupported');

				}
			} else if (sharer === 'Twitter') {
				if (Social.isTwitterSupported()) {
					Ti.API.info(JSON.stringify(dataToShare));
					var twitter = {
						image: dataToShare.image,
						text: dataToShare.text + ' ' + dataToShare.url
					};
					Social.twitter(twitter);
				} else {
					alert('twitter sharing unsupported');
				}
			}
		}
	} else if (OS_ANDROID) {
		var socialImage = dataToShare.image;
		var socialText = dataToShare.text;
		var socialUrl = dataToShare.url;
		var temp = socialImage.split('/');
		var filename = temp[temp.length - 1];
		if (sharer === 'Twitter') {
			var Twitter = require('twitter2').Twitter;
			var client = Twitter({
				consumerKey : '17E2I3cP6XiSRD8qwBkRn0WGZ', // constants.TW_CONSUMER_KEY,
				consumerSecret : '6gjApUlpYdi8eqcWzVrxU6iJbcO7KlaygylCpE597nZiqXlbgy', //constants.TW_CONSUMER_SECRET,
				accessTokenKey : Ti.App.Properties.getString('twitterAccessTokenKey', ''),
				accessTokenSecret : Ti.App.Properties.getString('twitterAccessTokenSecret', '')

			});
			var blob;
			//= $.previewView.toImage(null, true).media;
			client.addEventListener('login', function(e22) {
				Ti.App.Properties.setString('twitterAccessTokenKey', e22.accessTokenKey);
				Ti.App.Properties.setString('twitterAccessTokenSecret', e22.accessTokenSecret);

				if (e22.success) {
					var progressIndicator = Ti.UI.Android.createProgressIndicator({
						message : 'Uploading...',
						location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG
					});
					//Ti.API.info('twitter path' + Ti.App.Properties.getString('path'));
					var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
					var path = file.nativePath;
					Ti.API.info('path share: '+ path);
					blob = Ti.Filesystem.getFile(path);
					progressIndicator.show();
					var params = {};
					Ti.API.info('Trying to upload');
					//shared = true;
					var path = 'https://api.twitter.com/1.1/statuses/update_with_media.json';
					params['media[]'] = blob;
					params.status = socialText + '' + socialUrl;
					headers = {
						'Content-Type' : 'multipart/form-data'
					};
					try {
						client.request(path, params, headers, 'POST', function(e) {
							progressIndicator.hide();
							if (e.success) {
								alert('Uploaded');
							} else {
								alert('Error please try again later');
							}
						});
					} catch(exe) {
						progressIndicator.hide();
					}
				} else {
					//progressIndicator.hide();
					alert(e.error);
				}
			});

			client.authorize();

		} else if (sharer === 'Facebook') {
			Ti.API.info('Sharer facebook');
			var fb = require('facebook');
			fb.appid = "1465114963705902";
			// First make sure this permission exists
			fb.permissions = ['publish_stream'];
			fb.addEventListener('login', function(fe) {
				if (fe.success) {
					var data = {
						link : socialUrl,
						//name : "New Daily Message",
						//message : share.text,
						//caption : "New Daily Message",
						picture : socialImage,
						description : socialText
					};
					var progressIndicator = Ti.UI.Android.createProgressIndicator({
						message : 'Uploading...',
						location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG
					});

					progressIndicator.show();
					fb.requestWithGraphPath('me/feed', data, 'POST', function(fe1) {
						progressIndicator.hide();
						if (fe1.success) {
							alert("Uploaded!");
						} else {
							if (fe1.error) {
								alert(fe1.error);
							} else {
								alert("Unkown result");
							}
						}
					});
				} else {
					Ti.API.info('login unsuccessful');
				}
			});

			if (fb.loggedIn) {
				Ti.API.info('Already logged in ');
				//var blob = socialImage.toImage(null, true).media;
				//var blob = f.read();
				var data = {
					link : socialUrl,
					//name : "New Daily Message",
					//message : share.text,
					//caption : "New Daily Message",
					picture : socialImage,
					description : socialText
				};

				var progressIndicator = Ti.UI.Android.createProgressIndicator({
					message : 'Uploading...',
					location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG
				});

				progressIndicator.show();
				fb.requestWithGraphPath('me/feed', data, 'POST', function(fe1) {
					progressIndicator.hide();
					if (fe1.success) {

						alert("Uploaded!");
					} else {
						if (fe1.error) {
							alert('An error occurred');
							//alert(e.error);
						} else {
							alert("Unkown result");
						}
					}
				});
			} else {
				fb.authorize();
			}
		}
	}
};
