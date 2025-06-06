以下為「Stingray Protocol」首頁基於目前已實作元件的逆向工程規格文件。

---

## 1. 頁面結構

首頁 (`HomePage.tsx`) 是由一系列垂直堆疊的區塊 (Sections) 組成，旨在引導訪客了解協議的核心價值與功能。其結構如下：

*   **頁首 (Header)**: 全站共用的導航列。
*   **主視覺區 (Hero Section)**
*   **精選池預覽區 (Vaults Section)**
*   **Moonplay 池預覽區 (Moonshot Section)**
*   **運作原理區 (How It Works Section)**
*   **頁腳 (Footer)**: 全站共用的頁腳。

---

## 2. 各區塊詳細說明

### 2.1. 主視覺區 (`HeroSection.tsx`)

*   **目的**: 吸引訪客注意，並傳達核心價值主張。
*   **標題**: 「The Future of Active Fund Management on Sui」
*   **副標題**: 簡潔地說明協議的優勢：「Experience transparent, automated, and high-yield DeFi strategies. Invest with confidence, powered by the speed and security of the Sui network.」
*   **主要 CTA (Call-to-Action) 按鈕**:
    *   `Explore Vaults`: 引導用戶前往 `/vaults` 頁面，發現投資機會。
    *   `Create a Vault`: 引導已連接錢包的用戶前往 `/create` 創建策略，成為 Trader / Leader。
*   **視覺元素**: 背景使用了動態、抽象的視覺效果 (`vaults_hero_banners`) 來營造科技感。

### 2.2. 精選池預覽區 (`VaultsSection.tsx`)

*   **對應 Spec 概念**: Protocol Vaults
*   **目的**: 展示由官方或合作夥伴管理的、較穩健的投資池。
*   **區塊標題**: 「Protocol Vaults」
*   **副標題**: 「Robust, battle-tested strategies managed by top-tier protocols in the Sui ecosystem.」
*   **內容**: 以卡片 (`VaultCard.tsx`) 網格形式展示數個精選池。
    *   **卡片內容**: 每個卡片顯示 Vault 名稱、Logo、簡短描述、APR、TVL 和運行天數。
    *   **互動**: 卡片上有 `Details` 按鈕，預期可連結至該 Vault 的詳細頁面。
*   **查看更多按鈕**: 一個 `View All` 按鈕，引導用戶前往 `/vaults` 頁面的 `Protocol Vaults` Section。

### 2.3. MoonShot Vaults 預覽區 (`MoonshotSection.tsx`)

*   **對應 Spec 概念**: Moonplay Pools / User Vaults
*   **目的**: 展示由社群交易員發起的、風險和回報可能更高的新興策略池。
*   **區塊標題**: 「MoonShot Vaults」
*   **副標題**: 「High-risk, high-reward vaults managed by emerging traders. Your potential moonshot awaits.」
*   **內容**: 同樣以卡片 (`MoonshotCard.tsx`) 網格形式展示。
    *   **卡片內容**: 除了基礎資訊外，特別突顯了「All-time PNL」和「Risk Level」等指標。
*   **查看更多按鈕**: 一個 `View All` 按鈕，引導用戶前往 `/vaults` 頁面的 `User Vaults` Section。

### 2.4. 運作原理區 (`HowItWorksSection.tsx`)

*   **目的**: 簡潔地向用戶解釋參與協議的步驟。
*   **區塊標題**: 「How It Works」
*   **副標題**: 「Start your DeFi journey with Stingray in three simple steps.」
*   **內容**: 以三步驟圖文並茂地展示流程：
    1.  **Connect Wallet**: 連接您的 Sui 錢包。
    2.  **Explore & Deposit**: 探索不同的 Vaults 並存入資金。
    3.  **Track & Grow**: 在儀表板上追蹤您的資產增長。
*   **視覺元素**: 每一步都配有一個相對應的圖示 (`Wallet`, `Search`, `TrendingUp`)。

---

### 總結

目前的首頁 (`HomePage`) 結構完整，清楚地劃分了不同類型的資訊區塊，從品牌宣傳、核心產品展示到使用者入門引導，流程順暢。頁面設計與最初的 Wireframe 概念高度一致，並已成功實作為可互動的元件。

# Stingray Protocol – Homepage Snapshot

## What We Offer
- **Active Fund Pools** on the Sui Network, split into **Selected Pools** (curated strategies) and **Moonplay Pools** (community‑driven).
- **Transparent & Audited** smart contracts; real‑time on‑chain performance and autonomous yield distribution.
- **Low Fees, High Potential**: 2 – 7 % management and 0 – 30 % performance fees, always visible.

## How It Works
1. **Connect Wallet** (Sui).
2. **Pick or Create** a pool.
3. **Earn & Withdraw** anytime; contracts handle settlements.

## Why Stingray?
- **Speed & Efficiency** powered by the Sui Network.
- **Governance with $STRAY Token** for fee discounts and voting.
- **Security First**: independent audits by CertiK, Trail of Bits.

## Quick Actions
Explore Vaults · Create a Vault · Learn More