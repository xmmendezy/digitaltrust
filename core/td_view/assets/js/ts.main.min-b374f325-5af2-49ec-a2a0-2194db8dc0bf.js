function suscribeForm(){const t=document.getElementById("suscribe");return t.value?fetch("/td/api/suscribe_mail/"+t.value).then(e=>{e.json().then(t=>{t.error||window.Swal.fire({title:"Listo",text:"Se ha suscrito a nuestra lista de correos",icon:"success",confirmButtonText:"Continuar",confirmButtonColor:"#16665d"})}),t.value=""}).catch(()=>{t.value=""}):t.value="",!1}function notReady(){window.Swal.fire({title:"¡Oh!",text:"Esta sección aún no está lista, estamos trabajando en ello.",icon:"warning",confirmButtonText:"Regresar",confirmButtonColor:"#16665d"})}document.addEventListener("DOMContentLoaded",()=>{const t=Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"),0),e=document.querySelector(".navbar-burger.main");if(t.length>0&&t.forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.target,n=document.getElementById(o);e.classList.toggle("is-hidden"),n.classList.toggle("is-active")})}),window.bulmaAccordion.attach(),document.querySelector(".count-down")){new window.Countdown({cont:document.querySelector(".count-down"),date:16449012e5,outputTranslation:{day:"Días",hour:"Horas",minute:"Minutos",second:"Segundos"},endCallback:null,outputFormat:"day|hour|minute|second"}).start()}}),window.suscribeForm=suscribeForm,window.notReady=notReady;
//# sourceMappingURL=ts.main.min-b374f325-5af2-49ec-a2a0-2194db8dc0bf.js.map
