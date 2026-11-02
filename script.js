// Script for Chen Ming-Huan Resume Website (Blue, Purple & Pink Harmonious Theme)

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ============================================================
  // 1. Mobile Menu Toggle
  // ============================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ============================================================
  // 2. Dynamic Ambient Particle Canvas (藍、紫、粉流動星塵粒子)
  // ============================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const colors = [
      'rgba(59, 130, 246, ',   // Blue
      'rgba(147, 51, 234, ',   // Purple
      'rgba(236, 72, 153, ',   // Pink
      'rgba(99, 102, 241, '    // Indigo
    ];

    const particleCount = Math.min(Math.floor(width / 32), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.45 + 0.2
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.fill();

        // 鄰近粒子微弱連線效果
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ============================================================
  // 3. Scroll Reveal Animations (平滑滾動進場特效)
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // 若不支援 observer 則直接顯示
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // ============================================================
  // 4. 台灣最強迷因 (Taiwan Top Meme) 互動夥伴「聽話！讓我看看！」
  // ============================================================
  const memeChar = document.getElementById('meme-char');
  const memeDialog = document.getElementById('meme-dialog');
  const memeText = document.getElementById('meme-dialog-text');
  const memeToggleBtn = document.getElementById('meme-toggle-btn');
  const memeNextBtn = document.getElementById('meme-next-btn');
  const memeBadge = document.getElementById('meme-badge-text');
  const memeContainer = document.getElementById('meme-widget');

  // 台灣最紅迷因經典神句庫（融合陳明渙真實經歷）
  const memeQuotes = [
    { tag: '杰哥經典', text: '「聽話！讓我看看！...哎唷，你這份履歷蠻勇的嘛！」' },
    { tag: '亞洲統神', text: '「太神啦！上銀科技 3 年微米級精修 ＋ 企管系，真的太神啦！」' },
    { tag: '杰哥名言', text: '「我看你是完全不懂喔？人家還會彈鋼琴、高空跳傘跟深度潛水欸！」' },
    { tag: '水母歸剛欸', text: '「歸剛欸！人資主管看履歷看歸剛欸，看到這份眼睛都亮起來了！」' },
    { tag: '杰哥邀請', text: '「（推眼鏡閃光✨）我家還蠻大的，歡迎帶這份履歷來面試，有吃又有喝！」' },
    { tag: '九天玄女', text: '「800英呎！500英呎！降落！降落！九天玄女唯一指定神級人才！」' },
    { tag: '統神絕技', text: '「一代一代一代！這手工鏟花微米級公差，比我的鏡片還平整！」' },
    { tag: '杰哥不要', text: '「杰哥不要... 不要再猶豫了，快點聯絡明渙安排面試啦！」' },
    { tag: '山道猴子', text: '「莫忘初衷！重機騎士的熱血魂，做工程也是全力以赴過彎！」' },
    { tag: '超派鐵拳', text: '「超派！餐飲實戰 ＋ 企業管理 ＋ 精密工藝，這種綜合戰力真的超派！」' },
    { tag: '杰哥認可', text: '「登大人啦！能吃苦、懂管理、會修微米級元件，這才是真男人！」' },
    { tag: '統神哭啊', text: '「哭啊！這麼優秀全面的人才去哪裡找？還不快點寄信預約面試！」' }
  ];

  // 點擊爆出之漫畫特效字
  const comicWords = [
    '💥 太神啦！',
    '👉 讓我看看！',
    '🔥 歸剛欸！',
    '💯 蠻勇的喔！',
    '🚀 降落降落！',
    '⚡ 一代一代！',
    '✨ 莫忘初衷！',
    '🥊 超派！',
    '👏 登大人！'
  ];

  let currentQuoteIndex = 0;
  let isMinimized = false;

  // 點擊噴發漂浮漫畫特效字動畫
  function spawnComicBurst(e) {
    if (!memeContainer) return;

    const word = comicWords[Math.floor(Math.random() * comicWords.length)];
    const tag = document.createElement('div');
    tag.className = 'comic-burst-tag text-xs sm:text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/40 border border-white/40';
    tag.textContent = word;

    // 隨機角度與位置
    const rotStart = (Math.random() * 24 - 12) + 'deg';
    const rotMid = (Math.random() * 20 - 10) + 'deg';
    const rotEnd = (Math.random() * 30 - 15) + 'deg';
    tag.style.setProperty('--rot-start', rotStart);
    tag.style.setProperty('--rot-mid', rotMid);
    tag.style.setProperty('--rot-end', rotEnd);

    tag.style.right = (Math.random() * 50 + 20) + 'px';
    tag.style.bottom = (Math.random() * 40 + 70) + 'px';

    memeContainer.appendChild(tag);

    setTimeout(() => {
      tag.remove();
    }, 1200);
  }

  // 切換至下一句台詞
  function triggerNextQuote(e) {
    if (e) e.stopPropagation();

    // 觸發角色彈跳動作
    if (memeChar) {
      memeChar.classList.remove('meme-action');
      void memeChar.offsetWidth; // 強制重繪
      memeChar.classList.add('meme-action');
      setTimeout(() => memeChar.classList.remove('meme-action'), 700);
    }

    // 產生爆出文字特效
    spawnComicBurst(e);

    // 切換語錄
    currentQuoteIndex = (currentQuoteIndex + 1) % memeQuotes.length;
    const current = memeQuotes[currentQuoteIndex];

    if (memeText) {
      memeText.style.opacity = '0';
      setTimeout(() => {
        memeText.textContent = current.text;
        memeText.style.opacity = '1';
      }, 150);
    }

    // 更新標籤名
    const memeTagEl = document.getElementById('meme-tag-label');
    if (memeTagEl) {
      memeTagEl.textContent = current.tag;
    }

    // 若被收起則展開
    if (isMinimized && memeDialog) {
      isMinimized = false;
      memeDialog.classList.remove('hidden');
      if (memeBadge) memeBadge.textContent = '點我互動 👆';
    }
  }

  // 綁定角色點擊
  if (memeChar) {
    memeChar.addEventListener('click', triggerNextQuote);
  }

  // 綁定「下一句」按鈕
  if (memeNextBtn) {
    memeNextBtn.addEventListener('click', triggerNextQuote);
  }

  // 綁定收起 / 展開按鈕
  if (memeToggleBtn && memeDialog) {
    memeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isMinimized = !isMinimized;
      if (isMinimized) {
        memeDialog.classList.add('hidden');
        memeToggleBtn.setAttribute('title', '展開對話');
        if (memeBadge) memeBadge.textContent = '聽話！點我互動 👆';
      } else {
        memeDialog.classList.remove('hidden');
        memeToggleBtn.setAttribute('title', '收起對話');
        if (memeBadge) memeBadge.textContent = '點我互動 👆';
      }
    });
  }
});
