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

      // 滑鼠移動時產生微小星塵軌跡 (Refined Platinum & Starlight Cyan Dust)
      if (Math.random() < 0.35 && stardusts.length < 35) {
        stardusts.push({
          x: mouse.x + (Math.random() * 20 - 10),
          y: mouse.y + (Math.random() * 20 - 10),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.8 + 0.8,
          alpha: 0.9,
          decay: Math.random() * 0.02 + 0.015,
          color: ['#38bdf8', '#7dd3fc', '#e2e8f0', '#fbbf24'][Math.floor(Math.random() * 4)]
        });
      }
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // 電影級深空星辰色彩池 (純白星、清冷天青、冷銀、天王藍、香檳鉑金)
    const starColors = [
      'rgba(255, 255, 255, ',   // Pure White
      'rgba(186, 230, 253, ',   // Cold Starlight Silver
      'rgba(56, 189, 248, ',    // Cyan Starlight
      'rgba(226, 232, 240, ',   // Platinum Stardust
      'rgba(96, 165, 250, ',    // Deep Starlight Blue
      'rgba(251, 191, 36, '     // Subtle Champagne Gold
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
  // 5.5 產業深度分析互動系統 (Industry Analysis Tab Switcher & Animated Counters)
  // ============================================================
  // 1. 分頁切換
  const industryTabBtns = document.querySelectorAll('.industry-tab-btn');
  const industryTabPanels = document.querySelectorAll('.industry-tab-panel');

  industryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playHoverBlip();
      const targetId = btn.getAttribute('data-tab');

      // 更新按鈕樣式
      industryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 切換內容面板
      industryTabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetId) {
          panel.classList.add('active');
        }
      });

      // 重新觸發圖標渲染
      if (window.lucide) window.lucide.createIcons();
    });
  });

  // 2. 數據跳動計數動畫 (Animated Number Counters)
  const statCounters = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    statCounters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 1600; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // 使用 easeOutQuart 減速效果
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = ease * target;

        counter.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = isDecimal ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // 監聽產業分析區塊進入可視區域
  const industrySection = document.getElementById('industry-analysis');
  if (industrySection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    counterObserver.observe(industrySection);
  } else {
    animateCounters();
  }

  // 3. 官方超連結音效回饋
  document.querySelectorAll('.source-card-hover').forEach(link => {
    link.addEventListener('mouseenter', () => playHoverBlip());
    link.addEventListener('click', () => playClickLaser());
  });

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
      combatScore.classList.add('text-cyan-300', 'animate-pulse');
    });
  }

  // ============================================================
  // 7. 電影級月球天文視差與光學動態 (Cinema Moon Parallax & Optical Dynamics)
  // ============================================================
  const moonAnchor = document.getElementById('cinema-moon-anchor');
  if (moonAnchor) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          // 平滑天文視差緩動 (Subtle astronomical parallax)
          const translateY = scrollY * 0.16;
          const rotate = scrollY * 0.006;
          moonAnchor.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================================
  // 8. 獨立輕量 AI 專案導覽助理 (Pure Frontend Cyber AI Navigator)
  // ============================================================
  
  // 專屬合成音效
  function playChatSendSound() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  function playChatReceiveSound() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      [659.25, 880].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.14);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.14);
      });
    } catch (e) {}
  }

  function playNavigateJumpSound() {
    initAudio();
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {}
  }

  // 專案知識庫與導覽定義 (Knowledge Base & Jump Definitions)
  const AI_PROJECT_KNOWLEDGE = [
    {
      id: 'hiwin',
      name: '上銀科技高精密傳動精修專案',
      keywords: ['上銀', 'hiwin', '精修', '螺桿', '滾珠螺桿', '滑軌', '線性滑軌', '剷花', '鏟花', '公差', '微米', '真直度', '千分錶', '平行度', '預壓', '工匠', '組配', '精密製造'],
      targetId: 'project-hiwin',
      actionTitle: '上銀科技 3年高精密精修實績',
      actionSubtitle: '微米級公差調校 × 手工鏟花 × 剛性平衡',
      icon: 'crosshair',
      color: 'cyan',
      response: `<strong>【上銀科技 (HIWIN) 3 年高精密精修師實戰】</strong><br><br>` +
        `📌 <strong>專案定位</strong>：全球傳動控制龍頭廠核心組件「微米級」品質守門人。<br>` +
        `⚙️ <strong>硬核工藝實績</strong>：<br>` +
        `• <strong>微米級幾何公差精修與手工鏟花 (Scraping)</strong>：精確掌握油膜微米級附著點分佈，達成超高剛性與極致滑順耐磨。<br>` +
        `• <strong>高精度光學與千分錶真直度量測</strong>：嚴格把關出廠公差，差一微米都不放行。<br>` +
        `• <strong>預壓平衡與異常排查</strong>：排除裝配阻抗、微異音與偏擺，大幅提升一次良品率。<br>` +
        `🏆 <strong>實戰價值</strong>：3 年高強度淬鍊出極致專注耐力與「品質零容忍」工匠敬業精神！`
    },
    {
      id: 'restaurant',
      name: '家庭餐飲第一線營運與高壓管理專案',
      keywords: ['餐廳', '餐飲', '營運', '管理', '現場', '客訴', '危機', '抗壓', '耗損', 'pos', '成本', '食材', '出餐', '高壓', '自營'],
      targetId: 'project-restaurant',
      actionTitle: '家庭餐廳經營 ｜ 第一線營運專案',
      actionSubtitle: '尖峰出餐調度 × 客訴危機化解 × 成本耗損控管',
      icon: 'store',
      color: 'pink',
      response: `<strong>【家庭餐廳經營 ｜ 第一線營運與客情維護】</strong><br><br>` +
        `📌 <strong>專案定位</strong>：長年自營餐飲事業現場前線全方位調度與成本控管。<br>` +
        `⚙️ <strong>實務管理亮點</strong>：<br>` +
        `• <strong>尖峰危機化解與客訴安撫</strong>：高壓快節奏下維持超高 EQ，見招拆招迅速安撫顧客。<br>` +
        `• <strong>原物料損耗與供應鏈盤點</strong>：每日精確掌控食材新鮮度、損耗率與進出貨成本。<br>` +
        `• <strong>POS 金流管理與對帳</strong>：營業額精準結算、報表產出，帳目絲毫不差。<br>` +
        `🏆 <strong>實戰價值</strong>：鍛造出「即使在極端高壓下也能保持微笑、把帳算清」的鋼鐵心臟與團隊協作力！`
    },
    {
      id: 'industry',
      name: '2026 傳動、機器人與半導體產業深度剖析',
      keywords: ['產業', '市場', '趨勢', '分析', '報告', '機器人', '半導體', 'cowos', 'efem', '晶圓', '關節', '行星滾柱螺桿', '研調', 'iek', 'ifr', 'tmba', 'semi', '自動化'],
      targetId: 'industry-analysis',
      actionTitle: '2026 產業深度剖析研調報告',
      actionSubtitle: '全球傳動產值 152B+ × 人形機器人行星滾柱螺桿 × CoWoS',
      icon: 'trending-up',
      color: 'cyan',
      response: `<strong>【2024–2026 傳動控制、機器人與半導體產業深度剖析】</strong><br><br>` +
        `📌 <strong>研調定位</strong>：結合第一線工匠手感 × 企管策略視野的權威研調報告。<br>` +
        `⚙️ <strong>權威數據與前瞻洞察</strong>：<br>` +
        `• <strong>全球線性傳動產值</strong>：2030E 預估達 152 億美元 (CAGR 7.2% 高速擴張)。<br>` +
        `• <strong>台灣戰略地位</strong>：滾珠螺桿全球第二大（僅次日本），HIWIN 居世界頂尖地位。<br>` +
        `• <strong>現役機器人存量</strong>：突破 428 萬台，台灣密度破 300 台/萬人（全球前十）。<br>` +
        `• <strong>千億級爆發新藍海</strong>：人形機器人「行星滾柱螺桿」關節 + CoWoS 先進封裝 EFEM 晶圓移載。<br>` +
        `🏆 <strong>實戰價值</strong>：引證工研院、IFR、SEMI 等官方數據，展現宏觀產業趨勢判讀力！`
    },
    {
      id: 'combat',
      name: '核心專業職能評估矩陣',
      keywords: ['能力', '專長', '指標', '戰力', '評估', '職能', 'matrix', '技能', '分數', '等級', '公差掌控', '平衡', '戰術'],
      targetId: 'combat-power',
      actionTitle: '核心專業職能指標評估矩陣',
      actionSubtitle: '微米工藝精密度 99.8% × 高壓耐受 99.9% × 預壓平衡',
      icon: 'activity',
      color: 'amber',
      response: `<strong>【核心專業職能評估 ｜ 戰術矩陣】</strong><br><br>` +
        `📌 <strong>綜合評核</strong>：卓越 (Distinguished) 頂級評比。<br>` +
        `⚙️ <strong>四大戰力指標</strong>：<br>` +
        `• <strong>微米工藝精密度</strong>：99.8%（幾何公差與油膜潤滑精修掌控）。<br>` +
        `• <strong>現場抗壓適應力</strong>：99.9%（餐飲尖峰淬鍊出的高壓耐受與危機應變）。<br>` +
        `• <strong>機械剛性與預壓平衡</strong>：頂級標準（深諳「適度預壓」物理精髓，確保長效平穩）。<br>` +
        `• <strong>極限心理素質</strong>：卓越等級（萬呎高空跳傘與 30 米潛水歷練的冷靜決策力）。`
    },
    {
      id: 'passions',
      name: '生活與極限探索（文武雙修）',
      keywords: ['生活', '興趣', '休閒', '跳傘', '潛水', '重機', '鋼琴', '文武雙修', '極限', '冒險', '膽量', '放鬆', '運動'],
      targetId: 'passions',
      actionTitle: '生活與極限探索展示區',
      actionSubtitle: '重機巡航 × 鋼琴演奏 × 萬呎跳傘 × 30米深潛',
      icon: 'compass',
      color: 'purple',
      response: `<strong>【文武雙修 ｜ 生活與極限探索】</strong><br><br>` +
        `📌 <strong>多元平衡哲學</strong>：動能突破極限，靜能沉穩專注。<br>` +
        `⚙️ <strong>四大核心生活面貌</strong>：<br>` +
        `• <strong>重型機車巡航</strong>：高速公路上的精確專注度與即時動態路況判斷。<br>` +
        `• <strong>鋼琴十指演奏</strong>：琴鍵上的細膩觸鍵，鍛鍊沉靜耐心與十指協調感。<br>` +
        `• <strong>萬呎高空跳傘</strong>：縱身一躍突破恐懼界線，連跳傘都不怕了，面對重大專案挑戰沉著無懼！<br>` +
        `• <strong>30 米深度潛水</strong>：置身深海鍛鍊呼吸節奏調節與極端情境抗壓！`
    },
    {
      id: 'education',
      name: '學歷背景與企管專業',
      keywords: ['學歷', '學校', '大學', '企管', '萬能', '科大', '治平', '高中', '科系', '管理學', '學位', '背景'],
      targetId: 'education',
      actionTitle: '學歷背景與企管專業展示區',
      actionSubtitle: '萬能科技大學 企業管理系 × 治平高級中學',
      icon: 'graduation-cap',
      color: 'cyan',
      response: `<strong>【學歷背景 ｜ 技術與商管跨界融合】</strong><br><br>` +
        `📌 <strong>學術培育歷程</strong>：<br>` +
        `• <strong>萬能科技大學 企業管理系 (BBA)</strong>：專攻策略管理、組織行為與數據成本分析。<br>` +
        `• <strong>治平高級中學</strong>：扎實人格品行與團隊紀律培育。<br>` +
        `🏆 <strong>整合優勢</strong>：打破傳統技術人員與管理階層的隔閡，兼備基層技術手藝與商管經營格局！`
    },
    {
      id: 'contact',
      name: '人才招募與面試聯絡',
      keywords: ['聯絡', '聯繫', 'mail', 'email', '信箱', '電話', '面試', '找人', '徵才', '招募', '就任', '工作', '合作', '聘用', '薪資'],
      targetId: 'contact',
      actionTitle: '人才招募與立即聯繫區',
      actionSubtitle: '專業實力完備 ｜ 隨時可就任 ｜ 歡迎預約面談',
      icon: 'mail',
      color: 'pink',
      response: `<strong>【人才招募 ｜ 立即與陳明渙聯繫】</strong><br><br>` +
        `📌 <strong>求職狀態</strong>：專業實力完備，隨時可就任！<br>` +
        `📬 <strong>官方聯繫管道</strong>：<br>` +
        `• <strong>電子信箱</strong>：<code>chen.minghuan.tw@gmail.com</code><br>` +
        `• <strong>聯絡洽詢</strong>：誠摯歡迎各界先進來信預約線上面試或到場面談！`
    },
    {
      id: 'about',
      name: '核心特質與戰術哲學',
      keywords: ['特質', '個性', '優勢', '核心特質', '哲學', '工匠手感', '大心臟', '專長特質'],
      targetId: 'about',
      actionTitle: '核心特質與戰術哲學展示區',
      actionSubtitle: '微米級專注 × 現場抗壓韌性 × 商管戰術腦',
      icon: 'award',
      color: 'purple',
      response: `<strong>【核心特質與戰術哲學 ｜ 三大核心競爭優勢】</strong><br><br>` +
        `• <strong>微米級專注與工匠手感</strong>：3 年上銀科技精修歷練，精通手工鏟花與微米級幾何公差檢驗。<br>` +
        `• <strong>現場第一線淬鍊出的抗壓韌性</strong>：深耕家庭餐飲第一線，鍛造笑著承受高壓的超凡團隊執行力。<br>` +
        `• <strong>商管戰術腦與大心臟思維</strong>：進修企管系，搭配鋼琴、重機、萬呎跳傘與深潛的冷靜決策力！`
    }
  ];

  // DOM 元素引用
  const aiToggleBtn = document.getElementById('ai-nav-toggle-btn');
  const aiBtnIconIdle = document.getElementById('ai-btn-icon-idle');
  const aiBtnIconActive = document.getElementById('ai-btn-icon-active');
  const aiWindow = document.getElementById('ai-nav-window');
  const aiCloseBtn = document.getElementById('ai-nav-close-btn');
  const aiTooltip = document.getElementById('ai-nav-tooltip');
  const aiTooltipClose = document.getElementById('ai-tooltip-close');
  const aiChatMessages = document.getElementById('ai-chat-messages');
  const aiTypingIndicator = document.getElementById('ai-typing-indicator');
  const aiChatForm = document.getElementById('ai-chat-form');
  const aiChatInput = document.getElementById('ai-chat-input');
  const aiSendBtn = document.getElementById('ai-send-btn');
  const aiResetBtn = document.getElementById('ai-reset-chat-btn');
  const aiSoundToggle = document.getElementById('ai-sound-toggle-btn');
  const aiSoundIcon = document.getElementById('ai-sound-icon');

  let isAiWindowOpen = false;
  let isAiThinking = false;
  let chatInitialized = false;

  // 浮動導覽達成提示 (Toast Notification)
  function showNavigationToast(title) {
    const toast = document.getElementById('ai-nav-toast');
    const toastText = document.getElementById('ai-nav-toast-text');
    if (toast && toastText) {
      toastText.textContent = `已鎖定並導覽至：${title}`;
      toast.classList.add('show');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 2800);
    }
  }

  // 快捷切換視窗
  function toggleAiWindow(show) {
    if (show === undefined) show = !isAiWindowOpen;
    isAiWindowOpen = show;

    if (isAiWindowOpen) {
      aiWindow.style.display = 'flex';
      aiBtnIconIdle.classList.add('hidden');
      aiBtnIconActive.classList.remove('hidden');
      if (aiTooltip) aiTooltip.classList.add('hidden');

      if (!chatInitialized) {
        initWelcomeMessage();
        chatInitialized = true;
      }
      setTimeout(() => {
        if (aiChatInput && window.innerWidth >= 640) aiChatInput.focus();
      }, 100);
      playClickLaser();
    } else {
      aiWindow.style.display = 'none';
      aiBtnIconIdle.classList.remove('hidden');
      aiBtnIconActive.classList.add('hidden');
    }
  }

  if (aiToggleBtn) {
    aiToggleBtn.addEventListener('click', () => toggleAiWindow());
  }

  if (aiCloseBtn) {
    aiCloseBtn.addEventListener('click', () => toggleAiWindow(false));
  }

  if (aiTooltip) {
    aiTooltip.addEventListener('click', (e) => {
      if (e.target !== aiTooltipClose) {
        toggleAiWindow(true);
      }
    });
  }

  if (aiTooltipClose) {
    aiTooltipClose.addEventListener('click', (e) => {
      e.stopPropagation();
      aiTooltip.style.display = 'none';
    });
  }

  // 獨立音效切換
  if (aiSoundToggle) {
    aiSoundToggle.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      updateSoundUI();
    });
  }

  function updateSoundUI() {
    if (aiSoundIcon) {
      if (soundEnabled) {
        aiSoundIcon.setAttribute('data-lucide', 'volume-2');
        aiSoundToggle.classList.add('text-cyan-300');
        aiSoundToggle.classList.remove('text-slate-500');
      } else {
        aiSoundIcon.setAttribute('data-lucide', 'volume-x');
        aiSoundToggle.classList.remove('text-cyan-300');
        aiSoundToggle.classList.add('text-slate-500');
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }

  // 重置對話
  if (aiResetBtn) {
    aiResetBtn.addEventListener('click', () => {
      playClickLaser();
      aiChatMessages.innerHTML = '';
      initWelcomeMessage();
    });
  }

  // 初始歡迎訊息
  function initWelcomeMessage() {
    const welcomeHTML = `
      <div class="ai-msg-anim flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 p-[1px] shrink-0">
          <div class="w-full h-full rounded-[7px] bg-[#090514] flex items-center justify-center text-cyan-300">
            <i data-lucide="bot" class="w-4 h-4"></i>
          </div>
        </div>
        <div class="flex-1 space-y-2">
          <div class="p-3.5 rounded-2xl rounded-tl-sm bg-[#130b28]/95 border border-purple-500/20 text-xs text-slate-200 leading-relaxed shadow-lg">
            👋 <strong>訪客您好！我是陳明渙的 AI 專案導覽員。</strong><br><br>
            我可以為您條理分明地解說各項<strong>核心專案、微米級精修實績、2026產業研調與實務經歷</strong>，並直接帶您<strong>精準跳轉到對應展示區</strong>！<br><br>
            您可以直接輸入問題，或點選下方快捷專案探索：
          </div>

          <div class="flex flex-wrap gap-1.5 pt-1">
            <button class="ai-quick-btn text-[11px] px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all shadow-sm" data-query="請介紹上銀科技精修專案與微米實績">
              🚀 上銀微米精修實績
            </button>
            <button class="ai-quick-btn text-[11px] px-2.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 hover:bg-purple-900/40 hover:border-purple-400 transition-all shadow-sm" data-query="請介紹2026產業深度剖析研調報告">
              📊 2026 產業研調趨勢
            </button>
            <button class="ai-quick-btn text-[11px] px-2.5 py-1 rounded-full bg-pink-950/70 border border-pink-500/40 text-pink-300 hover:bg-pink-900/40 hover:border-pink-400 transition-all shadow-sm" data-query="家庭餐廳經營與高壓營運專案">
              🏪 餐飲現場營運實務
            </button>
            <button class="ai-quick-btn text-[11px] px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 hover:bg-amber-900/40 hover:border-amber-400 transition-all shadow-sm" data-query="明渙有哪些核心專業戰力指標？">
              🎯 核心專業指標評估
            </button>
            <button class="ai-quick-btn text-[11px] px-2.5 py-1 rounded-full bg-sky-950/70 border border-sky-500/40 text-sky-300 hover:bg-sky-900/40 hover:border-sky-400 transition-all shadow-sm" data-query="請給我所有專案與經歷總覽">
              🗺️ 所有專案總覽
            </button>
          </div>
        </div>
      </div>
    `;
    aiChatMessages.innerHTML = welcomeHTML;
    bindQuickButtons();
    if (window.lucide) window.lucide.createIcons();
  }

  // 平滑跳轉至目標專案區塊 + 科技全息高亮聚焦脈衝
  function jumpToProjectSection(targetId, targetTitle) {
    const el = document.getElementById(targetId);
    if (!el) {
      console.warn('Target element not found:', targetId);
      return;
    }

    playNavigateJumpSound();

    // 1. 自動收合對話視窗，避免遮擋專案展示畫面
    toggleAiWindow(false);

    // 2. 顯示頂部全息導覽達成提示
    showNavigationToast(targetTitle || '專案展示區');

    // 3. 高精度多重相容平滑捲動 (Dual Smooth Scroll Engine)
    const headerOffset = 90;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });

    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {}

    // 4. 觸發醒目全息聚焦脈衝動畫 (Pulse Highlight)
    el.classList.remove('target-highlight-active');
    void el.offsetWidth; // 強制重繪
    el.classList.add('target-highlight-active');

    setTimeout(() => {
      el.classList.remove('target-highlight-active');
    }, 2800);
  }

  // 全域代理事件監聽 (確保任何動態生成的按鈕、導航列按鈕皆能秒回)
  document.addEventListener('click', (e) => {
    // 1. 導覽列與 Hero 的「專案導覽」主按鈕
    const navTrigger = e.target.closest('.nav-ai-trigger');
    if (navTrigger) {
      e.preventDefault();
      e.stopPropagation();
      toggleAiWindow(true);

      // 若手機版選單開啟中則自動收合
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
      playClickLaser();
      return;
    }

    // 2. 專案導覽直達跳轉按鈕 (.ai-jump-btn)
    const jumpBtn = e.target.closest('.ai-jump-btn');
    if (jumpBtn) {
      e.preventDefault();
      const targetId = jumpBtn.getAttribute('data-target');
      const title = jumpBtn.querySelector('.ai-jump-title')?.textContent?.trim() || '專案展示區';
      if (targetId) {
        jumpToProjectSection(targetId, title);
      }
      return;
    }

    // 3. 快捷提問膠囊按鈕 (.ai-quick-btn)
    const quickBtn = e.target.closest('.ai-quick-btn');
    if (quickBtn) {
      e.preventDefault();
      const query = quickBtn.getAttribute('data-query');
      if (query && !isAiThinking) {
        handleUserQuery(query);
      }
      return;
    }
  });

  // 處理使用者送出查詢
  if (aiChatForm) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = aiChatInput.value.trim();
      if (!query || isAiThinking) return;
      handleUserQuery(query);
    });
  }

  function handleUserQuery(userText) {
    if (!userText || isAiThinking) return;

    // 清空輸入框
    if (aiChatInput) aiChatInput.value = '';

    // 1. 渲染使用者訊息氣泡
    appendUserMessage(userText);
    playChatSendSound();

    // 2. 顯示 AI 思考中指示
    setThinking(true);

    // 3. 模擬真實 AI 思考延遲 (350ms ~ 550ms)
    setTimeout(() => {
      const result = matchKnowledge(userText);
      setThinking(false);
      renderAiStreamingResponse(result);
    }, 450);
  }

  // 渲染使用者訊息
  function appendUserMessage(text) {
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'ai-msg-anim flex justify-end';
    userMsgDiv.innerHTML = `
      <div class="max-w-[85%] p-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-purple-600 to-pink-600 text-xs sm:text-sm text-white font-medium shadow-md shadow-purple-950/40">
        ${escapeHTML(text)}
      </div>
    `;
    aiChatMessages.appendChild(userMsgDiv);
    scrollChatToBottom();
  }

  // 思考狀態控制
  function setThinking(thinking) {
    isAiThinking = thinking;
    if (aiTypingIndicator) {
      if (thinking) {
        aiTypingIndicator.classList.remove('hidden');
        aiTypingIndicator.classList.add('flex');
      } else {
        aiTypingIndicator.classList.add('hidden');
        aiTypingIndicator.classList.remove('flex');
      }
    }
    if (aiSendBtn) aiSendBtn.disabled = thinking;
    scrollChatToBottom();
  }

  // 滾動到底部
  function scrollChatToBottom() {
    if (aiChatMessages) {
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }
  }

  // 智能意圖與關鍵字比對引擎 (Rule-based & Multi-Keyword Matching)
  function matchKnowledge(query) {
    const q = query.toLowerCase().replace(/[？?！!，,。.\s]/g, '');

    // 總覽與歡迎比對
    if (/全部|所有|專案有哪些|經歷有哪些|作品集|你是誰|自我介紹|導覽/.test(q)) {
      return {
        matched: true,
        item: null,
        isOverview: true,
        text: `<strong>【陳明渙 ｜ 個人專案與核心歷練總覽】</strong><br><br>` +
          `陳明渙擁有<strong>「微米精密工藝」</strong>、<strong>「現場商管營運」</strong>與<strong>「產業深度研調」</strong>三大硬實力：<br><br>` +
          `1. <strong>上銀科技 3年高精密精修實績</strong>：微米幾何公差檢驗、手工鏟花、傳動元件異常調校。<br>` +
          `2. <strong>家庭餐廳第一線營運管理</strong>：尖峰高壓調度、客訴危機處理、原物料耗損與金流把關。<br>` +
          `3. <strong>2026 傳動、機器人與半導體產業剖析</strong>：引證工研院/IFR官方數據之深度研調報告。<br>` +
          `4. <strong>文武雙修生活極限探索</strong>：重機巡航、鋼琴十指演奏、萬呎跳傘與30米深潛。<br><br>` +
          `請點擊下方專屬按鈕，為您直接飛往各展示區：`,
        multiActions: [
          { targetId: 'project-hiwin', title: '🚀 上銀科技 3年高精密精修實績', subtitle: '微米工藝 × 滾珠螺桿' },
          { targetId: 'industry-analysis', title: '📊 2026 產業深度剖析研調報告', subtitle: '152B+ 美元產值 × 機器人' },
          { targetId: 'project-restaurant', title: '🏪 家庭餐廳第一線營運專案', subtitle: '尖峰調度 × 高抗壓情商' },
          { targetId: 'combat-power', title: '🎯 核心專業指標評估矩陣', subtitle: '99.8% 工藝精密度' }
        ]
      };
    }

    // 逐一計算權重命中
    let bestMatch = null;
    let maxScore = 0;

    for (const item of AI_PROJECT_KNOWLEDGE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (q.includes(kw.toLowerCase())) {
          score += (kw.length >= 3 ? 3 : 2);
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && maxScore > 0) {
      return {
        matched: true,
        item: bestMatch,
        text: bestMatch.response,
        action: {
          targetId: bestMatch.targetId,
          title: bestMatch.actionTitle,
          subtitle: bestMatch.actionSubtitle,
          icon: bestMatch.icon || 'arrow-right'
        }
      };
    }

    // 兜底回覆 (Fallback with smart suggestions)
    return {
      matched: false,
      text: `您詢問的重點非常具有洞察力！陳明渙的核心專長橫跨<strong>「上銀科技微米精修」</strong>、<strong>「家庭餐飲現場高壓營運」</strong>、<strong>「2026 機器人與傳動產業研調」</strong>與<strong>「文武雙修生活探索」</strong>。<br><br>` +
        `請問您最想深入探索哪一項專案實績呢？您可以點選下方按鈕直接導覽：`,
      multiActions: [
        { targetId: 'project-hiwin', title: '🚀 探索：上銀高精密傳動實績', subtitle: '微米公差與工匠鏟花' },
        { targetId: 'industry-analysis', title: '📊 探索：2026 產業趨勢研調', subtitle: '機器人與半導體動態' },
        { targetId: 'contact', title: '💼 預約面談：人才招募聯繫', subtitle: '隨時可就任' }
      ]
    };
  }

  // 模擬真實 AI 串流打字動效 (Streaming Typing Effect)
  function renderAiStreamingResponse(result) {
    playChatReceiveSound();

    const botMsgContainer = document.createElement('div');
    botMsgContainer.className = 'ai-msg-anim flex items-start gap-2.5';

    const avatarHTML = `
      <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 p-[1px] shrink-0 mt-0.5">
        <div class="w-full h-full rounded-[7px] bg-[#090514] flex items-center justify-center text-cyan-300">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
      </div>
    `;

    const contentBox = document.createElement('div');
    contentBox.className = 'flex-1 space-y-2';

    const textBubble = document.createElement('div');
    textBubble.className = 'p-3.5 rounded-2xl rounded-tl-sm bg-[#130b28]/95 border border-cyan-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg cursor-pointer';
    textBubble.setAttribute('title', '點擊可跳過打字動效直接顯示全文');

    contentBox.appendChild(textBubble);
    botMsgContainer.innerHTML = avatarHTML;
    botMsgContainer.appendChild(contentBox);
    aiChatMessages.appendChild(botMsgContainer);
    if (window.lucide) window.lucide.createIcons();

    const fullHTML = result.text;
    let charIndex = 0;
    let isSkipped = false;

    // 點擊訊息框可立即跳過打字動效
    function skipTyping() {
      isSkipped = true;
      textBubble.removeEventListener('click', skipTyping);
    }
    textBubble.addEventListener('click', skipTyping);

    // 平滑逐字/標籤串流輸出
    const typeSpeed = 16; // 毫秒/步
    const timer = setInterval(() => {
      if (isSkipped || charIndex >= fullHTML.length) {
        clearInterval(timer);
        textBubble.innerHTML = fullHTML;
        textBubble.removeEventListener('click', skipTyping);
        appendActionButtons(contentBox, result);
        scrollChatToBottom();
        return;
      }

      // 若遇到 HTML 標籤，一口氣跳過標籤以維持 DOM 完整性
      if (fullHTML[charIndex] === '<') {
        const tagEnd = fullHTML.indexOf('>', charIndex);
        if (tagEnd !== -1) {
          charIndex = tagEnd + 1;
        } else {
          charIndex++;
        }
      } else {
        charIndex++;
      }

      textBubble.innerHTML = fullHTML.substring(0, charIndex) + '<span class="ai-typing-cursor">▍</span>';
      scrollChatToBottom();
    }, typeSpeed);
  }

  // 附加精美專案跳轉按鈕 (Project Deep-Link Jump Cards)
  function appendActionButtons(container, result) {
    if (result.action) {
      // 單一跳轉按鈕
      const actionDiv = document.createElement('div');
      actionDiv.className = 'pt-1.5 animate-in fade-in duration-300';
      actionDiv.innerHTML = `
        <button 
          class="ai-jump-btn w-full group relative flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-purple-950/70 to-[#0c081e] border border-cyan-500/40 hover:border-cyan-300 shadow-lg shadow-cyan-950/50 hover:shadow-cyan-400/20 transition-all duration-300 text-left active:scale-[0.98]"
          data-target="${result.action.targetId}"
        >
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform shrink-0">
              <i data-lucide="${result.action.icon || 'external-link'}" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-[10px] text-cyan-300 font-bold flex items-center gap-1.5">
                <span>專案導覽直達</span>
                <span class="text-[8px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-200 uppercase tracking-wider">SMOOTH JUMP</span>
              </div>
              <div class="ai-jump-title text-xs sm:text-sm font-black text-white group-hover:text-cyan-200 transition-colors">
                ${result.action.title}
              </div>
              <div class="text-[10px] text-slate-400 line-clamp-1">
                ${result.action.subtitle}
              </div>
            </div>
          </div>
          <div class="flex items-center text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
            <span class="text-[11px] font-bold mr-1 hidden sm:inline">立即跳轉</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </div>
        </button>
      `;
      container.appendChild(actionDiv);
    } else if (result.multiActions && result.multiActions.length > 0) {
      // 多重導覽跳轉卡片群
      const multiDiv = document.createElement('div');
      multiDiv.className = 'pt-1.5 space-y-1.5 animate-in fade-in duration-300';
      result.multiActions.forEach(act => {
        const btn = document.createElement('button');
        btn.className = 'ai-jump-btn w-full group flex items-center justify-between p-2.5 rounded-xl bg-[#110926]/90 border border-purple-500/30 hover:border-cyan-400 shadow-md hover:shadow-cyan-500/20 transition-all text-left active:scale-[0.98]';
        btn.setAttribute('data-target', act.targetId);
        btn.innerHTML = `
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:text-cyan-300 group-hover:scale-105 transition-all shrink-0">
              <i data-lucide="navigation" class="w-3.5 h-3.5"></i>
            </div>
            <div>
              <div class="ai-jump-title text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">
                ${act.title}
              </div>
              <div class="text-[10px] text-slate-400">
                ${act.subtitle}
              </div>
            </div>
          </div>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"></i>
        `;
        multiDiv.appendChild(btn);
      });
      container.appendChild(multiDiv);
    }

    if (window.lucide) window.lucide.createIcons();
    scrollChatToBottom();
  }

  // HTML 特殊字元防注入跳脫
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
