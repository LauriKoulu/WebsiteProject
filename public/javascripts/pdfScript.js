"use strict"

// add listener for our pdf button
document.getElementById('dlbtn').addEventListener("click", toPDF);

function toPDF() {
	var doc = new jsPDF('p');

	//get and add 1st chart
	var playerCanvas = document.getElementById('chartContainer');

	var playerImage = playerCanvas.toDataURL("image/png", 1.0);

	// get and add 2nd chart
	var totalCanvas = document.getElementById('chartContainer2');

	var canvasImg = totalCanvas.toDataURL("image/jpeg", 1.0);

	//add text and images to pdf
	doc.setFontSize(40);
	doc.text(15,15,"Player and game statistics");
	doc.addImage(canvasImg, 'JPEG', 15, 30, 100, 100);
	doc.addImage(playerCanvas, 'JPEG', 15, 145, 100, 100);
	// save pdf
	doc.save('stats.pdf');
}