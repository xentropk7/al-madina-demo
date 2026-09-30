const I=d=>`<svg class="ic" viewBox="0 0 24 24">${d}</svg>`;
const ICON={cart:I('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>'),plus:I('<path d="M12 5v14M5 12h14"/>'),shield:I('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),truck:I('<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="18.5" r="2"/>'),pin:I('<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),clock:I('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),mail:I('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),leaf:I('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.4-7"/>')};
const P=[
{id:1,n:'Cold-Pressed Orange & Pomegranate',c:'juice',e:'🍊',p:4.5,u:'330ml glass bottle',b:'Fresh'},
{id:2,n:'Sweet Swat Royal Red Apples',c:'fruit',e:'🍎',p:5.2,u:'per kg',b:'Orchard'},
{id:3,n:'Crisp Hydroponic Palak',c:'greens',e:'🥬',p:1.8,u:'500g bunch',b:'Today'},
{id:4,n:'A2 Pure Sahiwal Cow Milk',c:'dairy',e:'🥛',p:2.9,u:'1 litre',b:'Chilled'},
{id:5,n:'Whole Grain Sharbati Atta',c:'pantry',e:'🌾',p:11.5,u:'5 kg sack',b:'Stone-milled'},
{id:6,n:'Belgian Dark Truffle Biscuits',c:'pantry',e:'🍪',p:6.8,u:'250g box',b:'Single batch'},
{id:7,n:'Pistachio & Dark Gelato',c:'dairy',e:'🍨',p:7.5,u:'473ml pint',b:'Hand-churned'},
{id:8,n:'Aura Sparkling Mineral Water',c:'juice',e:'💧',p:2.75,u:'330ml glass',b:'Carbonated'},
{id:9,n:'Farm Eggs, Free Range',c:'dairy',e:'🥚',p:3.4,u:'dozen',b:'Farm direct'},
{id:10,n:'Organic Baby Spinach & Mint',c:'greens',e:'🌿',p:2.2,u:'250g pack',b:'Organic'},
{id:11,n:'Sindhri Mangoes',c:'fruit',e:'🥭',p:8.9,u:'per kg',b:'Seasonal'},
{id:12,n:'Cold-Press Mustard Oil',c:'pantry',e:'🫒',p:9.6,u:'1 litre tin',b:'Heritage'}];
const CATS={all:'All aisles',fruit:'Fruit',greens:'Greens',dairy:'Dairy & Eggs',juice:'Drinks',pantry:'Pantry'};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>'$'+n.toFixed(2);
let cart=JSON.parse(localStorage.getItem('am_cart')||'{}');
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const sub=()=>Object.entries(cart).reduce((a,[id,q])=>a+P.find(x=>x.id==id).p*q,0);
const ship=()=>sub()>=25||!sub()?0:3.5;
function save(){localStorage.setItem('am_cart',JSON.stringify(cart));const b=$('#cnt');if(b){b.textContent=count();const p=b.parentElement;p.classList.remove('bump');void p.offsetWidth;p.classList.add('bump')}}
function toast(m){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.append(t)}t.textContent=m;t.classList.add('show');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('show'),1800)}
function add(id){cart[id]=(cart[id]||0)+1;save();toast('Added to your tray')}
const card=p=>`<article class="card rv"><div class="thumb"><i>${p.b}</i>${p.e}</div><h3 style="font-size:17px">${p.n}</h3><p class="mut">${p.u}</p><div class="pr"><span class="price">${money(p.p)}</span><button class="add" aria-label="Add ${p.n}" onclick="add(${p.id})">${ICON.plus}</button></div></article>`;
function layout(){
const pg=document.body.dataset.page,L=[['index','Storefront'],['shop','Shop'],['cart','Cart'],['contact','Contact']];
$('#hd').innerHTML=`<div class="wrap nav"><a href="index.html"><img src="assets/logo.svg" alt="Al Madina Super Mart"></a><nav>${L.map(l=>`<a href="${l[0]}.html" class="${pg==l[0]?'on':''}">${l[1]}</a>`).join('')}</nav><a class="cartbtn" href="cart.html">${ICON.cart} Cart <b id="cnt">${count()}</b></a></div>`;
$('#ft').innerHTML=`<div class="wrap"><div class="g"><div><img src="assets/logo.svg" height="44" alt=""><p>Organic provisions and certified Halal groceries for Lahore, delivered with care.</p></div><div><h3>Aisles</h3><a href="shop.html?c=fruit">Fruit</a><a href="shop.html?c=greens">Greens</a><a href="shop.html?c=dairy">Dairy &amp; Eggs</a><a href="shop.html?c=pantry">Pantry</a></div><div><h3>Visit</h3><p>${ICON.pin} 42-C Commercial Zone, Lahore</p><p>${ICON.clock} Daily 9:00 AM – 11:00 PM</p><p>${ICON.mail} concierge@almadinamart.pk</p></div></div><p style="margin-top:2rem">© 2026 Al Madina Super Mart</p></div>`;
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
window.reveal=()=>$$('.rv:not(.in)').forEach(n=>io.observe(n))}
function index(){const t=['Fresh farm greens','Sahiwal cow milk','Stone-baked bread','100% Halal','Express 45-min delivery'];
$('#tick').innerHTML=`<div>${[...t,...t,...t,...t].map(x=>`<span>${x}</span>`).join('')}</div>`;
$('#feat').innerHTML=P.slice(0,4).map(card).join('');
$('#why').innerHTML=[['shield','Certified Halal','Every cut and product is verified.'],['truck','45-minute delivery','Cold-chain vans, packed in jute.'],['leaf','Farm direct','Harvested at dawn across Punjab.']].map(w=>`<div class="card rv">${ICON[w[0]]}<h3 style="margin:.6rem 0">${w[1]}</h3><p class="mut">${w[2]}</p></div>`).join('')}
function shop(){let c=new URLSearchParams(location.search).get('c')||'all',q='',s='';
$('#chips').innerHTML=Object.entries(CATS).map(([k,v])=>`<button class="chip" data-k="${k}">${v}</button>`).join('');
const draw=()=>{$$('.chip').forEach(b=>b.classList.toggle('on',b.dataset.k==c));
let r=P.filter(p=>(c=='all'||p.c==c)&&p.n.toLowerCase().includes(q));
if(s=='lo')r.sort((a,b)=>a.p-b.p);if(s=='hi')r.sort((a,b)=>b.p-a.p);
$('#list').innerHTML=r.length?r.map(card).join(''):'<p class="mut">No products match. Clear the search or pick another aisle.</p>';reveal()};
$('#chips').onclick=e=>{if(e.target.dataset.k){c=e.target.dataset.k;draw()}};
$('#q').oninput=e=>{q=e.target.value.toLowerCase();draw()};$('#sort').onchange=e=>{s=e.target.value;draw()};draw()}
function cartPage(){const draw=()=>{const ids=Object.keys(cart);
$('#lines').innerHTML=ids.length?ids.map(id=>{const p=P.find(x=>x.id==id);return `<div class="line"><div class="t">${p.e}</div><div><b>${p.n}</b><p class="mut">${p.u} · ${money(p.p)}</p></div><div class="qty"><button onclick="chg(${id},-1)" aria-label="Less">−</button>${cart[id]}<button onclick="chg(${id},1)" aria-label="More">+</button></div><b>${money(p.p*cart[id])}</b></div>`}).join(''):'<p class="mut">Your tray is empty. <a href="shop.html" style="color:var(--s)">Browse the aisles</a> to add items.</p>';
$('#s1').textContent=money(sub());$('#s2').textContent=ship()?money(ship()):'Free';$('#s3').textContent=money(sub()+ship());
$('#go').style.display=ids.length?'':'none';$('#free').textContent=ids.length?(sub()>=25?'Free delivery unlocked.':`Add ${money(25-sub())} more for free delivery.`):''};
window.chg=(id,n)=>{cart[id]+=n;if(cart[id]<1)delete cart[id];save();draw()};draw()}
function checkout(){$('#ord').innerHTML=Object.entries(cart).map(([id,q])=>{const p=P.find(x=>x.id==id);return `<p><span>${q} × ${p.n}</span><span>${money(p.p*q)}</span></p>`}).join('')||'<p class="mut">Nothing to order yet.</p>';
$('#tt').textContent=money(sub()+ship());
$('#form').onsubmit=e=>{e.preventDefault();if(!count())return toast('Add items first');cart={};save();$('#form').innerHTML=`<div style="text-align:center;padding:2rem"><div style="font-size:64px;animation:float 3s infinite">✅</div><h2>Order placed</h2><p class="mut">Your slot is reserved. We will message you when the rider leaves.</p><a class="btn" href="shop.html" style="margin-top:1rem">Keep shopping</a></div>`}}
function contact(){$('#cf').onsubmit=e=>{e.preventDefault();e.target.reset();toast('Message sent. We reply within a day.')}}
document.addEventListener('DOMContentLoaded',()=>{layout();({index,shop,cart:cartPage,checkout,contact})[document.body.dataset.page]();reveal()});
