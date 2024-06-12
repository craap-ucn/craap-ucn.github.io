document.addEventListener('DOMContentLoaded', async function() {
    const loadComponent = async (id, url, callback) => {
        try {
            const response = await fetch(url);
            const data = await response.text();
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
        }
    };
    await loadComponent('header', '../components/header.html');
    await loadComponent('footer', '../components/footer.html');
    loadComponent('accessibility', '../components/accessibility.html', function() {
        const accessibilityBtn = document.getElementById('accessibilityBtn');
        const accessibilityMenu = document.getElementById('accessibilityMenu');
        const closeAccessibilityMenu = document.getElementById('closeAccessibilityMenu');
        const fontSizeButtons = document.querySelectorAll('.font-size-btn');
        const darkModeToggle = document.getElementById('darkModeToggle');
        const resetFontSizeButton = document.getElementById('resetFontSize');
        const resetDarkModeButton = document.getElementById('resetDarkMode');

        if (accessibilityBtn && accessibilityMenu && closeAccessibilityMenu && fontSizeButtons.length && darkModeToggle && resetFontSizeButton && resetDarkModeButton) {
            accessibilityBtn.addEventListener('click', function() {
                accessibilityMenu.classList.toggle('hidden');
            });

            closeAccessibilityMenu.addEventListener('click', function() {
                accessibilityMenu.classList.add('hidden');
            });

            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    accessibilityMenu.classList.add('hidden');
                }
            });

            document.addEventListener('click', function(event) {
                const isClickInside = accessibilityMenu.contains(event.target) || accessibilityBtn.contains(event.target);
                if (!isClickInside) {
                    accessibilityMenu.classList.add('hidden');
                }
            });

            fontSizeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const newSize = this.getAttribute('data-size');
                    document.querySelectorAll('p, a').forEach(p => {
                        p.classList.remove('text-base','text-lg', 'text-xl');
                        p.classList.add(newSize);
                    });
                    localStorage.setItem('fontSize', newSize);
                    highlightCurrentSettings();
                });
            });

            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark');
                const isDarkMode = document.body.classList.contains('dark');
                localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
                highlightCurrentSettings();
            });

            resetFontSizeButton.addEventListener('click', () => {
                localStorage.removeItem('fontSize');
                document.querySelectorAll('p, a').forEach(p => {
                    p.classList.remove('text-base', 'text-lg', 'text-xl');
                    p.classList.add('text-base');
                });
                highlightCurrentSettings();
            });

            resetDarkModeButton.addEventListener('click', () => {
                localStorage.removeItem('darkMode');
                document.body.classList.remove('dark');
                highlightCurrentSettings();
            });

            const applySavedSettings = () => {
                const savedFontSize = localStorage.getItem('fontSize');
                if (savedFontSize) {
                    document.querySelectorAll('p, a').forEach(p => {
                        p.classList.remove('text-base', 'text-lg', 'text-xl');
                        p.classList.add(savedFontSize);
                    });
                }

                const savedDarkMode = localStorage.getItem('darkMode');
                if (savedDarkMode === 'enabled') {
                    document.body.classList.add('dark');
                }
            };

            const highlightCurrentSettings = () => {
                const savedFontSize = localStorage.getItem('fontSize');
                fontSizeButtons.forEach(button => {
                    button.classList.remove('bg-yellow-500');
                    if (button.getAttribute('data-size') === savedFontSize) {
                        button.classList.add('bg-yellow-500');
                    }
                });

                const savedDarkMode = localStorage.getItem('darkMode');
                if (savedDarkMode === 'enabled') {
                    darkModeToggle.classList.add('bg-yellow-500');
                    resetDarkModeButton.classList.remove('bg-yellow-500');
                } else {
                    darkModeToggle.classList.remove('bg-yellow-500');
                    resetDarkModeButton.classList.add('bg-yellow-500');
                }
                
                if (!savedFontSize) {
                    resetFontSizeButton.classList.add('bg-yellow-500');
                } else {
                    resetFontSizeButton.classList.remove('bg-yellow-500');
                }
            };

            applySavedSettings();
            highlightCurrentSettings();
        } else {
            console.error('No se encontraron todos los elementos necesarios en el DOM.');
        }
    });
});
