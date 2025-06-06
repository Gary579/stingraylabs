Stingray Trade Page（交易操作頁）—— Trader 視角完整 UI 描述（中文版）

使用情境：
	•	Trader（Leader）登入後，可在此頁「挑選正在管理的 Vault」並對 Vault 中的資金進行 借貸、質押、永續交易、期權寫單、LP 建倉 等操作。
	•	後台整合 7 個協議：Bucket、Navi、Aftermath、Streamm、Suilend、Scallop、Typus。系統會依 Vault 可用資產 & 協議功能，自動顯示可執行的按鈕與參數。
	•	所有操作都以 單筆 Programmable Transaction Block 打包送出，確保鏈上一次完成、避免半成品狀態。

⸻

1. 頁首區（Header）

元件	說明
Breadcrumb	Home / Dashboard / Trade（高亮）
Vault Selector	右側下拉：顯示「我管理的所有 Vault」格式：[VaultName] (TVL $xxxK)；選定後整頁資料自動切換。
鏈接錢包 & 帳號縮寫	0xAb…123；按下可展開 Profile / Settings / Disconnect。


⸻

2. 上方總覽卡片（Vault Snapshot Cards）

寬度 3～4 張；手機版橫向滑動

卡片	數值	互動
可動用資產	$ X（剩餘未鎖倉）	「Deposit」快速存入
已質押 / 已抵押	$ Y	「Manage Collateral」跳轉管理模組
可借額度	$ Z (= Collateral*LTV – Debt)	「Flash Borrow」(如支援)
未實現 P&L	$ +/−%	紅綠色動態滾動數字


⸻

3. Operation Tabs 區（功能切換）
	1.	借貸 / 質押 ( Lending )
	2.	流動性 / 質押挖礦 ( LP & Staking )
	3.	永續 / 期權交易 ( Perps / Options )
	4.	歷史紀錄 ( History )

系統依所選 Vault 支援協議自動啟用對應 Tab；無支援則灰階。

⸻

3-1. 借貸 / 質押 Tab

子區塊	UI 元件	說明
存款資產清單	表格：Asset / 存量 / 年化存益（%） / 協議	來源：Navi、Suilend、Scallop；可點「+ Supply」開浮窗輸入金額。
借款倉位	表格：Asset / 已借 / 利率 / 健康度條	點「Repay」或「Borrow More」調整。
Collateral 管理	側邊浮層：選擇要 Enable 或 Disable 作為抵押；支援 Bucket 開 Bottle（CDP）→ Mint BUCK。	
閾值警示	當健康度 < 150% 變黃、<110% 變紅並顯示「可能被清算」。	


⸻

3-2. 流動性 / 質押挖礦 Tab

子區塊	UI 元件	說明
LP 倉位	卡片列出：Pool 名 / 協議 (Aftermath Index, Streamm Pool…) / 投入金額 / APR / 未領獎勵	「Add Liquidity」→ 兩欄輸入資產比例；「Remove」→ 即時估算退出金額。
LSD 質押	afSUI、sSUI 等顯示可兌換量與年化；可「Stake」或「Unstake」。	
收益申領	彙總待領 $STRAY / AFM / SEND… 一鍵「Claim All」。	


⸻

3-3. 永續 / 期權 Tab

區塊	UI	說明
市場選擇列	下拉：BTC-PERP、ETH-PERP、SUI-PERP（Typus / Aftermath）；Option Vaults（Typus DOV）	自動標記支援協議。
K 線＋深度圖	TradingView 嵌入，1m/1h/4h 等級	實時更新。
下單區	模式切換：Limit / Market / TP·SL；槓桿滑桿 1x – 50x；金額輸入；顯示所需維持保證金	成交後顯示在「Open Positions」表格。
期權參與	若選擇 Option Vault：顯示當前 Epoch、策略（Covered Call / Put Selling）與可存入資產；顯示預估年化。	


⸻

3-4. 歷史紀錄 Tab
	•	篩選：日期區間 / 操作類型（Supply、Borrow、Swap、Perp、Option、Claim）。
	•	導出：CSV / PDF；可用於稅務報告。
	•	鏈上 Tx Hash：點擊可跳 Sui Explorer。

⸻

4. 右側浮動面板（Notifications & Quick Actions）

功能	說明
即時價格警報	當選定資產波動超過 ±5% 彈出提示，防止爆倉。
清算倒計時	若健康度瀕臨清算，顯示倒計時 & 「快速補倉」按鈕。
批量操作	「全部領獎」/「一鍵撤出所有 LP」等批量功能。


⸻

5. 行為流程示例
	1.	選 Vault → 讀取持倉 & 協議支援。
	2.	點 借貸 / 質押 Tab：
	•	把 afSUI 設為 Collateral → 借 USDC。
	•	健康度即時刷新。
	3.	轉到 永續 / 期權 Tab：
	•	使用借來的 USDC 在 Typus BTC-PERP 開 10x 多單。
	4.	回到 LP / 質押挖礦：
	•	把剩餘 USDC 與 SUI 加入 Streamm USDC/SUI 池，賺雙重收益。
	5.	通知面板 提醒：倉位浮盈 +10%，可選「一鍵平倉並還款」。

⸻

6. 響應式設計要點
	•	桌機：三欄式（左表格、中心圖表、右通知列）。
	•	平板：圖表與表格改上下疊；通知列改為上方小鈴鐺。
	•	手機：僅顯示主要 Tab；表格改卡片；多步操作以抽屜 + Wizard 流程呈現。

⸻

7. 技術 / 數據要求

模組	依賴
即時價格 & 槓桿計算	Pyth Oracle、或鏈下 WebSocket 聚合。
健康度條	實時計算 Collateral Value / Borrowed Value，依不同協議 LTV。
合約互動	Batch PTB，支援多協議路由；錯誤回滾。
風險控制	前端先行預檢 LTV、預估滑點；後端再校驗。


⸻

以上即 Stingray Trade Page（中文版） 的完整 UI 版面與功能描述。