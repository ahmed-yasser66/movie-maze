export default function setMetaTags({ title, description, image, url }) {
  const urls = ['meta[property="og:url"]', 'meta[property="twitter:url"]'];
  const descriptions = [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[property="twitter:description"]',
  ];
  const titles = [
    'meta[property="og:title"]',
    'meta[property="twitter:title"]',
  ];
  const images = [
    'meta[property="og:image"]',
    'meta[property="twitter:image"]',
  ];

  //setting titles
  document.title = title;
  titles.forEach(($title) => {
    document.querySelector($title).setAttribute("content", title);
  });

  //setting descriptions
  descriptions.forEach(($description) => {
    document.querySelector($description).setAttribute("content", description);
  });

  //setting urls
  urls.forEach(($url) => {
    document.querySelector($url).setAttribute("content", url);
  });

  //setting images
  images.forEach(($image) => {
    document.querySelector($image).setAttribute("content", image);
  });
}
