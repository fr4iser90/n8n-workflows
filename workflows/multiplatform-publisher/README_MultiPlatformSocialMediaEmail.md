# Multi-Platform Social Media & Email Publisher

## 📋 Overview / Übersicht

**EN:** This n8n workflow allows you to publish DJ events (or any events) to multiple social media platforms and send emails simultaneously. It's fully configurable - you can enable/disable each platform individually.

**DE:** Dieser n8n-Workflow ermöglicht es, DJ-Events (oder beliebige Events) auf mehreren Social-Media-Plattformen zu veröffentlichen und gleichzeitig E-Mails zu versenden. Er ist vollständig konfigurierbar - jede Plattform kann einzeln aktiviert/deaktiviert werden.

---

## 🚀 Quick Start / Schnellstart

### 1. Import Workflow / Workflow importieren

1. Open n8n / Öffne n8n
2. Go to **Workflows** → **Import from File** / Gehe zu **Workflows** → **Von Datei importieren**
3. Select `MultiPlatformSocialMediaEmail.json` / Wähle `MultiPlatformSocialMediaEmail.json`
4. Click **Import** / Klicke auf **Importieren**

### 2. Configure Credentials / Credentials konfigurieren

**⚠️ IMPORTANT / WICHTIG:** Each platform requires **SEPARATE credentials**. You cannot use the same credentials for multiple platforms.

**⚠️ WICHTIG:** Jede Plattform benötigt **SEPARATE Credentials**. Du kannst nicht die gleichen Credentials für mehrere Plattformen verwenden.

**Credential Checklist / Credential-Checkliste:**

- [ ] **Twitter/X**: `TWITTER_CREDENTIALS_ID` - Twitter OAuth1 API
- [ ] **Instagram**: `INSTAGRAM_CREDENTIALS_ID` - Instagram OAuth2 API (via Facebook)
- [ ] **Facebook**: `FACEBOOK_CREDENTIALS_ID` - Facebook OAuth2 API
- [ ] **LinkedIn**: `LINKEDIN_CREDENTIALS_ID` - LinkedIn OAuth2 API
- [ ] **Reddit**: `REDDIT_CREDENTIALS_ID` - Reddit OAuth2 (HTTP Header Auth)
- [ ] **Email**: `SMTP_CREDENTIALS_ID` - SMTP credentials

**Note / Hinweis:** You only need to configure credentials for platforms you want to use. Disabled platforms will be skipped.

**Hinweis:** Du musst nur Credentials für die Plattformen konfigurieren, die du nutzen willst. Deaktivierte Plattformen werden übersprungen.

See [Credentials Setup](#-credentials-setup--credentials-einrichten) section below for detailed instructions.

Siehe Abschnitt [Credentials Setup](#-credentials-setup--credentials-einrichten) unten für detaillierte Anleitungen.

### 3. Test the Workflow / Workflow testen

1. Click **Execute Workflow** / Klicke auf **Workflow ausführen**
2. Or send a POST request to the webhook URL / Oder sende POST-Request an Webhook-URL
3. See [Input Format](#-input-format--eingabeformat) below for example payload

---

## 📥 Input Format / Eingabeformat

### Required Fields / Pflichtfelder

```json
{
  "eventTitle": "DJ Night @ Club XYZ",
  "eventDate": "2025-05-15",
  "venue": "Club XYZ",
  "city": "Berlin"
}
```

### Optional Fields / Optionale Felder

```json
{
  "eventTime": "22:00",
  "description": "Amazing DJ night with top artists...",
  "imageUrl": "https://example.com/image.jpg",
  "ticketUrl": "https://tickets.example.com",
  "publishTo": {
    "twitter": true,
    "instagram": true,
    "facebook": true,
    "linkedin": false,
    "email": false
  },
  "emailRecipients": ["fan1@example.com", "fan2@example.com"]
}
```

### Complete Example / Vollständiges Beispiel

```json
{
  "eventTitle": "Techno Night @ Berghain",
  "eventDate": "2025-05-15",
  "eventTime": "23:00",
  "venue": "Berghain",
  "city": "Berlin",
  "description": "Join us for an unforgettable night with top techno DJs. Doors open at 23:00.",
  "imageUrl": "https://example.com/berghain-event.jpg",
  "ticketUrl": "https://tickets.berghain.de/event123",
  "publishTo": {
    "twitter": true,
    "instagram": true,
    "facebook": true,
    "linkedin": false,
    "email": true
  },
  "emailRecipients": [
    "fan1@example.com",
    "fan2@example.com",
    "fan3@example.com"
  ]
}
```

---

## 🔐 Credentials Setup / Credentials einrichten

### ⚠️ Important: Separate Credentials for Each Platform / Wichtig: Separate Credentials für jede Plattform

**EN:** Each social media platform requires **its own separate credentials**. You cannot reuse credentials between platforms.

**DE:** Jede Social-Media-Plattform benötigt **ihre eigenen separaten Credentials**. Du kannst Credentials nicht zwischen Plattformen wiederverwenden.

**Why? / Warum?**
- Each platform has different authentication methods / Jede Plattform hat unterschiedliche Authentifizierungsmethoden
- Different API endpoints and token formats / Unterschiedliche API-Endpunkte und Token-Formate
- Security best practice / Sicherheits-Best-Practice

**Example / Beispiel:**
- ❌ **Wrong / Falsch**: Using Facebook credentials for Instagram
- ✅ **Correct / Richtig**: Separate Facebook credentials AND separate Instagram credentials

---

### Credential Overview / Credential-Übersicht

| Platform / Plattform | Credential Type / Typ | Credential ID in Workflow | Required? / Erforderlich? |
|---------------------|----------------------|---------------------------|---------------------------|
| Twitter/X | Twitter OAuth1 API | `TWITTER_CREDENTIALS_ID` | Only if `publishTo.twitter: true` |
| Instagram | Instagram OAuth2 API | `INSTAGRAM_CREDENTIALS_ID` | Only if `publishTo.instagram: true` |
| Facebook | Facebook OAuth2 API | `FACEBOOK_CREDENTIALS_ID` | Only if `publishTo.facebook: true` |
| LinkedIn | LinkedIn OAuth2 API | `LINKEDIN_CREDENTIALS_ID` | Only if `publishTo.linkedin: true` |
| Reddit | HTTP Header Auth | `REDDIT_CREDENTIALS_ID` | Only if `publishTo.reddit: true` |
| Email | SMTP | `SMTP_CREDENTIALS_ID` | Only if `publishTo.email: true` |

**Note / Hinweis:** The credential IDs in the workflow are placeholders. When you import the workflow, you'll need to:
1. Create credentials in n8n for each platform you want to use
2. Assign them to the corresponding nodes in the workflow

**Hinweis:** Die Credential-IDs im Workflow sind Platzhalter. Beim Import musst du:
1. Credentials in n8n für jede Plattform erstellen, die du nutzen willst
2. Sie den entsprechenden Nodes im Workflow zuweisen

---

### Twitter/X / Twitter/X

**EN:**
1. Go to https://developer.twitter.com/
2. Create a new App / Use existing App
3. Navigate to **Keys and Tokens**
4. You need:
   - **API Key** (Consumer Key)
   - **API Secret** (Consumer Secret)
   - **Access Token**
   - **Access Token Secret**
5. In n8n: **Credentials** → **Add Credential** → **Twitter OAuth1 API**
6. Enter all four values
7. Test connection

**DE:**
1. Gehe zu https://developer.twitter.com/
2. Erstelle neue App / Verwende bestehende App
3. Navigiere zu **Keys and Tokens**
4. Du benötigst:
   - **API Key** (Consumer Key)
   - **API Secret** (Consumer Secret)
   - **Access Token**
   - **Access Token Secret**
5. In n8n: **Credentials** → **Credential hinzufügen** → **Twitter OAuth1 API**
6. Alle vier Werte eingeben
7. Verbindung testen

---

### Instagram / Instagram

**EN:**
1. **Requires Facebook Business Account** / Benötigt Facebook Business Account
2. Go to https://developers.facebook.com/
3. Create a new **Meta App** (Type: **Business**)
4. Add **Instagram Graph API** product
5. You need:
   - **App ID**
   - **App Secret**
   - **Access Token** (with `instagram_basic`, `pages_show_list`, `pages_read_engagement` permissions)
6. In n8n: **Credentials** → **Add Credential** → **Instagram OAuth2 API**
7. Enter credentials
8. **Important:** User must grant permissions via OAuth flow

**DE:**
1. **Benötigt Facebook Business Account**
2. Gehe zu https://developers.facebook.com/
3. Erstelle neue **Meta App** (Typ: **Business**)
4. Füge **Instagram Graph API** Produkt hinzu
5. Du benötigst:
   - **App ID**
   - **App Secret**
   - **Access Token** (mit `instagram_basic`, `pages_show_list`, `pages_read_engagement` Berechtigungen)
6. In n8n: **Credentials** → **Credential hinzufügen** → **Instagram OAuth2 API**
7. Credentials eingeben
8. **Wichtig:** Benutzer muss Berechtigungen über OAuth-Flow erteilen

---

### Facebook / Facebook

**EN:**
1. Go to https://developers.facebook.com/
2. Create a new **Meta App** (Type: **Business**)
3. Add **Facebook Login** product
4. You need:
   - **App ID**
   - **App Secret**
   - **Page Access Token** (with `pages_manage_posts` permission)
   - **Page ID** (set as environment variable `FACEBOOK_PAGE_ID`)
5. In n8n: **Credentials** → **Add Credential** → **Facebook OAuth2 API**
6. Enter App ID, App Secret, Access Token
7. Set environment variable: `FACEBOOK_PAGE_ID=your_page_id`

**DE:**
1. Gehe zu https://developers.facebook.com/
2. Erstelle neue **Meta App** (Typ: **Business**)
3. Füge **Facebook Login** Produkt hinzu
4. Du benötigst:
   - **App ID**
   - **App Secret**
   - **Seiten-Access-Token** (mit `pages_manage_posts` Berechtigung)
   - **Seiten-ID** (als Umgebungsvariable `FACEBOOK_PAGE_ID` setzen)
5. In n8n: **Credentials** → **Credential hinzufügen** → **Facebook OAuth2 API**
6. App ID, App Secret, Access Token eingeben
7. Umgebungsvariable setzen: `FACEBOOK_PAGE_ID=deine_seiten_id`

---

### LinkedIn / LinkedIn

**EN:**
1. Go to https://www.linkedin.com/developers/apps
2. Create a new app
3. You need:
   - **Client ID**
   - **Client Secret**
4. Configure **OAuth Redirect URL**: `https://your-n8n-instance.com/rest/oauth2-credential/callback`
5. Request permissions: `w_member_social`, `w_organization_social`
6. In n8n: **Credentials** → **Add Credential** → **LinkedIn OAuth2 API**
7. Enter Client ID and Client Secret
8. Complete OAuth flow to generate Access Token

**DE:**
1. Gehe zu https://www.linkedin.com/developers/apps
2. Erstelle neue App
3. Du benötigst:
   - **Client ID**
   - **Client Secret**
4. Konfiguriere **OAuth Redirect URL**: `https://deine-n8n-instanz.com/rest/oauth2-credential/callback`
5. Berechtigungen anfordern: `w_member_social`, `w_organization_social`
6. In n8n: **Credentials** → **Credential hinzufügen** → **LinkedIn OAuth2 API**
7. Client ID und Client Secret eingeben
8. OAuth-Flow abschließen, um Access Token zu generieren

---

### Reddit / Reddit

**EN:**
1. Go to https://www.reddit.com/prefs/apps
2. Click **"create another app..."** or **"create app"**
3. Fill in:
   - **Name**: Your app name (e.g., "DJ Event Poster")
   - **App type**: Select **"script"**
   - **Description**: Optional
   - **About URL**: Optional
   - **Redirect URI**: `http://localhost:8080` (or your n8n instance URL)
4. After creation, note:
   - **Client ID**: The string under the app name (looks like random characters)
   - **Client Secret**: The "secret" field (only shown once!)
5. Get OAuth Token:
   - Use Reddit OAuth2 flow to get Access Token
   - Or use a tool like https://not-an-aardvark.github.io/reddit-oauth-helper/
   - Token format: `Bearer YOUR_ACCESS_TOKEN`
6. In n8n: **Credentials** → **Add Credential** → **HTTP Header Auth**
7. Configure:
   - **Name**: `Authorization`
   - **Value**: `Bearer YOUR_ACCESS_TOKEN`
8. Optional: Set `REDDIT_USER_AGENT` environment variable (e.g., `n8n-workflow/1.0`)

**DE:**
1. Gehe zu https://www.reddit.com/prefs/apps
2. Klicke auf **"create another app..."** oder **"create app"**
3. Ausfüllen:
   - **Name**: Dein App-Name (z.B. "DJ Event Poster")
   - **App-Typ**: Wähle **"script"**
   - **Beschreibung**: Optional
   - **About URL**: Optional
   - **Redirect URI**: `http://localhost:8080` (oder deine n8n-Instanz-URL)
4. Nach Erstellung notieren:
   - **Client ID**: Die Zeichenkette unter dem App-Namen (sieht aus wie zufällige Zeichen)
   - **Client Secret**: Das "secret" Feld (wird nur einmal angezeigt!)
5. OAuth Token holen:
   - Verwende Reddit OAuth2-Flow, um Access Token zu erhalten
   - Oder verwende ein Tool wie https://not-an-aardvark.github.io/reddit-oauth-helper/
   - Token-Format: `Bearer DEIN_ACCESS_TOKEN`
6. In n8n: **Credentials** → **Credential hinzufügen** → **HTTP Header Auth**
7. Konfigurieren:
   - **Name**: `Authorization`
   - **Wert**: `Bearer DEIN_ACCESS_TOKEN`
8. Optional: `REDDIT_USER_AGENT` Umgebungsvariable setzen (z.B. `n8n-workflow/1.0`)

**Reddit-Specific Input Fields / Reddit-spezifische Eingabefelder:**
- `redditSubreddit`: **Required** if Reddit enabled. Subreddit name without "r/" (e.g., "DJs", "Techno", "berlin")
- `redditFlair`: Optional. Flair text for the post (must match available flairs in subreddit)
- `redditNsfw`: Optional. Boolean flag for NSFW content (default: false)
- `redditSpoiler`: Optional. Boolean flag for spoiler content (default: false)
- `redditPostType`: Optional. "self" (text post) or "link" (link post, default: "self")

**Example / Beispiel:**
```json
{
  "publishTo": {
    "reddit": true
  },
  "redditSubreddit": "DJs",
  "redditFlair": "Event",
  "redditNsfw": false,
  "redditSpoiler": false,
  "redditPostType": "self"
}
```

---

### Email (SMTP) / E-Mail (SMTP)

**EN:**
1. Choose your email provider:
   - **Gmail**: Use App Password (2FA required)
   - **Outlook/Office 365**: Use Office 365 SMTP
   - **Custom SMTP**: Use your provider's SMTP settings
2. In n8n: **Credentials** → **Add Credential** → **SMTP**
3. Enter SMTP settings:
   - **Host**: e.g., `smtp.gmail.com`
   - **Port**: `587` (TLS) or `465` (SSL)
   - **User**: Your email address
   - **Password**: App Password (for Gmail) or regular password
4. Optional: Set environment variable `EMAIL_FROM` for default sender

**DE:**
1. Wähle deinen E-Mail-Provider:
   - **Gmail**: App-Passwort verwenden (2FA erforderlich)
   - **Outlook/Office 365**: Office 365 SMTP verwenden
   - **Custom SMTP**: SMTP-Einstellungen deines Providers verwenden
2. In n8n: **Credentials** → **Credential hinzufügen** → **SMTP**
3. SMTP-Einstellungen eingeben:
   - **Host**: z.B. `smtp.gmail.com`
   - **Port**: `587` (TLS) oder `465` (SSL)
   - **User**: Deine E-Mail-Adresse
   - **Password**: App-Passwort (für Gmail) oder normales Passwort
4. Optional: Umgebungsvariable `EMAIL_FROM` für Standard-Absender setzen

#### Gmail App Password Setup / Gmail App-Passwort einrichten

**EN:**
1. Enable 2-Factor Authentication on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Generate new App Password for "Mail"
4. Use this password (not your regular password) in SMTP credentials

**DE:**
1. Aktiviere 2-Faktor-Authentifizierung in deinem Google-Konto
2. Gehe zu https://myaccount.google.com/apppasswords
3. Generiere neues App-Passwort für "Mail"
4. Verwende dieses Passwort (nicht dein normales Passwort) in SMTP-Credentials

---

## 🎯 Usage / Verwendung

### Via Webhook / Über Webhook

**EN:** Send POST request to webhook URL:

**DE:** Sende POST-Request an Webhook-URL:

```bash
curl -X POST https://your-n8n-instance.com/webhook/dj-event \
  -H "Content-Type: application/json" \
  -d '{
    "eventTitle": "DJ Night @ Club XYZ",
    "eventDate": "2025-05-15",
    "eventTime": "22:00",
    "venue": "Club XYZ",
    "city": "Berlin",
    "description": "Amazing night!",
    "imageUrl": "https://example.com/image.jpg",
    "publishTo": {
      "twitter": true,
      "instagram": true,
      "facebook": false,
      "linkedin": false,
      "reddit": true,
      "email": true
    },
    "emailRecipients": ["fan@example.com"],
    "redditSubreddit": "DJs",
    "redditFlair": "Event",
    "redditNsfw": false,
    "redditSpoiler": false
  }'
```

### Via Manual Trigger / Über manuellen Trigger

**EN:** 
1. Click **Execute Workflow** in n8n
2. Enter JSON in the trigger node
3. Click **Execute Node**

**DE:**
1. Klicke auf **Workflow ausführen** in n8n
2. Gib JSON im Trigger-Node ein
3. Klicke auf **Node ausführen**

---

## 📊 Output Format / Ausgabeformat

The workflow returns a summary of all posting operations:

Der Workflow gibt eine Zusammenfassung aller Posting-Operationen zurück:

```json
{
  "eventTitle": "DJ Night @ Club XYZ",
  "eventDate": "2025-05-15",
  "timestamp": "2025-01-27T12:00:00.000Z",
  "results": [
    {
      "platform": "Twitter/X",
      "success": true,
      "data": { ... }
    },
    {
      "platform": "Instagram",
      "success": true,
      "data": { ... }
    }
  ],
  "summary": {
    "total": 2,
    "successful": 2,
    "failed": 0
  }
}
```

---

## ⚙️ Configuration / Konfiguration

### Enable/Disable Platforms / Plattformen aktivieren/deaktivieren

**EN:** Set `publishTo` object in input:

**DE:** Setze `publishTo` Objekt in Eingabe:

```json
{
  "publishTo": {
    "twitter": true,    // Enable Twitter/X
    "instagram": true,  // Enable Instagram
    "facebook": false,  // Disable Facebook
    "linkedin": false,  // Disable LinkedIn
    "reddit": true,     // Enable Reddit
    "email": true       // Enable Email
  },
  "redditSubreddit": "DJs",  // Required if reddit: true
  "redditFlair": "Event",     // Optional
  "redditNsfw": false,        // Optional
  "redditSpoiler": false      // Optional
}
```

### Content Formatting / Content-Formatierung

**EN:** The workflow automatically formats content for each platform:
- **Twitter/X**: Max 280 characters, truncated if needed
- **Instagram**: Up to 2200 characters, includes hashtags
- **Facebook**: Standard format
- **LinkedIn**: Professional tone
- **Reddit**: Markdown format with headers, supports flairs, NSFW/Spoiler flags
- **Email**: HTML and plain text versions

**DE:** Der Workflow formatiert Content automatisch für jede Plattform:
- **Twitter/X**: Max. 280 Zeichen, bei Bedarf gekürzt
- **Instagram**: Bis zu 2200 Zeichen, inkl. Hashtags
- **Facebook**: Standard-Format
- **LinkedIn**: Professioneller Ton
- **E-Mail**: HTML und Plain-Text Versionen

---

## 🔧 Troubleshooting / Fehlerbehebung

### Common Issues / Häufige Probleme

#### 1. Twitter/X: "Invalid or expired token"
**EN:** Regenerate Access Token in Twitter Developer Portal
**DE:** Access Token im Twitter Developer Portal neu generieren

#### 2. Instagram: "Invalid access token"
**EN:** 
- Check if token has required permissions
- Token may have expired (Instagram tokens expire)
- Regenerate token via OAuth flow

**DE:**
- Prüfe, ob Token erforderliche Berechtigungen hat
- Token könnte abgelaufen sein (Instagram-Tokens laufen ab)
- Token über OAuth-Flow neu generieren

#### 3. Facebook: "Page not found"
**EN:** 
- Verify `FACEBOOK_PAGE_ID` environment variable is set correctly
- Ensure Access Token has `pages_manage_posts` permission

**DE:**
- Prüfe, ob `FACEBOOK_PAGE_ID` Umgebungsvariable korrekt gesetzt ist
- Stelle sicher, dass Access Token `pages_manage_posts` Berechtigung hat

#### 4. Email: "Authentication failed"
**EN:**
- For Gmail: Use App Password, not regular password
- Check SMTP settings (host, port, TLS/SSL)

**DE:**
- Für Gmail: App-Passwort verwenden, nicht normales Passwort
- SMTP-Einstellungen prüfen (Host, Port, TLS/SSL)

---

## 📝 Notes / Hinweise

- **Image URLs**: Must be publicly accessible / Müssen öffentlich zugänglich sein
- **Rate Limits**: Be aware of API rate limits for each platform / Beachte API-Rate-Limits für jede Plattform
- **Error Handling**: Failed posts are logged in results / Fehlgeschlagene Posts werden in Ergebnissen protokolliert
- **Webhook Security**: Consider adding authentication to webhook / Erwäge Authentifizierung für Webhook hinzuzufügen

---

## 🆘 Support / Unterstützung

**EN:** For issues or questions, check:
- n8n Documentation: https://docs.n8n.io/
- n8n Community: https://community.n8n.io/

**DE:** Bei Problemen oder Fragen, siehe:
- n8n Dokumentation: https://docs.n8n.io/
- n8n Community: https://community.n8n.io/

---

## 📄 License / Lizenz

See LICENSE file in repository.

Siehe LICENSE-Datei im Repository.

