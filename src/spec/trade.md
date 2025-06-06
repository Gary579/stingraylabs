以下是「Stingray Trade Page」基於現有 `TradePage.tsx` 實作的逆向工程規格文件。這份文件描述的是一個整合了多種 DeFi 功能的統一操作介面，主要視角為**投資者或基金管理者**。

---

## 1. 頁面目標與結構

Trade 頁面 (`/trade`) 是協議的核心操作中心，它將多個不同協議的功能整合到一個統一的介面中。用戶（基金管理者）可以在此頁面選擇一個他正在管理的 Vault，並對該 Vault 內的資產執行一系列複雜的 DeFi 操作。

頁面結構分為兩大部分：

1.  **頂部總覽區 (Header & Snapshot)**
2.  **主要操作區 (Operations)**

---

## 2. 各區塊詳細說明

### 2.1. 頂部總覽區

*   **頁面標題**: 「Trade」，清晰明瞭。
*   **Vault 選擇器 (`VaultSelector`)**: 頁面右上角的一個下拉選單，允許用戶在他們管理的多個 Vault 之間切換。選定後，頁面所有數據應對應更新。
*   **總覽數據卡片 (`SnapshotCard`)**:
    *   在標題下方橫向排列四張卡片，提供所選 Vault 的即時快照。
    *   **卡片內容**:
        1.  **Current Value**: 顯示當前總價值，並附帶一個迷你圖表展示價值變化趨勢。
        2.  **Unrealized P&L**: 顯示未實現損益，同樣配有 P&L 趨勢圖。
        3.  **Avg. APR**: 顯示平均年化回報率，配有 APR 趨勢圖。
        4.  **Allocation**: 以一個多彩的進度條和圖例，視覺化展示資產在不同類別（如 Spot, Lend, LP, Perps）中的分配比例。

### 2.2. 主要操作區

此區塊的核心是一個**頁籤系統 (`OperationTabs`)**，將不同的 DeFi 功能分門別類。

#### 2.2.1. Swap (交換)

*   **對應元件**: `SwapContent`
*   **功能**: 提供一個標準的代幣交換介面。
*   **佈局**:
    *   **左側/中心**: 包含「Pay」（支付）和「Receive」（接收）兩個輸入框，用戶可以選擇代幣、輸入數量。中間有一個交換按鈕，可以快速對調兩種代幣。
    *   **右側 (`TokenWalletPanel`)**: 一個可收合的側邊欄，標題為「Tokens」，列出了用戶錢包中所有可用代幣及其餘額。點擊列表中的任一項目，可以將其快速設定為「Pay」的代幣。此面板與交換元件組會保持整體置中。

#### 2.2.2. Lending (借貸)

*   **對應元件**: `LendingContent`
*   **功能**: 展示用戶在各大借貸協議中的資產狀況。
*   **內容**:
    *   **Supplied Assets**: 一個表格，列出所有已存入（供應）的資產，包含欄位：`Asset`, `Balance`, `APY`, `Protocol`，並提供 `Withdraw` 按鈕。
    *   **Borrowed Assets**: 一個表格，列出所有已借出的資產，包含欄位：`Asset`, `Debt`, `APY`, `Protocol`, `Health Factor`，並提供 `Repay` 按鈕。

#### 2.2.3. LP & Staking (流動性與質押)

*   **對應元件**: `LpStakingContent`
*   **功能**: 管理流動性池 (LP) 倉位和相關獎勵。
*   **內容**:
    *   以卡片形式展示每個 LP 倉位，卡片上顯示：交易對 (`Pool`)、所屬協議 (`Protocol`)、投資金額 (`Amount`)、年化回報率 (`APR`) 以及未領取的獎勵 (`Rewards`)。
    *   每張卡片上都有「Claim Rewards」按鈕，頁面底部還有一個「Claim All Rewards & Unstake」的全域操作按鈕。

#### 2.2.4. Perps & Options (永續合約與期權)

*   **對應元件**: `PerpsOptionsContent`
*   **功能**: 用於進行衍生品交易。
*   **佈局**:
    *   **左側**: 一個簡化的「Order Form」（下單表單），包含市場選擇、槓桿、金額等輸入欄位。
    *   **右側**: 一個「Open Positions」（當前倉位）表格，顯示所有未平倉的合約，包含欄位：`Market`, `Side`, `Size`, `Entry Price`, `Mark Price`, `Unrealized PNL`。

#### 2.2.5. History (歷史紀錄)

*   **對應元件**: `HistoryContent`
*   **功能**: 彙總顯示用戶的所有歷史交易。
*   **內容**: 一個詳細的表格，列出每一筆交易的 `Type`, `Asset`, `Amount`, `Time`, `Status`，並提供一個連結到對應區塊鏈瀏覽器的 `Tx` Hash。

#### 2.2.6. Notifications (通知)

*   **對應元件**: `NotificationsPanel`
*   **功能**: 顯示重要的帳戶警示。
*   **內容**: 以醒目的卡片形式顯示各類通知，如「Price Alert」（價格警報）和「Liquidation Warning」（清算警告），並根據嚴重性使用不同顏色（黃色/紅色）和圖示。

---

### 總結

`TradePage.tsx` 是一個高度整合和功能完備的頁面。它成功地將多種複雜的 DeFi 操作簡化並統一到一個帶有頁籤的介面中，讓基金管理者可以高效地執行策略，同時清晰地監控各類資產的狀態。