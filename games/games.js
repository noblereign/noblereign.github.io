function loadGames() {
	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const fileList = this.responseText.split('\n'); // Split by lines
			let currentFolder = '';

			const filePaths = fileList
				.map(f => { // Build correct path for each file
					let filePath = '';
					let artistName = '';

					if (f) {
						if (f[0] === '.') {
							currentFolder = f.replace('.', '').replace(':', '/');
						} else if (f[f.length - 1] !== '/') {
							filePath = `${location.href}${currentFolder}${f}`;
						}
					}
					filePath = filePath.replace('/games//games/cards/', '/games/cards/');
					return filePath;
				})
				.filter(f => f); // Remove empty lines

			const imagesContainer = document.getElementById('contain');

			filePaths.map(f => { // Create and put images to the DOM
				let artistName = f.replace('https://www.glacier.dog//games/cards/', '').split('/')[0];
				const cardBase = document.createElement('div');
				cardBase.setAttribute('class', "card");
				const backgroundImg = document.createElement('div');
				backgroundImg.setAttribute('class', "bg-img");
				const content = document.createElement('div');
				content.setAttribute('class', "content");
				
				const title = document.createElement('h4');
				
				const description = document.createElement('p');
				

				const playButton = document.createElement('button');
				playButton.setAttribute('id', "play");

				const playIcon = document.createElement('i');
				playIcon.setAttribute('class', "fas fa-play");
				playButton.appendChild(playIcon);

				
				const moreButton = document.createElement('button');
				moreButton.setAttribute('id', "more");
				moreButton.innerHTML = "View on Roblox";

				$.get(f, function(myContentFile) {
					var lines = myContentFile.split("\n");

					for (var i = 0, len = lines.length; i < len; i++) {
						if (i === 0) { //ID
							backgroundImg.style.backgroundImage = "https://www.roblox.com/asset-thumbnail/image?assetId=" + lines[i] + "&width=768&height=432&format=png";
						playButton.setAttribute('onclick', "function click(e){ e.preventDefault(); location.href='roblox://" + lines[i] + "'; return false; }");
							moreButton.setAttribute('onclick', "function click(e){ e.preventDefault(); location.href='rblx.games/" + lines[i] + "' return false; }");
							console.log("ID");
						} else if (i === 1) { //Title
							title.innerHTML = lines[i];
							console.log("Title");
						} else { //Description
							content.innerHTML = lines[i];
							console.log("Description");
						}
						//here your code
						//each line is "lines[i]"

						//save in object "myObject": 
						//print in console
						console.log("line " + i + " :" + lines[i]);
					}
				}, 'text');
				
				
				
				
				
				
				cardBase.appendChild(backgroundImg);
				content.appendChild(title);
				content.appendChild(description);
				content.appendChild(playButton);
				content.appendChild(moreButton);
				cardBase.appendChild(content);
				imagesContainer.appendChild(cardBase);
			});
		}
	};

	xhttp.open("GET", "../gamedir.txt", true);
	xhttp.send();
}

loadGames();