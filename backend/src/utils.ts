export function extractYoutubeVideoId(url: string): string | null {
    // Regular expressions to match different YouTube URL patterns
    const regexPatterns = [
      /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^\?\/&\s]+)/,  // Short URL pattern
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^\?\/&\s]+)/,  // Long URL with watch parameter
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^\?\/&\s]+)/,  // Embed URL pattern
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^\?\/&\s]+)/,  // Old URL pattern
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/user\/\S+\?v=([^\?\/&\s]+)/,  // User URL pattern
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/[\w\-]+\?v=([^\?\/&\s]+)/,  // Other URL patterns
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?feature=player_embedded&v=([^\?\/&\s]+)/  // Embedded player URL pattern
    ];
  
    for (const pattern of regexPatterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
  
    return null;
  }