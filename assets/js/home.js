(function() {
	console.log('Home page!');
	var turbo = Turbo({ site_id: '59f257cb8a9c7500124d6626' });

	turbo.fetch('user', null, function(err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		console.log('Users: ' + JSON.stringify(data));

		var users = data.results;
		var stationsHtml = '';

		users.forEach(function(user, i) {
            var numTracks = (user.tracks) ? user.tracks.length : 0;
			stationsHtml += '<div class="col-12 col-md-4"><div class="pricing-1">';
			stationsHtml += '<p class="plan-name">' + user.name + '</p><br>';
			stationsHtml +=
				'<img style="width: 120px; height: 120px; border-radius:60px" src="' + user.image + '=s120-c"><hr/>';
			stationsHtml += '<small>' + numTracks + ' tracks</small><br>';
			stationsHtml += '<small>Basic support</small><br>';
			stationsHtml += '<small>Sync to cloud database</small><br> <br>';
			stationsHtml +=
				'<p class="text-center py-3"><a class="btn btn-primary" href="#">View Tracks</a></p> </div></div>';
		});

		$('#stations').html(stationsHtml);
	});
})();
