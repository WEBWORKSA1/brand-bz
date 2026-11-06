/* Brand.bz — site core */
(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  // contact address is assembled at runtime only (never present in page source as plain text)
  var K=['=02bj5Cbp','FWbnBUMhN3','ay92diV2d'];
  function addr(){try{return atob(K.join('').split('').reverse().join(''))}catch(e){return ''}}
  window.BB={addr:addr};

  // theme
  var root=document.documentElement;
  try{var t=localStorage.getItem('bb-theme');if(t)root.setAttribute('data-theme',t);else if(window.matchMedia('(prefers-color-scheme: dark)').matches)root.setAttribute('data-theme','dark')}catch(e){}
  document.addEventListener('DOMContentLoaded',function(){
    var tb=$('#themeToggle');
    if(tb)tb.addEventListener('click',function(){var d=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',d);try{localStorage.setItem('bb-theme',d)}catch(e){}});
    var bg=$('#burger'),mn=$('#menu');if(bg&&mn)bg.addEventListener('click',function(){mn.classList.toggle('open');bg.setAttribute('aria-expanded',mn.classList.contains('open'))});
    $$('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});

    // mail links: hidden behind link text
    $$('[data-mail]').forEach(function(a){a.addEventListener('click',function(ev){ev.preventDefault();var s=a.getAttribute('data-mail')||'Brand.bz inquiry';location.href='mailto:'+addr()+'?subject='+encodeURIComponent(s)})});

    // reveal on scroll
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});$$('.reveal').forEach(function(e){io.observe(e)})}else $$('.reveal').forEach(function(e){e.classList.add('in')});

    // chips
    $$('.chip').forEach(function(c){c.addEventListener('click',function(){var i=$('input',c);if(!i)return;setTimeout(function(){if(i.type==='radio')$$('input[name="'+i.name+'"]').forEach(function(r){r.parentNode.classList.toggle('on',r.checked)});else c.classList.toggle('on',i.checked)},0)})});

    initForms();initCookie();initExit();initVideos();initNews();initTip();initSteps();initDonate();
  });

  window.toast=function(m){var t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('show')},2200)};

  // forms -> FormSubmit AJAX endpoint (address injected at submit time)
  function initForms(){
    $$('form[data-form]').forEach(function(f){
      f.addEventListener('submit',function(ev){
        ev.preventDefault();
        var msg=$('.form-msg',f)||(function(){var d=document.createElement('div');d.className='form-msg';f.appendChild(d);return d})();
        var hp=$('input[name="_honey"]',f);if(hp&&hp.value)return;
        if(!f.checkValidity()){f.reportValidity();return}
        var data={};new FormData(f).forEach(function(v,k){if(k==='_honey')return;data[k]=data[k]?data[k]+', '+v:v});
        data._subject='Brand.bz — '+f.getAttribute('data-form')+' submission';data._template='table';data._captcha='false';data.page=location.pathname;
        var btn=$('button[type="submit"]',f);if(btn){btn.disabled=true;btn._t=btn.textContent;btn.textContent='Sending…'}
        fetch('https://formsubmit.co/ajax/'+addr(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
          .then(function(r){return r.json()}).then(function(){msg.className='form-msg ok';msg.textContent=f.getAttribute('data-ok')||'Thank you! We received your submission and will reply soon.';f.reset();$$('.chip',f).forEach(function(c){c.classList.remove('on')});try{gtagEvent(f.getAttribute('data-form'))}catch(e){}})
          .catch(function(){msg.className='form-msg err';msg.textContent='Something went wrong. Please try again in a moment.'})
          .then(function(){if(btn){btn.disabled=false;btn.textContent=btn._t}});
      });
    });
  }
  function gtagEvent(n){if(window.gtag)window.gtag('event','generate_lead',{form:n})}

  // multi-step forms
  function initSteps(){
    $$('[data-steps]').forEach(function(f){
      var st=$$('.fstep',f),bar=$$('.steps-bar span',f),i=0;
      function show(n){st.forEach(function(s,k){s.classList.toggle('active',k===n)});bar.forEach(function(b,k){b.classList.toggle('on',k<=n)});i=n}
      $$('[data-next]',f).forEach(function(b){b.addEventListener('click',function(){var req=$$('[required]',st[i]);for(var k=0;k<req.length;k++){if(!req[k].checkValidity()){req[k].reportValidity();return}}show(Math.min(i+1,st.length-1))})});
      $$('[data-prev]',f).forEach(function(b){b.addEventListener('click',function(){show(Math.max(i-1,0))})});
      show(0);
    });
  }

  function initCookie(){
    var c=$('#cookie');if(!c)return;var k;try{k=localStorage.getItem('bb-consent')}catch(e){}
    if(!k)setTimeout(function(){c.classList.add('show')},900);
    $$('[data-consent]',c).forEach(function(b){b.addEventListener('click',function(){try{localStorage.setItem('bb-consent',b.getAttribute('data-consent'))}catch(e){}c.classList.remove('show')})});
  }

  function initExit(){
    var m=$('#leadModal');if(!m)return;var seen;try{seen=sessionStorage.getItem('bb-modal')||localStorage.getItem('bb-subscribed')}catch(e){}
    function open(){if(seen)return;seen=1;try{sessionStorage.setItem('bb-modal','1')}catch(e){}m.classList.add('show')}
    document.addEventListener('mouseout',function(e){if(!e.toElement&&!e.relatedTarget&&e.clientY<10)open()});
    setTimeout(open,45000);
    $$('[data-close]',m).forEach(function(b){b.addEventListener('click',function(){m.classList.remove('show')})});
    m.addEventListener('click',function(e){if(e.target===m)m.classList.remove('show')});
    $$('[data-open-lead]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();m.classList.add('show')})});
  }

  // privacy-friendly YouTube: load iframe only on click
  function initVideos(){
    $$('.video[data-id]').forEach(function(v){
      var id=v.getAttribute('data-id');
      v.innerHTML='<img loading="lazy" src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg" alt="'+(v.getAttribute('data-title')||'Video')+'"><span class="play">▶</span>';
      v.addEventListener('click',function(){v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="'+(v.getAttribute('data-title')||'Video')+'" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'},{once:true});
    });
  }

  // self-updating headlines (data/news.json is refreshed by a scheduled GitHub Action)
  function initNews(){
    var box=$('[data-news]');if(!box)return;var lim=+box.getAttribute('data-news')||12;var base=box.getAttribute('data-base')||'';
    fetch(base+'data/news.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(d){
      var items=(d.items||[]).slice(0,lim);if(!items.length)return;
      box.innerHTML=items.map(function(n){return '<article class="card news-item"><span class="tag">'+esc(n.topic||'Branding')+'</span><a href="'+esc(n.link)+'" target="_blank" rel="noopener nofollow"><b>'+esc(n.title)+'</b></a><span class="src">'+esc(n.source||'')+(n.date?' · '+esc(n.date):'')+'</span></article>'}).join('');
      var up=$('[data-news-updated]');if(up&&d.updated)up.textContent=d.updated;
    }).catch(function(){});
  }
  function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  var TIPS=["Write your positioning in one sentence before you design anything visual.","Pick one primary color and use it for your most important action — every time.","Say your name out loud to five strangers. If they ask you to spell it, simplify it.","Limit your brand to two typefaces: one for headlines, one for reading.","Your brand voice needs 'don'ts' as much as 'dos' — write three of each.","Check the name on trademark databases before you buy the domain, not after.","Consistency beats creativity: same logo, same colors, same tone on every channel.","Design your logo to work in one color at 16 pixels wide. If it fails, it is too complex.","Customers remember feelings, not features. Name the feeling you want to own.","Audit your brand every 6 months: website, social bios, email signature, invoices.","Own the matching social handles the same day you register the domain.","A tagline should explain the benefit, not repeat the name.","Collect five words customers use about you — use their words in your copy.","Make a one-page brand guide. Teams follow one page; they ignore 60.","Test your colors for contrast — accessible brands reach more people.","Shorter names are easier to remember, type and share. Aim for 2–3 syllables.","Every touchpoint is branding — including how fast you reply to emails.","Name your enemy: brands become sharper when they know what they stand against.","Use real photos of your product or team before stock imagery.","Before a rebrand, list what customers already love so you don't erase it.","Pick a signature phrase and repeat it until you're tired of it — then keep going.","Your About page is a sales page. Lead with the customer's problem.","Write the elevator pitch in 12 words or fewer.","Map your competitors' colors so you can deliberately stand apart.","Create templates for social posts so every post looks on-brand in seconds.","Great brands make one promise and keep it obsessively.","Use the same profile image across all platforms for instant recognition.","Document your brand story in three acts: problem, turning point, mission.","A memorable name tells a story or sparks a picture.","Measure brand health: direct traffic, branded search volume and referral rate.","Ask: if your logo disappeared, would people still recognize your content?"];
  function initTip(){var e=$('[data-tip]');if(!e)return;var d=new Date(),n=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5);e.textContent=TIPS[n%TIPS.length];var dd=$('[data-tip-date]');if(dd)dd.textContent=d.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}

  // donations via PayPal (recipient assembled at click time)
  function initDonate(){
    var w=$('#donate');if(!w)return;var amt=25;
    $$('.amounts button',w).forEach(function(b){b.addEventListener('click',function(){$$('.amounts button',w).forEach(function(x){x.classList.remove('on')});b.classList.add('on');amt=+b.getAttribute('data-amt');var c=$('#customAmt');if(c)c.value=''})});
    $('#donateBtn').addEventListener('click',function(){
      var c=$('#customAmt'),v=c&&+c.value>0?+c.value:amt,p=$('input[name="purpose"]:checked',w),pur=p?p.value:'General support',mo=$('#monthly')&&$('#monthly').checked;
      var url='https://www.paypal.com/donate/?business='+encodeURIComponent(addr())+'&amount='+v+'&currency_code=USD&no_recurring='+(mo?'0':'1')+'&item_name='+encodeURIComponent('Brand.bz — '+pur);
      window.open(url,'_blank','noopener');
    });
  }
})();
