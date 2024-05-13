const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
  // Add more image URLs as objects if needed
];

btn.addEventListener('click', function() {
    downloadAllImages(images).then(imgElements => {
        output.innerHTML = ''; // Clear previous images if any
        imgElements.forEach(img => {
            output.appendChild(img);
        });
    }).catch(error => {
        console.error(error);
        output.textContent = error; // Display error message in the output div
    });
});

function downloadAllImages(imageObjects) {
    const promises = imageObjects.map(imageObj => loadImage(imageObj.url));
    return Promise.all(promises);
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image's URL: ${url}`);
    });
}
