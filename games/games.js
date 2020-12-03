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
				
				const buttonHolder = document.createElement('div');
				buttonHolder.setAttribute('id', "buttonHolder");

				const playButton = document.createElement('button');
				playButton.setAttribute('id', "play");

				const playIcon = document.createElement('i');
				playIcon.setAttribute('class', "fas fa-play");
				playButton.appendChild(playIcon);

				
				const moreButton = document.createElement('button');
				moreButton.setAttribute('id', "more");
				const txtMore = document.createTextNode("View on Roblox");
				moreButton.appendChild(txtMore);

				$.get(f, function(myContentFile) {
					var lines = myContentFile.split("\n");

					for (var i = 0, len = lines.length; i < len; i++) {
						if (i === 0) { //ID
							backgroundImg.style.backgroundImage = "url(https://www.roblox.com/asset-thumbnail/image?assetId=" + lines[i] + "&width=768&height=432&format=png)";
							// playButton.setAttribute('onclick', "");
							// moreButton.setAttribute('onclick', "");
							$(playButton).click(function () {
								// custom handling here
								location.href = "roblox://" + lines[i];
								return false;
							});
							$(moreButton).click(function () {
								// custom handling here
								location.href = "rblx.games/" + lines[i];
								return false;
							});
							console.log("ID");
						} else if (i === 1) { //Title
							const txt = document.createTextNode(lines[i]);
							title.appendChild(txt);
							console.log("Title");
						} else { //Description
							const txt = document.createTextNode(lines[i]);
							description.appendChild(txt);
							console.log("Description");
						}
						//here your code
						//each line is "lines[i]"

						//save in object "myObject": 
						//print in console
						//console.log("line " + i + " :" + lines[i]);
					}
				}, 'text');
				
				
				
				
				
				
				cardBase.appendChild(backgroundImg);
				content.appendChild(title);
				content.appendChild(description);
				buttonHolder.appendChild(playButton);
				buttonHolder.appendChild(moreButton);
				content.appendChild(buttonHolder);
				cardBase.appendChild(content);
				imagesContainer.appendChild(cardBase);
			});
		}
	};

	xhttp.open("GET", "../gamedir.txt", true);
	xhttp.send();
}

loadGames();