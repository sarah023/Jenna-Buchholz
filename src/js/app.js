const pixelsTag = document.querySelector('div.pixels');
const bodyTag = document.querySelector('body');
const progressTag = document.querySelector('div.progress');
const sections = document.querySelectorAll('section');
const clientTag = document.querySelector('div.client');
const pageTag = document.querySelector('div.page');
const headerTag = document.querySelector('header');

//updates pixel tag to say how far we scroll
document.addEventListener('scroll', () => {
  const pixels = window.pageYOffset;

  pixelsTag.innerHTML = pixels;
});

//makes a progress bar that tracks the distance scrolled down across the page
document.addEventListener('scroll', () => {
  const pixels = window.pageYOffset;
  const pageHeight = bodyTag.getBoundingClientRect().height;
  const totalScrollableDistance = pageHeight - window.innerHeight;
  const percentage = pixels / totalScrollableDistance;

  progressTag.style.width = `${100 * percentage}%`;
});

//1. when page is scrolled - see how far down the page we've scrolled
//2. then for each section, check whether we've passed it
//3. if so, the update the text in the header
//4. and colour scheme (if applicable)
document.addEventListener('scroll', () => {
  const pixels = window.pageYOffset;

  sections.forEach(section => {
    if (section.offsetTop - 60 <= pixels) {
      clientTag.innerHTML = section.getAttribute('data-client');
      pageTag.innerHTML = section.getAttribute('data-page');

      if (section.hasAttribute('data-is-dark')) {
        headerTag.classList.add('white');
        progressTag.classList.add('white');
      } else {
        headerTag.classList.remove('white');
        progressTag.classList.remove('white');
      }
    }
  });
});

//1. when we scroll, makes things parallax
//2. move certain tags, based on how far they are away from an anchor point
//3. the anchor point will be the middle of the section
//4. the ratio of the middle distance scrolled to the middle point of the anchor point is the length of the parallax
document.addEventListener('scroll', () => {
  const topViewport = window.pageYOffset;
  const midViewport = topViewport + window.innerHeight / 2;

  sections.forEach(section => {
    const topSection = section.offsetTop;
    const midSection = topSection + section.offsetHeight / 2;
    const distanceToSection = midViewport - midSection;

    const parallaxTags = section.querySelectorAll('[data-parallax]');
    //loop over each parallax tags
    parallaxTags.forEach(tag => {
      const speed = parseFloat(tag.getAttribute('data-parallax'));
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`;
    });
  });
});
