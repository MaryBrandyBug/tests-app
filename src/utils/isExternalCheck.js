export default function isExternalLink(url) {
  const regex = /^https?:\/\//;
  return regex.test(url);
}
