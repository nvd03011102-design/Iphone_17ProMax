// iPhone 17 Pro Max Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Color Selector Logic
  const colorDots = document.querySelectorAll('.color-dot');
  const currentColorLabel = document.getElementById('selected-color-name');
  const heroVisual = document.getElementById('hero-visual-card');
  const mainImg = document.getElementById('main-product-img');

  const colorData = {
    'cosmic-orange': {
      name: 'Cosmic Orange (Cam Vũ Trụ)',
      glow: 'rgba(232, 100, 39, 0.55)',
      scale: 'scale(1.05)',
      origin: 'center center'
    },
    'silver': {
      name: 'Silver (Bạc Ánh Kim)',
      glow: 'rgba(240, 240, 255, 0.45)',
      scale: 'scale(1.05)',
      origin: 'left center'
    },
    'deep-blue': {
      name: 'Deep Blue (Xanh Titan Đậm)',
      glow: 'rgba(42, 60, 80, 0.75)',
      scale: 'scale(1.05)',
      origin: 'right center'
    }
  };

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const colorKey = dot.dataset.color;
      if (colorData[colorKey]) {
        if (currentColorLabel) {
          currentColorLabel.textContent = colorData[colorKey].name;
        }
        if (heroVisual) {
          heroVisual.style.boxShadow = `0 30px 100px rgba(0, 0, 0, 0.9), 0 0 60px ${colorData[colorKey].glow}`;
        }
        if (mainImg) {
          mainImg.style.transformOrigin = colorData[colorKey].origin;
          mainImg.style.transform = colorData[colorKey].scale;
          setTimeout(() => {
            mainImg.style.transform = 'scale(1)';
          }, 350);
        }
      }
    });
  });

  // 2. Storage & Price Selector Logic
  const storageBtns = document.querySelectorAll('.storage-btn');
  const priceDisplay = document.getElementById('main-price-display');

  const prices = {
    '256GB': '34.990.000₫',
    '512GB': '39.990.000₫',
    '1TB': '46.990.000₫',
    '2TB': '54.990.000₫'
  };

  storageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      storageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const storage = btn.dataset.storage;
      if (prices[storage] && priceDisplay) {
        priceDisplay.style.opacity = '0';
        priceDisplay.style.transform = 'translateY(8px)';
        setTimeout(() => {
          priceDisplay.textContent = prices[storage];
          priceDisplay.style.opacity = '1';
          priceDisplay.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });

  // 3. Pre-order Toast Notification
  const preorderBtn = document.getElementById('btn-preorder');
  const toast = document.getElementById('cart-toast');

  if (preorderBtn && toast) {
    preorderBtn.addEventListener('click', () => {
      const activeColor = document.querySelector('.color-dot.active')?.dataset.color || 'cosmic-orange';
      const activeStorage = document.querySelector('.storage-btn.active')?.dataset.storage || '256GB';
      const colorName = colorData[activeColor]?.name.split(' (')[0] || 'Cosmic Orange';

      const toastMessage = document.getElementById('toast-msg');
      if (toastMessage) {
        toastMessage.textContent = `Đã thêm iPhone 17 Pro Max (${colorName} - ${activeStorage}) vào giỏ hàng!`;
      }

      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    });
  }

  // 4. Scroll Reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.bento-card, .spec-item, .config-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
