以下從 Investor（投資者）視角 出發，列出在 Stingray Vaults 頁面中最理想、易讀且可操作的資訊模組與指標；介面排版風格，將 Vault 分為兩個大區塊，上下排列

Vaults 頁面（點擊 nav. bar 的 vault, hero 的 explore vaults,  vaults section 的 view all, moonshot vaults section 的 view all, footer 的 vaults）都會連結到此頁面。

1. Vaults 頁面的 header （nav.bar） 與主頁使用相同元件

2. Vaults 頁面，區塊文件

2-1. Protocol Vaults 區塊
| Protocol Vaults | Leader | Current APR | TVL | Runtime (day) | All-time PNL | Overview |
| --- | --- | --- | --- | --- | --- | --- |
| Bucket | Bucket Official | 13.04% | 1.25 M | 168 | 107.49 K | 📈 |
| Scallop | Scallop Official | 11.89% | 790 K | 149 | 89.45 K | 📉 |
| Aftermath | Aftermath Official | 7.68% | 370 K | 76 | 18.23 K | 📈 |

最多 10 列，超過採用分頁，目前假資料幫我採用上面作為範本，生成 protocol vaults 共 5 列

2-2. User Vaults 區塊
| User Vaults | Leader | Current APR | TVL | Runtime (day) | All-time PNL | Overview |
| --- | --- | --- | --- | --- | --- | --- |
| Sui Maxi | 0xje58u…j0dc | 67.14% | 15.01 K | 45  | 963.97 | 📈 |
| Wal Maxi | 0xui83l…cido | 48.35% | 24.76 K | 37 | 1.27 K | 📈 |
| Perp Warrior | 0x9eid1…9ecp | 92.01% | 4.68 K | 1 | -974.67 | 📉 |

最多 10 列，超過採用分頁方式，假資料幫我用上面三個作為範本，幫我生成共 15 組資料，並讓我可以透過頁面切換
