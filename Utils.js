function downloadImage(path, numberOfImages) {
	
		for (var i = 1; i <= numberOfImages; i++) {
			fileName = path + " (" + i  + ")"+ ".png";
			AM.queueDownload(fileName);
		}
}

function assetToArray(path, numberOfImages, array) {
	for (var i = 1; i <= numberOfImages; i++) {
			array.push(AM.getAsset(path + " (" + i  + ")"+ ".png"));
	}
}