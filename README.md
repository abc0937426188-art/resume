# 陳明渙 (Chen, Ming-Huan) - 個人履歷網站

這是一份現代化、高質感的個人履歷網站，依據真實個人背景量身打造。

## 網站特色
- **真實資料**：完整包含萬能科大企管系就讀經歷、治平高中畢業背景、家庭餐飲店經營實務，以及重機、鋼琴、高空跳傘、深度潛水等個人亮點。
- **保護個人隱私**：遵循求職標準與隱私防護，不公開涉及身體隱私之特徵。
- **現代響應式設計**：支援手機、平板與桌機無縫瀏覽，採用 Tailwind CSS 與 Lucide Icons。

## 本地預覽
使用任何靜態伺服器（例如 Python 內建 HTTP 伺服器）即可預覽：
```bash
python3 -m http.server 8000
```
然後在瀏覽器開啟 `http://localhost:8000`。

## 部署至 GitHub Pages
1. 在 GitHub 建立一個名為 `resume` 或 `<username>.github.io` 的儲存庫。
2. 將本地儲存庫推送至 GitHub：
   ```bash
   git remote add origin <你的 GitHub 儲存庫網址>
   git branch -M main
   git push -u origin main
   ```
3. 在 GitHub 儲存庫的 **Settings -> Pages** 中，將 Source 設定為 `Deploy from a branch`，選擇 `main` 分支並儲存即可！
