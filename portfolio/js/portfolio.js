const projects = [
  {id:'cyberguard',demo:'https://cyberguard-xai.netlify.app/',title:'CyberGuard XAI',label:'EXPLAINABLE AI',category:'ai',art:'cyber',symbol:'◈',description:'Making phishing detection understandable.',details:['Built a phishing classifier using DistilBERT with LIME and SHAP explanations and per-word risk-drop scores.','Created an interactive evasion guide with word swap/undo, paginated risk cards, and a live editor with LIME score tooltips.','Deployed a React/Vite frontend to Netlify and a FastAPI backend to Hugging Face Spaces and Render with automated CI/CD.'],stack:['DistilBERT','LIME','SHAP','React','FastAPI']},
  {id:'skillswap',demo:'https://skill-swap.netlify.app/',title:'SkillSwap',label:'FULL-STACK PLATFORM',category:'web',art:'swap',symbol:'⇄',description:'Connecting people through shared skills.',details:['Built a peer skill exchange platform with the MERN stack.','Implemented WebSocket-based real-time messaging and JWT-secured REST APIs.','Deployed with environment-secured configuration, MongoDB data models, and a scalable backend architecture.'],stack:['MongoDB','Express','React','Node.js','WebSockets','JWT']},
  {id:'yolo',title:'Adversarial YOLOv2',label:'COMPUTER VISION RESEARCH',category:'ai',art:'vision',symbol:'⌖',description:'Exploring how vision models can be challenged.',details:['Engineered an interactive adversarial YOLOv2 attack demo used by students.','Hosted on Hugging Face Spaces with a Cloudflare Worker proxy.','Research included replacing evolutionary optimization with a gradient-based method, reducing experiment runtime from 30–60 minutes to under three minutes.'],stack:['YOLOv2','PyTorch','Hugging Face','Cloudflare']},
  {id:'npu',title:'CPU–NPU Benchmarks',label:'HARDWARE SECURITY RESEARCH',category:'ai',art:'chip',symbol:'▦',description:'Understanding performance below the surface.',details:['Designed benchmarking scripts across deep learning workloads on AMD Ryzen AI hardware.','Used fine-grained cycle counting and DRAM contention metrics to analyze NPU execution patterns.','Collected performance data contributing to hardware security research publications.'],stack:['Python','AMD Ryzen AI','XDNA 2','Benchmarking']}
];
projects.push({id:'msumpai',title:'M-Sum-PAI',label:'MULTIMODAL AI',category:'ai',art:'cyber',symbol:'▶',description:'Summaries across text, audio, video, and PDFs.',details:['Designed a performance-aware multimodal summarization system using Gemini 2.5 Flash and AssemblyAI.','Produces structured summaries in paragraph and bullet formats across text, audio, video, and PDF inputs.'],stack:['React','Node.js','Express','Python','Gemini API','AssemblyAI'],demo:'https://transcripto-ai.netlify.app/',source:'https://github.com/3nadh3/AI-Transcriber-Summarize-Frontend'});
let activeProfile='Recruiter';
const profileViews={
 Recruiter:{headline:'Software engineering.<br><em>Proven in production.</em>',bio:'Former IBM watsonx Orchestrate intern. I built four production AI agents, deployed observability across three environments, and reduced error investigation from minutes to seconds. M.S. Computer Science at CMU, expected May 2027.',sections:['highlights','experience','projects','skills','about','credentials','contact'],projects:['cyberguard','skillswap','msumpai'],title:'Selected projects for recruiters',picks:[['Resume','resume/Trinadh_Musunuri_Resume.pdf'],['IBM experience','#experience'],['Technical skills','#skills'],['Education','#about'],['Contact me','#contact']]},
 Developer:{headline:'From API to interface.<br><em>Built end to end.</em>',bio:'Explore the implementations: explainable AI with FastAPI, real-time messaging with MERN and WebSockets, and multimodal summarization with Gemini and AssemblyAI. Open a title for its stack and try the live demo.',sections:['highlights','projects','skills','contact'],projects:['cyberguard','skillswap','msumpai'],title:'Builds you can explore',picks:[['CyberGuard demo','https://cyberguard-xai.netlify.app/'],['SkillSwap demo','https://skill-swap.netlify.app/'],['M-Sum-PAI demo','https://transcripto-ai.netlify.app/'],['Source code','https://github.com/3nadh3/AI-Transcriber-Summarize-Frontend'],['Engineering toolkit','#skills']]},
 Stalker:{headline:'The person<br><em>behind the code.</em>',bio:'I’m Trinadh Musunuri, a Computer Science master’s student at Central Michigan University. My journey connects university research, an IBM internship, and hands-on projects in AI and full-stack development.',sections:['journey','about','credentials','contact'],projects:[],title:'My journey',picks:[['My journey','#journey'],['Education','#about'],['Learning & credentials','#credentials'],['LinkedIn','https://www.linkedin.com/in/trinadh-musunuri/'],['Say hello','#contact']]},
 Adventurer:{headline:'Challenge the model.<br><em>Explore the hardware.</em>',bio:'Explore adversarial vision experiments, CPU–NPU benchmarking, and explainable phishing detection. My CMU research examines model behavior and the hardware performance beneath it.',sections:['highlights','research-focus','projects','contact'],projects:['yolo','npu','cyberguard'],title:'Research and experiments',picks:[['Adversarial vision','#research-focus'],['CPU–NPU benchmarks','#projects'],['Explainable AI','https://cyberguard-xai.netlify.app/'],['Research background','#research-focus'],['Collaborate','#contact']]}
};
const skills = {'Languages':['Python','Java','JavaScript','C','SQL'],'Web & APIs':['React','Node.js','Express','FastAPI','Vite','REST','WebSockets','JWT'],'AI & Agents':['watsonx Orchestrate','MCP','PyTorch','Vertex AI','DistilBERT','YOLOv2','LIME','SHAP','Hugging Face'],'Observability & Infrastructure':['Grafana','Prometheus','Loki','Redis','Docker','CI/CD'],'Cloud':['AWS EC2 / S3 / IAM / RDS / Lambda','Google Cloud','IBM Cloud','Netlify','Render'],'Databases & Tools':['MongoDB','MySQL','PostgreSQL','Git','GitHub','Postman','Bruno','OpenAPI']};
const row = document.querySelector('#project-row');
function renderProjects(filter='all') {
  row.replaceChildren();
  projects.forEach((project,index)=>{
    if(!profileViews[activeProfile].projects.includes(project.id))return;
    if(filter!=='all' && project.category!==filter) return;
    const button=document.createElement('button'); button.className='project-card';
    button.innerHTML=`<span class="poster ${project.art}"><span class="poster-label">T ORIGINAL</span><span class="poster-symbol" aria-hidden="true">${project.symbol}</span><span class="poster-name">${project.title}</span><span class="poster-number">0${index+1}</span></span><span class="card-content"><span class="eyebrow">${project.label}</span><strong>${project.title}</strong><span>${project.description}</span><span class="card-link">Explore title <span aria-hidden="true">↗</span></span></span>`;
    button.addEventListener('click',()=>openProject(project));row.append(button);
  });document.querySelector('#project-count').textContent=`${row.children.length} titles · Engineering projects and research`;
}
function projectLinks(project){return `<div class="actions">${project.demo?`<a class="button primary" href="${project.demo}" target="_blank" rel="noopener noreferrer">▶ Live demo</a>`:''}${project.source?`<a class="button secondary" href="${project.source}" target="_blank" rel="noopener noreferrer">GitHub source ↗</a>`:''}</div>`;}
function openProject(project) {
  document.querySelector('#project-detail').innerHTML=`<div class="detail-art ${project.art}"><span aria-hidden="true">${project.symbol}</span></div><div class="detail-body"><p class="eyebrow">${project.label}</p><h2 id="project-title">${project.title}</h2><p>${project.description}</p><ul>${project.details.map(x=>`<li>${x}</li>`).join('')}</ul><div class="tags">${project.stack.map(x=>`<span>${x}</span>`).join('')}</div>${projectLinks(project)}</div>`;
  document.querySelector('#project-dialog').showModal();
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===button);x.setAttribute('aria-pressed',String(x===button));});renderProjects(button.dataset.filter);}));
document.querySelector('#skill-grid').innerHTML=Object.entries(skills).map(([category,items],index)=>`<article><span class="skill-number">0${index+1}</span><h3>${category}</h3><div class="tags">${items.map(x=>`<span>${x}</span>`).join('')}</div></article>`).join('');
const profiles=document.querySelector('#profiles');
document.querySelector('#profile-toggle').addEventListener('click',()=>profiles.showModal());
document.querySelectorAll('[data-profile]').forEach(button=>button.addEventListener('click',()=>{
  const profile=button.dataset.profile; document.querySelector('#profile-toggle').textContent=profile[0];document.querySelector('#profile-toggle').setAttribute('aria-label',`${profile} view: change profile`);profiles.close();
  try {sessionStorage.setItem('portfolio-profile',profile);}catch {}
  applyProfile(profile);
  const section='home';
  
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
  if(entering)return;entering=true;enter.disabled=true;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started=false,startFallback;
  const finishIntro=()=>{
    intro.hidden=true;intro.classList.remove('entering','intro-loading');
    profiles.showModal();profiles.classList.add('profiles-arriving');
    setTimeout(()=>profiles.classList.remove('profiles-arriving'),600);
  };
  const startSequence=()=>{
    if(started)return;started=true;clearTimeout(startFallback);
    intro.classList.remove('intro-loading');
    if(reduced){finishIntro();return;}
    const duration=Number.isFinite(introAudio.duration)?Math.max(3600,Math.min(6000,introAudio.duration*1000)):4100;
    intro.style.setProperty('--intro-duration',duration+'ms');
    intro.classList.add('entering');
    setTimeout(finishIntro,duration);
  };
  intro.classList.add('intro-loading');
  if(soundEnabled){
    introAudio.addEventListener('playing',startSequence,{once:true});
    // Begin the reveal with actual audio playback, rather than the network request.
    startFallback=setTimeout(()=>{introAudio.pause();startSequence();},1800);
    introAudio.play().catch(startSequence);
  }else startSequence();
});
document.querySelector('#video-mute').addEventListener('click',()=>{heroVideo.muted=!heroVideo.muted;document.querySelector('#video-mute').textContent=heroVideo.muted?'Unmute ♫':'Mute ♫';document.querySelector('#video-mute').setAttribute('aria-pressed',String(!heroVideo.muted));});
let previousProfile;try{previousProfile=sessionStorage.getItem('portfolio-profile');}catch{}
applyProfile(avatarFiles[previousProfile]?previousProfile:'Recruiter');
if(!previousProfile&&!location.hash){intro.hidden=false;}


function applyProfile(profile){
 activeProfile=profile;const view=profileViews[profile];setProfileMedia(profile);
 document.querySelector('.hero-content h1').innerHTML=view.headline;
 document.querySelector('.hero-content .intro').textContent=view.bio;
 document.querySelectorAll('.catalog>section').forEach(section=>{section.hidden=section.id!=='top-picks'&&!view.sections.includes(section.id);});
 document.querySelector('#projects h2').textContent=view.title;
 document.querySelector('.picks-row').innerHTML=view.picks.map(([label,url])=>`<a class="pick" href="${url}" ${url.startsWith('http')||url.endsWith('.pdf')?'target="_blank" rel="noopener noreferrer"':''}><span>${label}</span></a>`).join('');
 const nav=document.querySelector('header nav');nav.innerHTML=[['Home','home'],...view.sections.filter(id=>!['highlights','contact'].includes(id)).map(id=>[{experience:'Experience',projects:'Projects',skills:'Skills',about:'Education',credentials:'Credentials',journey:'My journey','research-focus':'Research'}[id],id]),['Contact','contact']].map(([label,id])=>`<a href="#${id}">${label}</a>`).join('');
 document.querySelectorAll('[data-filter]').forEach(button=>{button.classList.toggle('active',button.dataset.filter==='all');button.setAttribute('aria-pressed',String(button.dataset.filter==='all'));});
 document.querySelector('#profile-toggle').setAttribute('aria-label',profile+' view: change profile');
 const highlight=document.querySelector('#highlights');highlight.dataset.view=profile;
 highlight.querySelector('h2').textContent=profile==='Adventurer'?'Research with measurable results':profile==='Developer'?'What these builds demonstrate':'Impact at a glance';
 const metrics=profile==='Developer'?[['Explainable AI','DistilBERT, LIME & SHAP','cyberguard'],['Real-time messaging','WebSockets & JWT','skillswap'],['Multimodal summaries','Text, audio, video & PDFs','msumpai']]:profile==='Adventurer'?[['Under 3 min','Adversarial experiments; previously 30–60 min',''],['CPU ↔ NPU','AMD Ryzen AI performance profiling',''],['Interactive demo','YOLOv2 experiments used by students','']]:[['4 production agents','Slack, Teams & phone integrations',''],['10–20 seconds','Error investigation; previously 10–15 min',''],['3 environments','Dev, Staging & Production observability','']];
 highlight.querySelector('.impact-grid').innerHTML=metrics.map(([value,label,id])=>`<article><strong>${value}</strong><p>${label}</p>${id?projectLinks(projects.find(p=>p.id===id)):''}</article>`).join('');
 renderProjects();
 if(location.hash){const target=document.getElementById(location.hash.slice(1));if(target?.hidden)history.replaceState(null,'',location.pathname);}
}
