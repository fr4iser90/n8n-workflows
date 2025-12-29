# Credentials Overview / Credential-Übersicht

## ⚠️ WICHTIG: Separate Credentials für jede Plattform

**EN:** Each social media platform requires **its own separate credentials**. You **CANNOT** use the same credentials for multiple platforms.

**DE:** Jede Social-Media-Plattform benötigt **ihre eigenen separaten Credentials**. Du kannst **NICHT** die gleichen Credentials für mehrere Plattformen verwenden.

---

## 📋 Credential Checklist / Credential-Checkliste

### ✅ Alle benötigten Credentials

| # | Platform / Plattform | Credential Type / Typ | Credential ID im Workflow | Erforderlich wenn |
|---|---------------------|----------------------|---------------------------|-------------------|
| 1 | **Twitter/X** | Twitter OAuth1 API | `TWITTER_CREDENTIALS_ID` | `publishTo.twitter: true` |
| 2 | **Instagram** | Instagram OAuth2 API | `INSTAGRAM_CREDENTIALS_ID` | `publishTo.instagram: true` |
| 3 | **Facebook** | Facebook OAuth2 API | `FACEBOOK_CREDENTIALS_ID` | `publishTo.facebook: true` |
| 4 | **LinkedIn** | LinkedIn OAuth2 API | `LINKEDIN_CREDENTIALS_ID` | `publishTo.linkedin: true` |
| 5 | **Reddit** | HTTP Header Auth | `REDDIT_CREDENTIALS_ID` | `publishTo.reddit: true` |
| 6 | **Email** | SMTP | `SMTP_CREDENTIALS_ID` | `publishTo.email: true` |

---

## 🔑 Credential Setup in n8n

### Schritt 1: Credentials erstellen / Step 1: Create Credentials

**EN:** In n8n, go to **Settings** → **Credentials** → **Add Credential**

**DE:** In n8n, gehe zu **Einstellungen** → **Credentials** → **Credential hinzufügen**

### Schritt 2: Credentials zuordnen / Step 2: Assign Credentials

**EN:** After importing the workflow:
1. Open the workflow
2. Click on each platform node (e.g., "🐦 Post to Twitter/X")
3. In the node settings, select the credential you created
4. Repeat for each platform you want to use

**DE:** Nach dem Import des Workflows:
1. Öffne den Workflow
2. Klicke auf jeden Plattform-Node (z.B. "🐦 Post to Twitter/X")
3. In den Node-Einstellungen wähle das erstellte Credential aus
4. Wiederhole für jede Plattform, die du nutzen willst

---

## 📝 Credential Details / Credential-Details

### 1. Twitter/X

- **Type**: Twitter OAuth1 API
- **Node**: "🐦 Post to Twitter/X"
- **Required Fields**:
  - API Key (Consumer Key)
  - API Secret (Consumer Secret)
  - Access Token
  - Access Token Secret
- **Get from**: https://developer.twitter.com/

### 2. Instagram

- **Type**: Instagram OAuth2 API
- **Node**: "📷 Post to Instagram"
- **Required Fields**:
  - App ID
  - App Secret
  - Access Token
- **Get from**: https://developers.facebook.com/ (via Meta App)
- **Note**: Requires Facebook Business Account

### 3. Facebook

- **Type**: Facebook OAuth2 API
- **Node**: "👤 Post to Facebook Page"
- **Required Fields**:
  - App ID
  - App Secret
  - Page Access Token
- **Get from**: https://developers.facebook.com/
- **Note**: Requires Page Access Token with `pages_manage_posts` permission

### 4. LinkedIn

- **Type**: LinkedIn OAuth2 API
- **Node**: "💼 Post to LinkedIn"
- **Required Fields**:
  - Client ID
  - Client Secret
  - Access Token
- **Get from**: https://www.linkedin.com/developers/apps
- **Note**: Requires OAuth redirect URL configuration

### 5. Reddit

- **Type**: HTTP Header Auth
- **Node**: "🔴 Post to Reddit"
- **Required Fields**:
  - Header Name: `Authorization`
  - Header Value: `Bearer YOUR_ACCESS_TOKEN`
- **Get from**: https://www.reddit.com/prefs/apps
- **Note**: Requires Reddit app with "script" type

### 6. Email (SMTP)

- **Type**: SMTP
- **Node**: "📧 Send Email"
- **Required Fields**:
  - Host (e.g., smtp.gmail.com)
  - Port (587 for TLS, 465 for SSL)
  - User (email address)
  - Password (App Password for Gmail)
- **Get from**: Your email provider

---

## ❌ Häufige Fehler / Common Mistakes

### ❌ Falsch / Wrong:

```
❌ Facebook Credentials für Instagram verwenden
❌ Using Facebook credentials for Instagram
```

### ✅ Richtig / Correct:

```
✅ Separate Facebook Credentials UND separate Instagram Credentials
✅ Separate Facebook credentials AND separate Instagram credentials
```

---

## 🔍 Credential-Status prüfen / Check Credential Status

**EN:** To check if credentials are configured:
1. Open the workflow in n8n
2. Look at each platform node
3. If you see a warning icon or "No credentials" message, you need to configure it
4. Nodes with credentials will show the credential name

**DE:** Um zu prüfen, ob Credentials konfiguriert sind:
1. Öffne den Workflow in n8n
2. Schaue auf jeden Plattform-Node
3. Wenn du ein Warnsymbol oder "No credentials" siehst, musst du es konfigurieren
4. Nodes mit Credentials zeigen den Credential-Namen an

---

## 📚 Weitere Informationen / More Information

Für detaillierte Anleitungen zu jedem Credential, siehe:
For detailed instructions for each credential, see:

- **README_MultiPlatformSocialMediaEmail.md** - Vollständige Credential-Anleitungen
- **DOCUMENTATION_MultiPlatformSocialMediaEmail.md** - Technische Details

---

## ✅ Quick Check / Schnellprüfung

**EN:** Before running the workflow, make sure:
- [ ] You have created credentials for each platform you want to use
- [ ] Each credential is assigned to the correct node
- [ ] All required fields are filled in
- [ ] Credentials are tested and working

**DE:** Vor dem Ausführen des Workflows, stelle sicher:
- [ ] Du hast Credentials für jede Plattform erstellt, die du nutzen willst
- [ ] Jedes Credential ist dem richtigen Node zugeordnet
- [ ] Alle erforderlichen Felder sind ausgefüllt
- [ ] Credentials sind getestet und funktionieren

