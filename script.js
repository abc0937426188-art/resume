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
});
