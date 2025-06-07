Sui 網路三大單幣質押協議比較

（Haedal／Volo／SpringSui）

協議	支援質押資產	質押後獲得代幣 (LST)	收益機制 & APR 計算	解鎖／贖回機制
Haedal	- SUI- WAL (Walrus)	- haSUI (質押 SUI)- haWAL (質押 WAL)	- 來源：Sui 共識獎勵 + Haedal DeFi 分潤。- 協議自動把資金分配到高 APR 驗證人並回補複利。- APR 為動態浮動。	- 常規解質押：等 1 個 Epoch (~24h)。- 即時解質押：透過 SIP-33 流動池可隨時兌換 SUI／WAL。
Volo	- SUI（已上線）- BTC（vBTC，官宣將推出）	- vSUI- vBTC（未來）	- 來源：Sui 網路質押獎勵，扣除 ~10% 協議費。- 無額外收益增強；APR ≈ Sui 基礎年化 − 手續費。	- 歷史上採 24h 批次贖回；最新 V2 加入 Instant Unstake 模式。- 也可直接在 DEX 交易 vSUI 取得流動性。
SpringSui	- SUI (目前僅此)	- sSUI	- 來源：Sui 質押獎勵，收益自動複利。- 協議費低（鑄造／贖回手續費可低至 0-1 bps）。	- 隨存隨取：整合 SIP-33，任何時刻 1:1 立即兌回 SUI，無等待期、無罰金。


⸻

雙幣 LP vs. 單幣質押卡片 — 必要欄位差異

項目	雙幣 LP 卡片	單幣質押卡片 (LST)
標題/資產	代幣對 (SUI/USDC)	單一資產 (Stake SUI) + 派生代幣匯率 (1 haSUI ≈ 1.02 SUI)
用戶輸入	兩個資產數量，需配對比例	單一資產數量
收益顯示	- 交易手續費 APR- 流動性挖礦獎勵 APR	- 質押 APR (網路+協議分潤)- 額外獎勵（若有）
風險提示	無常損失 (IL) 風險	基本無 IL；顯示解鎖限制
流動性/解鎖	隨時移除 LP	- 等待期或即時贖回- 顯示倒數/費用
操作按鈕	Add / Remove Liquidity	Stake / Unstake（或 Instant Unstake）


⸻

Trade Page — LP & Staking Tab 設計提案

1. 協議分類
	1.	雙幣 LP 協議
	•	Momentum
	•	Steamm（即將上線）
	2.	單幣質押協議
	•	Haedal（SUI、WAL）
	•	Volo（SUI，未來 BTC）
	•	SpringSui（SUI）

2. 卡片類型

卡片類型	對應協議	主要欄位
LP 卡片	Momentum／Steamm	Pool 名稱、提供資產比例、TVL、手續費 APR、挖礦 APR、用戶投入金額、未領獎勵、Add / Remove
LST 質押卡片	Haedal / Volo / SpringSui	質押資產、獲得 LST 名稱及匯率、動態 APR、用戶已質押數量、可贖回價值、解鎖方式（即時 / 24h 等）、Stake / Unstake

3. UI 呈現方式
	•	同一分頁 → 雙分區
	•	區塊切換 Toggle：全部｜LP｜質押（預設顯示全部，卡片右上角小徽章標示「LP」或「Staking」）。
	•	保持卡片尺寸一致，動態隱藏/顯示不相關欄位。

4. 通用「新增倉位」表單元件
	1.	模式選擇：LP / Staking radio 按鈕。
	2.	動態表單
	•	若選 LP → 出現兩個資產輸入框 + 自動配對比例顯示 + 預估 LP 份額。
	•	若選 Staking → 只顯示單一資產輸入 + 即將獲得的 LST 數量與匯率。
	3.	APR & 風險提示區：根據協議自動拉取數值與文字。
	4.	行動按鈕：Confirm & Sign → 一次性 PTB 送出。

透過此「可切換模式」的共通元件，工程端僅需維護一套彈窗，依使用情境動態渲染相關欄位與提示，即可同時支援 LP 與單幣質押兩種倉位建立流程。