/**
 * YouTube Video Utilities
 * Functions for extracting video IDs, generating embed URLs, and getting thumbnails
 */

/**
 * Extract YouTube video ID from various URL formats
 * 
 * Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtu.be/VIDEO_ID?t=123
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://www.youtube.com/user/USERNAME#p/a/u/1/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - VIDEO_ID (direct 11-character ID)
 * 
 * @param url - YouTube URL or video ID
 * @returns 11-character video ID or null
 */
export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // Trim whitespace
  url = url.trim();
  
  const patterns = [
    // Standard watch URL: youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([^&\?\/\n#]+)/,
    
    // Short URL: youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([^&\?\/\n#]+)/,
    
    // Embed URL: youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([^&\?\/\n#]+)/,
    
    // Old embed: youtube.com/v/VIDEO_ID
    /(?:youtube\.com\/v\/)([^&\?\/\n#]+)/,
    
    // User channel URL with video
    /(?:youtube\.com\/user\/[^\/]+#p\/a\/u\/\d+\/)([^&\?\/\n#]+)/,
    
    // YouTube Shorts: youtube.com/shorts/VIDEO_ID
    /(?:youtube\.com\/shorts\/)([^&\?\/\n#]+)/,
    
    // Direct video ID (11 alphanumeric characters with - and _)
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      // Validate it's exactly 11 characters
      const videoId = match[1];
      if (videoId.length === 11) {
        return videoId;
      }
    }
  }
  
  return null;
}

export interface YouTubeEmbedOptions {
  autoplay?: 0 | 1;
  mute?: 0 | 1;
  loop?: 0 | 1;
  controls?: 0 | 1;
  modestbranding?: 0 | 1;
  rel?: 0 | 1;
  showinfo?: 0 | 1;
  iv_load_policy?: 1 | 3;
  playsinline?: 0 | 1;
  start?: number;
  end?: number;
  cc_load_policy?: 0 | 1;
  hl?: string;
  origin?: string;
}

export interface YouTubeEmbedData {
  embedUrl: string;
  videoId: string;
  thumbnailUrl: string;
  thumbnailUrlHQ: string;
  thumbnailUrlMQ: string;
  thumbnailUrlSD: string;
}

/**
 * Get YouTube embed URL with options
 * 
 * @param url - YouTube URL or video ID
 * @param options - Embed options
 * @returns Embed data object or null
 */
export function getYouTubeEmbedUrl(
  url: string | null | undefined,
  options: YouTubeEmbedOptions = {}
): YouTubeEmbedData | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  const defaultOptions: Required<YouTubeEmbedOptions> = {
    autoplay: 0,
    mute: 0,
    loop: 0,
    controls: 1,
    modestbranding: 1,
    rel: 0,           // Don't show related videos
    showinfo: 0,      // Hide video title (deprecated but still used)
    iv_load_policy: 3, // Hide annotations
    playsinline: 1,   // Play inline on iOS
    start: 0,
    end: 0,
    cc_load_policy: 0,
    hl: '',
    origin: typeof window !== 'undefined' ? window.location.origin : '',
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Build query string
  const params = new URLSearchParams();
  Object.entries(mergedOptions).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== 0) {
      params.append(key, String(value));
    }
  });
  
  // Add playlist for loop functionality
  if (mergedOptions.loop) {
    params.append('playlist', videoId);
  }
  
  return {
    embedUrl: `https://www.youtube.com/embed/${videoId}?${params.toString()}`,
    videoId,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    thumbnailUrlHQ: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    thumbnailUrlMQ: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    thumbnailUrlSD: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
  };
}

/**
 * Get YouTube thumbnail URL
 * 
 * Quality options:
 * - maxresdefault.jpg (1280x720) - May not exist for all videos
 * - sddefault.jpg (640x480)
 * - hqdefault.jpg (480x360)
 * - mqdefault.jpg (320x180)
 * - default.jpg (120x90)
 * 
 * @param url - YouTube URL or video ID
 * @param quality - Thumbnail quality
 * @returns Thumbnail URL or null
 */
export function getYouTubeThumbnail(
  url: string | null | undefined,
  quality: 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault' | 'default' = 'maxresdefault'
): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Get thumbnail with fallback (maxres may not exist)
 * 
 * @param url - YouTube URL or video ID
 * @returns Thumbnail URL or null
 */
export async function getYouTubeThumbnailWithFallback(
  url: string | null | undefined
): Promise<string | null> {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  const qualities: Array<'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault'> = [
    'maxresdefault',
    'sddefault',
    'hqdefault',
    'mqdefault',
  ];
  
  for (const quality of qualities) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    
    try {
      const response = await fetch(thumbnailUrl, { method: 'HEAD' });
      if (response.ok) {
        return thumbnailUrl;
      }
    } catch {
      continue;
    }
  }
  
  // Fallback to default
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

