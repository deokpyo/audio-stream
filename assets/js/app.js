// wrapped in function to avoid same variable names

(function() {
	var turbo = Turbo({ site_id: '59f257cb8a9c7500124d6626' });
	var currentUser = null;

	turbo.currentUser(function(err, data) {
		if (err) {
			console.log('No one logged in');
			return;
		}
		console.log('current user: ', data);
		currentUser = data.user;
		$('#header-username').html(data.user.name);

		var tracksList = '';
		currentUser.tracks.forEach(function(track, i) {
			tracksList +=
				'<tr><td width="130"><a href="' +
				track.url +
				'" target="_blank"><img src="/dist/images/icon-play.png" alt="..."></a></td>';
			tracksList +=
				'<td><h5><a href="' +
				track.url +
				'" target="_blank">' +
				track.name +
				'</a></h5><p>Uploaded: ' +
				track.timestamp +
				'</p></td>';
			tracksList += '<td><h4 class="price">Share</h4></td>';
		});
		$('#table-tracks').html(tracksList);
	});

	$('#button-upload').click(function(event) {
		event.preventDefault();
		console.log('upload track');

		turbo.uploadFile(function(err, data) {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}

			var file = data.result;
			// check for logged in user
			if (currentUser === null) {
				return;
			}

			// update current user
			var tracks = currentUser.tracks || [];
			tracks.push(file);

			turbo.update('user', currentUser, { tracks: tracks }, function(err, data) {
				if (err) {
					alert('Error: ' + err.message);
					return;
				}
				console.log('User Updated: ', data);
				currentUser = data.result;
				var tracksList = '';
				currentUser.tracks.forEach(function(track, i) {
					tracksList +=
						'<tr><td width="130"><a href="' +
						track.url +
						'" target="_blank"><img src="/dist/images/icon-play.png" alt="..."></a></td>';
					tracksList +=
						'<td><h5><a href="' +
						track.url +
						'" target="_blank">' +
						track.name +
						'</a></h5><p>Uploaded: ' +
						track.timestamp +
						'</p></td>';
					tracksList += '<td><h4 class="price">Share</h4></td>';
				});
				$('#table-tracks').html(tracksList);
			});
		});
	});

	$('#button-join').click(function(event) {
		event.preventDefault();

		var visitor = {
			name: $('#input-name').val(),
			email: $('#input-email').val(),
			password: $('#input-password').val()
		};

		if (visitor.name.length === 0) {
			alert('Please enter your name');
			return;
		}

		if (visitor.email.length === 0) {
			alert('Please enter your email');
			return;
		}

		if (visitor.password.length === 0) {
			alert('Please enter your password');
			return;
		}

		turbo.createUser(visitor, function(err, data) {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}

			window.location.href = '/admin';
		});
	});
})();
