以下從 Investor（投資者）視角 出發，列出在 Stingray Dashboard 上最理想、易讀且可操作的資訊模組與指標；介面排版風格，將資料分為「總覽卡片 → 視覺圖表 → 明細表格 → 輔助工具」四大區塊。

Vaults 頁面（點擊 nav. bar 的 vault, hero 的 explore vaults,  vaults section 的 view all, moonshot vaults section 的 view all, footer 的 vaults）

都會連結到此頁面。
⸻

1. header, nav.bar 與主頁使用相同元素

hero 的 section 可以看到三個 tab 分別是

Dashboard / Portfolio / TX History



⸻

1-1. Dashboard (Summary Card | 首屏數據卡)

擺 3～4 張，dashboard card 堆疊起來的矩形卡；可折行到 mobile。

展現的方式及動畫，可以參考這個 components/dashboard 的寫法，並基於我們的數據加以應用。
components/dashboard ref 位置:
/Users/garywu/component_styles/dashboard/src/components



可選：額外顯示「Cash Available」(錢包可用餘額) 與「Pending Withdrawals」。
