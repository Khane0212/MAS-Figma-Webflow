# Figma-to-Webflow MCP

Công cụ chuyển thiết kế từ Figma sang Webflow bằng AI Agent.

---

## 🚀 Bắt đầu nhanh

### Bước 1: Pull về máy
```bash
git clone <repo-url>
cd figma-to-webflow-mcp
```

### Bước 2: Setup
```bash
node generate-configs.js
```

### Bước 3: Mở Gemini CLI
```bash
gemini
```

### Bước 4: Verify
Trong Gemini CLI, gõ:
```
/mcp list
```
Nên thấy:
- `figma: Connected`
- `webflow: Connected`

### Bước 5: Sử dụng!
Chat với Gemini:
- "Tôi muốn chuyển thiết kế từ Figma sang Webflow"
- "Đây là Figma URL: https://figma.com/file/..."
- "Đây là Webflow Site ID: ..."

Agent sẽ tự đọc Figma và build lên Webflow!

---

## 📋 Nếu không hoạt động

### Cách 1: Setup thủ công cho Gemini CLI
```bash
# Mở file settings
notepad %USERPROFILE%\.gemini\settings.json
```

Thêm vào:
```json
{
  "mcpServers": {
    "figma": { "url": "https://mcp.figma.com/mcp" },
    "webflow": { "url": "https://mcp.webflow.com/mcp" }
  }
}
```

### Cách 2: Restart Gemini CLI
```bash
# Tắt đi và mở lại
gemini
```

---

## 🔧 Cần giúp đỡ?

Gõ trong Gemini CLI:
```
/mcp list
```
Để xem MCP có hoạt động không.