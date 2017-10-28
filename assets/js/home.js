(function() {
	var turbo = Turbo({ site_id: '59f257cb8a9c7500124d6626' });
	var stations = {};
	var selectedStation = null;

	var selectStation = function(event) {
		event.preventDefault();
		selectedStation = stations[event.target.id];
        console.log('Select Station: ' + selectedStation);
        
        $('#selected-station-name').html(selectedStation.name);
        var trackList = '';
        if(selectedStation.tracks != null) {
            selectedStation.tracks.forEach(function(track, i) {
                trackList += '<li class="nav-item">';
                trackList += ' <a class="nav-link" href="#">'+ track.name+'</a>';
                trackList += '</li>';
            });

        }
        $('#selected-station-tracks').html(trackList);
		$('#button-toggle').click();
	};

	turbo.fetch('user', null, function(err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}

		var users = data.results;
		var stationsHtml = '';

		users.forEach(function(user, i) {
			var numTracks = user.tracks ? user.tracks.length : 0;
			stationsHtml += '<div class="col-12 col-md-4"><div class="pricing-1">';
			stationsHtml += '<p class="plan-name">' + user.name + '</p><br>';
			stationsHtml +=
				'<img style="width: 120px; height: 120px; border-radius:60px" src="' + user.image + '=s120-c"><hr/>';
			stationsHtml += '<small>' + numTracks + ' tracks</small><br>';
			stationsHtml += '<small>Basic support</small><br>';
			stationsHtml += '<small>Sync to cloud database</small><br> <br>';
			stationsHtml +=
				'<p class="text-center py-3"><a id="' +
				user.id +
				'" class="btn btn-primary" href="#">View Tracks</a></p> </div></div>';
			stations[user.id] = user;

			setTimeout(function() {
				$('#' + user.id).click(selectStation);
			}, 500);

			// setTimeout(selectStation, 500);
		});

		$('#stations').html(stationsHtml);
	});
})();
