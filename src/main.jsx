import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight, BookOpen, Check, Clipboard, Database, Github, Menu, Play, X, Zap } from 'lucide-react';
import './styles.css';

const authors = [
  ['Yujun Huo', 'Beihang University'], ['He Zhang', 'Tsinghua University'],
  ['Chentao Song', 'Tsinghua University'], ['Honglin Song', 'Tsinghua University'],
  ['Zongyu Zuo', 'Beihang University'], ['Tao Yu', 'Tsinghua University']
];

const bibtex = `@article{huo2026biohuman,
  title   = {BioHuman: Learning Biomechanical Human
             Representations from Video},
  author  = {Huo, Yujun and Zhang, He and Song, Chentao and
             Song, Honglin and Zuo, Zongyu and Yu, Tao},
  journal = {arXiv preprint arXiv:2605.14772},
  year    = {2026}
}`;

function Logo() {
  return <a className="logo" href="#top" aria-label="BioHuman home"><span className="logo-mark"><i/><i/><i/><i/><i/></span><span>BIO<b>HUMAN</b></span></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = () => setOpen(false); window.addEventListener('hashchange', close); return () => window.removeEventListener('hashchange', close); }, []);
  return <header><div className="nav-wrap"><Logo/><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button><nav className={open ? 'open' : ''}>
    <a href="#overview">Overview</a><a href="#method">Method</a><a href="#dataset">Dataset</a><a href="#results">Results</a><a href="#citation">Citation</a>
    <a className="nav-cta" href="https://arxiv.org/abs/2605.14772" target="_blank">Read paper <ArrowUpRight/></a>
  </nav></div></header>;
}

function MediaSlot({kind='video', title, path, className=''}) {
  return <div className={`media-slot ${className}`} data-replace={path}>
    <div className="scan"/><div className="slot-figure"><span className="figure-head"/><span className="figure-torso"/><span className="figure-arm left"/><span className="figure-arm right"/><span className="figure-leg left"/><span className="figure-leg right"/><span className="muscle m1"/><span className="muscle m2"/><span className="muscle m3"/></div>
    {kind === 'video' ? <span className="play"><Play fill="currentColor"/></span> : <Database/>}
    <div className="slot-label"><strong>{title}</strong><span>PLACEHOLDER · {path}</span></div>
  </div>;
}

function App() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(bibtex); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return <><Header/><main id="top">
    <section className="hero">
      <div className="hero-grid"/><div className="orb one"/><div className="orb two"/>
      <div className="eyebrow"><span>COMPUTER VISION · BIOMECHANICS</span><span>ARXIV 2026</span></div>
      <h1>Seeing motion.<br/><em>Understanding force.</em></h1>
      <p className="deck">Learning biomechanical human representations from monocular video — jointly reconstructing body motion and the muscle activations that drive it.</p>
      <div className="authors">{authors.map(([name, org]) => <div key={name}><a href="#citation">{name}</a><small>{org}</small></div>)}</div>
      <div className="hero-actions"><a className="button primary" href="https://arxiv.org/pdf/2605.14772" target="_blank"><BookOpen/> Paper</a><a className="button" href="#dataset"><Database/> Dataset <span className="soon">SOON</span></a><a className="button" href="#code"><Github/> Code <span className="soon">SOON</span></a></div>
      <a className="scroll" href="#overview">EXPLORE <ArrowDown/></a>
    </section>

    <section className="teaser shell" id="overview"><MediaSlot title="BioHuman overview video / teaser" path="public/media/teaser.mp4" className="wide"/><p className="caption"><b>BioHuman10M</b> aligns real-world visual motion with physics-based musculoskeletal states across five established datasets — pairing images, SMPL motion, OpenSim models, ground reaction forces, and muscle activations.</p></section>

    <section className="abstract shell"><span className="section-no">01 / OVERVIEW</span><div><h2>From pixels to<br/><i>physiology.</i></h2></div><div><p>Understanding human motion beyond surface kinematics is crucial for motion analysis, rehabilitation, and injury risk assessment. Yet progress has been limited by the lack of large-scale datasets with biomechanical annotations.</p><p>We introduce <strong>BioHuman10M</strong>, a simulation-augmented dataset with synchronized video, motion, and activations, and <strong>BioHuman</strong>, an end-to-end model that jointly predicts 3D human motion and 112-dimensional muscle activation from monocular video.</p></div></section>

    <section className="numbers"><div className="shell number-grid"><div><b>10M</b><span>paired frames</span></div><div><b>112</b><span>full-body muscles</span></div><div><b>5</b><span>source datasets</span></div><div><b>1</b><span>monocular video</span></div></div></section>

    <section className="method shell" id="method"><div className="section-heading"><span className="section-no">02 / METHOD</span><h2>One unified representation.<br/>Two complementary signals.</h2><p>Motion and muscle activation are inherently coupled. BioHuman learns them together rather than passing errors through a two-stage pipeline.</p></div>
      <div className="pipeline"><div className="pipe-card"><span>INPUT / 01</span><div className="mini-frame">RGB<small>MONOCULAR VIDEO</small></div><h3>Visual evidence</h3><p>Person crops preserve appearance, orientation, contact, and uncertainty.</p></div><div className="flow">→</div><div className="pipe-card accent"><span>REASON / 02</span><div className="token-field">{Array.from({length:18},(_,i)=><i key={i}/>)}</div><h3>Temporal fusion</h3><p>Interleaved visual and pose tokens reason across time with learned gating.</p></div><div className="flow">→</div><div className="pipe-card"><span>DECODE / 03</span><div className="dual-output"><b>3D</b><b>112</b></div><h3>Joint prediction</h3><p>Separate heads recover SMPL pose and full-body muscle activation.</p></div></div>
      <MediaSlot title="BioHuman pipeline figure" path="public/media/method-pipeline.png" kind="image" className="method-media"/>
    </section>

    <section className="dataset" id="dataset"><div className="shell"><div className="section-heading light"><span className="section-no">03 / DATASET</span><h2>BioHuman10M</h2><p>A bridge between visual observation, human motion, and internal biomechanics.</p></div><div className="dataset-list">{[['MotionPRO','in-the-wild professional motion'],['EMDB','dynamic human motion'],['3DPW','outdoor real-world sequences'],['Human3.6M','controlled motion capture'],['BEDLAM','diverse synthetic humans']].map((d,i)=><div key={d[0]}><span>0{i+1}</span><b>{d[0]}</b><p>{d[1]}</p><ArrowUpRight/></div>)}</div><div className="dataset-note"><Zap/><p><b>Generated with BioSim.</b> SMPL motion is converted to OpenSim kinematics, paired with estimated ground reaction forces, then solved for temporally coherent muscle activations.</p></div></div></section>

    <section className="results shell" id="results"><div className="section-heading"><span className="section-no">04 / RESULTS</span><h2>Stronger biomechanics.<br/>Better motion.</h2><p>Joint learning substantially improves activation timing while preserving accurate pose estimation.</p></div><div className="result-layout"><div className="score-card"><span>MUSCLE ACTIVATION · PCC ↑</span><div className="bars"><div><label>PromptHMR + MinT</label><i style={{'--w':'42%'}}/><b>0.42</b></div><div className="ours"><label>BioHuman</label><i style={{'--w':'71%'}}/><b>0.71</b></div></div><small>BioHuman10M test protocol</small></div><div className="metric-grid"><div><small>RMSE ↓</small><b>0.065</b></div><div><small>nRMSE ↓</small><b>0.71</b></div><div><small>Active MAE ↓</small><b>0.10</b></div><div><small>PCC gain</small><b>+69%</b></div></div></div><div className="qual-grid"><MediaSlot title="Qualitative activation comparison A" path="public/media/result-01.mp4"/><MediaSlot title="Qualitative activation comparison B" path="public/media/result-02.mp4"/></div></section>

    <section className="code shell" id="code"><span className="section-no">05 / RELEASE</span><div><h2>Built for the next layer<br/>of human understanding.</h2><p>Code, model weights, BioSim tools, and BioHuman10M access will be linked here when released.</p></div><div className="release-card"><Github/><div><b>BioHuman</b><span>Repository placeholder</span></div><span className="status">COMING SOON</span></div></section>

    <section className="citation" id="citation"><div className="shell"><div className="section-heading light"><span className="section-no">06 / CITATION</span><h2>Build on our work.</h2></div><div className="cite-box"><pre>{bibtex}</pre><button onClick={copy}>{copied ? <Check/> : <Clipboard/>}{copied ? 'Copied' : 'Copy BibTeX'}</button></div></div></section>
  </main><footer><div className="shell"><Logo/><p>BioHuman · 2026</p><div><a href="https://arxiv.org/abs/2605.14772" target="_blank">arXiv</a><a href="#top">Back to top ↑</a></div></div></footer></>;
}

createRoot(document.getElementById('root')).render(<App/>);
