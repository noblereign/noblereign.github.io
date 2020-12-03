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
					}
					else if (f[f.length - 1] !== '/') {
						filePath = `${location.href}${currentFolder}${f}`;
					}
				}
	  
				return filePath;
			})
			.filter(f => f); // Remove empty lines
	  
			const imagesContainer = document.getElementById('grid-container');
	  
			filePaths.map(f => { // Create and put images to the DOM
				let artistName = f.replace('https://www.glacier.dog//games/cards/', '').split('/')[0];
				const cardBase = document.createElement('div');
				cardBase.setAttribute('class', "card");
				const backgroundImg = document.createElement('div');
				backgroundImg.setAttribute('class', "bg-img");
				cardBase.appendChild(backgroundImg);
				const content = document.createElement('div');
				content.setAttribute('class', "content");
				cardBase.appendChild(content);
				const title = document.createElement('h4');
				content.appendChild(title);
				const description = document.createElement('p');
				content.appendChild(description);
				
				const playButton = document.createElement('button');
				playButton.setAttribute('id', "play");
				
				const playIcon = document.createElement('i');
				playIcon.setAttribute('class', "fas fa-play");
				playButton.appendChild(playIcon);
				
				content.appendChild(playButton);
				const moreButton = document.createElement('button');
				moreButton.setAttribute('id', "more");
				moreButton.innerHTML = "View on Roblox";
				content.appendChild(moreButton);
				
				$.get(f, function(myContentFile) {
				   var lines = myContentFile.split("\r\n");

				   for(var i  in lines){
					   if (i == 0){ //ID
							backgroundImg.style.background-image = "https://www.roblox.com/asset-thumbnail/image?assetId=" + lines[i] + "&width=768&height=432&format=png";
							playButton.setAttribute('onclick', "location.href='roblox://" + lines[i] + "'");
							moreButton.setAttribute('onclick', "location.href='rblx.games/" + lines[i] + "'");
					   } else if (i == 1) { //Title
							title.innerHTML = lines[i];
					   } else{ //Description
							content.innerHTML = lines[i];
					   }
					  //here your code
					  //each line is "lines[i]"

					  //save in object "myObject": 
					  //print in console
					  console.log("line " + i + " :" + lines[i]);
				   }
				}, 'text');
				
				imagesContainer.appendChild(cardBase);
			});
		}
	};

	xhttp.open("GET", "images.txt", true);
	xhttp.send();
}

loadGames();