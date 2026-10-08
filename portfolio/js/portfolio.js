const projects = [
  {title:'CyberGuard XAI',label:'EXPLAINABLE AI',category:'ai',art:'cyber',symbol:'◈',description:'Making phishing detection understandable.',details:['Built a phishing classifier using DistilBERT with LIME and SHAP explanations and per-word risk-drop scores.','Created an interactive evasion guide with word swap/undo, paginated risk cards, and a live editor with LIME score tooltips.','Deployed a React/Vite frontend to Netlify and a FastAPI backend to Hugging Face Spaces and Render with automated CI/CD.'],stack:['DistilBERT','LIME','SHAP','React','FastAPI']},
  {title:'SkillSwap',label:'FULL-STACK PLATFORM',category:'web',art:'swap',symbol:'⇄',description:'Connecting people through shared skills.',details:['Built a peer skill exchange platform with the MERN stack.','Implemented WebSocket-based real-time messaging and JWT-secured REST APIs.','Deployed with environment-secured configuration, MongoDB data models, and a scalable backend architecture.'],stack:['MongoDB','Express','React','Node.js','WebSockets','JWT']},
  {title:'Adversarial YOLOv2',label:'COMPUTER VISION RESEARCH',category:'ai',art:'vision',symbol:'⌖',description:'Exploring how vision models can be challenged.',details:['Engineered an interactive adversarial YOLOv2 attack demo used by students.','Hosted on Hugging Face Spaces with a Cloudflare Worker proxy.','Research included replacing evolutionary optimization with a gradient-based method, reducing experiment runtime from 30–60 minutes to under three minutes.'],stack:['YOLOv2','PyTorch','Hugging Face','Cloudflare']},
  {title:'CPU–NPU Benchmarks',label:'HARDWARE SECURITY RESEARCH',category:'ai',art:'chip',symbol:'▦',description:'Understanding performance below the surface.',details:['Designed benchmarking scripts across deep learning workloads on AMD Ryzen AI hardware.','Used fine-grained cycle counting and DRAM contention metrics to analyze NPU execution patterns.','Collected performance data contributing to hardware security research publications.'],stack:['Python','AMD Ryzen AI','XDNA 2','Benchmarking']}
];
const skills = {'Languages':['Python','Java','JavaScript','C','SQL'],'Web & APIs':['React','Node.js','Express','FastAPI','Vite','REST','WebSockets','JWT'],'AI & Agents':['watsonx Orchestrate','MCP','PyTorch','Vertex AI','DistilBERT','YOLOv2','LIME','SHAP','Hugging Face'],'Observability & Infrastructure':['Grafana','Prometheus','Loki','Redis','Docker','CI/CD'],'Cloud':['AWS EC2 / S3 / IAM / RDS / Lambda','Google Cloud','IBM Cloud','Netlify','Render'],'Databases & Tools':['MongoDB','MySQL','PostgreSQL','Git','GitHub','Postman','Bruno','OpenAPI']};
const row = document.querySelector('#project-row');
function renderProjects(filter='all') {
  row.replaceChildren();
  projects.forEach((project,index)=>{
    if(filter!=='all' && project.category!==filter) return;
    const button=document.createElement('button'); button.className='project-card';
    button.innerHTML=`<span class="poster ${project.art}"><span class="poster-label">T ORIGINAL</span><span class="poster-symbol" aria-hidden="true">${project.symbol}</span><span class="poster-name">${project.title}</span><span class="poster-number">0${index+1}</span></span><span class="card-content"><span class="eyebrow">${project.label}</span><strong>${project.title}</strong><span>${project.description}</span><span class="card-link">Explore title <span aria-hidden="true">↗</span></span></span>`;
    button.addEventListener('click',()=>openProject(project));row.append(button);
  });document.querySelector('#project-count').textContent=`${row.children.length} titles · Engineering projects and research`;
}
function openProject(project) {
  document.querySelector('#project-detail').innerHTML=`<div class="detail-art ${project.art}"><span aria-hidden="true">${project.symbol}</span></div><div class="detail-body"><p class="eyebrow">${project.label}</p><h2 id="project-title">${project.title}</h2><p>${project.description}</p><ul>${project.details.map(x=>`<li>${x}</li>`).join('')}</ul><div class="tags">${project.stack.map(x=>`<span>${x}</span>`).join('')}</div></div>`;
  document.querySelector('#project-dialog').showModal();
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===button);x.setAttribute('aria-pressed',String(x===button));});renderProjects(button.dataset.filter);}));
document.querySelector('#skill-grid').innerHTML=Object.entries(skills).map(([category,items],index)=>`<article><span class="skill-number">0${index+1}</span><h3>${category}</h3><div class="tags">${items.map(x=>`<span>${x}</span>`).join('')}</div></article>`).join('');
const profiles=document.querySelector('#profiles');
document.querySelector('#profile-toggle').addEventListener('click',()=>profiles.showModal());
document.querySelectorAll('[data-profile]').forEach(button=>button.addEventListener('click',()=>{
  const profile=button.dataset.profile; document.querySelector('#profile-toggle').textContent=profile[0];document.querySelector('#profile-toggle').setAttribute('aria-label',`${profile} view: change profile`);profiles.close();
  try {sessionStorage.setItem('portfolio-profile',profile);}catch {}
  setProfileMedia(profile);
  const section='home';
  if(profile==='Developer')document.querySelector('[data-filter="ai"]').click();else document.querySelector('[data-filter="all"]').click();
  document.getElementById(section).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}}));
renderProjects();document.querySelector('#year').textContent=new Date().getFullYear();
const referenceBase='https://raw.githubusercontent.com/shamihsnn/netflix-portfolio/6f691190bebcbcae9a16ec7bcf092201ff5eb71f/public/';
const avatarFiles={Recruiter:'27c510dc-dc9f-4470-a7b9-34279eb80bca.jpeg',Developer:'c475c34c-8f67-467b-a5d4-f5421e323810.jpg',Stalker:'1f10192c-5884-49ba-b201-08f2144721b6.jpg',Adventurer:'825adb96-f01f-42ec-8650-1bbaebffd433.jpg'};
const videoFiles={Recruiter:'background.mp4',Developer:'coding.mp4',Stalker:'stalker.mp4',Adventurer:'adventurer-background.mp4'};
const heroVideo=document.querySelector('#hero-video');
function setProfileMedia(profile){
  heroVideo.src=referenceBase+'video/'+videoFiles[profile];
  heroVideo.muted=true;document.querySelector('#video-mute').textContent='Unmute ♫';document.querySelector('#video-mute').setAttribute('aria-pressed','false');
  heroVideo.play().catch(()=>{});
  document.querySelector('#picks-title').textContent="Today's Top Picks for "+profile.toLowerCase();
  document.querySelector('#profile-toggle').style.backgroundImage=`url(${referenceBase}lovable-uploads/${avatarFiles[profile]})`;
  document.querySelector('#profile-toggle').textContent='';
}
for(const image of document.querySelectorAll('[data-avatar]'))image.src=referenceBase+'lovable-uploads/'+avatarFiles[image.dataset.avatar];
const intro=document.querySelector('#intro-screen'),enter=document.querySelector('#enter-portfolio');
const introAudio=new Audio(referenceBase+'tudum.mp3');introAudio.preload='auto';introAudio.volume=.7;
let soundEnabled=true,entering=false;
document.querySelector('#intro-mute').addEventListener('click',()=>{soundEnabled=!soundEnabled;introAudio.muted=!soundEnabled;document.querySelector('#intro-mute').textContent=soundEnabled?'Sound on ♫':'Sound off';document.querySelector('#intro-mute').setAttribute('aria-pressed',String(!soundEnabled));});
enter.addEventListener('click',()=>{
  if(entering)return;entering=true;
  if(soundEnabled)introAudio.play().catch(()=>{});
  intro.classList.add('entering');enter.disabled=true;
  setTimeout(()=>{intro.hidden=true;profiles.showModal();},matchMedia('(prefers-reduced-motion: reduce)').matches?0:3000);
});
document.querySelector('#video-mute').addEventListener('click',()=>{heroVideo.muted=!heroVideo.muted;document.querySelector('#video-mute').textContent=heroVideo.muted?'Unmute ♫':'Mute ♫';document.querySelector('#video-mute').setAttribute('aria-pressed',String(!heroVideo.muted));});
let previousProfile;try{previousProfile=sessionStorage.getItem('portfolio-profile');}catch{}
setProfileMedia(avatarFiles[previousProfile]?previousProfile:'Recruiter');
if(!previousProfile&&!location.hash){intro.hidden=false;enter.focus();}

