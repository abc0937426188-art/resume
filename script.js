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

  // 播放能量破表超強和弦 (Power Up Chord)
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
  // 3. 頂級深空宇宙引擎 (Deep Cosmic Universe Engine)
  //    - 璀璨星空微粒 (多層次 3D 視差星辰與星等閃爍)
  //    - 浩瀚星網連線 (Constellation Stellar Filaments)
  //    - 宇宙流星雨系統 (Periodic Shooting Stars / Meteors)
  //    - 滑鼠引力波星塵 (Gravitational Stardust Trails)
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

      // 滑鼠移動時產生微小星塵軌跡
      if (Math.random() < 0.35 && stardusts.length < 35) {
        stardusts.push({
          x: mouse.x + (Math.random() * 20 - 10),
          y: mouse.y + (Math.random() * 20 - 10),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.8 + 0.8,
          alpha: 0.9,
          decay: Math.random() * 0.02 + 0.015,
          color: ['#00f0ff', '#a855f7', '#ff007f', '#fbbf24'][Math.floor(Math.random() * 4)]
        });
      }
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // 宇宙星辰色彩池 (超亮星、白矮星、青藍星、紫星、粉星、金星)
    const starColors = [
      'rgba(255, 255, 255, ',   // Pure White
      'rgba(0, 240, 255, ',     // Electric Cyan
      'rgba(168, 85, 247, ',    // Cosmic Violet
      'rgba(255, 0, 127, ',     // Hot Magenta
      'rgba(96, 165, 250, ',    // Deep Blue
      'rgba(251, 191, 36, '     // Cosmic Gold
    ];

    // 生成多層星辰 (120~180 顆星)
    const starCount = Math.min(Math.floor(width / 11), 160);
    const stars = Array.from({ length: starCount }, () => {
      const layer = Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3; // 1:遠景微星, 2:中景星, 3:近景亮星
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.15 * layer),
        vy: (Math.random() - 0.5) * (0.15 * layer),
        radius: layer === 1 ? Math.random() * 0.9 + 0.5 : layer === 2 ? Math.random() * 1.5 + 1.0 : Math.random() * 2.5 + 1.6,
        layer: layer,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2
      };
    });

    // 流星系統 (Shooting Stars / Meteors)
    const meteors = [];
    let lastMeteorTime = Date.now();

    function spawnMeteor() {
      const startX = Math.random() * width * 1.2;
      const startY = Math.random() * (height * 0.4);
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // 45度斜向下劃過
      const speed = Math.random() * 7 + 9;
      const length = Math.random() * 90 + 70;

      meteors.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: length,
        alpha: 1.0,
        thickness: Math.random() * 2 + 1.2,
        color: Math.random() > 0.5 ? '#00f0ff' : '#ff007f'
      });
    }

    // 滑鼠微星塵陣列
    const stardusts = [];

    function renderCosmicUniverse() {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      // 隨機流星生成 (每 3~5 秒有機會掉落流星)
      if (now - lastMeteorTime > 3200 && Math.random() < 0.35 && meteors.length < 3) {
        spawnMeteor();
        lastMeteorTime = now;
      }

      // 1. 繪製並更新星辰
      stars.forEach((star, i) => {
        star.x += star.vx;
        star.y += star.vy;

        // 循環穿梭邊界
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // 滑鼠引力擾動
        if (mouse.active) {
          const mdx = mouse.x - star.x;
          const mdy = mouse.y - star.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < 130) {
            star.x += (mdx / dist) * 0.8;
            star.y += (mdy / dist) * 0.8;
          }
        }

        // 閃爍呼吸計算
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.15, Math.min(1.0, star.baseAlpha + Math.sin(star.twinklePhase) * 0.35));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha})`;
        ctx.shadowBlur = star.layer === 3 ? 12 : 5;
        ctx.shadowColor = `${star.color}0.9)`;
        ctx.fill();

        // 近景亮星的四芒星尖銳光芒 (Cross Glint)
        if (star.layer === 3 && currentAlpha > 0.65) {
          ctx.strokeStyle = `${star.color}${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 3, star.y);
          ctx.lineTo(star.x + star.radius * 3, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 3);
          ctx.lineTo(star.x, star.y + star.radius * 3);
          ctx.stroke();
        }

        // 星座星網微弱連線 (近中景星)
        if (star.layer >= 2) {
          for (let j = i + 1; j < stars.length; j++) {
            const s2 = stars[j];
            if (s2.layer >= 2) {
              const dx = star.x - s2.x;
              const dy = star.y - s2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 105) {
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(s2.x, s2.y);
                ctx.strokeStyle = `rgba(168, 85, 247, ${0.14 * (1 - dist / 105)})`;
                ctx.lineWidth = 0.55;
                ctx.stroke();
              }
            }
          }
        }
      });

      // 2. 繪製並更新流星 (Shooting Stars)
      for (let m = meteors.length - 1; m >= 0; m--) {
        const meteor = meteors[m];
        meteor.x += meteor.dx;
        meteor.y += meteor.dy;
        meteor.alpha -= 0.016;

        if (meteor.alpha <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
          meteors.splice(m, 1);
          continue;
        }

        // 流星漸層拖尾 (Gradient Trail)
        const tailX = meteor.x - (meteor.dx / Math.sqrt(meteor.dx * meteor.dx + meteor.dy * meteor.dy)) * meteor.length;
        const tailY = meteor.y - (meteor.dy / Math.sqrt(meteor.dx * meteor.dx + meteor.dy * meteor.dy)) * meteor.length;

        const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(0.6, `${meteor.color === '#00f0ff' ? 'rgba(0, 240, 255, ' : 'rgba(255, 0, 127, '}${meteor.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${meteor.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = meteor.thickness;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 14;
        ctx.shadowColor = meteor.color;
        ctx.stroke();

        // 流星頭部亮點
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.thickness * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.alpha})`;
        ctx.fill();
      }

      // 3. 繪製並更新滑鼠星塵 (Mouse Stardust)
      for (let s = stardusts.length - 1; s >= 0; s--) {
        const dust = stardusts[s];
        dust.x += dust.vx;
        dust.y += dust.vy;
        dust.alpha -= dust.decay;

        if (dust.alpha <= 0) {
          stardusts.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.radius, 0, Math.PI * 2);
        ctx.fillStyle = dust.color;
        ctx.globalAlpha = dust.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = dust.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      requestAnimationFrame(renderCosmicUniverse);
    }

    renderCosmicUniverse();
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
  // 6. 專業指標爆表彩蛋 (Max Competency Blast Easter Egg)
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

      combatScore.textContent = 'MAX (卓越超群)';
      combatScore.classList.add('text-yellow-300', 'animate-pulse');

      // 噴發彩色光點標籤
      for (let i = 0; i < 15; i++) {
        setTimeout(() => spawnMemeComicTag('⚡ 專業評核 MAX！'), i * 35);
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
      tag: '餐飲現場實戰',
      text: '「在家庭餐廳被各路客訴跟高壓節奏磨練多年，早就練成笑著承受一切的鋼鐵抗壓體質。要多耐操有多耐操！」'
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
      tag: '超派硬實力',
      text: '「超派！兼具實幹工匠的硬功夫，又有企管系的成本刀法，這種神級性價比，錄取下去直接超派！」'
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
    '💎 頂級核心人才！'
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
});
