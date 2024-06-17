export default function checkLength(str) {
  if (str) {
    const verification = str.trim();
    if (verification.length !== 0) {
      return true;
    }
  }

  return false;
}
