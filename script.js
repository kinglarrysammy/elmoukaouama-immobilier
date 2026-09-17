(function(){
"use strict";
var PHONE="212662254425",NAME="ElMoukaouama Immobilier",HAS_WA=true;
document.getElementById("menuToggle")?.addEventListener("click",function(){document.getElementById("nav")?.classList.toggle("open");});
document.querySelectorAll(".nav a").forEach(function(a){a.addEventListener("click",function(){document.getElementById("nav")?.classList.remove("open");});});
var banner=document.getElementById("cookieBanner");
if(banner&&!localStorage.getItem("cookie_ok"))banner.classList.add("show");
document.getElementById("cookieAccept")?.addEventListener("click",function(){localStorage.setItem("cookie_ok","1");banner?.classList.remove("show");});
document.getElementById("cookieRefuse")?.addEventListener("click",function(){localStorage.setItem("cookie_ok","0");banner?.classList.remove("show");});
function validatePhone(v){return /[+0-9\s\-]{8,20}/.test(v||"");}
function openWA(msg){window.open("https://wa.me/"+PHONE+"?text="+msg,"_blank");}
document.getElementById("bookingForm")?.addEventListener("submit",function(e){
e.preventDefault();var f=e.target,err=document.getElementById("bookingError");
if(!f.name.value.trim()||f.name.value.trim().length<2){if(err){err.hidden=false;err.textContent="Veuillez indiquer votre nom complet.";}return;}
if(!validatePhone(f.phone.value)){if(err){err.hidden=false;err.textContent="Numero de telephone invalide.";}return;}
if(!f.interest.value||!f.date.value||!f.time.value){if(err){err.hidden=false;err.textContent="Merci de renseigner tous les champs obligatoires.";}return;}
if(err)err.hidden=true;
var m="Bonjour "+NAME+",%0A%0A*Demande de visite*%0ANom : "+encodeURIComponent(f.name.value)+"%0ATelephone : "+encodeURIComponent(f.phone.value)+"%0AObjectif : "+encodeURIComponent(f.interest.value)+"%0ADate : "+encodeURIComponent(f.date.value)+"%0ACreneau : "+encodeURIComponent(f.time.value);
openWA(m);f.reset();
});
document.getElementById("estimateForm")?.addEventListener("submit",function(e){
e.preventDefault();var f=e.target,err=document.getElementById("estimateError");
if(!f.name.value.trim()){if(err){err.hidden=false;err.textContent="Veuillez indiquer votre nom.";}return;}
if(!validatePhone(f.phone.value)){if(err){err.hidden=false;err.textContent="Numero de telephone invalide.";}return;}
if(!f.type.value){if(err){err.hidden=false;err.textContent="Selectionnez le type de bien.";}return;}
if(err)err.hidden=true;
var m="Bonjour "+NAME+",%0A%0A*Demande d estimation*%0ANom : "+encodeURIComponent(f.name.value)+"%0ATelephone : "+encodeURIComponent(f.phone.value)+"%0AType de bien : "+encodeURIComponent(f.type.value);
openWA(m);f.reset();
});
var K={
welcome:"Bonjour, bienvenue chez "+NAME+". Je peux vous renseigner sur nos services, une estimation, une visite ou nos zones d intervention. Que souhaitez-vous faire ?",
services:"Nous proposons :\n• Vente et achat (estimation, mise en marche, suivi jusqu a la signature)\n• Location (selection des locataires, suivi)\n• Estimation gratuite de votre bien\n\nSouhaitez-vous une estimation ou reserver une visite ?",
zones:"Zones d intervention : El Alia, Hay Houria, Mohammedia.\n\nIndiquez votre quartier si vous souhaitez une visite ou une estimation ciblee.",
estimation:"L estimation est gratuite et sans engagement.\n\nPour la lancer :\n1. Utilisez le formulaire Estimation sur cette page\n2. Ou precisez ici : type de bien, quartier et surface approximative\n\nNous repondons generalement sous 24 a 48 heures.",
visite:"Pour organiser une visite :\n1. Remplissez le formulaire Reserver une visite\n2. Ou indiquez ici votre objectif (acheter / louer), le quartier et un creneau prefere\n\nNous confirmons rapidement par WhatsApp.",
contact:"Contact "+NAME+" :\n+212 662 25 44 25\n\nVous pouvez aussi utiliser les formulaires du site pour une demande structuree.",
prix:"Les prix dependent du bien, du quartier et de l etat du marche. Pour une fourchette realiste, demandez une estimation gratuite via le formulaire.",
horaires:"Nous traitons les demandes tous les jours ouvres. Reponse en general sous 24 heures.",
def:"Je peux vous aider sur :\n• Nos services\n• Zones d intervention\n• Estimation gratuite\n• Reservation de visite\n• Coordonnees\n\nPosez votre question ou utilisez les raccourcis."
};
var shortcuts=[{label:"Services",key:"services"},{label:"Zones",key:"zones"},{label:"Estimation",key:"estimation"},{label:"Visite",key:"visite"},{label:"Contact",key:"contact"}];
function matchReply(text){
var t=(text||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
if(/bonjour|bonsoir|salut|hello|hi\b/.test(t))return K.welcome;
if(/service|offre|que faites|propos/.test(t))return K.services;
if(/zone|quartier|secteur|ou interven|mohammedia|alia|parc/.test(t))return K.zones;
if(/estim|evalu|valeur|combien vaut|prix de mon/.test(t))return K.estimation;
if(/visite|rdv|rendez|voir un bien|visiter/.test(t))return K.visite;
if(/contact|telephone|whatsapp|appeler|numero|joindre/.test(t))return K.contact;
if(/prix|tarif|budget|cout/.test(t))return K.prix;
if(/horaire|ouvert|dispo|quand/.test(t))return K.horaires;
if(/merci|thanks/.test(t))return "Avec plaisir. N hesitez pas si vous avez d autres questions.";
return K.def;
}
function addMsg(text,who){var box=document.getElementById("chatMessages");if(!box)return;var el=document.createElement("div");el.className="chat-msg "+who;el.style.whiteSpace="pre-line";el.textContent=text;box.appendChild(el);box.scrollTop=box.scrollHeight;}
function renderShortcuts(){var q=document.getElementById("chatQuick");if(!q)return;q.innerHTML="";shortcuts.forEach(function(s){var btn=document.createElement("button");btn.type="button";btn.textContent=s.label;btn.addEventListener("click",function(){addMsg(s.label,"user");setTimeout(function(){addMsg(K[s.key]||K.def,"bot");},320);});q.appendChild(btn);});}
function initChat(){var box=document.getElementById("chatMessages");if(!box)return;box.innerHTML="";addMsg(K.welcome,"bot");renderShortcuts();}
function sendMsg(){var input=document.getElementById("chatInput");if(!input)return;var v=input.value.trim();if(!v)return;addMsg(v,"user");input.value="";setTimeout(function(){addMsg(matchReply(v),"bot");},350);}
document.getElementById("chatToggle")?.addEventListener("click",function(){var p=document.getElementById("chatPanel");if(!p)return;p.classList.toggle("open");if(p.classList.contains("open")){if(!document.getElementById("chatMessages").children.length)initChat();document.getElementById("chatInput")?.focus();}});
document.getElementById("chatClose")?.addEventListener("click",function(){document.getElementById("chatPanel")?.classList.remove("open");});
document.getElementById("chatSend")?.addEventListener("click",function(e){e.preventDefault();sendMsg();});
document.getElementById("chatInput")?.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();sendMsg();}});
})();
