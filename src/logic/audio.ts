const GITHUB_AUDIO_PREFIX =
  "https://raw.githubusercontent.com/Xatpy/thesoundstable/main/";

const configuredAudioCdn = process.env.REACT_APP_AUDIO_CDN_URL?.replace(/\/$/, "");

/**
 * Keeps existing board metadata compatible while allowing deployments to move audio
 * to a first-party CDN by setting REACT_APP_AUDIO_CDN_URL at build time.
 */
export const getAudioUrl = (sourceUrl: string): string => {
  if (!configuredAudioCdn || !sourceUrl.startsWith(GITHUB_AUDIO_PREFIX)) {
    return sourceUrl;
  }

  return `${configuredAudioCdn}/${sourceUrl.slice(GITHUB_AUDIO_PREFIX.length)}`;
};
