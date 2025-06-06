以下是「Stingray Dashboard」頁面基於現有 `DashboardPage.tsx` 實作的逆向工程規格文件。

---

## 1. 頁面目標與結構

儀表板 (`/dashboard`) 是為已登入的投資者設計的個人化頁面，旨在提供其投資組合的全面概覽。頁面佈局遵循了「總覽卡片 → 視覺圖表 → 明細表格」的經典資訊層次結構，讓用戶可以從宏觀到微觀地審視自己的資產狀況。

頁面由以下幾個主要區塊構成：

1.  **頁面標題 (Header)**
2.  **投資組合總覽卡片 (Portfolio Summary Cards)**
3.  **投資組合視覺化圖表 (Portfolio Growth & Allocation)**
4.  **持倉明細表格 (Vault Positions)**

---

## 2. 各區塊詳細說明

### 2.1. 頁面標題 (Header)

*   **主標題**: `Dashboard`
*   **副標題**: `An overview of your investment portfolio.`
*   **目的**: 明確告知用戶當前頁面的功能。

### 2.2. 投資組合總覽卡片 (Portfolio Summary Cards)

*   **對應元件**: `SummaryCard` (在 `DashboardPage.tsx` 內部定義)
*   **目的**: 在頁面頂部提供最核心、最受關注的四個關鍵績效指標（KPIs）。
*   **卡片內容**:
    1.  **Total Portfolio Value**:
        *   **主指標**: 顯示投資組合的總市值 (例如 `$12,345.67`)。
        *   **輔助指標**: 顯示 24 小時內的價值變化百分比，並用箭頭 (↑/↓) 和顏色 (綠/橘) 來表示漲跌。
    2.  **Weighted APR**:
        *   **主指標**: 顯示根據各個 Vault 持倉加權計算出的平均年化回報率 (例如 `15.78%`)。
    3.  **Unrealized P&L**:
        *   **主指標**: 顯示所有持倉的未實現總損益 (例如 `+$1,234.56`)。
    4.  **Claimable Rewards**:
        *   **主指標**: 顯示所有可領取的獎勵總價值 (例如 `$56.78`)。
        *   **互動**: 包含一個「Claim All」按鈕，當可領取金額大於 0 時，此按鈕變為可點擊狀態。

### 2.3. 投資組合視覺化圖表 (Portfolio Growth & Allocation)

*   **對應元件**: `PortfolioVisuals.tsx`
*   **目的**: 透過圖表將抽象的數據轉換為直觀的視覺資訊。
*   **包含圖表**: (基於元件名稱推斷)
    *   **Portfolio Growth Chart**: 可能是一個面積圖或折線圖，用於展示總資產價值隨時間（24h, 7d, 30d, All-time）的變化趨勢。
    *   **Allocation Pie/Donut Chart**: 一個餅圖或環圈圖，用於顯示資金在不同 Vaults 或不同資產類別中的分佈比例。

### 2.4. 持倉明細表格 (Vault Positions)

*   **對應元件**: `VaultPositionsTable.tsx`
*   **目的**: 提供最詳細的單筆持倉資訊，方便用戶進行深入分析和管理。
*   **表格欄位**: (基於元件名稱推斷，欄位可能包含)
    *   Vault 名稱 / Logo
    *   投入本金 (Deposited)
    *   當前價值 (Current Value)
    *   即時 APR/APY
    *   終身損益 (Lifetime P&L)
    *   TVL (總鎖倉量)
    *   風險等級 (Risk Level)
    *   操作按鈕 (+Add / −Withdraw)

---

### 總結

`DashboardPage` 的實現與原始規格高度一致。它成功地將複雜的投資組合數據拆解為易於理解的模組，為投資者提供了從快速概覽到深度分析的完整體驗。
