// EN: Validate and prepare input data
// DE: Eingabedaten validieren und vorbereiten
const item = $input.item.json;

// Required fields check / Pflichtfelder prüfen
const requiredFields = ['eventTitle', 'eventDate', 'venue', 'city'];
const missingFields = requiredFields.filter(field => !item[field]);

if (missingFields.length > 0) {
  throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
}

// Set defaults / Standardwerte setzen
const publishTo = item.publishTo || {
  twitter: true,
  instagram: true,
  facebook: true,
  linkedin: false,
  reddit: false,
  email: false
};

// Format date / Datum formatieren
let formattedDate = item.eventDate;
if (item.eventDate && item.eventTime) {
  const date = new Date(`${item.eventDate}T${item.eventTime}`);
  formattedDate = date.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Prepare output / Ausgabe vorbereiten
return [{
  json: {
    eventTitle: item.eventTitle,
    eventDate: item.eventDate,
    eventTime: item.eventTime || '22:00',
    formattedDate: formattedDate,
    venue: item.venue,
    city: item.city,
    description: item.description || '',
    imageUrl: item.imageUrl || '',
    ticketUrl: item.ticketUrl || '',
    publishTo: publishTo,
    emailRecipients: item.emailRecipients || [],
    // Reddit-specific fields / Reddit-spezifische Felder
    redditSubreddit: item.redditSubreddit || '',
    redditFlair: item.redditFlair || '',
    redditNsfw: item.redditNsfw || false,
    redditSpoiler: item.redditSpoiler || false,
    redditPostType: item.redditPostType || 'text', // 'text' or 'link'
    timestamp: new Date().toISOString()
  }
}];
