const products = [
 {id:1,name:"প্রিমিয়াম ওভারসাইজ টি-শার্ট",category:"পুরুষ",type:"টি-শার্ট",price:790,old:990,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"},
 {id:2,name:"ক্লাসিক কটন শার্ট",category:"পুরুষ",type:"শার্ট",price:1190,old:1490,img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85"},
 {id:3,name:"কমফোর্ট হুডি",category:"টিনস",type:"হুডি",price:1450,old:1790,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85"},
 {id:4,name:"মিনিমাল জ্যাকেট",category:"পুরুষ",type:"জ্যাকেট",price:2190,old:2590,img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85"},
 {id:5,name:"উইমেন্স ক্যাজুয়াল টপ",category:"নারী",type:"টি-শার্ট",price:850,old:1050,img:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=85"},
 {id:6,name:"স্মার্ট ফিট ট্রাউজার",category:"পুরুষ",type:"প্যান্ট",price:1390,old:1690,img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=85"},
 {id:7,name:"সফট নিট সোয়েটার",category:"নারী",type:"হুডি",price:1590,old:1890,img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85"},
 {id:8,name:"ডেইলি ওয়্যার শার্ট",category:"কিডস",type:"শার্ট",price:690,old:850,img:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=85"},
 {id:9,name:"স্ট্রিটওয়্যার টি-শার্ট",category:"টিনস",type:"টি-শার্ট",price:890,old:1090,img:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=85"},
 {id:10,name:"ক্লাসিক ডেনিম জ্যাকেট",category:"নারী",type:"জ্যাকেট",price:1890,old:2290,img:"https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=85"},
 {id:11,name:"আরবান ক্যাপ",category:"পুরুষ",type:"এক্সেসরিজ",price:490,old:590,img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=85"},
 {id:12,name:"কিডস কমফোর্ট সেট",category:"কিডস",type:"টি-শার্ট",price:990,old:1190,img:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=85"}
];
let category="সব", filter="সব", cart=[];
const $=s=>document.querySelector(s), money=n=>"৳"+n.toLocaleString("en-US");
function render(){
 const q=$("#searchInput").value.trim().toLowerCase();
 let list=products.filter(p=>(category==="সব"||p.category===category)&&(filter==="সব"||p.type===filter)&&(!q||(p.name+" "+p.category+" "+p.type).toLowerCase().includes(q)));
 const sort=$("#sortSelect").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price); if(sort==="high")list.sort((a,b)=>b.price-a.price);
 $("#productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-photo"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="discount">-${Math.round((1-p.price/p.old)*100)}%</span><button class="quick-add" data-add="${p.id}">ব্যাগে যোগ করুন +</button></div><div class="product-info"><span class="product-category">${p.category} / ${p.type}</span><h3>${p.name}</h3><div class="price-row"><b class="price">${money(p.price)}</b><span class="old-price">${money(p.old)}</span></div></div></article>`).join("");
 $("#productTotal").textContent=list.length+"টি পণ্য";
 $("#emptyState").hidden=list.length!==0;
 $("#activeFilter").hidden=category==="সব"&&filter==="সব";
 $("#activeFilter").textContent=(category!=="সব"?category+"  ":"")+(filter!=="সব"?filter:"");
}
function updateCart(){
 $("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 $("#cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
 $("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><img src="${x.img}" alt=""><div><b>${x.name}</b><small>${money(x.price)} × ${x.qty}</small></div><button class="remove-item" data-remove="${x.id}">বাদ দিন</button></div>`).join(""):'<p class="cart-empty">আপনার ব্যাগ এখনো খালি।</p>';
}
function showToast(){const t=$("#toast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1700)}
$("#productGrid").addEventListener("click",e=>{const id=Number(e.target.dataset.add);if(!id)return;const p=products.find(x=>x.id===id),item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});updateCart();showToast()});
$("#cartItems").addEventListener("click",e=>{const id=Number(e.target.dataset.remove);if(!id)return;cart=cart.filter(x=>x.id!==id);updateCart()});
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".tab.active").classList.remove("active");b.classList.add("active");category=b.dataset.category;render()}));
document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".chip.active").classList.remove("active");b.classList.add("active");filter=b.dataset.filter;render()}));
$("#searchInput").addEventListener("input",render);$("#sortSelect").addEventListener("change",render);
function cartOpen(open){$("#cartDrawer").classList.toggle("open",open);$("#overlay").classList.toggle("show",open)}
$("#openCart").addEventListener("click",()=>cartOpen(true));$("#closeCart").addEventListener("click",()=>cartOpen(false));$("#overlay").addEventListener("click",()=>cartOpen(false));
$("#searchFocus").addEventListener("click",()=>{document.querySelector("#collection").scrollIntoView({behavior:"smooth"});setTimeout(()=>$("#searchInput").focus(),350)});
$("#checkoutBtn").addEventListener("click",()=>{if(!cart.length){showToast();return}const lines=cart.map(x=>`${x.name} × ${x.qty} = ${money(x.price*x.qty)}`).join("%0A");const msg=`আমি Premium Shop BD থেকে অর্ডার করতে চাই:%0A${lines}%0Aসর্বমোট: ${money(cart.reduce((s,x)=>s+x.price*x.qty,0))}`;window.open("https://wa.me/?text="+msg,"_blank")});
render();updateCart();