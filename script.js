(function(){
var d=document,$=function(s){return d.querySelector(s)},$$=function(s){return [].slice.call(d.querySelectorAll(s))};
/* images: Unsplash stock placeholders; hidden gracefully if offline */
$$('img[data-i]').forEach(function(im,k){im.src='https://images.unsplash.com/photo-'+im.dataset.i+'?auto=format&fit=crop&q=70&w='+(im.dataset.w||900);im.loading=k<2?'eager':'lazy';im.decoding='async';im.onerror=function(){im.style.display='none'}});
var nav=$('#nav');function sc(){nav.classList.toggle('sc',scrollY>40)}addEventListener('scroll',sc,{passive:true});sc();
var bg=$('#burger'),mn=$('#menu');function tog(o){mn.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu')}
bg.onclick=function(){tog(!mn.classList.contains('open'))};mn.onclick=function(e){if(e.target.tagName=='A')tog(false)};
/* service accordion */
$$('.acc button').forEach(function(b){b.onclick=function(){var li=b.parentNode,o=li.classList.contains('open');$$('.acc li').forEach(function(x){x.classList.remove('open')});if(!o)li.classList.add('open')}});
/* before/after */
var r=$('#rng'),bf=$('.bf'),kn=$('#knob');r.oninput=function(){bf.style.clipPath='inset(0 '+(100-r.value)+'% 0 0)';kn.style.left=r.value+'%'};
/* counters */
function count(el){var n=+el.dataset.n,dc=+el.dataset.d||0,t0;(function f(t){t0=t0||t;var p=Math.min((t-t0)/1800,1);el.textContent=(n*(1-Math.pow(1-p,3))).toFixed(dc);if(p<1)requestAnimationFrame(f)})(performance.now())}
var mq=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches,mob=innerWidth<900;
var steps=$('#steps');var f=d.createElement('i');f.className='fl';steps.insertBefore(f,steps.firstChild);
if(!window.gsap||!window.ScrollTrigger||mq){$$('[data-n]').forEach(function(e){e.textContent=(+e.dataset.n).toFixed(+e.dataset.d||0)});f.style.transform='none';return}
gsap.registerPlugin(ScrollTrigger);d.documentElement.classList.add('js');var E='power3.out';
gsap.timeline({defaults:{ease:E}}).from('.ln b',{yPercent:115,duration:1.6,stagger:.2},.2).from('.gline',{scaleX:0,duration:1.4},.9).from('.eyebrow',{opacity:0,y:10,duration:1.2},0).from('.sub,.btns',{opacity:0,y:20,duration:1.2,stagger:.15},1).from('.arch',{opacity:0,y:60,duration:1.8},.6);
if(!mob)gsap.to('.hero-bg',{yPercent:10,ease:'none',scrollTrigger:{trigger:'.hero',scrub:true,start:'top top',end:'bottom top'}});
$$('.rv').forEach(function(el,i){gsap.set(el,{y:30});gsap.to(el,{opacity:1,y:0,duration:1.3,ease:E,delay:(i%3)*.08,scrollTrigger:{trigger:el,start:'top 88%',once:true}})});
$$('[data-n]').forEach(function(el){ScrollTrigger.create({trigger:el,start:'top 92%',once:true,onEnter:function(){count(el)}})});
gsap.to(f,{scaleY:1,ease:'none',scrollTrigger:{trigger:steps,start:'top 70%',end:'bottom 70%',scrub:true}});
/* pinned horizontal project movement (desktop) */
if(!mob){var tr=$('#track');gsap.to(tr,{x:function(){return -(tr.scrollWidth-innerWidth)},ease:'none',scrollTrigger:{trigger:'#projects',start:'top top',end:function(){return '+='+(tr.scrollWidth-innerWidth)},pin:true,scrub:.8,invalidateOnRefresh:true,anticipatePin:1}});
$$('.pc').forEach(function(c,i){gsap.from(c,{y:60+i%2*40,opacity:0,duration:1.2,ease:E,scrollTrigger:{trigger:'#projects',start:'top 70%',once:true}})})}
if(fine&&!mob){var s=$('#spot');addEventListener('mousemove',function(e){s.style.setProperty('--x',e.clientX+'px');s.style.setProperty('--y',e.clientY+'px');s.style.opacity=1});
$$('.mag').forEach(function(el){el.addEventListener('mousemove',function(e){var q=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-q.left-q.width/2)*.2,y:(e.clientY-q.top-q.height/2)*.3,duration:.5})});el.addEventListener('mouseleave',function(){gsap.to(el,{x:0,y:0,duration:.9,ease:'elastic.out(1,.5)'})})})}
addEventListener('load',function(){ScrollTrigger.refresh()});
})();
