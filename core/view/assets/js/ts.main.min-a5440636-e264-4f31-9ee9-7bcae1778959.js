function contactForm(){const e=document.getElementById("name"),t=e.value,n=document.getElementById("email"),a=n.value,o=document.getElementById("phone"),l=o.value,c=document.getElementById("message"),m=c.value;window.open(`https://wa.me/16469803342?text=Hi, my name is ${t}, my email is ${a} and my phone number is ${l}. ${m}.`,"_blank"),e.value="",n.value="",o.value="",c.value=""}document.addEventListener("DOMContentLoaded",()=>{const e=Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"),0);e.length>0&&e.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.target,n=document.getElementById(t);e.classList.toggle("is-active"),n.classList.toggle("is-active")})}),window.bulmaAccordion.attach(),new Glide(".glide",{autoplay:7e3,hoverpause:!1}).mount()}),window.contactForm=contactForm;
//# sourceMappingURL=ts.main.min-a5440636-e264-4f31-9ee9-7bcae1778959.js.map