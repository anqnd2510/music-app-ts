// Upload and Preview Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0]);

            uploadImagePreview.src = image;
        }
    });
}
// End Upload and Preview Image


// Upload and Preview Audio
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio) {
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPreview = uploadAudio.querySelector("[upload-audio-preview]");
    const source = uploadAudio.querySelector("source");

    uploadAudioInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const audio = URL.createObjectURL(e.target.files[0]);

            source.src = audio;
            uploadAudioPreview.load();
        }
    });
}
// End Upload and Preview Audio