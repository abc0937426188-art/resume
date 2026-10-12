// Script for Chen Ming-Huan Resume Website

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile menu toggle
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
  // 膽小狗英雄 (Courage the Cowardly Dog) 互動邏輯
  // ============================================================
  const courageWidget = document.getElementById('courage-widget');
  const courageChar = document.getElementById('courage-char');
  const courageDialog = document.getElementById('courage-dialog');
  const courageText = document.getElementById('courage-dialog-text');
  const courageSweat = document.getElementById('courage-sweat');
  const courageToggleBtn = document.getElementById('courage-toggle-btn');
  const courageBadge = document.getElementById('courage-badge-text');

  // 英雄專屬經典台詞庫
  const courageQuotes = [
    '「嗚哇哇哇！雖然我很害怕... 但我會全力為明渙加油汪！」',
    '「天啊！上銀科技 3 年精修師！鏟花公差微米級比我的毛還細汪！」',
    '「企管專業 ＋ 餐飲實戰 ＋ 精修工藝 ＋ 鋼琴跳傘... 這履歷太神啦！」',
    '「（嚇到發抖）剛剛那是面試通知的電話聲嗎？！明渙快去接！」',
    '「為、為了明渙的職涯... 我英雄絕不退縮！汪汪！」',
    '「微米級精密組裝真的超強！我連一根骨頭都咬不平整說...」',
    '「你看！我今天特地把毛梳好，跟明渙的新版紫粉色主題搭成一套汪！」',
    '「好可怕好可怕～但明渙這麼優秀沉穩，合作一定沒問題的啦！」'
  ];

  let currentQuoteIndex = 0;
  let isMinimized = false;

  if (courageChar && courageText) {
    // 點擊英雄產生驚嚇彈跳與更新對話
    courageChar.addEventListener('click', (e) => {
      e.stopPropagation();

      // 觸發驚嚇跳躍動畫
      courageChar.classList.remove('courage-jump');
      void courageChar.offsetWidth; // 強制重繪
      courageChar.classList.add('courage-jump');

      // 觸發冒冷汗動畫
      if (courageSweat) {
        courageSweat.classList.remove('sweat-pop');
        void courageSweat.offsetWidth;
        courageSweat.classList.add('sweat-pop');
      }

      // 如果當前被收起，點擊時展開
      if (isMinimized && courageDialog) {
        isMinimized = false;
        courageDialog.classList.remove('hidden');
      }

      // 切換台詞
      currentQuoteIndex = (currentQuoteIndex + 1) % courageQuotes.length;
      courageText.textContent = courageQuotes[currentQuoteIndex];

      // 彈跳結束後移除 class
      setTimeout(() => {
        courageChar.classList.remove('courage-jump');
      }, 700);
    });
  }

  // 縮小 / 展開對話框
  if (courageToggleBtn && courageDialog) {
    courageToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isMinimized = !isMinimized;
      if (isMinimized) {
        courageDialog.classList.add('hidden');
        courageToggleBtn.setAttribute('title', '展開對話');
        if (courageBadge) courageBadge.textContent = '展開英雄對話';
      } else {
        courageDialog.classList.remove('hidden');
        courageToggleBtn.setAttribute('title', '收起對話');
        if (courageBadge) courageBadge.textContent = '點我互動';
      }
    });
  }
});
