

(function () {
    'use strict';

    
    const FAV_STORAGE_KEY = 'quoteflow_favorites';
    const FALLBACK_AUTHOR = 'Unknown Author';

   
    let currentQuote = null;
    let favorites = [];
    let currentGenre = 'all';
    let isAnimating = false;

    
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const els = {
        quoteCard: $('#quote-card'),
        quoteText: $('#quote-text'),
        quoteAuthor: $('#quote-author'),
        quoteGenre: $('#quote-genre'),
        btnFavorite: $('#btn-favorite'),
        btnCopy: $('#btn-copy'),
        btnShare: $('#btn-share'),
        btnNewQuote: $('#btn-new-quote'),
        genreFilters: $('#genre-filters'),
        
        tabDiscover: $('#tab-discover'),
        tabFavorites: $('#tab-favorites'),
        btnTabDiscover: $('#btn-tab-discover'),
        btnTabFavorites: $('#btn-tab-favorites'),
        favBadge: $('#fav-badge'),
        favoritesEmpty: $('#favorites-empty'),
        favoritesList: $('#favorites-list'),
        // Toast
        toast: $('#toast'),
    };

    
    function getQuotes() {
        return typeof QUOTES_DATASET !== 'undefined' ? QUOTES_DATASET : [];
    }

    function getFilteredQuotes() {
        const all = getQuotes();
        if (currentGenre === 'all') return all;
        return all.filter(q => q.genre === currentGenre);
    }

    function getGenres() {
        const genres = [...new Set(getQuotes().map(q => q.genre))];
        return genres.sort();
    }

    function getRandomQuote() {
        const pool = getFilteredQuotes();
        if (pool.length === 0) return null;

        
        if (pool.length > 1 && currentQuote) {
            let candidate;
            do {
                candidate = pool[Math.floor(Math.random() * pool.length)];
            } while (candidate.id === currentQuote.id);
            return candidate;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    
    function loadFavorites() {
        try {
            const data = localStorage.getItem(FAV_STORAGE_KEY);
            favorites = data ? JSON.parse(data) : [];
        } catch {
            favorites = [];
        }
    }

    function saveFavorites() {
        localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    }

    function isFavorited(quoteId) {
        return favorites.some(f => f.id === quoteId);
    }

    function addFavorite(quote) {
        if (isFavorited(quote.id)) return;
        favorites.unshift({ ...quote });
        saveFavorites();
        updateFavBadge();
        renderFavorites();
    }

    function removeFavorite(quoteId) {
        favorites = favorites.filter(f => f.id !== quoteId);
        saveFavorites();
        updateFavBadge();
        renderFavorites();
        
        if (currentQuote && currentQuote.id === quoteId) {
            updateFavoriteButton();
        }
    }

    function toggleFavorite() {
        if (!currentQuote) return;
        if (isFavorited(currentQuote.id)) {
            removeFavorite(currentQuote.id);
            showToast('Removed from favorites');
        } else {
            addFavorite(currentQuote);
            showToast('Added to favorites ❤️');
        }
        updateFavoriteButton();
    }

    
    function displayQuote(quote) {
        if (!quote) {
            els.quoteText.textContent = 'No quotes available for this category.';
            els.quoteAuthor.textContent = '';
            els.quoteGenre.textContent = '';
            return;
        }

        currentQuote = quote;
        els.quoteText.textContent = quote.text;
        els.quoteAuthor.textContent = quote.author || FALLBACK_AUTHOR;
        els.quoteGenre.textContent = quote.genre;
        updateFavoriteButton();
    }

    function showNewQuote() {
        if (isAnimating) return;
        isAnimating = true;

        const newQuote = getRandomQuote();

        
        els.btnNewQuote.classList.add('spinning');

        
        els.quoteCard.classList.add('fade-out');

        setTimeout(() => {
            displayQuote(newQuote);
            els.quoteCard.classList.remove('fade-out');
            els.quoteCard.classList.add('fade-in');

            setTimeout(() => {
                els.quoteCard.classList.remove('fade-in');
                els.btnNewQuote.classList.remove('spinning');
                isAnimating = false;
            }, 400);
        }, 300);
    }

    function updateFavoriteButton() {
        if (!currentQuote) return;
        const fav = isFavorited(currentQuote.id);
        els.btnFavorite.classList.toggle('favorited', fav);
        els.btnFavorite.setAttribute('title', fav ? 'Remove from favorites' : 'Add to favorites');
    }

    function updateFavBadge() {
        if (favorites.length > 0) {
            els.favBadge.classList.remove('hidden');
            els.favBadge.textContent = favorites.length;
        } else {
            els.favBadge.classList.add('hidden');
        }
    }

   
    function renderGenreFilters() {
        const genres = getGenres();
       
        genres.forEach(genre => {
            const chip = document.createElement('button');
            chip.className = 'genre-chip';
            chip.dataset.genre = genre;
            chip.textContent = genre;
            els.genreFilters.appendChild(chip);
        });
    }

    function setActiveGenre(genre) {
        currentGenre = genre;
        $$('.genre-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.genre === genre);
        });
        showNewQuote();
    }

    
    function renderFavorites() {
        if (favorites.length === 0) {
            els.favoritesEmpty.classList.remove('hidden');
            els.favoritesList.innerHTML = '';
            return;
        }

        els.favoritesEmpty.classList.add('hidden');
        els.favoritesList.innerHTML = favorites.map((fav, i) => `
            <div class="fav-card" style="animation-delay:${i * 0.05}s" data-id="${fav.id}">
                <button class="fav-remove" title="Remove" data-remove="${fav.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <p class="fav-quote">"${escapeHtml(fav.text)}"</p>
                <div class="fav-meta">
                    <span class="fav-author">— ${escapeHtml(fav.author || FALLBACK_AUTHOR)}</span>
                    <span class="fav-genre">${escapeHtml(fav.genre)}</span>
                </div>
            </div>
        `).join('');
    }

 
    function switchTab(tabName) {
        
        els.btnTabDiscover.classList.toggle('active', tabName === 'discover');
        els.btnTabFavorites.classList.toggle('active', tabName === 'favorites');

        
        els.tabDiscover.classList.toggle('active', tabName === 'discover');
        els.tabFavorites.classList.toggle('active', tabName === 'favorites');

        if (tabName === 'favorites') {
            renderFavorites();
        }
    }

    function copyQuote() {
        if (!currentQuote) return;
        const text = `"${currentQuote.text}" — ${currentQuote.author || FALLBACK_AUTHOR}`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copied to clipboard ✓');
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Copied to clipboard ✓');
    }

    function shareQuote() {
        if (!currentQuote) return;
        const text = `"${currentQuote.text}" — ${currentQuote.author || FALLBACK_AUTHOR}`;

        if (navigator.share) {
            navigator.share({
                title: 'QuoteFlow',
                text: text,
            }).catch(() => {});
        } else {
            copyQuote();
        }
    }

   
    let toastTimer;
    function showToast(message) {
        clearTimeout(toastTimer);
        els.toast.textContent = message;
        els.toast.classList.remove('hidden');
        requestAnimationFrame(() => els.toast.classList.add('visible'));
        toastTimer = setTimeout(() => {
            els.toast.classList.remove('visible');
            setTimeout(() => els.toast.classList.add('hidden'), 400);
        }, 2200);
    }

    
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

   
    function handleKeyboard(e) {
        switch (e.key) {
            case ' ':
            case 'Enter':
                if (document.activeElement === document.body) {
                    e.preventDefault();
                    showNewQuote();
                }
                break;
            case 'f':
            case 'F':
                if (document.activeElement === document.body) {
                    toggleFavorite();
                }
                break;
        }
    }

    
    function bindEvents() {
        
        els.btnNewQuote.addEventListener('click', showNewQuote);

        
        els.btnFavorite.addEventListener('click', toggleFavorite);

      
        els.btnCopy.addEventListener('click', copyQuote);
        els.btnShare.addEventListener('click', shareQuote);

        
        els.btnTabDiscover.addEventListener('click', () => switchTab('discover'));
        els.btnTabFavorites.addEventListener('click', () => switchTab('favorites'));

        
        els.genreFilters.addEventListener('click', (e) => {
            const chip = e.target.closest('.genre-chip');
            if (!chip) return;
            setActiveGenre(chip.dataset.genre);
        });

        
        els.favoritesList.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('[data-remove]');
            if (removeBtn) {
                const id = parseInt(removeBtn.dataset.remove);
                removeFavorite(id);
                showToast('Removed from favorites');
            }
        });

        
        document.addEventListener('keydown', handleKeyboard);
    }

    
    function registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(() => {});
        }
    }

    
    function init() {
        loadFavorites();
        renderGenreFilters();
        updateFavBadge();

        
        const firstQuote = getRandomQuote();
        displayQuote(firstQuote);

        bindEvents();
        registerSW();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
