# 開發注意事項 (Dev Note)

## 關於 `npm run build` 或 `vercel --prod` 失敗問題

### 問題描述

專案在執行 `npm run build` 或 `vercel --prod` 指令時，會因為 TypeScript 的編譯錯誤而中斷。錯誤訊息通常為：

`TS6133: '...' is declared but its value is never read.`

這表示程式碼中宣告了變數、函式或匯入的模組，但從未使用過。

### 問題根源

為了確保程式碼品質和避免潛在的錯誤，我們的 TypeScript 設定 (`tsconfig.json`) 中啟用了 `noUnusedLocals` 和 `noUnusedParameters` 這兩個規則。這會將「宣告但未使用的區域變數和參數」視為錯誤，而非僅僅是警告。

當 Vercel 進行生產環境部署 (Production Build) 時，它會嚴格檢查這些錯誤，導致建置失敗。

### 解決方案與預防措施

當你遇到這個錯誤時，請根據情況選擇以下其中一種方式解決：

1.  **移除未使用的程式碼**：
    如果確認該變數、函式或匯入的模組完全不需要，最直接的方式就是將其刪除。這是最推薦的作法。

    *範例：*
    ```typescript
    // 錯誤：'TrendingUp' is declared but its value is never read.
    import { ChevronLeft, TrendingUp } from 'lucide-react';

    // 修正：直接移除 'TrendingUp'
    import { ChevronLeft } from 'lucide-react';
    ```

2.  **使用底線 (`_`) 忽略特定變數**：
    有時候，你可能需要宣告一個變數，但暫時不會在程式碼中使用它（例如，`useState` 回傳的更新函式，或是在解構賦值時想跳過的屬性）。在這種情況下，可以在變數名稱前加上底線 `_`。

    TypeScript 會將以底線開頭的變數視為「刻意未使用」，進而忽略對它的檢查。

    *範例：*
    ```typescript
    // 錯誤：'setSelectedVault' is declared but its value is never read.
    const [selectedVault, setSelectedVault] = useState(vaults[0]);

    // 修正：在變數前加上底線
    const [selectedVault, _setSelectedVault] = useState(vaults[0]);
    ```

請在開發過程中留意此規則，以確保部署流程順暢。 