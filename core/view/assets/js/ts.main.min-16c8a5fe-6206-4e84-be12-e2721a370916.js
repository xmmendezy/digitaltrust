function contactForm(){const e=document.getElementById("name"),t=e.value,n=document.getElementById("email"),a=n.value,o=document.getElementById("phone"),c=o.value,l=document.getElementById("message"),m=l.value;window.open(`https://wa.me/16469803342?text=Hi, my name is ${t}, my email is ${a} and my phone number is ${c}. ${m}.`,"_blank"),e.value="",n.value="",o.value="",l.value=""}document.addEventListener("DOMContentLoaded",()=>{const e=Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"),0);e.length>0&&e.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.target,n=document.getElementById(t);e.classList.toggle("is-active"),n.classList.toggle("is-active")})}),window.bulmaAccordion.attach()}),window.contactForm=contactForm;
//# sourceMappingURL=ts.main.min-16c8a5fe-6206-4e84-be12-e2721a370916.js.map
