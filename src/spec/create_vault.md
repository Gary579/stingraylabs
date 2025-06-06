Trader – Create Vault 流程規格

目的：讓 Trader（Leader）在「User Vaults」區右上角按 Create Vault 按鈕，透過彈窗一步完成新 Vault 建構並送簽智慧合約。

⸻

1. 觸發入口

位置	元件	行為
Vaults Page - User Vaults 表格上方右側	Create Vault 主按鈕	點擊 → 打開 CreateVaultModal ↘
home page - Hero Section Create a vault 按鈕
按鈕狀態：若 Trader 已達系統允許的 Vault 上限 (ex. 10 座) 則置灰並 Tooltip 提示。

⸻

2. CreateVaultModal 結構

Modal 置中，寬 560 px；分「基本資訊」與「進階設定」兩個 Accordion；底部有 Cancel / Create 兩顆按鈕。

2-1. 基本資訊 (必填)

欄位	型別	限制 / 預設	說明
Vault 名稱	Text	3–24 字；不可重複	前台與 Dashboard 皆顯示此名稱
接收資產	Select (單選)	從支援列表抓取：SUI / USDC / USDT / wETH / wBTC / afSUI / sSUI	池子唯一定價資產；散戶只可用此幣種 Deposit
策略協議	Multi-select Checkbox	Bucket / Navi / Aftermath / Streamm / Suilend / Scallop / Typus	勾選 Trader 預計會用到的協議
策略描述    讓 trader 寫描述詞，上線 100 個字
管理費 (Management Fee)	Slider 0 %	預設 0 %	入池時一次性收取 (目前管理費功能僅限 Protocol Vault 可以收取，User Vault 再未來才會解鎖，但是必須保留這個的擴充空間)
績效分潤 (Carry)	Slider 0-30 %	預設 0 %	出池結算時按獲利抽成

2-2. 進階設定 (可折疊)

欄位	型別	限制 / 預設	說明
最小鎖倉期	Number (Day)	0–365；預設 0	0 代表無鎖倉，可隨時贖回
早退罰金	Toggle + %	若開啟，0–5 %	於鎖倉期間內退出需額外支付罰金，與 Trader & 生態基金分配
Vault 上限 (Cap)	Number (USD)	空值＝不限	達上限時 Create Vault 按鈕於 VaultsPage 置灰滿倉標籤
風險等級	Radio	A / B / C / D	Trader 自評；於列表顯示 Badge
描述 (Tagline)	Textarea 0-160 字	可簡述策略或風控理念	

2-3. 驗證規則
	1.	名稱唯一 & 不可含特殊字元。
	2.	當鎖倉期 = 0 時不可設定早退罰金。

⸻

3. 提交流程
	1.	按 Create → 前端先行 Validate → 彈「Review & Sign」頁籤：
	•	顯示所有設定摘要；
	•	算出 vault_id（UUID v4）+ 預估 Gas。
	2.	Trader 點 Sign & Deploy → 透過錢包簽名，呼叫 POST /vault/create API：

{
  "vaultId": "uuid",
  "name": "Wing Alpha",
  "depositAsset": "SUI",
  "protocols": ["Navi","Typus"],
  "strategyInfo": "This is a lending & perps hybird startegy.",
  "mgmtFee": 0,
  "carry": 0.10,
  "lockDays": 30,
  "earlyExitFee": 0.02,
  "capUsd": 500000,
  "riskGrade": "B",
  "tagline": "Leveraged SUI staking with options hedge"
}


	3.	後端生成 Vault object、部署對應 Move vault store，回傳 txHash。
	4.	前端顯示 Success Toast + View on Explorer；VaultsList 新增一列 Pending 狀態，待 Tx 成功後自動轉 Active。

⸻

4. UX / UI 細節
	•	Modal 左上顯示步驟指示 Step 1 · Set Parameters → Step 2 · Review & Sign。
	•	滑桿輸入旁即時顯示百分比數字；使用 Tone Green (#1ABC9C) 高亮。
	•	折疊區展開時 icon 旋轉 90°，高度展開後自動捲至可視。
	•	Mobile：Modal 改全屏 Drawer，下方固定 CTA；表單元件改為步驟 Wizard。

⸻

5. 後續待接入
	1.	協議白名單 DB：動態回傳目前可用 Asset × Protocol 對照表。
	2.	Vault 名稱建議：檢查衝突並附上 Name Generator（Wing Beta, Reef Zeta…）。
	3.	Analytics：送 GA Event vault_create_attempt / success / fail 以監測轉換率。

⸻

製作：2025-06-06
依據 vaults.md, trade.md, dashboard.md 之現行結構編寫。