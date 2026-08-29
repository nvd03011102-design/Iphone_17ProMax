// iPhone 17 Pro Max Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Color Selector Logic
  const colorDots = document.querySelectorAll('.color-dot');
  const currentColorLabel = document.getElementById('selected-color-name');
  const heroVisual = document.querySelector('.hero-visual');

  const colorData = {
    'cosmic-orange': {
      name: 'Cosmic Orange (Cam Vũ Trụ)',
      glow: 'rgba(255, 107, 53, 0.35)'
    },
    'deep-blue': {
      name: 'Deep Titanium Blue (Xanh Titan Đậm)',
      glow: 'rgba(41, 151, 255, 0.35)'
    },
    'silver': {
      name: 'Silver Frost (Bạc Ánh Kim)',
      glow: 'rgba(240, 240, 255, 0.35)'
    },
    'natural-titanium': {
      name: 'Natural Titanium (Titan Tự Nhiên)',
      glow: 'rgba(216, 200, 184, 0.35)'
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
          heroVisual.style.boxShadow = `0 20px 80px rgba(0, 0, 0, 0.8), 0 0 50px ${colorData[colorKey].glow}`;
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
        priceDisplay.style.transform = 'translateY(10px)';
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

  // 4. Scroll Reveal Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
