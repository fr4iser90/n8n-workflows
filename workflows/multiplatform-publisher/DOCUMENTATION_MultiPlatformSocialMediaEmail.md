# Workflow Architecture & Best Practices Documentation

## 📐 Architecture Overview / Architektur-Übersicht

### Workflow Structure / Workflow-Struktur

```
📥 Webhook Trigger
    ↓
🔍 Validate & Prepare Data
    ↓
✏️ Format Content for Platforms
    ↓
    ├─→ 🐦 Post to Twitter/X? ──→ 🐦 Post to Twitter/X
    ├─→ 📷 Post to Instagram? ──→ 📷 Post to Instagram
    ├─→ 👤 Post to Facebook? ──→ 👤 Post to Facebook Page
    ├─→ 💼 Post to LinkedIn? ──→ 💼 Post to LinkedIn
    └─→ 📧 Send Email? ──→ 📧 Send Email
                            ↓
                    📊 Collect Results
                            ↓
                    🔀 Merge Results
                            ↓
                    ✅ Webhook Response
```

### Node Descriptions / Node-Beschreibungen

#### 1. 📥 Webhook Trigger
**EN:** Receives POST requests with event data. Configure path in node settings.
**DE:** Empfängt POST-Requests mit Event-Daten. Pfad in Node-Einstellungen konfigurieren.

**Configuration / Konfiguration:**
- **Path**: `/dj-event` (customizable / anpassbar)
- **Method**: `POST`
- **Response Mode**: `Response Node` (waits for final response / wartet auf finale Antwort)

---

#### 2. 🔍 Validate & Prepare Data
**EN:** Validates required fields and sets default values. Throws error if required fields are missing.
**DE:** Validiert Pflichtfelder und setzt Standardwerte. Wirft Fehler, wenn Pflichtfelder fehlen.

**Required Fields / Pflichtfelder:**
- `eventTitle`: String
- `eventDate`: String (YYYY-MM-DD format)
- `venue`: String
- `city`: String

**Default Values / Standardwerte:**
- `eventTime`: `"22:00"` (if not provided / falls nicht angegeben)
- `publishTo`: All platforms enabled except LinkedIn and Email (if not provided / falls nicht angegeben)

**Error Handling / Fehlerbehandlung:**
- Throws error with missing field names / Wirft Fehler mit fehlenden Feldnamen

---

#### 3. ✏️ Format Content for Platforms
**EN:** Formats event content optimized for each platform's requirements and character limits.
**DE:** Formatiert Event-Content optimiert für Anforderungen und Zeichenlimits jeder Plattform.

**Platform-Specific Formatting / Plattform-spezifische Formatierung:**

##### Twitter/X
- **Max Length**: 280 characters
- **Format**: Text + optional ticket URL
- **Truncation**: Automatically truncates if too long
- **Example / Beispiel:**
  ```
  DJ Night @ Club XYZ
  
  📅 Freitag, 15. Mai 2025
  🕐 22:00
  📍 Club XYZ, Berlin
  
  Amazing night!
  
  🎫 Tickets: https://tickets.example.com
  ```

##### Instagram
- **Max Length**: 2200 characters
- **Format**: Text + hashtags
- **Hashtags**: Auto-generated from city name
- **Example / Beispiel:**
  ```
  DJ Night @ Club XYZ
  
  📅 Freitag, 15. Mai 2025
  🕐 22:00
  📍 Club XYZ, Berlin
  
  Amazing night!
  
  🎫 Link in Bio oder: https://tickets.example.com
  
  #DJ #Event #Berlin #Nightlife
  ```

##### Facebook
- **Format**: Standard text format
- **Supports**: Images, links
- **Example / Beispiel:**
  ```
  DJ Night @ Club XYZ
  
  📅 Freitag, 15. Mai 2025
  🕐 22:00
  📍 Club XYZ, Berlin
  
  Amazing night!
  
  🎫 Tickets: https://tickets.example.com
  ```

##### LinkedIn
- **Format**: Professional tone
- **Language**: English-style formatting
- **Example / Beispiel:**
  ```
  🎧 DJ Night @ Club XYZ
  
  📅 Date: Freitag, 15. Mai 2025
  🕐 Time: 22:00
  📍 Location: Club XYZ, Berlin
  
  Amazing night!
  
  🎫 Get your tickets: https://tickets.example.com
  ```

##### Email
- **Format**: HTML and plain text versions
- **HTML**: Styled with inline CSS
- **Plain Text**: Simple text version
- **Attachments**: Optional image attachment

---

#### 4. Conditional Nodes (IF Nodes) / Bedingte Nodes (IF-Nodes)

**EN:** Each platform has an IF node that checks if posting is enabled via `publishTo` object.
**DE:** Jede Plattform hat einen IF-Node, der prüft, ob Posting über `publishTo` Objekt aktiviert ist.

**Logic / Logik:**
- **True Path**: Continue to posting node
- **False Path**: Skip to results collection

**Example / Beispiel:**
```javascript
$json.publishTo.twitter === true
```

---

#### 5. Platform Posting Nodes / Plattform-Posting-Nodes

##### 🐦 Post to Twitter/X
**Type**: `n8n-nodes-base.twitter`
**Operation**: Create tweet
**Parameters:**
- `text`: Formatted Twitter text
- `attachments`: Image URL (if provided)

**Credentials**: Twitter OAuth1 API

---

##### 📷 Post to Instagram
**Type**: `n8n-nodes-base.instagram`
**Operation**: Create image post
**Parameters:**
- `mediaType`: `IMAGE`
- `caption`: Formatted Instagram text
- `imageUrl`: Event image URL

**Credentials**: Instagram OAuth2 API

**Important / Wichtig:**
- Image must be publicly accessible / Bild muss öffentlich zugänglich sein
- Instagram API requires Facebook Business Account / Instagram API benötigt Facebook Business Account

---

##### 👤 Post to Facebook Page
**Type**: `n8n-nodes-base.facebook`
**Operation**: Post to page
**Parameters:**
- `pageId`: From environment variable `FACEBOOK_PAGE_ID`
- `message`: Formatted Facebook text
- `link`: Ticket URL (optional)
- `attachments`: Image URL (if provided)

**Credentials**: Facebook OAuth2 API

**Required Permissions / Erforderliche Berechtigungen:**
- `pages_manage_posts`

---

##### 💼 Post to LinkedIn
**Type**: `n8n-nodes-base.linkedIn`
**Operation**: Create text post
**Parameters:**
- `text`: Formatted LinkedIn text
- `visibility`: `PUBLIC`

**Credentials**: LinkedIn OAuth2 API

**Required Permissions / Erforderliche Berechtigungen:**
- `w_member_social` (for personal posts)
- `w_organization_social` (for company page posts)

---

##### 📧 Send Email
**Type**: `n8n-nodes-base.emailSend`
**Parameters:**
- `fromEmail`: From environment variable `EMAIL_FROM` or default
- `toEmail`: Comma-separated list from `emailRecipients` array
- `subject`: Event title + formatted date
- `html`: HTML version of email
- `text`: Plain text version
- `attachments`: Image (if provided)

**Credentials**: SMTP

**Recipients / Empfänger:**
- Must be provided in `emailRecipients` array
- Array is joined with commas for `toEmail` field

---

#### 6. 📊 Collect Results
**EN:** Collects results from all posting operations (both successful and failed).
**DE:** Sammelt Ergebnisse aller Posting-Operationen (sowohl erfolgreiche als auch fehlgeschlagene).

**Output Format / Ausgabeformat:**
```json
{
  "eventTitle": "...",
  "eventDate": "...",
  "timestamp": "...",
  "results": [
    {
      "platform": "Twitter/X",
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

#### 7. 🔀 Merge Results
**EN:** Merges collected results into final output structure.
**DE:** Führt gesammelte Ergebnisse in finale Ausgabestruktur zusammen.

**Type**: `n8n-nodes-base.set`

---

#### 8. ✅ Webhook Response
**EN:** Sends final response back to webhook caller.
**DE:** Sendet finale Antwort zurück an Webhook-Aufrufer.

**Type**: `n8n-nodes-base.respondToWebhook`
**Mode**: `allIncomingItems`

---

## 🔄 Execution Flow / Ausführungsfluss

### Step-by-Step / Schritt für Schritt

1. **Webhook receives POST request** / Webhook empfängt POST-Request
2. **Validate input data** / Eingabedaten validieren
3. **Format content for all platforms** / Content für alle Plattformen formatieren
4. **Check each platform's enable flag** / Prüfe Aktivierungs-Flag jeder Plattform
5. **Execute posting for enabled platforms** / Führe Posting für aktivierte Plattformen aus
6. **Collect all results** / Sammle alle Ergebnisse
7. **Merge results** / Führe Ergebnisse zusammen
8. **Send response** / Sende Antwort

### Parallel Execution / Parallele Ausführung

**EN:** All platform postings execute in parallel (after IF checks). This improves performance.
**DE:** Alle Plattform-Postings werden parallel ausgeführt (nach IF-Prüfungen). Dies verbessert die Performance.

---

## 🎨 Best Practices / Best Practices

### 1. Input Validation / Eingabevalidierung

**EN:** Always validate required fields before processing. The workflow includes validation, but you can add more checks.
**DE:** Immer Pflichtfelder vor Verarbeitung validieren. Der Workflow enthält Validierung, aber du kannst weitere Prüfungen hinzufügen.

**Example / Beispiel:**
```javascript
// Check image URL is valid / Prüfe, ob Bild-URL gültig ist
if (item.imageUrl && !item.imageUrl.startsWith('http')) {
  throw new Error('Invalid image URL');
}
```

---

### 2. Error Handling / Fehlerbehandlung

**EN:** The workflow continues even if one platform fails. Failed posts are logged in results.
**DE:** Der Workflow läuft weiter, auch wenn eine Plattform fehlschlägt. Fehlgeschlagene Posts werden in Ergebnissen protokolliert.

**Improvement / Verbesserung:**
- Add retry logic for failed posts / Füge Wiederholungslogik für fehlgeschlagene Posts hinzu
- Send notification on critical failures / Sende Benachrichtigung bei kritischen Fehlern

---

### 3. Rate Limiting / Rate-Limiting

**EN:** Be aware of API rate limits:
- **Twitter/X**: 300 tweets per 15 minutes (per user)
- **Instagram**: 25 posts per 24 hours (per account)
- **Facebook**: Varies by page
- **LinkedIn**: 25 posts per day (per user)

**DE:** Beachte API-Rate-Limits:
- **Twitter/X**: 300 Tweets pro 15 Minuten (pro Benutzer)
- **Instagram**: 25 Posts pro 24 Stunden (pro Account)
- **Facebook**: Variiert je Seite
- **LinkedIn**: 25 Posts pro Tag (pro Benutzer)

**Recommendation / Empfehlung:**
- Add delays between posts if posting multiple events / Füge Verzögerungen zwischen Posts hinzu, wenn mehrere Events gepostet werden
- Monitor API usage / Überwache API-Nutzung

---

### 4. Image Handling / Bildverarbeitung

**EN:** 
- Images must be publicly accessible URLs
- Consider image size limits:
  - **Twitter/X**: Max 5MB
  - **Instagram**: Max 8MB
  - **Facebook**: Max 4MB
  - **LinkedIn**: Max 5MB

**DE:**
- Bilder müssen öffentlich zugängliche URLs sein
- Beachte Bildgrößenlimits:
  - **Twitter/X**: Max. 5MB
  - **Instagram**: Max. 8MB
  - **Facebook**: Max. 4MB
  - **LinkedIn**: Max. 5MB

**Improvement / Verbesserung:**
- Add image validation / Füge Bildvalidierung hinzu
- Resize images if too large / Bilder verkleinern, falls zu groß

---

### 5. Content Optimization / Content-Optimierung

**EN:**
- Use platform-specific formatting
- Include relevant hashtags (Instagram)
- Keep Twitter/X posts concise
- Use professional tone for LinkedIn

**DE:**
- Verwende plattform-spezifische Formatierung
- Füge relevante Hashtags hinzu (Instagram)
- Halte Twitter/X Posts kurz
- Verwende professionellen Ton für LinkedIn

---

### 6. Security / Sicherheit

**EN:**
- Store credentials securely in n8n
- Add webhook authentication (e.g., API key in header)
- Validate webhook payloads
- Use environment variables for sensitive data

**DE:**
- Speichere Credentials sicher in n8n
- Füge Webhook-Authentifizierung hinzu (z.B. API-Key im Header)
- Validiere Webhook-Payloads
- Verwende Umgebungsvariablen für sensible Daten

**Example Webhook Authentication / Beispiel Webhook-Authentifizierung:**
```javascript
// In Validate & Prepare Data node / Im Validate & Prepare Data Node
const apiKey = $input.item.headers['x-api-key'];
if (apiKey !== $env.WEBHOOK_API_KEY) {
  throw new Error('Unauthorized');
}
```

---

## 🔧 Customization / Anpassung

### Adding New Platforms / Neue Plattformen hinzufügen

1. Add formatting in "Format Content for Platforms" node
2. Add IF node for platform check
3. Add posting node
4. Connect to results collection

**Example: Adding TikTok / Beispiel: TikTok hinzufügen**

```javascript
// In Format Content node / Im Format Content Node
let tiktokText = `${item.eventTitle}\n\n${item.description}`;
// TikTok has 2200 char limit / TikTok hat 2200 Zeichen Limit
```

Then add IF node and TikTok posting node.

---

### Modifying Content Format / Content-Format anpassen

**EN:** Edit the "Format Content for Platforms" node to change formatting for any platform.
**DE:** Bearbeite den "Format Content for Platforms" Node, um Formatierung für jede Plattform zu ändern.

**Example: Change Twitter format / Beispiel: Twitter-Format ändern**
```javascript
// Current / Aktuell
let twitterText = baseText;

// Modified / Geändert
let twitterText = `🔥 ${item.eventTitle} 🔥\n\n${item.description}`;
```

---

### Adding Pre-Posting Approval / Pre-Posting-Freigabe hinzufügen

**EN:** Add email notification before posting:
1. After formatting, send email with preview
2. Wait for approval (webhook or manual)
3. Continue with posting

**DE:** Füge E-Mail-Benachrichtigung vor Posting hinzu:
1. Nach Formatierung E-Mail mit Vorschau senden
2. Warte auf Freigabe (Webhook oder manuell)
3. Fahre mit Posting fort

---

## 📈 Monitoring & Logging / Überwachung & Protokollierung

### Execution Logs / Ausführungsprotokolle

**EN:** n8n stores execution logs. Check:
- **Executions** tab in n8n
- Each node's output
- Error messages

**DE:** n8n speichert Ausführungsprotokolle. Prüfe:
- **Executions** Tab in n8n
- Ausgabe jedes Nodes
- Fehlermeldungen

---

### Success Metrics / Erfolgsmetriken

**EN:** Track:
- Number of successful posts
- Number of failed posts
- Response times
- API usage

**DE:** Verfolge:
- Anzahl erfolgreicher Posts
- Anzahl fehlgeschlagener Posts
- Antwortzeiten
- API-Nutzung

---

## 🚀 Performance Optimization / Performance-Optimierung

### Current Performance / Aktuelle Performance

**EN:** 
- Parallel execution of platform postings
- No unnecessary delays
- Efficient data flow

**DE:**
- Parallele Ausführung von Plattform-Postings
- Keine unnötigen Verzögerungen
- Effizienter Datenfluss

### Potential Improvements / Mögliche Verbesserungen

1. **Caching**: Cache formatted content / Formatierten Content cachen
2. **Batch Processing**: Process multiple events at once / Mehrere Events gleichzeitig verarbeiten
3. **Async Operations**: Use async/await for better error handling / Verwende async/await für besseres Error Handling

---

## 📚 Additional Resources / Zusätzliche Ressourcen

- **n8n Documentation**: https://docs.n8n.io/
- **Twitter API Docs**: https://developer.twitter.com/en/docs
- **Instagram API Docs**: https://developers.facebook.com/docs/instagram-api
- **Facebook API Docs**: https://developers.facebook.com/docs/graph-api
- **LinkedIn API Docs**: https://docs.microsoft.com/en-us/linkedin/
- **SMTP Configuration**: Provider-specific documentation

---

## 🔄 Version History / Versionshistorie

### v1.0 (Current / Aktuell)
- Initial release / Erste Version
- Support for Twitter/X, Instagram, Facebook, LinkedIn, Email
- Webhook trigger
- Flexible platform configuration

---

## 💡 Tips & Tricks / Tipps & Tricks

1. **Test with Manual Trigger First**: Use manual trigger to test before using webhook
2. **Start with One Platform**: Enable one platform at a time for testing
3. **Use Test Data**: Create sample event data for testing
4. **Monitor First Executions**: Watch execution logs for errors
5. **Backup Credentials**: Keep backup of credentials in secure location

---

**EN:** This documentation is a living document. Update as you customize the workflow.
**DE:** Diese Dokumentation ist ein lebendes Dokument. Aktualisiere sie, während du den Workflow anpasst.

