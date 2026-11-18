
const menu = document.querySelector(".menu");
const links = document.querySelector(".nav-links");
if (menu) menu.addEventListener("click", () => links.classList.toggle("open"));

const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".dot")];
let current = 0;

function showSlide(index){
  if(!slides.length) return;
  current = (index + slides.length) % slides.length;
  slides.forEach((s,i)=>s.classList.toggle("active",i===current));
  dots.forEach((d,i)=>d.classList.toggle("active",i===current));
}
document.querySelector(".prev")?.addEventListener("click",()=>showSlide(current-1));
document.querySelector(".next")?.addEventListener("click",()=>showSlide(current+1));
dots.forEach((d,i)=>d.addEventListener("click",()=>showSlide(i)));

document.addEventListener("keydown",(e)=>{
  if(!slides.length) return;
  if(e.key==="ArrowLeft") showSlide(current-1);
  if(e.key==="ArrowRight") showSlide(current+1);
});

let touchX = null;
const slideshow = document.querySelector(".slideshow");
slideshow?.addEventListener("touchstart", e => touchX = e.changedTouches[0].screenX, {passive:true});
slideshow?.addEventListener("touchend", e => {
  if(touchX===null) return;
  const dx = e.changedTouches[0].screenX-touchX;
  if(Math.abs(dx)>45) showSlide(current + (dx<0 ? 1 : -1));
  touchX=null;
}, {passive:true});

// GitHub Pages is static, so this form prepares an email in the visitor's mail app.
// Replace the address below with your actual email.
const form = document.querySelector("#commission-form");
const productField = document.querySelector("#product");
if(productField){ const requested = new URLSearchParams(window.location.search).get("product"); if(requested) productField.value = requested; }
if(form){
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = "YOUR_EMAIL@example.com"; // <-- change this
    const data = new FormData(form);
    const subject = encodeURIComponent("Leatherwork commission inquiry");
    const body = encodeURIComponent(
`Name: ${data.get("name")}
Product of interest: ${data.get("product") || "Not specified"}
Email: ${data.get("email")}
Project type: ${data.get("type")}
Budget: ${data.get("budget")}

Project details:
${data.get("details")}

Reference / additional notes:
${data.get("notes") || "None"}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}


// Independent product photo galleries (supports four to six images per product).
document.querySelectorAll('[data-product-gallery]').forEach((gallery)=>{
  const main=gallery.querySelector('[data-main-image]');
  const mainPlaceholder=gallery.querySelector('[data-main-placeholder]');
  const thumbs=[...gallery.querySelectorAll('.gallery-thumb')];
  const prev=gallery.querySelector('.gallery-prev');
  const next=gallery.querySelector('.gallery-next');
  const count=gallery.querySelector('.gallery-count');
  let active=0;
  const show=(index)=>{
    active=(index+thumbs.length)%thumbs.length;
    const thumb=thumbs[active];
    const image=thumb.querySelector('img');
    main.src=image.getAttribute('src');
    main.alt=thumb.getAttribute('aria-label').replace(/^Show /,'');
    main.classList.remove('is-visible');
    mainPlaceholder.hidden=false;
    main.onload=()=>{main.classList.add('is-visible');mainPlaceholder.hidden=true;};
    main.onerror=()=>{main.classList.remove('is-visible');mainPlaceholder.hidden=false;};
    if(main.complete && main.naturalWidth){main.classList.add('is-visible');mainPlaceholder.hidden=true;}
    thumbs.forEach((item,i)=>{
      item.classList.toggle('active',i===active);
      item.setAttribute('aria-pressed',String(i===active));
    });
    count.textContent=`${active+1} / ${thumbs.length}`;
  };
  thumbs.forEach((thumb,i)=>{
    const image=thumb.querySelector('img');
    const placeholder=thumb.querySelector('.gallery-thumb-placeholder');
    image.addEventListener('load',()=>{image.classList.add('is-visible');placeholder.hidden=true;});
    image.addEventListener('error',()=>{image.classList.remove('is-visible');placeholder.hidden=false;});
    if(image.complete && image.naturalWidth){image.classList.add('is-visible');placeholder.hidden=true;}
    thumb.addEventListener('click',()=>show(i));
  });
  prev.addEventListener('click',()=>show(active-1));
  next.addEventListener('click',()=>show(active+1));
  show(0);
});


// Central product information: products.js is the one place to edit shared details.
(function hydrateProductInformation(){
  const products = window.ROGUE_PRODUCTS || [];
  const page = document.querySelector('[data-product-page]');
  if(page){
    const product = products.find(item => item.id === page.dataset.productPage);
    if(product){
      document.querySelectorAll('[data-product-name]').forEach(el => el.textContent = product.name);
      document.querySelectorAll('[data-product-category]').forEach(el => el.textContent = product.category);
      document.querySelectorAll('[data-product-price]').forEach(el => el.textContent = product.price == null ? 'Enquire' : product.price);
      document.querySelectorAll('[data-product-price-prefix]').forEach(el => el.textContent = product.price == null ? '' : '$');
      document.querySelectorAll('[data-product-price-suffix]').forEach(el => el.textContent = product.price == null ? '' : ' CAD');
      document.querySelectorAll('[data-product-summary]').forEach(el => el.textContent = product.summary);
      document.title = `${product.name} · Rogue Artisan`;
      document.querySelectorAll('a[href*="commissions.html?product="]').forEach(link => {
        link.href = `commissions.html?product=${encodeURIComponent(product.name)}`;
      });
    }
  }
  const productOptions = document.querySelector('#product-options');
  if(productOptions){
    productOptions.innerHTML = products.map(product => `<option value="${escapeProductText(product.name)}"></option>`).join('');
  }
  const grid = document.querySelector('[data-catalogue-grid]');
  if(grid){
    const filters = [...document.querySelectorAll('[data-catalogue-filters] [data-filter]')];
    const resultCount = document.querySelector('[data-catalogue-count]');
    const renderCatalogue = (selectedGroup = 'all') => {
      const visibleProducts = selectedGroup === 'all'
        ? products
        : products.filter(product => product.filterGroup === selectedGroup);
      grid.innerHTML = visibleProducts.map(product => `
        <a class="product-card" href="${product.page}">
          <div class="product-card-media ${product.image ? '' : 'is-placeholder'}">
            ${product.image ? `<img src="${escapeProductText(product.image)}" alt="${escapeProductText(product.name)}" loading="lazy" onerror="this.remove();this.parentElement.classList.add('is-placeholder')">` : ''}
            <div class="product-placeholder"><span>${escapeProductText(product.category)}</span></div>
          </div>
          <div class="product-card-copy">
            <span class="eyebrow">${escapeProductText(product.category)} · ${product.price == null ? 'Enquire for pricing' : `From $${product.price} CAD`}</span>
            <h3>${escapeProductText(product.name)}</h3>
            <p>${escapeProductText(product.summary)}</p>
            <span class="text-link">Explore the piece →</span>
          </div>
        </a>`).join('');
      if(resultCount){
        const label = selectedGroup === 'all' ? 'all pieces' : selectedGroup;
        resultCount.textContent = `Showing ${visibleProducts.length} ${label}`;
      }
      filters.forEach(button => {
        const active = button.dataset.filter === selectedGroup;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    };
    filters.forEach(button => button.addEventListener('click', () => renderCatalogue(button.dataset.filter)));
    renderCatalogue();
  }
})();

function escapeProductText(value){
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
