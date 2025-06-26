# Baca kandungan setiap fail
$htmlIndex = Get-Content "index.html" -Raw
$css = Get-Content "style.css" -Raw
$js = Get-Content "script.js" -Raw
$successHtml = Get-Content "success.html" -Raw

# Buat format Markdown
$markdown = @"
# Projek Gabungan HTML/CSS/JS

## 📄 index.html
\`\`\`html
$htmlIndex
\`\`\`

## 🎨 style.css
\`\`\`css
$css
\`\`\`

## 🧠 script.js
\`\`\`javascript
$js
\`\`\`

## ✅ success.html
\`\`\`html
$successHtml
\`\`\`
"@

# Simpan ke fail output.md
Set-Content -Path "output.md" -Value $markdown

Write-Host "Fail output.md berjaya dijana!"
