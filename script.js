const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const galleryContainer = document.getElementById('galleryContainer');
const filterSelect = document.getElementById('filter');
const dropArea = document.getElementById('dropArea');

// Batas ukuran file maksimum (5 MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Fungsi untuk menampilkan file di galeri
function displayFile(file) {
    if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} terlalu besar. Maksimal ukuran file adalah 5 MB.`);
        return; // Hentikan eksekusi jika file terlalu besar
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const item = document.createElement('div');
        item.classList.add('gallery-item');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Hapus';
        removeButton.classList.add('remove-button');

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = e.target.result;
            item.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = e.target.result;
            video.controls = true;
            item.appendChild(video);
        }

        item.appendChild(removeButton);
        galleryContainer.appendChild(item);

        // Event listener untuk menghapus item
        removeButton.addEventListener('click', function() {
            galleryContainer.removeChild(item);
        });
    };

    reader.readAsDataURL(file);
}

// Event listener untuk tombol unggah
uploadButton.addEventListener('click', function() {
    const files = fileInput.files;

    for (let i = 0; i < files.length; i++) {
        displayFile(files[i]);
    }

    fileInput.value = ''; // Reset input
});

// Event listener untuk filter
filterSelect.addEventListener('change', function() {
    const filterValue = filterSelect.value;
    const items = galleryContainer.children;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const isImage = item.querySelector('img') !== null;
        const isVideo = item.querySelector('video') !== null;

        if (filterValue === 'all') {
            item.style.display = 'block';
        } else if (filterValue === 'image' && isImage) {
            item.style.display = 'block';
        } else if (filterValue === 'video' && isVideo) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
});

// Fitur drag and drop
dropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', function() {
    dropArea.classList.remove('hover');
});

dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    dropArea.classList.remove('hover');

    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        displayFile(files[i]);
    }
});

// Event listener untuk mengklik area drop
dropArea.addEventListener('click', function() {
    fileInput.click();
});