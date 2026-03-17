exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
  try {
    const body = JSON.parse(event.body);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
```

3. Save as `generate.js` inside the `functions` folder
   - Windows Notepad: File → Save As → change **Save as type** to **All Files** → filename: `generate.js` → save inside the `functions` folder
   - Mac TextEdit: File → Save → filename: `generate.js` → navigate into the `functions` folder

---

### Step 4 — Update two lines in your HTML file

Open `infrastructure-preview-v3.html` in Notepad or TextEdit.

Press **Ctrl+F** (Windows) or **Cmd+F** (Mac).

**Change 1** — Find:
```
API_ENDPOINT: 'https://api.anthropic.com/v1/messages',
```
Replace with:
```
API_ENDPOINT: '/.netlify/functions/generate',
```

**Change 2** — Find:
```
API_KEY: 'sk-ant-YOUR-KEY-HERE',
```
Replace with:
```
API_KEY: '',