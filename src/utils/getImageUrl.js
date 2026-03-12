const images = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
});

export function getImageUrl(path) {
  // Normalize: "assets/images/projects/project1.png" -> "../assets/images/projects/project1.png"
  const normalized = path.replace(/^\/?(assets\/images\/)/, '../assets/images/');
  return images[normalized] || '/' + path.replace(/^\//, '');
}
