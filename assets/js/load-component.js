document.addEventListener('DOMContentLoaded', function() {
    const loadComponent = (id, url) => {
        fetch(url)
            .then(response => response.text())
            .then(data => document.getElementById(id).innerHTML = data)
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    loadComponent('header', '../components/header.html');
    loadComponent('footer', '../components/footer.html');
});
