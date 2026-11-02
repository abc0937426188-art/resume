// ============================================================
// 陳明渙 (Chen, Ming-Huan) 頂級奢華賽博龐克履歷互動腳本
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化 Lucide 圖標
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ============================================================
  // 2. Web Audio API 原生合成音效系統 (零外部依賴，秒開高科技音效)
  // ============================================================
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // 播放高科技輕微滴答聲 (Hover Blip)
  function playHoverBlip() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  }

  // 播放能量按鈕雷射音 (Click Laser)
  function playClickLaser() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  }

  // 播放迷因彈跳歡樂音 (Meme Boing & Jump)
  function playMemeSound() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  // 播放戰鬥力爆表超強和弦 (Power Up Chord)
  function playPowerUpChord() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggio
      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const startTime = audioCtx.currentTime + idx * 0.06;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {}
  }

  // 音效開關按鈕控制
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      if (soundToggleBtn) {
        soundToggleBtn.setAttribute('title', soundEnabled ? '音效已開啟 (點擊靜音)' : '音效已靜音 (點擊開啟)');
      }
      if (soundIcon) {
        soundIcon.setAttribute('data-lucide', soundEnabled ? 'volume-2' : 'volume-x');
        if (window.lucide) window.lucide.createIcons();
      }
      if (soundEnabled) playClickLaser();
    });
  }

  // 手機漢堡選單切換
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      playClickLaser();
      mobileMenu.classList.toggle('hidden');
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ============================================================
  // 3. 賽博龐克微粒星塵 Canvas (支援滑鼠吸引與流光動態)
  // ============================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -1000, y: -1000, active: false };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    const colors = [
      'rgba(0, 240, 255, ',    // Cyan
      'rgba(59, 130, 246, ',   // Blue
      'rgba(168, 85, 247, ',   // Purple
      'rgba(255, 0, 127, ',    // Pink / Magenta
      'rgba(251, 191, 36, '    // Gold / Amber
    ];

    const particleCount = Math.min(Math.floor(width / 24), 55);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.25
    }));

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // 邊界循環
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // 滑鼠微弱排斥/吸引效應
        if (mouse.active) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            p.x -= (mdx / mdist) * 1.5;
            p.y -= (mdy / mdist) * 1.5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `${p.color}0.9)`;
        ctx.fill();

        // 鄰近微粒連結
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.16 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // ============================================================
  // 4. 科技聚光燈卡片 (Spotlight Card Mouse Following Effect)
  // ============================================================
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseenter', () => {
      playHoverBlip();
    });
  });

  // ============================================================
  // 5. 滾動進場特效 (Scroll Reveal via IntersectionObserver)
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ============================================================
  // 6. 戰鬥力狂飆按鈕 (Combat Power Blast Easter Egg)
  // ============================================================
  const combatTriggerBtn = document.getElementById('combat-trigger-btn');
  const combatScore = document.getElementById('combat-score-text');
  if (combatTriggerBtn && combatScore) {
    combatTriggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playPowerUpChord();

      // 觸發全螢幕震撼
      document.body.classList.remove('screen-shake-anim');
      void document.body.offsetWidth;
      document.body.classList.add('screen-shake-anim');

      combatScore.textContent = '99999+ (破表！)';
      combatScore.classList.add('text-yellow-300', 'animate-pulse');

      // 噴發金幣彩色光點
      for (let i = 0; i < 15; i++) {
        setTimeout(() => spawnMemeComicTag('⚡ 戰鬥力破表！'), i * 35);
      }
    });
  }

  // ============================================================
  // 7. 台灣最強迷因互動引擎 (黑色幽默 × 雙關黃腔 × 專業硬核)
  // ============================================================
  const memeChar = document.getElementById('meme-char');
  const memeDialog = document.getElementById('meme-dialog');
  const memeText = document.getElementById('meme-dialog-text');
  const memeToggleBtn = document.getElementById('meme-toggle-btn');
  const memeNextBtn = document.getElementById('meme-next-btn');
  const memeBadge = document.getElementById('meme-badge-text');
  const memeContainer = document.getElementById('meme-widget');
  const memeTagLabel = document.getElementById('meme-tag-label');

  // 既搞笑又有梗、黑色幽默、雙關名句庫（句句扣緊明渙的真實專業技能）
  const memeQuotes = [
    {
      tag: '杰哥深入視察',
      text: '「聽話！讓我看看你的履歷！...嘶！這微米級公差也太硬了吧！我常幫助一些缺工的企業，我家還蠻大的，來我這面試！」'
    },
    {
      tag: '亞洲統神咆哮',
      text: '「太神啦！上銀科技 3 年天天在磨！這手速跟手感早就練到出神入化了！我就問一句，到底要不要發 Offer 啦！」'
    },
    {
      tag: '老司機雙關調校',
      text: '「老闆，你懂什麼叫『適度預壓』嗎？太緊會磨壞，太鬆會晃動～明渙調得剛剛好，又硬又滑順，運轉一整天都不發熱！」'
    },
    {
      tag: '水母歸剛欸',
      text: '「歸剛欸！每天看那些灌水吹牛的履歷看歸剛欸！看到明渙這份微米級真功夫，直接登大人啦！」'
    },
    {
      tag: '黑色幽默警告',
      text: '「連萬呎高空跳傘跟深海三十米窒息感我都挺過來了，你那點專案 Deadline 跟主管咆哮，連讓我心跳加速都做不到。」'
    },
    {
      tag: '鋼琴靈活十指',
      text: '「能彈蕭邦德布西的靈活手指，拿來微米級鏟花組裝，手速與力道深淺自如... 面試官你到底在想什麼？我說的是機械手感！」'
    },
    {
      tag: '九天玄女降落',
      text: '「800英呎！500英呎！降落！降落！九天玄女唯一指定神級人才！只要你敢發 Offer，明渙直接空降帶飛全公司！」'
    },
    {
      tag: '餐飲修羅場',
      text: '「在家庭餐廳被暴走奧客跟油煙火海折磨多年，早就練成笑著承受一切的抖M抗壓體質。要多耐操有多耐操！」'
    },
    {
      tag: '山道防禦駕駛',
      text: '「重機跑山只講技術，不當山道猴子。彎得過去是拓海，安全回家是男神；在職場上也是絕不翻車的穩健老司機！」'
    },
    {
      tag: '杰哥終極告白',
      text: '「杰哥不要... 不要再猶豫了！這麼耐磨耐操、懂企管又會微米級手藝的男人，全台灣打著燈籠都找不到了！」'
    },
    {
      tag: '超派戰鬥力',
      text: '「超派！兼具勞工階級的實幹硬功夫，又有企管系的成本刀法，這種神級性價比，錄取下去直接超派！」'
    },
    {
      tag: '統神絕望哭啊',
      text: '「哭啊！面試官你今天要是沒把握住他，下週就被台積電或外商高薪挖走了，到時候你別躲在茶水間哭啊！」'
    }
  ];

  // 噴射漫畫標籤
  const comicWords = [
    '💥 太神啦！',
    '👉 讓我看看！',
    '🔥 歸剛欸！',
    '💯 太硬了吧！',
    '🚀 降落降落！',
    '⚡ 微米級神手！',
    '✨ 登大人啦！',
    '🥊 超派！',
    '💋 又硬又滑順！',
    '🎹 靈活十指！',
    '🏍️ 絕不翻車！',
    '💎 SSR神角！'
  ];

  let currentQuoteIndex = 0;
  let isMinimized = false;

  // 產生浮誇漫畫特效字
  function spawnMemeComicTag(customWord) {
    if (!memeContainer) return;
    const word = customWord || comicWords[Math.floor(Math.random() * comicWords.length)];

    const tag = document.createElement('div');
    tag.className = 'comic-burst-tag text-xs sm:text-sm px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white border-2 border-white/60 shadow-2xl';
    tag.textContent = word;

    const rotStart = (Math.random() * 30 - 15) + 'deg';
    const rotMid = (Math.random() * 24 - 12) + 'deg';
    const rotEnd = (Math.random() * 36 - 18) + 'deg';
    tag.style.setProperty('--rot-start', rotStart);
    tag.style.setProperty('--rot-mid', rotMid);
    tag.style.setProperty('--rot-end', rotEnd);

    tag.style.right = (Math.random() * 60 + 15) + 'px';
    tag.style.bottom = (Math.random() * 50 + 75) + 'px';

    memeContainer.appendChild(tag);
    setTimeout(() => tag.remove(), 1300);
  }

  // 切換迷因台詞與觸發爆破特效
  function triggerMemeEvent(e) {
    if (e) e.stopPropagation();

    // 播放迷因專屬音效
    playMemeSound();

    // 角色魔性跳躍衝擊
    if (memeChar) {
      memeChar.classList.remove('meme-action-explosive');
      void memeChar.offsetWidth;
      memeChar.classList.add('meme-action-explosive');
      setTimeout(() => memeChar.classList.remove('meme-action-explosive'), 750);
    }

    // 噴出 2~3 個爆笑漫畫字
    spawnMemeComicTag();
    setTimeout(() => spawnMemeComicTag(), 80);

    // 切換語錄
    currentQuoteIndex = (currentQuoteIndex + 1) % memeQuotes.length;
    const current = memeQuotes[currentQuoteIndex];

    if (memeText) {
      memeText.style.opacity = '0';
      memeText.style.transform = 'translateY(4px)';
      setTimeout(() => {
        memeText.textContent = current.text;
        memeText.style.opacity = '1';
        memeText.style.transform = 'translateY(0)';
      }, 120);
    }

    if (memeTagLabel) {
      memeTagLabel.textContent = current.tag;
    }

    // 展開對話框
    if (isMinimized && memeDialog) {
      isMinimized = false;
      memeDialog.classList.remove('hidden');
      if (memeBadge) memeBadge.textContent = '聽話！點我互動 👆';
    }
  }

  if (memeChar) memeChar.addEventListener('click', triggerMemeEvent);
  if (memeNextBtn) memeNextBtn.addEventListener('click', triggerMemeEvent);

  if (memeToggleBtn && memeDialog) {
    memeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playClickLaser();
      isMinimized = !isMinimized;
      if (isMinimized) {
        memeDialog.classList.add('hidden');
        memeToggleBtn.setAttribute('title', '展開對話');
        if (memeBadge) memeBadge.textContent = '聽話！點我互動 👆';
      } else {
        memeDialog.classList.remove('hidden');
        memeToggleBtn.setAttribute('title', '收起對話');
        if (memeBadge) memeBadge.textContent = '聽話！點我互動 👆';
      }
    });
  }

  // ============================================================
  // 8. 賽博街機小遊戲：【微米手速修羅場 ｜ 抓 Offer & 虐奧客街機賽】
  // ============================================================
  const arcadeOverlay = document.getElementById('arcade-overlay');
  const arcadeStartView = document.getElementById('arcade-start-view');
  const arcadeResultView = document.getElementById('arcade-result-view');
  const arcadeStartBtn = document.getElementById('arcade-start-btn');
  const arcadeReplayBtn = document.getElementById('arcade-replay-btn');
  const arcadeCurrentScoreEl = document.getElementById('arcade-current-score');
  const arcadeTimerEl = document.getElementById('arcade-timer');
  const arcadeComboNumEl = document.getElementById('arcade-combo-num');
  const arcadeHighScoreEl = document.getElementById('arcade-high-score');
  const arcadeFinalScoreEl = document.getElementById('arcade-final-score');
  const arcadeRankTitleEl = document.getElementById('arcade-rank-title');
  const arcadeRankCommentEl = document.getElementById('arcade-rank-comment');

  const arcadeSlots = Array.from({ length: 9 }, (_, i) => document.getElementById(`slot-${i}`));

  // 讀取歷史最高紀錄
  let arcadeHighScore = parseInt(localStorage.getItem('chen_arcade_highscore') || '0', 10);
  if (arcadeHighScoreEl) arcadeHighScoreEl.textContent = arcadeHighScore;

  let isGameActive = false;
  let gameScore = 0;
  let gameTime = 30;
  let gameCombo = 0;
  let gameCountdownTimer = null;
  let gameSpawnerTimer = null;
  const activeTargets = {}; // 追蹤每個 slot 的目標狀態與計時器

  // 音效合成：命中正分
  function playGameHitSound() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.08); // B5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch(e) {}
  }

  // 音效合成：命中陷阱 (扣分)
  function playGameTrapSound() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(75, now + 0.18);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch(e) {}
  }

  // 音效合成：遊戲結束
  function playGameOverSound() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      chords.forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const t = audioCtx.currentTime + i * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.45);
      });
    } catch(e) {}
  }

  // 目標池設定 (符合明渙背景與爆笑迷因)
  const targetTypes = [
    { type: 'offer', name: 'Offer 錄取通知', icon: '🎯', points: 100, isTrap: false, border: 'border-cyan-400', tag: '+100 錄取啦！' },
    { type: 'screw', name: '上銀微米螺桿', icon: '🔧', points: 60, isTrap: false, border: 'border-pink-400', tag: '+60 又硬又滑順！' },
    { type: 'jiege', name: '杰哥加持', icon: '👓', points: 150, isTrap: false, border: 'border-amber-400', tag: '+150 讓我看看！' },
    { type: 'piano', name: '靈活鋼琴鍵', icon: '🎹', points: 50, isTrap: false, border: 'border-purple-400', tag: '+50 手速爆發！' },
    { type: 'parachute', name: '萬呎跳傘', icon: '🪂', points: 70, isTrap: false, border: 'border-blue-400', tag: '+70 降落！' },
    { type: 'bike', name: '防禦重機', icon: '🏍️', points: 40, isTrap: false, border: 'border-teal-400', tag: '+40 絕不翻車！' },
    { type: 'karen', name: '暴走奧客', icon: '🦹', points: -50, isTrap: true, border: 'border-red-500', tag: '-50 奧客退散！' },
    { type: 'boss', name: '慣老闆畫大餅', icon: '💀', points: -80, isTrap: true, border: 'border-rose-600', tag: '-80 快逃啊！' }
  ];

  // 浮動得分文字顯示
  function spawnFloatingScore(slotEl, text, isTrap) {
    const floatEl = document.createElement('div');
    floatEl.className = `float-score-tag text-xs sm:text-sm px-2.5 py-1 rounded-full border shadow-xl ${
      isTrap
        ? 'bg-red-600/90 text-white border-red-300'
        : 'bg-gradient-to-r from-cyan-400 to-pink-500 text-white border-white/60'
    }`;
    floatEl.textContent = text;
    slotEl.appendChild(floatEl);
    setTimeout(() => floatEl.remove(), 950);
  }

  // 開始遊戲
  function startArcadeGame() {
    playClickLaser();
    isGameActive = true;
    gameScore = 0;
    gameTime = 30;
    gameCombo = 0;

    if (arcadeCurrentScoreEl) arcadeCurrentScoreEl.textContent = '0';
    if (arcadeTimerEl) {
      arcadeTimerEl.textContent = '30s';
      arcadeTimerEl.classList.remove('timer-danger');
    }
    if (arcadeComboNumEl) arcadeComboNumEl.textContent = '0';

    if (arcadeOverlay) arcadeOverlay.classList.add('hidden');
    if (arcadeStartView) arcadeStartView.classList.remove('hidden');
    if (arcadeResultView) arcadeResultView.classList.add('hidden');

    // 清理所有 slot
    arcadeSlots.forEach((slot, idx) => {
      clearSlot(idx);
    });

    // 啟動倒數計時器
    gameCountdownTimer = setInterval(() => {
      gameTime--;
      if (arcadeTimerEl) {
        arcadeTimerEl.textContent = `${gameTime}s`;
        if (gameTime <= 6) {
          arcadeTimerEl.classList.add('timer-danger');
        }
      }

      if (gameTime <= 0) {
        endArcadeGame();
      }
    }, 1000);

    // 啟動地鼠目標生成器
    spawnTargetLoop();
  }

  // 清除單一 slot
  function clearSlot(index) {
    const slotEl = arcadeSlots[index];
    if (slotEl) {
      slotEl.innerHTML = '';
      slotEl.classList.remove('slot-hit-pos', 'slot-hit-neg');
    }
    if (activeTargets[index] && activeTargets[index].timer) {
      clearTimeout(activeTargets[index].timer);
    }
    delete activeTargets[index];
  }

  // 目標隨機生成循環
  function spawnTargetLoop() {
    if (!isGameActive) return;

    // 尋找當前空置的 slot
    const emptyIndices = [];
    for (let i = 0; i < 9; i++) {
      if (!activeTargets[i]) emptyIndices.push(i);
    }

    if (emptyIndices.length > 0) {
      // 隨機選 1 ~ 2 個 slot
      const count = Math.min(emptyIndices.length, Math.random() > 0.4 ? 2 : 1);
      for (let c = 0; c < count; c++) {
        if (emptyIndices.length === 0) break;
        const randPos = Math.floor(Math.random() * emptyIndices.length);
        const slotIdx = emptyIndices.splice(randPos, 1)[0];
        spawnTargetAt(slotIdx);
      }
    }

    // 隨時間遞減生成間隔 (提升手速難度)
    const nextInterval = Math.max(450, 750 - (30 - gameTime) * 10);
    gameSpawnerTimer = setTimeout(spawnTargetLoop, nextInterval);
  }

  // 在指定 slot 生成目標
  function spawnTargetAt(slotIndex) {
    const slotEl = arcadeSlots[slotIndex];
    if (!slotEl) return;

    // 決定目標種類 (75% 正面, 25% 陷阱)
    const isTrap = Math.random() < 0.25;
    let target;
    if (isTrap) {
      const traps = targetTypes.filter(t => t.isTrap);
      target = traps[Math.floor(Math.random() * traps.length)];
    } else {
      const goods = targetTypes.filter(t => !t.isTrap);
      target = goods[Math.floor(Math.random() * goods.length)];
    }

    // 生成 DOM
    const targetEl = document.createElement('div');
    targetEl.className = `arcade-target-active w-full h-full flex flex-col items-center justify-center p-2 rounded-2xl border-2 ${target.border} bg-[#160b2e]/90 shadow-lg`;
    targetEl.innerHTML = `
      <div class="text-3xl sm:text-4xl filter drop-shadow-md">${target.icon}</div>
      <div class="text-[10px] sm:text-xs font-black text-white mt-1 text-center truncate max-w-full">${target.name}</div>
      <div class="text-[9px] font-bold ${target.isTrap ? 'text-red-400' : 'text-cyan-300'}">${target.points > 0 ? '+' + target.points : target.points}</div>
    `;

    slotEl.innerHTML = '';
    slotEl.appendChild(targetEl);

    // 設定停留時間 (800ms ~ 1200ms)
    const lifetime = Math.max(700, 1100 - (30 - gameTime) * 12);
    const timer = setTimeout(() => {
      clearSlot(slotIndex);
    }, lifetime);

    activeTargets[slotIndex] = {
      target,
      timer
    };
  }

  // 處理 Slot 點擊 / 觸控
  function handleSlotHit(slotIndex) {
    if (!isGameActive) return;

    const slotEl = arcadeSlots[slotIndex];
    const data = activeTargets[slotIndex];

    if (!data || !slotEl) return;

    const { target } = data;

    // 清除該 slot 計時器，避免重複點擊
    clearTimeout(data.timer);
    delete activeTargets[slotIndex];

    if (target.isTrap) {
      // 命中陷阱
      playGameTrapSound();
      gameCombo = 0; // 斷連擊
      gameScore = Math.max(0, gameScore + target.points);

      slotEl.classList.add('slot-hit-neg');
      spawnFloatingScore(slotEl, target.tag, true);

      // 觸發全畫面微震
      document.body.classList.remove('screen-shake-anim');
      void document.body.offsetWidth;
      document.body.classList.add('screen-shake-anim');
    } else {
      // 命中正面目標
      playGameHitSound();
      gameCombo++;

      // 連擊倍率計算
      let multiplier = 1.0;
      if (gameCombo >= 15) multiplier = 2.0;
      else if (gameCombo >= 10) multiplier = 1.5;
      else if (gameCombo >= 5) multiplier = 1.2;

      const earnedPoints = Math.round(target.points * multiplier);
      gameScore += earnedPoints;

      slotEl.classList.add('slot-hit-pos');
      spawnFloatingScore(slotEl, `${target.tag} (${earnedPoints})`, false);
    }

    // 更新 HUD
    if (arcadeCurrentScoreEl) arcadeCurrentScoreEl.textContent = gameScore;
    if (arcadeComboNumEl) arcadeComboNumEl.textContent = gameCombo;

    // 稍後清空 DOM
    setTimeout(() => {
      slotEl.innerHTML = '';
      slotEl.classList.remove('slot-hit-pos', 'slot-hit-neg');
    }, 200);
  }

  // 綁定所有 slot 點擊事件
  arcadeSlots.forEach((slot, index) => {
    if (slot) {
      slot.addEventListener('click', (e) => {
        e.preventDefault();
        handleSlotHit(index);
      });
      slot.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleSlotHit(index);
      }, { passive: false });
    }
  });

  // 結束遊戲並結算
  function endArcadeGame() {
    isGameActive = false;
    clearInterval(gameCountdownTimer);
    clearTimeout(gameSpawnerTimer);

    // 清理所有 slot
    arcadeSlots.forEach((_, idx) => clearSlot(idx));

    playGameOverSound();

    // 更新歷史最高分
    if (gameScore > arcadeHighScore) {
      arcadeHighScore = gameScore;
      localStorage.setItem('chen_arcade_highscore', arcadeHighScore.toString());
      if (arcadeHighScoreEl) arcadeHighScoreEl.textContent = arcadeHighScore;
    }

    // 計算評級稱號與點評
    let rankTitle = '';
    let rankComment = '';

    if (gameScore >= 2500) {
      rankTitle = '【SSR 傳說神之手 ｜ 獵頭搶破頭】';
      rankComment = '「太神啦！你這份手速蠻勇的喔！30秒內鏟花、端盤、甩奧客樣樣精通，明渙直接把履歷交給你，明天直接來報到！」';
    } else if (gameScore >= 1500) {
      rankTitle = '【微米級手速大師 ｜ 頂級工匠】';
      rankComment = '「超派！這手速已經超越 95% 的人資與工程師！上銀科技 3 年的微米精修與餐飲修羅場被你玩得出神入化！」';
    } else if (gameScore >= 800) {
      rankTitle = '【資深精修師 ｜ 穩健熟手】';
      rankComment = '「很穩喔！懂得適度預壓、閃避奧客，如果手速再快一點，你也能在高空跳傘時空中組裝滾珠螺桿了！」';
    } else {
      rankTitle = '【實習修羅 ｜ 潛力無窮】';
      rankComment = '「我看你是完全不懂喔？剛才是不是被奧客或慣老闆抓到了？別灰心，再戰一局，拿出微米級的專注力！」';
    }

    if (arcadeFinalScoreEl) arcadeFinalScoreEl.textContent = `${gameScore} 分`;
    if (arcadeRankTitleEl) arcadeRankTitleEl.textContent = rankTitle;
    if (arcadeRankCommentEl) arcadeRankCommentEl.textContent = rankComment;

    if (arcadeOverlay) arcadeOverlay.classList.remove('hidden');
    if (arcadeStartView) arcadeStartView.classList.add('hidden');
    if (arcadeResultView) arcadeResultView.classList.remove('hidden');
  }

  // 綁定開始與重玩按鈕
  if (arcadeStartBtn) arcadeStartBtn.addEventListener('click', startArcadeGame);
  if (arcadeReplayBtn) arcadeReplayBtn.addEventListener('click', startArcadeGame);
});
