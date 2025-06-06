以下是「Stingray Vaults」頁面基於現有 `VaultsPage.tsx` 實作的逆向工程規格文件。

---

## 1. 頁面目標與結構

Vaults 頁面 (`/vaults`) 是平台的核心入口之一，旨在讓投資者可以探索、比較並選擇所有可用的投資池。該頁面可從首頁的多個「Explore/View All」按鈕以及主導航列進入。

頁面佈局清晰，由上至下分為三個主要區塊：

1.  **英雄橫幅區 (Hero Banner)**
2.  **協議資金池表格 (Protocol Vaults Table)**
3.  **用戶資金池表格 (User Vaults Table)**

---

## 2. 各區塊詳細說明

### 2.1. 英雄橫幅區 (`VaultsHeroBanner.tsx`)

*   **目的**: 在頁面頂部提供一個引人注目的視覺入口，並可能包含對 Vaults 功能的簡要介紹或一個主要的行動呼籲 (Call-to-Action)。
*   **內容**: 顯示一個背景橫幅，點擊圖片將作為 CTA 按鈕，直接引導用戶至指定活動頁面 or 指定 Vault 頁面。

### 2.2. 協議資金池表格 (`VaultsTable.tsx` for "Protocol Vaults")

*   **對應 Spec 概念**: Selected Pools / 精選池
*   **目的**: 集中展示由官方或核心生態合作夥伴管理的、策略相對穩健的資金池。
*   **標題**: 「Protocol Vaults」
*   **內容**:
    *   以表格形式呈現，目前程式碼中已生成並顯示 **5** 個 Protocol Vaults 的假資料。
    *   **表格欄位** (`VaultsTable` 元件所呈現) 包括：
        *   `Vaults` (名稱)
        *   `Leader` (管理人，此處均為 "Official" 官方)
        *   `Current APR` (當前年化回報率)
        *   `TVL` (總鎖倉量)
        *   `Runtime (day)` (已運行天數)
        *   `All-time PNL` (歷史總損益)
        *   `Overview` (一個迷你圖表，顯示歷史 PNL 趨勢)
*   **分頁**: 由於目前只有 5 筆資料，未觸發分頁功能。

### 2.3. 用戶資金池表格 (`VaultsTable.tsx` for "User Vaults")

*   **對應 Spec 概念**: Moonplay Pools
*   **目的**: 展示由社群中的獨立交易員發起的、策略更多樣化、風險與回報潛力並存的資金池。
*   **標題**: 「User Vaults」
*   **內容**:
    *   同樣使用 `VaultsTable` 元件進行渲染。
    *   程式碼中已生成 **15** 組 User Vaults 的假資料。
    *   **表格欄位** 與 Protocol Vaults 相同，但 `Leader` 欄位顯示的是交易員的錢包地址縮寫。
*   **分頁**: `VaultsPage.tsx` 在呼叫此表格時，明確傳入了 `itemsPerPage={10}` 的屬性。這表示該表格會自動啟用分頁功能，將 15 筆資料分為 2 頁顯示。

---

### 總結

目前的 `VaultsPage` 頁面結構清晰，成功地將不同風險和來源的資金池劃分為兩大類，方便投資者根據自己的偏好進行篩選。表格化的呈現方式有利於快速比較關鍵指標，而針對 User Vaults 的分頁功能也為未來擴展大量社群資金池做好了準備。
