const authors = [
  ['Yujun Huo','*1','https://yujunhuo.github.io/'], ['He Zhang','*2','https://dblp.org/pid/24/2058-15.html'],
  ['Chentao Song','2','https://chentao-song.github.io/'],
  ['Honglin Song','2',''], ['Zongyu Zuo','†1','https://shi.buaa.edu.cn/zuozongyu/zh_CN/index.htm'],
  ['Tao Yu','†2','https://ytrock.com/']
];
const bibtex = `@article{huo2026biohuman,
  title   = {BioHuman: Learning Biomechanical Human Representations from Video},
  author  = {Huo, Yujun and Zhang, He and Song, Chentao and Song, Honglin and Zuo, Zongyu and Yu, Tao},
  journal = {arXiv preprint arXiv:2605.14772},
  year    = {2026}
}`;
const media = (title,path,type='video') => `<figure class="media-slot" data-path="${path}" data-type="${type}"><div class="placeholder"><span>${type==='video'?'▶':'▧'}</span><b>${title}</b><small>${path}</small></div></figure>`;

document.querySelector('#root').innerHTML = `
<main>
  <section class="hero container">
    <h1><span>BioHuman:</span> Learning Biomechanical Human Representations from Video</h1>
    <div class="authors">${authors.map(a=>a[2]?`<a href="${a[2]}" target="_blank" rel="noopener">${a[0]}<sup>${a[1]}</sup></a>`:`<span>${a[0]}<sup>${a[1]}</sup></span>`).join('')}</div>
    <div class="affiliations"><sup>1</sup> Beihang University &nbsp;&nbsp;&nbsp; <sup>2</sup> Tsinghua University</div>
    <div class="contribution"><span><sup>*</sup> Equal contribution.</span><span><sup>†</sup> Corresponding authors.</span></div>
    <div class="links">
      <a href="https://arxiv.org/pdf/2605.14772" target="_blank"><b>▤</b> Paper</a>
      <a href="https://arxiv.org/abs/2605.14772" target="_blank"><img class="brand-icon" src="https://cdn.simpleicons.org/arxiv/ffffff" alt=""> arXiv</a>
      <span class="soon-link"><a href="#" aria-disabled="true"><img class="brand-icon" src="https://cdn.simpleicons.org/github/ffffff" alt=""> Code</a><i>Coming soon</i></span>
      <span class="soon-link"><a href="#" aria-disabled="true"><b>▦</b> Dataset</a><i>Coming soon</i></span>
      <a href="#bibtex"><b>“</b> BibTeX</a>
    </div>
  </section>

  <section class="container visual-first">
    ${media('BioHuman teaser / overview','public/media/teaser6.png','image')}
    <p class="headline">BioHuman learns both visible human motion and the internal muscle activations that drive it directly from monocular video.</p>
  </section>

  <section class="container narrow text-section">
    <h2>Abstract</h2>
    <p>We introduce <b>BioHuman10M</b>, a large-scale dataset pairing video and motion with biomechanical annotations, and <b>BioHuman</b>, an end-to-end model that jointly predicts SMPL motion and 112 full-body muscle activations. Joint visual–kinematic learning improves biomechanical prediction while maintaining accurate motion reconstruction.</p>
  </section>

  <section class="container visual-first">
    <h2>Overview</h2>
    ${media('BioHuman pipeline','public/media/pipeline完整视频.mov')}
    <p class="caption">Visual features and pose tokens are jointly modeled across time, then decoded into 3D pose and muscle activation.</p>
  </section>

  <section class="container narrow" id="bibtex">
    <h2>BibTeX</h2>
    <div class="bib"><pre>${bibtex}</pre><button>Copy</button></div>
  </section>
</main>
<footer><p>BioHuman Project Page · 2026</p><p>Template style inspired by the <a href="https://nerfies.github.io/" target="_blank">Academic Project Page</a>.</p></footer>`;

document.querySelectorAll('.media-slot').forEach(slot=>{
  const path=slot.dataset.path;
  const asset=document.createElement(slot.dataset.type==='image'?'img':'video');
  asset.src=path; asset.className='asset';
  if(asset.tagName==='VIDEO'){asset.controls=true;asset.autoplay=true;asset.playsInline=true;asset.loop=true;asset.muted=true;asset.defaultMuted=true;asset.addEventListener('loadeddata',()=>{slot.classList.add('loaded');asset.play().catch(()=>{})})}
  else asset.addEventListener('load',()=>slot.classList.add('loaded'));
  slot.prepend(asset);
});
document.querySelector('.bib button').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(bibtex)}catch{}e.currentTarget.textContent='Copied!';setTimeout(()=>e.currentTarget.textContent='Copy',1500)});
