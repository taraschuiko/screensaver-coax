var images = [
"https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060",
"https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560",
"https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200",
"https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
"https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400",
"https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260",
"https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];

// Last interaction time
var lastInterTime = new Date();

var screenSaver = false;

// Updating last interaction time
function updateLastInterTime() {
	lastInterTime = new Date();
	hideSaver();
}

// Turning screen saver on
function showSaver() {
	document.getElementById("fade").style.display = 'block';
	screenSaver = true;
}

// Turning screen saver off
function hideSaver() {
	document.getElementById("fade").style.display = 'none';
	screenSaver = false;
}

// Checking time to show screensaver after 10 seconds of inactivity
function checkTime() {
	if (new Date().getSeconds() - lastInterTime.getSeconds() > 10 && !screenSaver) {
		showSaver();
	}
}

// Checking user's activity
document.addEventListener("mouseup", updateLastInterTime);
document.addEventListener("mousemove", updateLastInterTime);
document.addEventListener("scroll", updateLastInterTime);
document.addEventListener("keyup", updateLastInterTime);

// Checking last interaction time every second
setInterval(checkTime, 1000);

// Updating screen saver image every 5 seconds
setInterval(updateImage, 5000);

function updateImage() {
	if (screenSaver) {
		var image = document.getElementById("fade-image");
		image.style.opacity = '0';

		fade(image);

		// Getting random image
		var randomNumber = Math.floor(Math.random() * (images.length)) + 0;
		var randomImage = images[randomNumber];
		document.getElementById("fade-image").setAttribute("src", randomImage);
		document.getElementById("fade-image").style.display = "block";

		// Getting image sizes
		var imageWidth = document.getElementById("fade-image").offsetWidth;
		var imageHeight = document.getElementById("fade-image").offsetHeight;

		// Getting window sizes
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		// Setting image's max size
		document.getElementById("fade-image").style.maxWidth = windowWidth + "px";
		document.getElementById("fade-image").style.maxHeight = windowHeight + "px";

		// Generating random position
		generatePosition();

		function generatePosition() {
			var randomX = Math.floor(Math.random() * (windowWidth - imageWidth)) + 0;
			var randomY = Math.floor(Math.random() * (windowHeight - imageHeight)) + 0;

			document.getElementById("fade-image").style.left = randomX + "px";
			document.getElementById("fade-image").style.top = randomY + "px";
		}
	}
}

// Fade animation
function fade(element) {
	var opacity;
	if(element.style.opacity > 0.9) {
		element.style.opacity = 1;
		var myvar = setInterval(function() {
			element.style.opacity -= 0.05;
			if(element.style.opacity < 0) {
				clearInterval(myvar);
				opacity = Number(element.style.opacity);
				console.log('faded out to: ' + opacity);
				element.style.opacity = opacity;
			}
		}, 20);
	} else if(element.style.opacity < 1) {
		element.style.opacity = 0;
		console.log('Going up from ' + opacity);
		var newvar = setInterval(function() {
			element.style.opacity =+ parseFloat(element.style.opacity) + 0.05;
			if(element.style.opacity > 1) {
				clearInterval(newvar);
				opacity = Number(element.style.opacity);
				console.log('faded out to: ' + opacity);
				element.style.opacity = opacity;
			}
		}, 20);
	}
}