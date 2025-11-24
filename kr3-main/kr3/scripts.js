// Управление модальными окнами
let previousActiveElement;

function openModal() {
    const modal = document.getElementById('modal');
    const overlay = document.querySelector('.overlay');
    const success = document.getElementById('success');
    
    // Запоминаем активный элемент
    previousActiveElement = document.activeElement;
    
    // Показываем элементы
    modal.style.display = 'block';
    overlay.style.display = 'block';
    success.style.display = 'block';
    
    // Скрываем основной контент от скринридера
    document.querySelectorAll('main > *').forEach(el => {
        el.setAttribute('aria-hidden', 'true');
    });
    
    // Фокусируемся на модалке
    modal.focus();
    
    // Добавляем обработчик Escape
    document.addEventListener('keydown', handleEscape);
}

function closeModal() {
    const modal = document.getElementById('modal');
    const overlay = document.querySelector('.overlay');
    const success = document.getElementById('success');
    
    // Скрываем элементы
    modal.style.display = 'none';
    overlay.style.display = 'none';
    success.style.display = 'none';
    
    // Возвращаем видимость основному контенту
    document.querySelectorAll('[aria-hidden="true"]').forEach(el => {
        el.removeAttribute('aria-hidden');
    });
    
    // Возвращаем фокус
    if (previousActiveElement) {
        previousActiveElement.focus();
    }
    
    // Убираем обработчик
    document.removeEventListener('keydown', handleEscape);
}

function handleEscape(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Захват фокуса внутри модалки
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                if (focusableElements.length === 0) return;
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
    
    // Валидация формы контактов
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            
            // Простая валидация имени
            if (!nameInput.value.trim()) {
                nameInput.setAttribute('aria-invalid', 'true');
                nameError.hidden = false;
                isValid = false;
            } else {
                nameInput.setAttribute('aria-invalid', 'false');
                nameError.hidden = true;
            }
            
            if (isValid) {
                // Здесь можно добавить отправку формы
                alert('Форма успешно отправлена!');
                contactForm.reset();
            }
        });
    }
});

// Полифиллы для старых браузеров
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
// Добавить эти функции в существующий scripts.js

// Инициализация страницы "О нас"
function initAboutPage() {
    // Добавляем обработчики для карточек команды
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                member.click();
            }
        });
    });

    // Добавляем ленивую загрузку для изображений команды
    const teamImages = document.querySelectorAll('.member-photo img');
    teamImages.forEach(img => {
        img.loading = 'lazy';
    });
}

// Обновить существующую функцию DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Существующий код...
    
    // Инициализация страницы "О нас"
    if (document.querySelector('.about-section')) {
        initAboutPage();
    }
    
    // Существующий код для модальных окон и форм...
});