/* Brand.bz — free brand-building tools (100% client-side) */
(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function copy(t){(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){toast('Copied: '+t.slice(0,40))}).catch(function(){var x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();document.execCommand('copy');x.remove();toast('Copied')})}
window.bbCopy=copy;
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]/g,'')}
function checkLinks(n){var s=slug(n);return '<a target="_blank" rel="noopener nofollow" href="https://instantdomainsearch.com/?q='+s+'">.com</a><a target="_blank" rel="noopener nofollow" href="https://www.namecheap.com/domains/registration/results/?domain='+s+'.bz">.bz</a><a target="_blank" rel="noopener nofollow" href="https://tmsearch.uspto.gov/search/search-results?query='+s+'">USPTO</a><a target="_blank" rel="noopener nofollow" href="https://ised-isde.canada.ca/cipo/trademark-search/srch?lang=eng&query='+s+'">CIPO</a><a target="_blank" rel="noopener nofollow" href="https://branddb.wipo.int/en/quicksearch?by=brandName&v='+s+'">WIPO</a><a target="_blank" rel="noopener nofollow" href="https://www.instagram.com/'+s+'/">IG</a><a target="_blank" rel="noopener nofollow" href="https://x.com/'+s+'">X</a>'}

/* ---------- Name generator ---------- */
var PRE=['go','my','get','try','hey','neo','pro','up','the','meta','true','bold','bright','swift','nova','zen','pure','prime','peak','next'];
var SUF=['ly','ify','io','ora','ex','iva','able','hub','lab','works','co','hq','base','nest','spark','wave','loop','craft','forge','mint','path','scape','stack','verse','kit','ity','ster','oo','ia','eo'];
var VIBE={modern:['flux','grid','pulse','sync','node','shift','volt','core'],playful:['pop','bloom','jolly','fizz','bean','doodle','wiggle','sprout'],luxury:['aurum','velvet','noir','regal','opal','lux','maison','crest'],trust:['anchor','harbor','keystone','shield','steady','true','solid','pillar'],eco:['leaf','terra','moss','fern','sol','river','grove','seed'],tech:['byte','quant','logic','cloud','pixel','vector','cipher','data']};
function blend(a,b){var i=Math.max(2,Math.ceil(a.length*0.6)),j=Math.floor(b.length*0.4);return a.slice(0,i)+b.slice(j)}
function dropVowels(w){return w.length>4?w[0]+w.slice(1).replace(/[aeiou]/g,''):w}
function invent(seed){var C='bcdfgklmnprstvz',V='aeiou',o='';var len=2+Math.floor(Math.random()*2);for(var i=0;i<len;i++)o+=pick(C.split(''))+pick(V.split(''));return (seed?seed.slice(0,2):'')+o}
function genNames(kw,vibe,style,max){
  var words=kw.toLowerCase().split(/[\s,]+/).map(function(w){return w.replace(/[^a-z]/g,'')}).filter(Boolean);if(!words.length)words=['brand'];
  var vibeW=VIBE[vibe]||[].concat(VIBE.modern,VIBE.trust),out={};
  function add(n){n=n.replace(/[^a-z]/g,'');if(n.length<3||n.length>14)return;if(style==='short'&&n.length>7)return;out[cap(n)]=1}
  for(var t=0;t<400&&Object.keys(out).length<max;t++){
    var w=pick(words),v=pick(vibeW),r=Math.random();
    if(style==='invented'){add(invent(w));add(blend(w,invent('')));continue}
    if(style==='compound'){add(w+v);add(v+w);continue}
    if(r<.18)add(w+pick(SUF));else if(r<.32)add(pick(PRE)+w);else if(r<.48)add(blend(w,v));else if(r<.58)add(blend(v,w));else if(r<.68)add(w+v);else if(r<.76)add(dropVowels(w)+pick(['ly','r','io','a']));else if(r<.84)add(invent(w));else if(r<.92&&words.length>1)add(blend(words[0],words[1]));else add(v+pick(SUF));
  }
  return shuffle(Object.keys(out)).slice(0,max);
}
function favs(){try{return JSON.parse(localStorage.getItem('bb-favs')||'[]')}catch(e){return[]}}
function setFavs(a){try{localStorage.setItem('bb-favs',JSON.stringify(a))}catch(e){}}
function renderFavs(){var b=$('#favList');if(!b)return;var f=favs();b.innerHTML=f.length?f.map(function(n){return '<span class="chip on">'+esc(n)+'</span>'}).join(''):'<span class="muted small">Tap ♥ on a name to save it here (stored only in your browser).</span>'}
function initNameGen(){
  var f=$('#nameGen');if(!f)return;renderFavs();
  f.addEventListener('submit',function(e){e.preventDefault();
    var kw=$('#ngKw').value,vibe=$('#ngVibe').value,style=$('#ngStyle').value,res=genNames(kw,vibe,style,30),box=$('#ngResults'),fv=favs();
    box.innerHTML=res.map(function(n){return '<div class="name-card reveal in"><button class="fav'+(fv.indexOf(n)>-1?' on':'')+'" data-n="'+esc(n)+'" aria-label="Save">♥</button><div class="nm">'+esc(n)+'</div><div class="links">'+checkLinks(n)+'</div></div>'}).join('');
    $$('.fav',box).forEach(function(b){b.addEventListener('click',function(){var n=b.getAttribute('data-n'),a=favs(),i=a.indexOf(n);if(i>-1)a.splice(i,1);else a.push(n);setFavs(a);b.classList.toggle('on');renderFavs()})});
  });
  var c=$('#clearFavs');if(c)c.addEventListener('click',function(){setFavs([]);renderFavs();$$('.fav.on').forEach(function(b){b.classList.remove('on')})});
}

/* ---------- Slogan generator ---------- */
var SLOG=['{B}. {Ben}, made simple.','Where {kw} meets {ben}.','{Ben} starts here.','The smarter way to {kw}.','{B} — {ben} for everyone.','Built for {aud}. Loved for {ben}.','Less hassle. More {ben}.','{Ben}, delivered.','Your {kw}, elevated.','Think {kw}. Think {B}.','{B}: because {aud} deserve {ben}.','Make every {kw} count.','Simply better {kw}.','{Ben} you can feel.','From idea to {ben}.','{Kw} without compromise.','The future of {kw} is {ben}.','Small brand. Big {ben}.','{Kw} that works as hard as you do.','Trusted by {aud}. Powered by {ben}.','Do {kw} differently.','{B}. Always {ben}.','Every {kw}, beautifully {ben}.','Go further with {B}.'];
function initSlogan(){var f=$('#sloganGen');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();
  var B=$('#sgName').value.trim()||'Your Brand',kw=$('#sgKw').value.trim().toLowerCase()||'business',ben=$('#sgBen').value.trim().toLowerCase()||'growth',aud=$('#sgAud').value.trim().toLowerCase()||'people';
  var out=shuffle(SLOG.slice()).slice(0,14).map(function(t){return t.replace(/\{B\}/g,B).replace(/\{kw\}/g,kw).replace(/\{Kw\}/g,cap(kw)).replace(/\{ben\}/g,ben).replace(/\{Ben\}/g,cap(ben)).replace(/\{aud\}/g,aud)});
  $('#sgResults').innerHTML=out.map(function(s){return '<div class="name-card"><div class="nm" style="font-size:1.1rem">'+esc(s)+'</div><button class="btn btn-ghost btn-sm" onclick="bbCopy(this.previousElementSibling.textContent)">Copy</button></div>'}).join('');
})}

/* ---------- Color palette ---------- */
function hsl2hex(h,s,l){s/=100;l/=100;var k=function(n){return(n+h/30)%12},a=s*Math.min(l,1-l),f=function(n){return l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)))};return '#'+[f(0),f(8),f(4)].map(function(x){return Math.round(x*255).toString(16).padStart(2,'0')}).join('')}
function hex2rgb(h){h=h.replace('#','');return[parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]}
function lum(h){return hex2rgb(h).map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce(function(a,v,i){return a+v*[.2126,.7152,.0722][i]},0)}
function contrast(a,b){var x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function hex2hue(hex){var c=hex2rgb(hex).map(function(v){return v/255}),mx=Math.max.apply(0,c),mn=Math.min.apply(0,c),d=mx-mn,h=0;if(d){if(mx===c[0])h=((c[1]-c[2])/d)%6;else if(mx===c[1])h=(c[2]-c[0])/d+2;else h=(c[0]-c[1])/d+4}return (h*60+360)%360}
var pal=[],locked=[false,false,false,false,false];
function genPalette(mode,base){
  var h=base!=null?base:Math.random()*360,offs={analogous:[0,25,-25,50,-50],complementary:[0,180,0,180,30],triadic:[0,120,240,0,120],split:[0,150,210,0,30],mono:[0,0,0,0,0]}[mode]||[0,30,180,210,60];
  var light=[48,62,38,90,16],sat=[72,60,55,25,30];
  return offs.map(function(o,i){return hsl2hex((h+o+360)%360,mode==='mono'?60-i*8:sat[i],mode==='mono'?[20,35,50,70,92][i]:light[i])});
}
function renderPal(){var b=$('#swatches');if(!b)return;
  b.innerHTML=pal.map(function(c,i){var txt=contrast(c,'#ffffff')>contrast(c,'#16132b')?'#fff':'#16132b';var role=['Primary','Secondary','Accent','Light / Background','Dark / Text'][i];return '<div class="sw" style="background:'+c+';color:'+txt+'" data-i="'+i+'"><button class="lock" data-l="'+i+'" title="Lock">'+(locked[i]?'🔒':'🔓')+'</button>'+c.toUpperCase()+'<small>'+role+' · AA '+(contrast(c,'#fff')>=4.5?'white ✓':contrast(c,'#16132b')>=4.5?'dark ✓':'large text')+'</small></div>'}).join('');
  $$('.sw',b).forEach(function(s){s.addEventListener('click',function(e){if(e.target.classList.contains('lock'))return;copy(pal[+s.getAttribute('data-i')].toUpperCase())})});
  $$('.lock',b).forEach(function(l){l.addEventListener('click',function(){var i=+l.getAttribute('data-l');locked[i]=!locked[i];renderPal()})});
  var css=$('#palCss');if(css)css.value=':root{\n'+pal.map(function(c,i){return '  --brand-'+['primary','secondary','accent','light','dark'][i]+': '+c+';'}).join('\n')+'\n}';
  try{localStorage.setItem('bb-palette',JSON.stringify(pal))}catch(e){}
}
function initPalette(){var b=$('#swatches');if(!b)return;
  function go(){var mode=$('#palMode').value,bh=$('#palBase').value?hex2hue($('#palBase').value):null,np=genPalette(mode,$('#useBase').checked?bh:null);pal=pal.length?pal.map(function(c,i){return locked[i]?c:np[i]}):np;renderPal()}
  $('#palGo').addEventListener('click',go);document.addEventListener('keydown',function(e){if(e.code==='Space'&&e.target===document.body){e.preventDefault();go()}});
  $('#palCopy').addEventListener('click',function(){copy($('#palCss').value)});go();
}

/* ---------- Font pairing ---------- */
var PAIRS=[['Playfair Display','Source Sans 3','Editorial & premium'],['Montserrat','Merriweather','Confident & readable'],['Poppins','Inter','Modern startup'],['Space Grotesk','Inter','Tech & product'],['DM Serif Display','DM Sans','Boutique & elegant'],['Oswald','Lato','Bold & sporty'],['Raleway','Open Sans','Clean & friendly'],['Bebas Neue','Roboto','Loud & punchy'],['Lora','Nunito Sans','Warm & trustworthy'],['Archivo Black','Archivo','Industrial'],['Fraunces','Work Sans','Crafted & quirky'],['Syne','Manrope','Creative studio'],['Cormorant Garamond','Proza Libre','Luxury'],['Rubik','Karla','Playful utility'],['Outfit','Libre Baskerville','Contemporary classic'],['Sora','IBM Plex Sans','Fintech'],['Abril Fatface','Poppins','Fashion'],['Josefin Sans','Mulish','Minimal lifestyle'],['Lexend','Source Serif 4','Education'],['Unbounded','Plus Jakarta Sans','Web3 & bold']];
var loaded={};
function loadFont(f){if(loaded[f])return;loaded[f]=1;var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+f.replace(/ /g,'+')+':wght@400;700&display=swap';document.head.appendChild(l)}
function initFonts(){var b=$('#fontList');if(!b)return;
  function render(){var name=$('#fpName').value||'Your Brand Name',tag=$('#fpTag').value||'A tagline that sets the tone for everything you do.',flt=$('#fpFilter').value.toLowerCase();
    b.innerHTML=PAIRS.filter(function(p){return !flt||p.join(' ').toLowerCase().indexOf(flt)>-1}).map(function(p){loadFont(p[0]);loadFont(p[1]);return '<div class="font-preview"><span class="tag">'+esc(p[2])+'</span><div style="font-family:\''+p[0]+'\';font-size:2.3rem;font-weight:700;line-height:1.1;margin:6px 0">'+esc(name)+'</div><div style="font-family:\''+p[1]+'\';font-size:1.08rem" class="muted">'+esc(tag)+' Body copy in '+p[1]+' keeps long paragraphs comfortable to read on every screen size.</div><div class="small" style="margin-top:10px"><b>'+p[0]+'</b> + '+p[1]+' · <a href="https://fonts.google.com/specimen/'+p[0].replace(/ /g,'+')+'" target="_blank" rel="noopener">Get fonts</a> · <a href="#" onclick="bbCopy(\'font-family: &quot;'+p[0]+'&quot;; /* headings */\\nfont-family: &quot;'+p[1]+'&quot;; /* body */\');return false">Copy CSS</a></div></div>'}).join('')}
  ['#fpName','#fpTag','#fpFilter'].forEach(function(s){$(s).addEventListener('input',render)});render();
}

/* ---------- Brand strength quiz ---------- */
var QZ=[['Can you describe what your brand does in one sentence?','Positioning'],['Do you know exactly who your ideal customer is?','Audience'],['Is your brand name easy to spell and pronounce?','Name'],['Do you own the matching .com (or strong alternative) domain?','Digital'],['Are your social handles consistent across platforms?','Digital'],['Do you use the same logo, colors and fonts everywhere?','Visual identity'],['Do you have a written brand guide (even one page)?','Visual identity'],['Have you checked your name against trademark databases?','Protection'],['Do you have a defined brand voice (how you sound)?','Voice'],['Can customers tell how you differ from competitors?','Differentiation'],['Do you collect and show reviews or testimonials?','Trust'],['Do you track branded search or direct traffic?','Measurement']];
function initQuiz(){var f=$('#quiz');if(!f)return;
  $('#quizQs').innerHTML=QZ.map(function(q,i){return '<div class="quiz-q"><b>'+(i+1)+'. '+esc(q[0])+'</b><div class="opts">'+[['Yes',2],['Partly',1],['No',0]].map(function(o){return '<label class="chip"><input type="radio" name="q'+i+'" value="'+o[1]+'" required>'+o[0]+'</label>'}).join('')+'</div></div>'}).join('');
  $$('#quizQs .chip').forEach(function(c){c.addEventListener('click',function(){var i=$('input',c);setTimeout(function(){$$('input[name="'+i.name+'"]').forEach(function(r){r.parentNode.classList.toggle('on',r.checked)})},0)})});
  f.addEventListener('submit',function(e){e.preventDefault();var s=0,weak=[];QZ.forEach(function(q,i){var v=$('input[name="q'+i+'"]:checked');var n=v?+v.value:0;s+=n;if(n<2&&weak.indexOf(q[1])<0)weak.push(q[1])});
    var pct=Math.round(s/(QZ.length*2)*100),lvl=pct>=80?'Strong brand':pct>=55?'Growing brand':pct>=30?'Emerging brand':'Brand at risk';
    $('#quizOut').innerHTML='<div class="card"><h3>Your Brand Strength Score: <span class="grad-text">'+pct+'/100</span></h3><div class="meter"><i style="width:'+pct+'%"></i></div><p style="margin-top:14px"><b>'+lvl+'.</b> '+(weak.length?'Focus areas: <b>'+weak.join(', ')+'</b>.':'Excellent — keep auditing every six months.')+'</p><p class="muted">Want a personalised action plan for these gaps? Our team reviews brands for free.</p><a class="btn btn-primary" href="audit.html?score='+pct+'">Get my free brand audit →</a></div>';
    $('#quizOut').scrollIntoView({behavior:'smooth'});
  });
}

/* ---------- Positioning statement ---------- */
function initPos(){var f=$('#posGen');if(!f)return;f.addEventListener('input',build);function v(id,d){return($(id).value||d).trim()}
  function build(){var s='For '+v('#psAud','[target customer]')+' who '+v('#psNeed','[need or problem]')+', '+v('#psName','[Brand]')+' is the '+v('#psCat','[category]')+' that '+v('#psBen','[key benefit]')+'. Unlike '+v('#psComp','[alternative]')+', we '+v('#psDiff','[unique difference]')+'.';var o='Only '+v('#psName','[Brand]')+' is the '+v('#psCat','[category]')+' that '+v('#psDiff','[unique difference]')+' for '+v('#psAud','[target customer]')+'.';$('#psOut').textContent=s;$('#psOnly').textContent=o}
  build();$('#psCopy').addEventListener('click',function(){copy($('#psOut').textContent+'\n\n'+$('#psOnly').textContent)});
}

/* ---------- Name checker ---------- */
function initChecker(){var f=$('#nameCheck');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();
  var n=$('#ncName').value.trim(),s=slug(n);if(!s)return;var vow=(s.match(/[aeiouy]/g)||[]).length,syl=Math.max(1,(s.match(/[aeiouy]+/g)||[]).length),cons=(s.match(/[^aeiouy]{3,}/g)||[]).length;
  var score=100;if(s.length>10)score-=(s.length-10)*6;if(s.length<4)score-=10;if(syl>3)score-=(syl-3)*10;score-=cons*12;if(/\d/.test(n))score-=8;if(/-/.test(n))score-=10;if(/(.)\1\1/.test(s))score-=10;score=Math.max(5,Math.min(100,score));
  var tips=[];if(s.length>10)tips.push('Consider a shorter version — names under 10 letters are easier to recall and type.');if(syl>3)tips.push('More than 3 syllables can hurt word-of-mouth.');if(cons)tips.push('Clusters of consonants make it harder to pronounce.');if(/-|\d/.test(n))tips.push('Hyphens and numbers are often misheard when spoken aloud.');if(!tips.length)tips.push('Structurally strong. Next: verify trademarks and domain availability below.');
  $('#ncOut').innerHTML='<div class="card"><h3>'+esc(n)+' — memorability <span class="grad-text">'+score+'/100</span></h3><div class="meter"><i style="width:'+score+'%"></i></div><table><tr><th>Letters</th><td>'+s.length+'</td><th>Syllables (est.)</th><td>'+syl+'</td></tr><tr><th>Vowels</th><td>'+vow+'</td><th>Radio test</th><td>'+(cons||/-|\d/.test(n)?'Needs work':'Pass')+'</td></tr></table><ul>'+tips.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul><p><b>Check availability & conflicts:</b></p><div class="name-card"><div class="links">'+checkLinks(n)+'<a target="_blank" rel="noopener nofollow" href="https://www.google.com/search?q=%22'+encodeURIComponent(n)+'%22">Google</a><a target="_blank" rel="noopener nofollow" href="https://www.tiktok.com/@'+s+'">TikTok</a><a target="_blank" rel="noopener nofollow" href="https://www.youtube.com/@'+s+'">YouTube</a><a target="_blank" rel="noopener nofollow" href="https://euipo.europa.eu/eSearch/#basic/1+1+1+1/100+100+100+100/'+s+'">EUIPO</a></div></div><p class="small muted" style="margin-top:10px">Information only — not legal advice. Consult a trademark professional before filing.</p></div>';
})}

/* ---------- Brand guide builder ---------- */
function initGuide(){var f=$('#guideForm');if(!f)return;
  try{var p=JSON.parse(localStorage.getItem('bb-palette')||'null');if(p)['#gC1','#gC2','#gC3','#gC4','#gC5'].forEach(function(id,i){$(id).value=p[i]})}catch(e){}
  PAIRS.forEach(function(p,i){var o=document.createElement('option');o.value=i;o.textContent=p[0]+' + '+p[1];$('#gFont').appendChild(o)});
  function build(){var g=function(id){return $(id).value.trim()},fp=PAIRS[+$('#gFont').value||0];loadFont(fp[0]);loadFont(fp[1]);var cs=['#gC1','#gC2','#gC3','#gC4','#gC5'].map(g);
    $('#guideOut').innerHTML='<div class="card" style="padding:34px"><div class="small muted">BRAND GUIDELINES · v1 · '+new Date().toLocaleDateString()+'</div><h2 style="font-family:\''+fp[0]+'\';font-size:2.6rem;color:'+cs[0]+'">'+esc(g('#gName')||'Brand Name')+'</h2><p style="font-family:\''+fp[1]+'\';font-size:1.2rem">'+esc(g('#gTag')||'Tagline')+'</p><h3>1. Mission</h3><p>'+esc(g('#gMission')||'—')+'</p><h3>2. Audience</h3><p>'+esc(g('#gAud')||'—')+'</p><h3>3. Personality & voice</h3><p><b>We are:</b> '+esc(g('#gIs')||'—')+'<br><b>We are not:</b> '+esc(g('#gNot')||'—')+'</p><h3>4. Color palette</h3><div style="display:flex;gap:10px;flex-wrap:wrap">'+cs.map(function(c,i){return '<div style="text-align:center"><div style="width:90px;height:70px;border-radius:12px;background:'+c+';border:1px solid #ddd"></div><small>'+['Primary','Secondary','Accent','Light','Dark'][i]+'<br>'+c.toUpperCase()+'</small></div>'}).join('')+'</div><h3>5. Typography</h3><p><span style="font-family:\''+fp[0]+'\';font-size:1.5rem;font-weight:700">'+fp[0]+'</span> — headings<br><span style="font-family:\''+fp[1]+'\'">'+fp[1]+'</span> — body text</p><h3>6. Logo rules</h3><ul><li>Keep clear space equal to the height of the first letter on all sides.</li><li>Never stretch, recolor outside the palette, or add effects.</li><li>Minimum digital size: 24px high.</li></ul></div>'}
  f.addEventListener('input',build);build();$('#guidePrint').addEventListener('click',function(){window.print()});
}

document.addEventListener('DOMContentLoaded',function(){initNameGen();initSlogan();initPalette();initFonts();initQuiz();initPos();initChecker();initGuide()});
})();
