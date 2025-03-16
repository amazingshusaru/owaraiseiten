document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロール
    const smoothScroll = function(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // ヘッダーボタンのスムーススクロール
    const headerButtons = document.querySelectorAll('.header-button');
    headerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId, 1000);
        });
    });

    // ページトップに戻るボタンの表示制御
    window.addEventListener('scroll', function() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    });

    // カード効果のアニメーション
    const comedianCards = document.querySelectorAll('.comedian-card');
    if (comedianCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        comedianCards.forEach(card => {
            observer.observe(card);
        });
    }
});
