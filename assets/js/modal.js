document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modal');
    var modalImage = document.getElementById('modalImage');
    var modalImageContainer = document.getElementById('modalImageContainer');
    var modalPoster = document.getElementById('poster');
    var isZoomedIn = false;

    window.openModal = function(src) {
        modal.style.display = "flex";
        modalImage.src = src;
        document.body.style.overflow = 'hidden';
        modalImage.style.transform = "scale(1)";
        isZoomedIn = false;
        modalImage.classList.remove('cursor-zoom-out');
        modalImage.classList.add('cursor-zoom-in');
    }

    window.closeModal = function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    modalImage.addEventListener('click', function () {
        if (isZoomedIn) {
            modalImage.classList.remove('cursor-zoom-out');
            modalImage.classList.add('cursor-zoom-in');
            modalImage.style.transform = "scale(1)";
            modalImageContainer.classList.remove('overflow-scroll');
        } else {
            modalImage.classList.remove('cursor-zoom-in');
            modalImage.classList.add('cursor-zoom-out');
            modalImage.style.transform = "scale(1.5)";
            modalImageContainer.classList.add('overflow-scroll');
        }
        isZoomedIn = !isZoomedIn;
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    document.addEventListener('click', function (e) {
        if (modal.style.display === "flex" && !modalImage.contains(e.target) && !modalPoster.contains(e.target)) {
            closeModal();
        }
    });

    modalPoster.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});
