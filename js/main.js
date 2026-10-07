/* ===== WhatsApp ===== */
const WA_NUMBER = "59896400795";
const WA_DEFAULT = "Hola Rush Bicicletas! Vi la web y quiero consultar por…";
const waURL = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || WA_DEFAULT)}`;
document.querySelectorAll(".wa-link").forEach(a => a.href = waURL(a.dataset.msg));

/* ===== Menú en celular ===== */
(function(){
  const btn = document.getElementById("menuBtn"), header = document.querySelector("header");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
})();

/* ===== Copiar número (contacto) ===== */
(function(){
  const copy = document.getElementById("copy");
  if (!copy) return;
  copy.addEventListener("click", e => {
    const btn = e.currentTarget;
    navigator.clipboard.writeText("096 400 795").then(() => {
      btn.textContent = "Copiado"; setTimeout(() => btn.textContent = "Copiar", 1600);
    }).catch(() => {
      const r = document.createRange(); r.selectNodeContents(document.getElementById("wa-num"));
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    });
  });
})();

/* ===== Abierto / cerrado (hora de Montevideo) ===== */
(function(){
  const el = document.getElementById("status");
  if (!el) return;
  // Lunes a sábado de 9:45 a 17:45 (en minutos desde medianoche)
  const OPEN = 9*60 + 45, CLOSE = 17*60 + 45;
  const parts = new Intl.DateTimeFormat("en-US",{timeZone:"America/Montevideo",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  const day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(get("weekday")), now = Number(get("hour"))*60 + Number(get("minute"));
  const workday = day >= 1 && day <= 6;
  const open = workday && now >= OPEN && now < CLOSE;
  let msg = "Abierto ahora · cierra 17:45";
  if (!open) {
    if (workday && now < OPEN) msg = "Cerrado · abre hoy 9:45";
    else if (day >= 1 && day <= 5) msg = "Cerrado · abre mañana 9:45";
    else msg = "Cerrado · abre el lunes 9:45";
  }
  el.classList.toggle("open", open);
  el.querySelector("span").textContent = msg;
})();

/* ===== Catálogo (editá esta lista) =====
   Datos tomados de los catálogos 2026 de S-Pro, Baccio y Kova, y de la lista de precios Kova (septiembre 2026).
   id: nombre en la dirección de la página del modelo (producto.html?id=…), sin espacios ni tildes.
   Fotos: img/catalogo/<id>.webp y, si hay más, <id>-2.webp, <id>-3.webp… (fotos = cuántas hay).
   price: en dólares (S-Pro y Baccio: lista Deceleste noviembre 2025; Kova: lista septiembre 2026); null = "Consultar".
   specs: datos cortos de la tarjeta. ficha: tabla de características. desc: descripción. */
const PRODUCTS = [
  /* ---------- Montaña ---------- */
  {id:"kova-nepal-hf-29", cat:"mtb", brand:"Kova", name:"Nepal HF 29", price:549, fotos:2,
   specs:["Rodado 29","Aluminio 6061","Shimano 24 vel.","Disco hidráulico"],
   ficha:{"Rodado":"29","Cuadro":"Aluminio 6061, geometría MTB, cableado interno y tubos hidroformados","Horquilla":"Suspensión hidráulica con bloqueo","Transmisión":"Shimano 24 velocidades, comandos Microshift","Frenos":"Disco hidráulico X-Spark","Llantas":"Aluminio doble pared","Avance y manubrio":"Aluminio, manubrio 700 mm","Extras":"Caja centro blindada, autocentrante delantero","Talles":"M y L","Colores":"Negro mate, gris plata"},
   desc:"La Nepal más completa: horquilla hidráulica con bloqueo, 24 velocidades y frenos hidráulicos. Para quienes salen seguido y buscan más rendimiento en todo tipo de terreno."},
  {id:"kova-nepal-29", cat:"mtb", brand:"Kova", name:"Nepal 29", price:399, fotos:2,
   specs:["Rodado 29","Aluminio 6061","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"29","Cuadro":"Aluminio 6061, geometría MTB, cableado interno y tubos hidroformados","Horquilla":"Suspensión delantera con bloqueo","Transmisión":"Shimano 21 velocidades","Frenos":"Disco Logan acero/aluminio","Llantas":"Aluminio doble pared 18 mm","Avance y manubrio":"Aluminio","Extras":"Caja centro blindada, autocentrante delantero","Talles":"M y L","Colores":"Azul cielo, negro mate, negro/gris mate"},
   desc:"Mountain bike de aluminio rodado 29 con suspensión con bloqueo y frenos a disco. Equilibrada para campo y ciudad."},
  {id:"kova-nepal-275", cat:"mtb", brand:"Kova", name:"Nepal 27,5", price:389, fotos:2,
   specs:["Rodado 27,5","Aluminio 6061","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio 6061, geometría MTB, cableado interno y tubos hidroformados","Horquilla":"Suspensión delantera con bloqueo","Transmisión":"Shimano 21 velocidades index","Frenos":"Disco Logan acero/aluminio","Llantas":"Aluminio doble pared 18 mm","Avance y manubrio":"Aluminio","Extras":"Caja centro blindada, autocentrante delantero","Talles":"M y L","Colores":"Gris polar, negro mate"},
   desc:"La Nepal en rodado 27,5: el mismo cuadro de aluminio con cableado interno, más ágil y fácil de manejar."},
  {id:"kova-nepal-275-dama", cat:"mtb", brand:"Kova", name:"Nepal 27,5 Dama", price:359, fotos:2,
   specs:["Rodado 27,5","Aluminio 6061","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio 6061, geometría MTB de dama, cableado interno y tubos hidroformados","Horquilla":"Suspensión delantera con bloqueo","Transmisión":"Shimano 21 velocidades","Frenos":"Disco mecánico","Llantas":"Aluminio doble pared","Avance y manubrio":"Aluminio, manubrio 700 mm","Extras":"Caja centro blindada, autocentrante delantero","Talles":"S y M","Colores":"Negro mate/rosado, negro mate/turquesa"},
   desc:"Versión de dama de la Nepal, con cuadro bajo de aluminio, suspensión con bloqueo y frenos a disco."},
  {id:"kova-tibet-29", cat:"mtb", brand:"Kova", name:"Tibet 29", price:299, fotos:2,
   specs:["Rodado 29","Aluminio 6061","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"29","Cuadro":"Aluminio 6061, geometría MTB, tubos over oval y cableado interno","Horquilla":"Suspensión delantera, tubos de 31,8 mm","Transmisión":"Shimano 21 velocidades index","Frenos":"Disco mecánico","Llantas":"Aluminio doble pared","Avance y manubrio":"Aluminio","Extras":"Caja centro blindada, autocentrante delantero","Talles":"M y L","Colores":"Gris, negro"},
   desc:"Rodado 29 de aluminio a buen precio: cambios Shimano, suspensión y frenos a disco para empezar a salir."},
  {id:"kova-tibet-275", cat:"mtb", brand:"Kova", name:"Tibet 27,5", price:289, fotos:2, tag:"Nuevo modelo",
   specs:["Rodado 27,5","Aluminio 6061","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio 6061, geometría MTB, tubos over oval y cableado interno","Horquilla":"Suspensión delantera, tubos de 31,8 mm","Transmisión":"Shimano 21 velocidades, comandos rapid fire","Frenos":"Disco mecánico","Llantas":"Aluminio doble pared","Avance y manubrio":"Aluminio","Extras":"Caja centro blindada, autocentrante delantero","Talles":"M y L","Colores":"Gris, negro"},
   desc:"La Tibet en rodado 27,5, con comandos rapid fire y frenos a disco."},
  {id:"kova-tibet-275-dama", cat:"mtb", brand:"Kova", name:"Tibet 27,5 Dama", price:289, fotos:2, tag:"Nuevo modelo",
   specs:["Rodado 27,5","Aluminio 6061","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio 6061, geometría MTB de dama, tubos over oval y cableado interno","Horquilla":"Suspensión delantera, tubos de 31,8 mm","Transmisión":"Shimano 21 velocidades, comandos rapid fire","Frenos":"Disco mecánico","Llantas":"Aluminio doble pared","Avance y manubrio":"Aluminio","Extras":"Caja centro blindada, autocentrante delantero","Talles":"M","Colores":"Violeta, negra"},
   desc:"Mountain bike de dama en aluminio, con cuadro bajo, 21 velocidades Shimano y frenos a disco."},
  {id:"kova-tibet-275-vbrake", cat:"mtb", brand:"Kova", name:"Tibet 27,5 V-Brake", price:279, fotos:2,
   specs:["Rodado 27,5","Aluminio 6061","Shimano 21 vel.","V-brake"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio 6061, geometría MTB, tubos over oval","Horquilla":"Suspensión delantera, tubos de 31,8 mm","Transmisión":"Shimano 21 velocidades","Frenos":"V-brake de aluminio","Llantas":"Aluminio doble pared","Avance y manubrio":"Aluminio","Extras":"Caja centro blindada","Talles":"M y L","Colores":"Negro mate/azul, negro mate/naranja, celeste/negro"},
   desc:"La forma más accesible de tener una Tibet de aluminio: mismos cambios Shimano, con frenos V-brake."},
  {id:"kova-alpes-29", cat:"mtb", brand:"Kova", name:"Alpes 29", price:269, fotos:2, tag:"Nuevo modelo",
   specs:["Rodado 29","Acero Hi-Ten","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"29","Cuadro":"Acero Hi-Ten, geometría MTB, tubos de diámetro progresivo y cableado interno","Horquilla":"Suspensión delantera","Transmisión":"Shimano 21 velocidades index","Frenos":"Disco mecánico","Llantas":"Aluminio","Colores":"Negro/celeste, blanco/gris"},
   desc:"Mountain bike de acero rodado 29 para recorridos en senderos de ripio o pavimento."},
  {id:"kova-alpes-275", cat:"mtb", brand:"Kova", name:"Alpes 27,5", price:259, fotos:2, tag:"Nuevo modelo",
   specs:["Rodado 27,5","Acero Hi-Ten","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Acero Hi-Ten, geometría MTB, tubos de diámetro progresivo y cableado interno","Horquilla":"Suspensión delantera","Transmisión":"Shimano 21 velocidades index","Frenos":"Disco mecánico","Llantas":"Aluminio","Colores":"Gris perlado, verde neón"},
   desc:"La Alpes en rodado 27,5: cuadro de acero, cambios Shimano y frenos a disco."},
  {id:"kova-alpes-275-dama", cat:"mtb", brand:"Kova", name:"Alpes 27,5 Dama", price:259, fotos:2, tag:"Nuevo modelo",
   specs:["Rodado 27,5","Acero Hi-Ten","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Acero Hi-Ten, geometría MTB de dama, tubos de diámetro progresivo y cableado interno","Horquilla":"Suspensión delantera","Transmisión":"Shimano 21 velocidades index","Frenos":"Disco mecánico","Llantas":"Aluminio","Colores":"Negro/lila, blanco/lila"},
   desc:"Versión de dama de la Alpes, con cuadro bajo de acero, suspensión y frenos a disco."},
  {id:"kova-andes-29", cat:"mtb", brand:"Kova", name:"Andes 29", price:245, fotos:2,
   specs:["Rodado 29","Acero Hi-Ten","21 vel.","Disco 160 mm"],
   ficha:{"Rodado":"29","Cuadro":"Acero Hi-Ten hidroformado","Horquilla":"Suspensión delantera","Transmisión":"21 velocidades Sun Run indexado, comando rapid fire","Frenos":"Disco 160 mm","Llantas":"Aluminio","Colores":"Gris, negro"},
   desc:"La rodado 29 más accesible de Kova, con suspensión delantera y frenos a disco."},
  {id:"kova-andes-275", cat:"mtb", brand:"Kova", name:"Andes 27,5", price:225, fotos:2,
   specs:["Rodado 27,5","Acero Hi-Ten","21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Acero Hi-Ten, geometría MTB","Horquilla":"Suspensión delantera","Transmisión":"21 velocidades, comando rapid fire","Frenos":"Disco delantero y trasero","Llantas":"Aluminio","Colores":"Gris, negro"},
   desc:"Mountain bike de acero rodado 27,5 con suspensión y doble freno a disco."},
  {id:"kova-andes-26-dama", cat:"mtb", brand:"Kova", name:"Andes 26 Dama", price:179, fotos:2,
   specs:["Rodado 26","Acero Hi-Ten","21 vel.","V-brake"],
   ficha:{"Rodado":"26","Cuadro":"Acero Hi-Ten, diseño sloping que da un rango de uso mayor","Transmisión":"21 velocidades","Frenos":"V-brake","Llantas":"Aluminio","Colores":"Negro/lila, gris/rosa"},
   desc:"Bici de dama rodado 26 con cuadro sloping, cómoda para distintas alturas, y 21 velocidades."},
  {id:"spro-gtx-29", cat:"mtb", brand:"S-Pro", name:"GTX 29", price:599, fotos:3, tag:"Nuevo lanzamiento",
   specs:["Rodado 29","Aluminio 6061","Shimano Cues 2×9","Disco hidráulico"],
   ficha:{"Rodado":"29","Cuadro":"Aluminio hidroformado serie 6061 Xlight, MTB deportivo, cableado interno y fusible","Horquilla":"Suspensión con bloqueo hidráulico y precarga","Transmisión":"Shimano Cues 2×9","Frenos":"Shimano MT200, disco hidráulico","Cubiertas":"Kenda 29×2.35","Componentes":"Mazas de rulemán sellados, soporte de parar","Colores":"Gris, blanco"},
   desc:"La MTB más equipada de S-Pro: transmisión Shimano Cues 2×9, frenos hidráulicos Shimano y horquilla con bloqueo hidráulico."},
  {id:"spro-vx-29", cat:"mtb", brand:"S-Pro", name:"VX 29", price:409, fotos:5,
   specs:["Rodado 29","Aluminio hidroformado","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"29","Cuadro":"Aluminio serie 6000 hidroformado, tipo MTB, cableado interno y fusible","Dirección":"Semi integrada","Horquilla":"Suspensión con bloqueo y precarga","Transmisión":"Shimano TX35, 21 velocidades","Frenos":"Disco mecánico (trasero con anclaje interno)","Llantas":"Aluminio doble pared","Componentes":"Caño de asiento de aluminio, soporte de parar","Colores":"Azul, plata, blanco, naranja"},
   desc:"Cuadro hidroformado con cableado interno y horquilla con bloqueo y precarga. Una 29 firme para tierra y ciudad."},
  {id:"spro-vx-275", cat:"mtb", brand:"S-Pro", name:"VX 27,5", price:399, fotos:6,
   specs:["Rodado 27,5","Aluminio hidroformado","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio serie 6000 hidroformado, tipo MTB, cableado interno y fusible","Dirección":"Semi integrada","Horquilla":"Suspensión con bloqueo y precarga","Transmisión":"Shimano TX35, 21 velocidades","Frenos":"Disco mecánico (trasero con anclaje interno)","Llantas":"Aluminio doble pared","Componentes":"Caño de asiento de aluminio, soporte de parar","Colores":"Azul, blanco, naranja, plata"},
   desc:"La VX en rodado 27,5: el mismo cuadro hidroformado, más ágil."},
  {id:"spro-zero3-29", cat:"mtb", brand:"S-Pro", name:"Zero3 29", price:349, fotos:4, tag:"Nuevo lanzamiento",
   specs:["Rodado 29","Aluminio 6000","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"29","Cuadro":"Aluminio serie 6000, tipo MTB, cableado interno y fusible","Dirección":"Semi integrada","Horquilla":"Suspensión S80","Transmisión":"Shimano TZ31, 21 velocidades","Frenos":"Disco mecánico","Llantas":"Aluminio doble pared","Extras":"Soporte de parar","Colores":"Azul, plata, verde"},
   desc:"Mountain bike de aluminio con cableado interno y frenos a disco, para salir a rodar los fines de semana."},
  {id:"spro-zero3-275", cat:"mtb", brand:"S-Pro", name:"Zero3 27,5", price:329, fotos:4, tag:"Nuevo lanzamiento",
   specs:["Rodado 27,5","Aluminio 6000","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio serie 6000, tipo MTB, cableado interno y fusible","Dirección":"Semi integrada","Horquilla":"Suspensión S80","Transmisión":"Shimano TZ31, 21 velocidades","Frenos":"Disco mecánico","Llantas":"Aluminio doble pared","Extras":"Soporte de parar","Colores":"Azul, plata, verde"},
   desc:"La Zero3 en rodado 27,5, con el mismo equipamiento que la 29."},
  {id:"spro-zero3-lady", cat:"mtb", brand:"S-Pro", name:"Zero3 Lady", price:329, fotos:3, tag:"Nuevo lanzamiento",
   specs:["Rodado 27,5","Aluminio 6000","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio 6000, geometría específica para mujeres, tipo MTB, cableado interno y fusible","Dirección":"Semi integrada","Horquilla":"Suspensión S80","Transmisión":"Shimano TZ31, 21 velocidades","Frenos":"Disco mecánico","Llantas":"Aluminio doble pared","Extras":"Soporte de parar","Colores":"Lila, gris, blanco"},
   desc:"Mountain bike con geometría pensada para mujeres, cuadro de aluminio y frenos a disco."},
  {id:"spro-aspen-275", cat:"mtb", brand:"S-Pro", name:"Aspen 27,5", price:389, fotos:4,
   specs:["Rodado 27,5","Aluminio hidroformado","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio serie 6000 hidroformado, cableado interno, geometría específica para mujeres","Dirección":"Semi integrada","Horquilla":"Suspensión con bloqueo y precarga","Transmisión":"Shimano TX35, 21 velocidades","Frenos":"Disco mecánico (trasero con anclaje interno)","Llantas":"Aluminio doble pared","Componentes":"Engranaje Prowheel, caño de asiento de aluminio","Colores":"Violeta, negro, gris"},
   desc:"MTB de mujer con cuadro hidroformado y horquilla con bloqueo y precarga."},
  {id:"baccio-sunny-man-275", cat:"mtb", brand:"Baccio", name:"Sunny Man 27,5", price:279, fotos:4,
   specs:["Rodado 27,5","Aluminio","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio con fusible","Horquilla":"Suspensión, sistema ahead","Transmisión":"Shimano, 21 velocidades","Frenos":"Disco","Llantas":"Aluminio negro doble pared, rayos negros","Colores":"Verde, azul, negro/turquesa, negro/naranja"},
   desc:"Mountain bike de aluminio con cambios Shimano y freno a disco, de la línea aluminio de Baccio."},
  {id:"baccio-sunny-lady-275", cat:"mtb", brand:"Baccio", name:"Sunny Lady 27,5", price:279, fotos:1,
   specs:["Rodado 27,5","Aluminio","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio con fusible, de dama","Horquilla":"Suspensión, sistema ahead","Transmisión":"Shimano, 21 velocidades","Frenos":"Disco","Llantas":"Aluminio negro doble pared, rayos negros","Colores":"Gris, verde, violeta, negro"},
   desc:"Versión de dama de la Sunny: cuadro de aluminio, Shimano 21 velocidades y freno a disco."},
  {id:"baccio-alpina-x-29", cat:"mtb", brand:"Baccio", name:"Alpina X 29 Man", price:229, fotos:4,
   specs:["Rodado 29","21 vel. index","Disco","Suspensión"],
   ficha:{"Rodado":"29","Cuadro":"Nuevo cuadro MTB","Dirección":"Ahead","Horquilla":"Suspensión delantera","Transmisión":"21 velocidades index","Frenos":"Disco (anclaje interno)","Llantas":"Aluminio","Colores":"Negro/verde, blanco/rojo, negro/naranja"},
   desc:"Mountain bike rodado 29 con nuevo cuadro, dirección ahead y freno a disco."},
  {id:"baccio-alpina-x-275", cat:"mtb", brand:"Baccio", name:"Alpina X 27,5 Man", price:215, fotos:4,
   specs:["Rodado 27,5","21 vel. index","Disco","Suspensión"],
   ficha:{"Rodado":"27,5","Cuadro":"Nuevo cuadro MTB","Dirección":"Ahead","Horquilla":"Suspensión delantera","Transmisión":"21 velocidades index","Frenos":"Disco (anclaje interno)","Llantas":"Aluminio","Colores":"Negro/verde, blanco/rojo, negro/naranja"},
   desc:"La Alpina X en rodado 27,5, con suspensión delantera y freno a disco."},
  {id:"baccio-alpina-man-26", cat:"mtb", brand:"Baccio", name:"Alpina Man 26", price:185, fotos:5,
   specs:["Rodado 26","21 vel.","V-brake"],
   ficha:{"Rodado":"26","Transmisión":"21 velocidades","Frenos":"V-brake","Puños":"Extra soft ergonómicos","Llantas":"Aluminio","Colores":"Negro, gris plata, naranja, turquesa"},
   desc:"Mountain bike rodado 26 de la línea Alpina, con 21 velocidades y puños ergonómicos."},
  {id:"baccio-alpina-lady-26", cat:"mtb", brand:"Baccio", name:"Alpina Lady 26", price:179, fotos:6,
   specs:["Rodado 26","6 vel.","V-brake"],
   ficha:{"Rodado":"26","Transmisión":"6 velocidades","Frenos":"V-brake","Puños":"Extra soft ergonómicos","Llantas":"Aluminio","Colores":"Blanco, violeta, gris, rosa"},
   desc:"Bici de dama rodado 26, con cuadro bajo, 6 velocidades y puños ergonómicos."},

  /* ---------- Urbanas, paseo y ruta ---------- */
  {id:"spro-strada-lady-dlx", cat:"urbana", brand:"S-Pro", name:"Strada Lady DLX", price:379, fotos:5,
   specs:["Rodado 700c","Aluminio 6000","Shimano 7 vel.","Canasto"],
   ficha:{"Rodado":"700c (28)","Cuadro":"Aluminio serie 6000, tipo urban, con fusible","Dirección":"Semi integrada","Horquilla":"Rígida","Transmisión":"Shimano TZ50, 7 velocidades","Equipamiento":"Parrilla trasera de aluminio, guardabarros, canasto delantero","Componentes":"Asiento anatómico de doble resorte, avance regulable, suspensión en caño de asiento","Llantas":"Aluminio doble pared","Colores":"Verde, blanca, rosa, gris"},
   desc:"Urbana de paseo completa: parrilla, guardabarros y canasto, asiento con resortes y suspensión en el caño de asiento."},
  {id:"spro-strada-lady", cat:"urbana", brand:"S-Pro", name:"Strada Lady", price:319, fotos:5,
   specs:["Rodado 700c","Aluminio 6000","Shimano 7 vel."],
   ficha:{"Rodado":"700c (28)","Cuadro":"Aluminio serie 6000, tipo urban, con fusible y fittings para accesorios","Dirección":"Semi integrada","Horquilla":"Rígida","Transmisión":"Shimano TZ50, 7 velocidades","Componentes":"Asiento anatómico de doble resorte, suspensión en caño de asiento, avance regulable","Llantas":"Aluminio doble pared","Colores":"Verde, blanca, rosa, gris"},
   desc:"Urbana liviana de aluminio rodado 700c, cómoda para moverte por la ciudad."},
  {id:"spro-strada-man", cat:"urbana", brand:"S-Pro", name:"Strada Man", price:319, fotos:3,
   specs:["Rodado 700c","Aluminio","Shimano 7 vel."],
   ficha:{"Rodado":"700c (28)","Cuadro":"Sloping, tipo urban, con fusible y fittings para accesorios","Dirección":"Semi integrada","Horquilla":"Rígida","Transmisión":"Shimano TZ50, 7 velocidades","Componentes":"Asiento anatómico de doble resorte, suspensión en caño de asiento, avance regulable","Llantas":"Aluminio doble pared","Colores":"Azul, gris"},
   desc:"La Strada de hombre: urbana rodado 700c con 7 velocidades Shimano y asiento con suspensión."},
  {id:"spro-discovery-lady", cat:"urbana", brand:"S-Pro", name:"Discovery Lady", price:429, fotos:2,
   specs:["Rodado 700c","Trekking","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"700c (28)","Cuadro":"Aluminio, tipo trekking, cableado interno, fusible y fittings para accesorios","Horquilla":"Suspensión con bloqueo","Frenos":"Disco mecánico","Transmisión":"Shimano TY, 21 velocidades","Componentes":"Avance regulable tipo A-Head, cubiertas Kenda 700×40","Colores":"Cobre metalizado, verde metalizado"},
   desc:"Trekking de dama para ciudad y caminos: suspensión con bloqueo, frenos a disco y 21 velocidades."},
  {id:"spro-discovery-man", cat:"urbana", brand:"S-Pro", name:"Discovery Man", price:429, fotos:2,
   specs:["Rodado 700c","Trekking","Shimano 21 vel.","Disco"],
   ficha:{"Rodado":"700c (28)","Cuadro":"Aluminio, tipo trekking, cableado interno, fusible y fittings para accesorios","Horquilla":"Suspensión con bloqueo","Frenos":"Disco mecánico","Transmisión":"Shimano TY, 21 velocidades","Componentes":"Avance regulable tipo A-Head, cubiertas Kenda 700×40","Colores":"Gris metalizado, verde metalizado"},
   desc:"Trekking rodado 700c con suspensión y frenos a disco, para ciudad y caminos."},
  {id:"spro-evo-20", cat:"urbana", brand:"S-Pro", name:"Evo 2.0", price:869, fotos:2, tag:"Ruta",
   specs:["Rodado 700c","Aluminio","Shimano Claris 2×8","Disco"],
   ficha:{"Tipo":"Ruta","Rodado":"700c","Cuadro":"Aluminio ultralight serie 6000, cableado interno","Horquilla":"Aluminio","Transmisión":"Shimano Claris 2×8","Engranaje":"Prowheel compact","Frenos":"Tektro, disco mecánico","Mazas y ejes":"Joy Tec QR","Ruedas":"Aluminio doble pared, perfil 30 mm","Cubiertas":"Kenda 700×32","Talles":"S, M y L","Colores":"Gris"},
   desc:"Bici de ruta de aluminio con Shimano Claris y frenos a disco Tektro."},
  {id:"spro-clipper", cat:"urbana", brand:"S-Pro", name:"Clipper plegable", price:469, fotos:2, tag:"Plegable",
   specs:["Rodado 20","Aluminio plegable","Shimano 7 vel.","Disco"],
   ficha:{"Rodado":"20","Cuadro":"Aluminio serie 6000, plegable","Horquilla":"Rígida","Frenos":"Disco mecánico","Transmisión":"Shimano, 7 velocidades","Componentes":"Cierres de plegado con bloqueo en cuadro, avances y pedales; soporte de parar","Opcional":"Porta equipaje trasero","Colores":"Gris, celeste"},
   desc:"Plegable de aluminio para guardar en casa o llevar en el auto, con cambios Shimano y frenos a disco."},
  {id:"kova-lyon-20", cat:"urbana", brand:"Kova", name:"Lyon 20 plegable", price:239, fotos:2, tag:"Plegable",
   specs:["Rodado 20","Acero plegable","Disco 160 mm"],
   ficha:{"Rodado":"20","Cuadro":"Acero Hi-Ten, plegable","Transmisión":"Piñón libre, engranaje para eje de puntas cuadradas","Frenos":"Disco 160 mm, delantero y trasero","Llantas":"Aluminio doble pared","Extras":"Manubrio de altura variable, parrilla y guardabarros","Colores":"Azul piedra, rojo perlado"},
   desc:"Plegable con parrilla y guardabarros, ideal para combinar con el auto o el ómnibus."},
  {id:"kova-monaco-28", cat:"urbana", brand:"Kova", name:"Monaco 28", price:349, fotos:1,
   specs:["Rodado 28","Aluminio 6061","Shimano 7 vel."],
   ficha:{"Rodado":"28","Cuadro":"Aluminio 6061, geometría street","Transmisión":"Shimano 7 velocidades","Frenos":"V-brake de aluminio","Llantas":"Aluminio","Avance":"Regulable de aluminio","Pedales":"Aluminio con goma antideslizante","Extras":"Caño de asiento con suspensión, autocentrante delantero","Colores":"Azul níquel"},
   desc:"Urbana de aluminio para recorrer la ciudad con agilidad, con suspensión en el caño de asiento."},
  {id:"kova-monaco-dama-275", cat:"urbana", brand:"Kova", name:"Monaco Dama 27,5", price:339, fotos:2,
   specs:["Rodado 27,5","Aluminio 6061","Shimano 7 vel.","Disco"],
   ficha:{"Rodado":"27,5","Cuadro":"Aluminio 6061, cuadro bajo","Transmisión":"Full Shimano 7 velocidades, comandos grip shift","Horquilla":"Suspensión con bloqueo","Frenos":"Disco Logan","Llantas":"Aluminio doble pared","Avance":"Aluminio de altura regulable","Extras":"Movimiento central sellado","Colores":"Negra, arena"},
   desc:"Urbana de cuadro bajo, fácil para subir y bajar, con suspensión y frenos a disco."},
  {id:"kova-new-jazz-26-dama", cat:"urbana", brand:"Kova", name:"New Jazz Dama 26", price:239, fotos:1,
   specs:["Rodado 26","6 vel.","Disco 160 mm","Parrilla"],
   ficha:{"Rodado":"26","Cuadro":"Acero over oval, geometría beach bike","Transmisión":"6 velocidades indexadas, comando grip shift","Frenos":"Disco 160 mm","Asiento":"Confort con resortes","Llantas":"Aluminio","Extras":"Movimiento central de puntas cuadradas, parrilla y guardabarros","Colores":"Gris"},
   desc:"Paseo estilo beach con asiento con resortes, parrilla, guardabarros y frenos a disco."},
  {id:"baccio-liberty", cat:"urbana", brand:"Baccio", name:"Liberty 6 vel.", price:229, fotos:4,
   specs:["Rodado 700c","6 vel. index","Parrilla","Canasto"],
   ficha:{"Rodado":"700c","Transmisión":"6 velocidades index","Avance":"Regulable en altura","Equipamiento":"Guardabarros, parrilla porta paquete reforzada, canasto","Llantas":"Aluminio","Colores":"Blanco, negro, violeta"},
   desc:"Paseo rodado 700c con parrilla reforzada y canasto, lista para los mandados."},
  {id:"baccio-ipanema-26", cat:"urbana", brand:"Baccio", name:"Ipanema 26 6 vel.", price:235, fotos:5,
   specs:["Rodado 26","6 vel. index","Canasto"],
   ficha:{"Rodado":"26","Transmisión":"6 velocidades index","Asiento":"Full confort","Puños":"Ergonómicos","Equipamiento":"Guardabarros, canasto","Llantas":"Aluminio","Cubiertas":"Con bandas blancas","Colores":"Verde, verde coral, crema, violeta"},
   desc:"Paseo clásica con asiento full confort, canasto y cubiertas de banda blanca."},
  {id:"baccio-siena-26", cat:"urbana", brand:"Baccio", name:"Siena 26", price:189, fotos:5,
   specs:["Rodado 26 fino","Parrilla","Canasto"],
   ficha:{"Rodado":"26 fino","Transmisión":"Sin cambios","Equipamiento":"Guardabarros, parrilla porta paquetes, cubre cadena, canasto","Llantas":"Aluminio","Colores":"Blanca, salmón, violeta, verde agua"},
   desc:"Paseo clásica rodado 26 fino con parrilla, canasto y cubre cadena."},
  {id:"kova-ziker", cat:"urbana", brand:"Kova", name:"Ziker triciclo 24", price:369, fotos:2, tag:"Triciclo",
   specs:["Rodado 24","Acero reforzado","2 canastos"],
   ficha:{"Rodado":"24 (llantas de aluminio 24×1,75)","Cuadro":"Acero Hi-Ten reforzado","Transmisión":"Piñón libre con engranaje OPC","Frenos":"Side pull delantero, trasero con banda","Canastos":"Delantero y trasero con varillas","Asiento":"Confort con resortes","Pedales":"Full aluminio con municiones","Extras":"Guardabarros de acero en las 3 ruedas","Colores":"Azul, rojo"},
   desc:"Triciclo para adultos con dos canastos, para el transporte diario más cómodo y seguro."},

  /* ---------- Niños ---------- */
  {id:"baccio-balance-12", cat:"ninos", brand:"Baccio", name:"Balance 12", price:59, fotos:6,
   specs:["Rodado 12","Sin pedales","2 a 4 años"],
   ficha:{"Tipo":"Bicicleta de equilibrio (sin pedales)","Rodado":"12","Asiento":"Regulable en altura, con apoyapiés","Edad":"De 2 a 4 años","Colores":"Blanco/naranja, fucsia/turquesa, azul/naranja, negro/turquesa"},
   desc:"Primera bicicleta de aprendizaje: aprenden a equilibrarse sin pasar por las rueditas."},
  {id:"baccio-mystic-12", cat:"ninos", brand:"Baccio", name:"Mystic 12", price:93, fotos:5,
   specs:["Rodado 12","Estabilizadores","Canasto"],
   ficha:{"Rodado":"12","Frenos":"De banda","Extras":"Estabilizadores reforzados, canasto","Colores":"Rosa, blanco/lila, turquesa/fucsia"},
   desc:"Primera bici con pedales, con rueditas reforzadas y canasto."},
  {id:"baccio-bambino-12", cat:"ninos", brand:"Baccio", name:"Bambino 12", price:93, fotos:4,
   specs:["Rodado 12","Estabilizadores"],
   ficha:{"Rodado":"12","Frenos":"De banda","Extras":"Estabilizadores reforzados","Colores":"Amarillo, celeste, verde"},
   desc:"Primera bici con pedales y rueditas reforzadas."},
  {id:"kova-twister-12", cat:"ninos", brand:"Kova", name:"Twister 12", price:95, fotos:2,
   specs:["Rodado 12","Rueditas","Pad antigolpes"],
   ficha:{"Rodado":"12","Cuadro":"Acero Hi-Ten con pad antigolpes","Transmisión":"Piñón libre con sistema OPC","Frenos":"Side pull","Cubiertas":"Con cámaras de butilo","Manubrio":"Con protección antigolpes","Extras":"Rodamientos de acero, ruedas auxiliares reforzadas","Colores":"Naranja neón, verde neón"},
   desc:"Primera bici con protección antigolpes y rueditas reforzadas."},
  {id:"kova-lola-12", cat:"ninos", brand:"Kova", name:"Lola 12", price:95, fotos:2,
   specs:["Rodado 12","Rueditas","Canasto"],
   ficha:{"Rodado":"12","Cuadro":"Acero Hi-Ten con tubos over","Transmisión":"Piñón libre con sistema OPC","Frenos":"Side pull","Cubiertas":"Con cámaras de butilo","Manubrio":"Con protección antigolpes","Extras":"Canasto delantero, rodamientos de acero, ruedas auxiliares reforzadas","Colores":"Blanca, rosa"},
   desc:"Primera bici con canasto y rueditas reforzadas."},
  {id:"baccio-mystic-16", cat:"ninos", brand:"Baccio", name:"Mystic 16", price:139, fotos:3,
   specs:["Rodado 16","V-brake","Estabilizadores"],
   ficha:{"Rodado":"16","Frenos":"V-brake","Extras":"Guardabarros, cubrecadena, ruedas estabilizadoras reforzadas","Colores":"Blanco/violeta, blanco/fucsia, lila/verde, rosa/violeta"},
   desc:"Rodado 16 con guardabarros, cubrecadena y rueditas reforzadas."},
  {id:"baccio-mystic-sweet-16", cat:"ninos", brand:"Baccio", name:"Mystic Sweet 16", price:149, fotos:4,
   specs:["Rodado 16","Llantas aluminio","Silla portamuñecas"],
   ficha:{"Rodado":"16","Frenos":"V-brake","Llantas":"Aluminio","Extras":"Guardabarros, cubrecadena, ruedas estabilizadoras reforzadas, silla portamuñecas","Colores":"Blanco/fucsia, rosa/violeta, fucsia/naranja, verde/violeta"},
   desc:"La Mystic con llantas de aluminio y silla portamuñecas."},
  {id:"baccio-bambino-16", cat:"ninos", brand:"Baccio", name:"Bambino 16", price:109, fotos:5,
   specs:["Rodado 16","V-brake","Estabilizadores"],
   ficha:{"Rodado":"16","Frenos":"V-brake","Extras":"Cubrecadena, ruedas estabilizadoras reforzadas","Colores":"Negro, naranja, verde, azul"},
   desc:"Rodado 16 con cubrecadena y rueditas reforzadas."},
  {id:"baccio-bambino-dlx-16", cat:"ninos", brand:"Baccio", name:"Bambino DLX 16", price:129, fotos:5,
   specs:["Rodado 16","Llantas aluminio","Caramañola"],
   ficha:{"Rodado":"16","Frenos":"V-brake","Llantas":"Aluminio negras con rayos de colores","Extras":"Caramañola, guardabarros tipo cross, estabilizadores reforzados","Colores":"Rojo/amarillo, celeste/naranja, gris/turquesa, azul/verde"},
   desc:"Rodado 16 estilo cross, con caramañola y llantas de aluminio con rayos de colores."},
  {id:"baccio-miss-ipanema-16", cat:"ninos", brand:"Baccio", name:"Miss Ipanema 16", price:129, fotos:5,
   specs:["Rodado 16","Llantas aluminio","Canasto"],
   ficha:{"Rodado":"16","Frenos":"V-brake","Llantas":"Aluminio","Extras":"Guardabarros, cubrecadena, ruedas estabilizadoras reforzadas, canasto","Colores":"Fucsia/blanco, violeta/verde, blanco/rosado, turquesa/verde"},
   desc:"Paseo para chicas en rodado 16, con canasto y llantas de aluminio."},
  {id:"spro-rocket-16", cat:"ninos", brand:"S-Pro", name:"Rocket 16", price:179, fotos:4,
   specs:["Rodado 16","Aluminio","Rueditas"],
   ficha:{"Rodado":"16","Cuadro":"Aluminio","Frenos":"V-brake","Accesorios":"Ruedas auxiliares reforzadas, cubrecadena integral, avances ahead","Colores":"Rosa, turquesa"},
   desc:"Rodado 16 con cuadro de aluminio liviano, cubrecadena integral y rueditas reforzadas."},
  {id:"kova-twister-16", cat:"ninos", brand:"Kova", name:"Twister 16", price:105, fotos:2,
   specs:["Rodado 16","V-brake","Rueditas"],
   ficha:{"Rodado":"16","Cuadro":"Acero Hi-Ten con pad antigolpes","Transmisión":"Piñón libre con sistema OPC","Frenos":"V-brake","Llantas":"Aluminio","Manubrio":"MTB","Extras":"Rodamientos de acero, ruedas auxiliares reforzadas","Colores":"Naranja neón, verde neón"},
   desc:"Rodado 16 con pad antigolpes y rueditas reforzadas."},
  {id:"kova-lola-16", cat:"ninos", brand:"Kova", name:"Lola 16", price:135, fotos:2,
   specs:["Rodado 16","Canasto","Silla portamuñecas"],
   ficha:{"Rodado":"16","Cuadro":"Acero Hi-Ten, geometría new classic con tubos over","Transmisión":"Piñón libre 16 dientes, sistema OPC","Frenos":"V-brake","Llantas":"Aluminio","Cubiertas":"16×2.125 negras con banda blanca","Asiento":"Extra pullman","Extras":"Silla portamuñecas, canasto trenzado, estabilizadores laterales","Colores":"Blanca, violeta"},
   desc:"Con canasto trenzado y silla portamuñecas, para salir a pasear con su muñeca."},
  {id:"kova-new-jazz-16", cat:"ninos", brand:"Kova", name:"New Jazz 16", price:155, fotos:2,
   specs:["Rodado 16","Canasto de mimbre","Rueditas"],
   ficha:{"Rodado":"16","Cuadro":"Acero, diseño beach accesible","Asiento":"Confort con resortes","Frenos":"V-brake","Llantas":"Aluminio","Extras":"Canasto clásico de mimbre, cubrecadena transparente, guardabarros de metal, estabilizadores","Colores":"Palo de rosa, verde mate"},
   desc:"Estilo clásico con canasto de mimbre y guardabarros de metal."},
  {id:"kova-alpes-16", cat:"ninos", brand:"Kova", name:"Alpes 16 2.0", price:139, fotos:2,
   specs:["Rodado 16","Suspensión","Disco 160 mm"],
   ficha:{"Rodado":"16","Cuadro":"Acero Hi-Ten, geometría MTB","Horquilla":"Suspensión telescópica","Transmisión":"Piñón libre con sistema OPC","Frenos":"Disco 160 mm, delantero y trasero","Llantas":"Aluminio doble pared","Manubrio":"MTB","Extras":"Ruedas laterales reforzadas","Colores":"Azul, negra"},
   desc:"Mountain bike para chicos con suspensión y frenos a disco, con rueditas reforzadas."},
  {id:"baccio-mystic-20", cat:"ninos", brand:"Baccio", name:"Mystic 20", price:149, fotos:5,
   specs:["Rodado 20","V-brake","Guardabarros"],
   ficha:{"Rodado":"20","Frenos":"V-brake","Extras":"Guardabarros y cubrecadena","Colores":"Rosa/violeta, blanco/fucsia, blanco/violeta, lila/verde"},
   desc:"Rodado 20 con guardabarros y cubrecadena."},
  {id:"baccio-mystic-sweet-20", cat:"ninos", brand:"Baccio", name:"Mystic Sweet 20", price:159, fotos:4,
   specs:["Rodado 20","Llantas aluminio","Canasto"],
   ficha:{"Rodado":"20","Frenos":"V-brake","Llantas":"Aluminio","Extras":"Guardabarros, cubrecadena, canasto delantero","Colores":"Blanco/fucsia, rosa/violeta, fucsia/naranja, verde/violeta"},
   desc:"La Mystic 20 con canasto y llantas de aluminio."},
  {id:"baccio-bambino-20", cat:"ninos", brand:"Baccio", name:"Bambino 20", price:119, fotos:5,
   specs:["Rodado 20","V-brake"],
   ficha:{"Rodado":"20","Frenos":"V-brake","Extras":"Cubrecadena","Colores":"Azul, naranja, verde, negro"},
   desc:"Rodado 20 resistente con cubrecadena."},
  {id:"baccio-bambino-dlx-20", cat:"ninos", brand:"Baccio", name:"Bambino DLX 20", price:155, fotos:5,
   specs:["Rodado 20","Suspensión","Llantas aluminio"],
   ficha:{"Rodado":"20","Horquilla":"Suspensión delantera","Llantas":"Aluminio negras con rayos de colores","Extras":"Caramañola, guardabarros tipo cross","Colores":"Rojo/amarillo, celeste/naranja, gris/turquesa, azul/verde"},
   desc:"Rodado 20 estilo cross con suspensión delantera y caramañola."},
  {id:"spro-rocket-20", cat:"ninos", brand:"S-Pro", name:"Rocket 20", price:249, fotos:5,
   specs:["Rodado 20","Aluminio","Shimano 7 vel.","Disco"],
   ficha:{"Rodado":"20","Cuadro":"Aluminio tipo mountain, cableado interno","Horquilla":"Suspensión","Frenos":"Disco mecánico","Transmisión":"Shimano 7 velocidades","Componentes":"Avances y juego de dirección ahead","Colores":"Lila, blanco, azul"},
   desc:"Mountain bike rodado 20 de aluminio con cambios Shimano y frenos a disco."},
  {id:"kova-twister-20", cat:"ninos", brand:"Kova", name:"Twister 20", price:119, fotos:2,
   specs:["Rodado 20","Disco"],
   ficha:{"Rodado":"20","Cuadro":"Acero Hi-Ten, geometría MTB","Transmisión":"Piñón libre con sistema OPC","Frenos":"Disco delantero y trasero","Llantas":"Aluminio","Avance y manubrio":"MTB","Extras":"Rodamientos de acero","Colores":"Azul neón, negro mate"},
   desc:"Rodado 20 con doble freno a disco."},
  {id:"kova-alpes-20", cat:"ninos", brand:"Kova", name:"Alpes 20 2.0", price:149, fotos:2,
   specs:["Rodado 20","Suspensión","Disco 160 mm"],
   ficha:{"Rodado":"20","Cuadro":"Acero Hi-Ten, geometría MTB","Horquilla":"Suspensión telescópica","Transmisión":"Piñón libre con sistema OPC","Frenos":"Disco 160 mm, delantero y trasero","Llantas":"Aluminio doble pared","Manubrio":"MTB","Colores":"Azul, negro"},
   desc:"Mountain bike rodado 20 con suspensión y frenos a disco."},
  {id:"kova-new-jazz-20", cat:"ninos", brand:"Kova", name:"New Jazz 20", price:165, fotos:2,
   specs:["Rodado 20","Canasto de mimbre","V-brake"],
   ficha:{"Rodado":"20","Cuadro":"Acero, diseño beach accesible","Asiento":"Confort con resortes","Frenos":"V-brake","Llantas":"Aluminio","Extras":"Canasto clásico de mimbre, cubrecadena transparente, guardabarros de metal","Colores":"Palo de rosa, verde mate"},
   desc:"Estilo clásico con canasto de mimbre y asiento con resortes."},
  {id:"kova-lola-20", cat:"ninos", brand:"Kova", name:"Lola 20", price:145, fotos:2,
   specs:["Rodado 20","Canasto","Silla portamuñecas"],
   ficha:{"Rodado":"20","Cuadro":"Acero Hi-Ten, geometría new classic con tubos over","Transmisión":"Piñón libre 16 dientes, sistema OPC","Frenos":"V-brake","Llantas":"Aluminio","Cubiertas":"20×2.125 negras con banda blanca","Asiento":"Extra pullman","Extras":"Silla portamuñecas, canasto delantero trenzado","Colores":"Blanca, violeta"},
   desc:"Rodado 20 con canasto trenzado y silla portamuñecas."},
  {id:"baccio-mystic-24", cat:"ninos", brand:"Baccio", name:"Mystic 24", price:179, fotos:5,
   specs:["Rodado 24","Llantas aluminio","Canasto"],
   ficha:{"Rodado":"24","Frenos":"V-brake","Llantas":"Aluminio","Extras":"Guardabarros, canasto delantero","Colores":"Blanca/fucsia, gris/fucsia, violeta/verde, blanco/turquesa"},
   desc:"Paseo rodado 24 con canasto, para chicas que ya pasaron la 20."},
  {id:"kova-jazz-24-nina", cat:"ninos", brand:"Kova", name:"Jazz 24 Niña", price:199, fotos:2,
   specs:["Rodado 24","Canasto","V-brake"],
   ficha:{"Rodado":"24","Cuadro":"Acero Hi-Ten, geometría custom beach","Transmisión":"Piñón libre","Frenos":"V-brake","Llantas":"Aluminio","Manubrio":"Custom","Extras":"Canasto delantero y guardabarros","Colores":"Blanco perlado, violeta"},
   desc:"Estilo beach en rodado 24, con canasto y guardabarros."},
  {id:"kova-andes-24-nina", cat:"ninos", brand:"Kova", name:"Andes 24 Niña", price:179, fotos:2, tag:"Nuevo modelo",
   specs:["Rodado 24","Canasto","V-brake"],
   ficha:{"Rodado":"24","Cuadro":"Acero Hi-Ten, geometría MTB","Transmisión":"Piñón libre","Frenos":"V-brake","Llantas":"Aluminio","Extras":"Canasto delantero","Colores":"Negro/rosa, blanco/rosa"},
   desc:"Rodado 24 con canasto delantero."},
  {id:"kova-andes-24", cat:"ninos", brand:"Kova", name:"Andes 24", price:179, fotos:2,
   specs:["Rodado 24","6 vel.","Disco"],
   ficha:{"Rodado":"24","Cuadro":"Acero Hi-Ten, geometría MTB","Transmisión":"6 velocidades","Frenos":"Disco","Llantas":"Aluminio","Colores":"Negro, gris"},
   desc:"Mountain bike rodado 24 con 6 velocidades y frenos a disco."},
  {id:"spro-kodiak-24", cat:"ninos", brand:"S-Pro", name:"Kodiak 24", price:279, fotos:5,
   specs:["Rodado 24","Aluminio","Shimano 7 vel.","Disco"],
   ficha:{"Rodado":"24","Cuadro":"Aluminio tipo mountain, cableado interno","Horquilla":"Suspensión","Frenos":"Disco mecánico","Transmisión":"Shimano 7 velocidades","Componentes":"Avance y juego de dirección ahead","Colores":"Azul, verde, lila"},
   desc:"Mountain bike rodado 24 de aluminio con suspensión, Shimano 7 velocidades y frenos a disco."},
  {id:"baccio-alpina-man-24", cat:"ninos", brand:"Baccio", name:"Alpina Man 24", price:169, fotos:5,
   specs:["Rodado 24","6 vel.","V-brake"],
   ficha:{"Rodado":"24","Transmisión":"6 velocidades","Frenos":"V-brake","Llantas":"Aluminio","Colores":"Negro, gris plata, naranja, turquesa"},
   desc:"Mountain bike rodado 24 con 6 velocidades."},
  {id:"baccio-alpina-lady-24", cat:"ninos", brand:"Baccio", name:"Alpina Lady 24", price:169, fotos:5,
   specs:["Rodado 24","6 vel.","V-brake"],
   ficha:{"Rodado":"24","Transmisión":"6 velocidades","Frenos":"V-brake","Puños":"Extra soft ergonómicos","Llantas":"Aluminio","Colores":"Blanco, violeta, gris, rosa"},
   desc:"Rodado 24 de cuadro bajo con 6 velocidades y puños ergonómicos."},

  /* ---------- BMX y freestyle ---------- */
  {id:"baccio-fly-free-20", cat:"bmx", brand:"Baccio", name:"Fly Free 20", price:175, fotos:4,
   specs:["Rodado 20","Picadores","V-brake"],
   ficha:{"Rodado":"20","Llantas":"Aluminio","Frenos":"V-brake","Extras":"Picadores, cubrecadena","Colores":"Rojo, verde, turquesa"},
   desc:"BMX rodado 20 con picadores, para empezar con los trucos."},
  {id:"kova-x-up", cat:"bmx", brand:"Kova", name:"X-Up freestyle", price:179, fotos:2,
   specs:["Rodado 20","Cromada","Rotor 360°"],
   ficha:{"Rodado":"20","Cuadro":"Acero Hi-Ten, diseño freestyle cromado","Transmisión":"Piñón libre","Frenos":"V-brake de aluminio","Llantas":"Aluminio, 36 rayos","Manubrio":"Con rotor para giro de 360°","Avance":"4 puntos de ajuste","Extras":"4 picadores","Colores":"Cromada roja, cromada azul"},
   desc:"Freestyle cromada con rotor para girar el manubrio 360° y cuatro picadores."},
  {id:"kova-hop-freestyle", cat:"bmx", brand:"Kova", name:"Hop freestyle 20", price:239, fotos:2, tag:"Nuevo modelo",
   specs:["Rodado 20","Engranaje CR-MO","48 rayos"],
   ficha:{"Rodado":"20","Cuadro":"Acero Hi-Ten, diseño freestyle","Engranaje":"CR-MO","Maza y piñón":"Cassette","Ruedas":"48 rayos, cubiertas 20×2,30","Frenos":"Trasero tipo U de aluminio","Colores":"Azul, negro mate"},
   desc:"Para iniciarse en el freestyle: engranaje CR-MO y ruedas de 48 rayos."},
  {id:"spro-vert", cat:"bmx", brand:"S-Pro", name:"Vert", price:249, fotos:3,
   specs:["Rodado 20","CRMO 3 piezas","48 rayos"],
   ficha:{"Rodado":"20","Cuadro":"Tipo BMX / freestyle","Frenos":"Trasero de anclaje inverso","Engranaje":"CRMO 3 piezas","Ruedas":"48 rayos, cubiertas 20×2.4","Componentes":"Picadores","Colores":"Índigo, verde"},
   desc:"BMX freestyle con engranaje CRMO de 3 piezas y ruedas de 48 rayos."},
  {id:"kova-hop-26", cat:"bmx", brand:"Kova", name:"Hop 26 Dirt Jump", price:429, fotos:2,
   specs:["Rodado 26","Aluminio","8 vel.","Doble disco"],
   ficha:{"Rodado":"26","Cuadro":"Aluminio, geometría específica dirt jump","Frenos":"Doble freno a disco","Maza delantera":"Aluminio con eje CR-MO, autocentrante y rulemanes","Maza trasera":"Aluminio con eje CR-MO y rulemanes","Cassette":"8 velocidades, 6 crickets resonadores","Cambio":"LWOO RD 4008","Colores":"Azul, negra"},
   desc:"Dirt jump de aluminio con doble freno a disco y mazas con eje CR-MO, para saltar y jugar."},

  /* ---------- Eléctricas ---------- */
  {id:"spro-e-strada", cat:"electrica", brand:"S-Pro", name:"E-Strada", price:890, fotos:3, tag:"Eléctrica",
   specs:["Motor 250W","Batería 36V 7,8Ah","Rodado 26"],
   ficha:{"Cuadro":"Aluminio","Horquilla":"Rígida","Avances":"Regulable","Transmisión":"Shimano 7 velocidades","Frenos":"V-brake","Cubiertas":"CST 26×1.95","Panel":"Botonera","Motor":"36V 250W, con acelerador","Velocidad máxima":"25 km/h","Autonomía aprox.":"45 a 55 km","Batería":"36V 7,8Ah","Parrilla":"Acero","Guardabarros":"Plástico","Colores":"Gris, azul"},
   desc:"La eléctrica urbana de entrada de S-Pro, con parrilla y guardabarros para el día a día."},
  {id:"spro-e-strada-dlx", cat:"electrica", brand:"S-Pro", name:"E-Strada DLX", price:979, fotos:3, tag:"Eléctrica",
   specs:["Motor 250W","32 km/h","Disco","Luces LED"],
   ficha:{"Cuadro":"Aluminio","Horquilla":"Suspensión","Avances":"Regulable","Transmisión":"Shimano 7 velocidades","Frenos":"Disco mecánico","Cubiertas":"CST 26×1.95","Panel":"Botonera","Motor":"36V 250W, con acelerador","Velocidad máxima":"32 km/h","Autonomía aprox.":"45 a 55 km","Batería":"36V 7,8Ah","Luces":"LED delantera, trasera y de freno","Parrillas":"Aluminio","Guardabarros":"Plástico","Colores":"Celeste, verde oscuro"},
   desc:"La E-Strada con suspensión, frenos a disco y luces LED."},
  {id:"spro-mob-700", cat:"electrica", brand:"S-Pro", name:"MOB 700", price:1179, fotos:3, tag:"Eléctrica",
   specs:["Motor 350W","Rodado 700c","Batería 10,4Ah"],
   ficha:{"Cuadro":"Aluminio","Horquilla":"Suspensión ZOOM con bloqueo","Avances":"Regulable","Transmisión":"Shimano 7 velocidades","Frenos":"Disco mecánico","Cubiertas":"CST 700×40c","Panel":"LCD color","Motor":"36V 350W, con acelerador","Velocidad máxima":"32 km/h","Autonomía aprox.":"45 a 55 km","Batería":"36V 10,4Ah","Parrillas":"Aluminio","Guardabarros":"Plástico","Colores":"Azul, gris"},
   desc:"Rueda grande 700c para rodar parejo en la ciudad, con motor de 350W y panel LCD color."},
  {id:"spro-carrot", cat:"electrica", brand:"S-Pro", name:"Carrot", price:1149, fotos:3, tag:"Eléctrica",
   specs:["Motor 350W","32 km/h","Cuadro bajo"],
   ficha:{"Cuadro":"Aluminio, de fácil acceso","Horquilla":"Suspensión con bloqueo","Avances":"Regulable","Transmisión":"Shimano 7 velocidades","Frenos":"Disco mecánico","Cubiertas":"CST 26×2.10","Panel":"LCD color","Motor":"36V 350W, con acelerador","Velocidad máxima":"32 km/h","Autonomía aprox.":"45 a 55 km","Batería":"36V 10,4Ah","Luces":"LED delantera, trasera y de freno","Parrillas":"Aluminio","Guardabarros":"Plástico","Colores":"Gris, azul"},
   desc:"Cuadro bajo para subir y bajar fácil, suspensión con bloqueo y luces LED."},
  {id:"spro-e-clipper", cat:"electrica", brand:"S-Pro", name:"E-Clipper plegable", price:1099, fotos:3, tag:"Eléctrica",
   specs:["Motor 48V 350W","Plegable","Rodado 20"],
   ficha:{"Cuadro":"Aluminio plegable","Horquilla":"Rígida","Avances":"Aluminio plegable y ajustable","Transmisión":"Shimano 7 velocidades","Frenos":"Disco mecánico","Cubiertas":"20×2.6","Panel":"LCD color","Motor":"48V 350W, con acelerador","Velocidad máxima":"32 km/h","Autonomía aprox.":"50 a 60 km","Batería":"48V 10,4Ah","Parrillas":"Acero","Luces":"LED delantera, trasera y de freno","Guardabarros":"Plástico","Colores":"Verde mate"},
   desc:"Eléctrica plegable de cubiertas anchas, para guardarla en casa o llevarla en el auto."},
  {id:"spro-matrix", cat:"electrica", brand:"S-Pro", name:"Matrix", price:1790, fotos:2, tag:"Eléctrica",
   specs:["Motor 48V 500W","45 km/h","Batería 15Ah"],
   ficha:{"Cuadro":"Aluminio","Horquilla":"Suspensión con bloqueo","Transmisión":"Shimano 7 velocidades","Frenos":"Disco hidráulico","Cubiertas":"26×3.0","Panel":"LCD integrado al avance","Motor":"48V 500W, con acelerador","Velocidad máxima":"45 km/h","Autonomía aprox.":"50 a 60 km","Batería":"48V 15Ah","Parrillas":"Sí","Luces":"LED incorporadas (delantera, trasera y de freno)","Guardabarros":"Sí","Colores":"Azul"},
   desc:"La eléctrica más potente de S-Pro: motor de 500W, batería de 15Ah, cubiertas anchas y frenos hidráulicos."},
  {id:"spro-chilly", cat:"electrica", brand:"S-Pro", name:"Chilly plegable", price:1790, fotos:3, tag:"Eléctrica",
   specs:["Motor 48V 500W","Plegable","Rodado 20×4.0"],
   ficha:{"Rodado":"20×4.0","Cuadro":"Plegable en aluminio serie 6000, batería integrada y cierres de plegado con bloqueo","Horquilla":"Suspensión","Transmisión":"Shimano 7 velocidades","Frenos":"Hidráulicos Logan","Motor":"48V 500W en maza trasera","Batería":"Litio 48V 13Ah","Componentes":"Panel LCD de asistencia, luces LED delantera y trasera, guardabarros, cubrecadena, parrilla trasera","Colores":"Negro"},
   desc:"Plegable con cubiertas balón, motor de 500W y frenos hidráulicos."},

  /* ---------- Accesorios ---------- */
  {id:"kova-portabicicletas-2", cat:"accesorio", brand:"Kova", name:"Portabicicletas universal 2 bicis", price:57, fotos:1,
   specs:["Para 2 bicis","Sedán o SUV"],
   ficha:{"Material":"Tubos de acero","Ajuste":"Cremalleras plásticas de amplia regulación","Protección":"Apoyos para cuidar la pintura del auto","Compatibilidad":"La mayoría de los sedán y SUV","Capacidad":"2 bicicletas"},
   desc:"Portabicicletas para el baúl del auto, para llevar dos bicis."},
  {id:"kova-portabicicletas-3", cat:"accesorio", brand:"Kova", name:"Portabicicletas universal Deluxe 3 bicis", price:98, fotos:1,
   specs:["Para 3 bicis","Sedán o SUV"],
   ficha:{"Material":"Tubos de acero","Ajuste":"Cremalleras plásticas de amplia regulación","Protección":"Apoyos para cuidar la pintura del auto","Soportes":"Individuales para cada bicicleta","Compatibilidad":"La mayoría de los sedán y SUV","Capacidad":"3 bicicletas"},
   desc:"Portabicicletas con soportes individuales, para llevar hasta tres bicis."},
  {id:"kova-babysilla-delantera", cat:"accesorio", brand:"Kova", name:"Babysilla delantera", price:79, fotos:1,
   specs:["Hasta 22 kg","Homologada UE"],
   ficha:{"Colocación":"Al caño central, delante del asiento; sistema de quitado fácil","Posición":"El niño o niña viaja sentado en el mismo sentido que el ciclista","Homologación":"Comunidad Europea","Capacidad":"Hasta 22 kg"},
   desc:"Silla delantera para llevar a los más chicos adelante, a la vista."},
  {id:"kova-babysilla-trasera", cat:"accesorio", brand:"Kova", name:"Babysilla trasera", price:75, fotos:1,
   specs:["Hasta 22 kg","Anclaje fácil"],
   ficha:{"Colocación":"Anclaje fácil, se pone y se quita apretando un botón","Seguridad":"Apoya cabeza y mango de protección","Capacidad":"Hasta 22 kg"},
   desc:"Silla trasera con apoya cabeza, se saca con un botón."},
  {id:"kova-silla-munecas", cat:"accesorio", brand:"Kova", name:"Silla porta muñecas Lola", price:5.2, fotos:1,
   specs:["Rodados 12, 16 y 20"],
   ficha:{"Compatibilidad":"Bicis rodado 12, 16 y 20"},
   desc:"Sillita para que la muñeca también salga a pasear."},
];
const CAT_LABELS = {mtb:"Montaña", urbana:"Urbanas y paseo", ninos:"Niños", bmx:"BMX y freestyle", electrica:"Eléctricas", accesorio:"Accesorios"};
const CAT_PAGE = {mtb:["bicicletas.html","Bicicletas"], urbana:["bicicletas.html","Bicicletas"], ninos:["bicicletas.html","Bicicletas"], bmx:["bicicletas.html","Bicicletas"], electrica:["electricas.html","Eléctricas"], accesorio:["repuestos.html","Repuestos"]};
const photosOf = p => Array.from({length: p.fotos || 1}, (_, i) => `catalogo/${p.id}${i ? `-${i + 1}` : ""}.webp`);
PRODUCTS.forEach(p => { [p.img, ...p.imgs] = photosOf(p); });
const money = n => n == null ? "Consultar" : `US$ ${n.toLocaleString("es-UY", {minimumFractionDigits: n % 1 ? 2 : 0})}`;

function cardHTML(p){
  return `
    <a class="card" href="producto.html?id=${p.id}">
      <div class="pic">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
        <img src="img/${p.img}" alt="${p.brand} ${p.name}" loading="lazy">
      </div>
      <div class="body">
        <div class="brand-name">${p.brand}</div>
        <h3>${p.name}</h3>
        <ul class="specs">${p.specs.map(s => `<li>${s}</li>`).join("")}</ul>
        <div class="foot">
          <div class="p"><small>${p.from ? "Desde" : "Precio"}</small>${money(p.price)}</div>
          <span class="more" aria-hidden="true">Ver detalles →</span>
        </div>
      </div>
    </a>`;
}

/* Listado con filtros (bicicletas, eléctricas, repuestos) */
(function(){
  const grid = document.getElementById("grid"), chips = document.getElementById("chips");
  if (!grid) return;
  // Cada página indica sus categorías en <div id="grid" data-cats="mtb,spinning">
  const cats = grid.dataset.cats.split(",");
  const items = PRODUCTS.filter(p => cats.includes(p.cat));
  let current = "todas";

  function renderChips(){
    if (cats.length < 2) { chips.hidden = true; return; }
    const opts = [["todas","Todas"], ...cats.map(c => [c, CAT_LABELS[c]])];
    chips.innerHTML = opts.map(([id,label]) => {
      const n = id === "todas" ? items.length : items.filter(p => p.cat === id).length;
      return `<button class="chip" type="button" data-cat="${id}" aria-pressed="${id===current}">${label}<small>${n}</small></button>`;
    }).join("");
  }
  function renderGrid(){
    const list = current === "todas" ? items : items.filter(p => p.cat === current);
    grid.innerHTML = list.map(cardHTML).join("");
  }
  chips.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    current = b.dataset.cat; renderChips(); renderGrid();
  });
  renderChips(); renderGrid();
})();

/* Página de un modelo (producto.html?id=…) */
(function(){
  const root = document.getElementById("producto");
  if (!root) return;
  const p = PRODUCTS.find(x => x.id === new URLSearchParams(location.search).get("id"));
  if (!p) {
    root.innerHTML = `<div class="wrap notfound"><h1 class="page-title">No encontramos ese modelo</h1><p>Puede que ya no esté en el catálogo.</p><a class="btn btn-ghost" href="bicicletas.html">Ver bicicletas</a></div>`;
    return;
  }
  const [catHref, catName] = CAT_PAGE[p.cat];
  const photos = [p.img, ...(p.imgs || [])];
  document.title = `${p.brand} ${p.name} · Rush Bicicletas`;
  document.querySelectorAll(`#menu a[href="${catHref}"]`).forEach(a => a.setAttribute("aria-current","page"));
  // El botón flotante de WhatsApp ya lleva el modelo en el mensaje
  document.querySelectorAll(".wa-float").forEach(a => a.href = waURL(`Hola Rush Bicicletas! Quiero consultar por ${p.brand} ${p.name}${p.price == null ? "" : ` (${money(p.price)})`}.`));

  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  root.innerHTML = `
    <div class="wrap">
      <nav class="crumbs" aria-label="Estás en"><a href="index.html">Inicio</a><span>›</span><a href="${catHref}">${catName}</a><span>›</span><b>${p.brand} ${p.name}</b></nav>
      <div class="pdp">
        <div class="gallery">
          ${photos.length > 1 ? `<div class="thumbs" role="group" aria-label="Fotos">${photos.map((src,i) => `<button type="button" aria-label="Foto ${i+1}" aria-pressed="${i===0}" data-src="img/${src}"><img src="img/${src}" alt=""></button>`).join("")}</div>` : ""}
          <div class="main-photo">
            ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
            <img id="mainPhoto" src="img/${p.img}" alt="${p.brand} ${p.name}">
          </div>
        </div>
        <aside class="buybox">
          <div class="brand-name">${p.brand}</div>
          <h1>${p.name}</h1>
          <div class="price"><small>${p.from ? "Desde" : "Precio"}</small>${money(p.price)}</div>
          <ul class="specs">${p.specs.map(s => `<li>${s}</li>`).join("")}</ul>
          <ul class="perks">
            <li><b>Consultá stock, talles y colores</b> con el botón de WhatsApp: te respondemos en el día.</li>
            <li><b>Retiro en el local</b>, Rivera 4713, Montevideo. Lunes a sábado de 9:45 a 17:45.</li>
            ${p.cat === "accesorio" ? `<li><b>Te asesoramos</b> para elegir el que va con tu bici.</li>` : `<li><b>Te la entregamos armada y regulada</b> por nuestro taller.</li>`}
            <li><b>Medios de pago:</b> efectivo, transferencia y tarjetas.</li>
          </ul>
          <p class="note">${p.price == null ? "Consultanos el precio y el stock por WhatsApp." : "Precio de referencia en dólares, sujeto a cambio."}</p>
        </aside>
      </div>
      <div class="pdp-info">
        <section>
          <h2>Características</h2>
          <table class="ficha"><tbody>
            ${Object.entries(p.ficha).map(([k,v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join("")}
          </tbody></table>
        </section>
        <section>
          <h2>Descripción</h2>
          <p>${p.desc}</p>
        </section>
      </div>
      ${related.length ? `<section class="related"><h2>Otros modelos</h2><div class="grid">${related.map(cardHTML).join("")}</div></section>` : ""}
    </div>`;

  const main = document.getElementById("mainPhoto");
  root.querySelectorAll(".thumbs button").forEach(b => b.addEventListener("click", () => {
    main.src = b.dataset.src;
    root.querySelectorAll(".thumbs button").forEach(x => x.setAttribute("aria-pressed", x === b));
  }));
})();

/* ===== Ciclista que cruza la página con el scroll (con lerp) ===== */
(function(){
  const bike = document.getElementById("bike");
  if (!bike) return;                          // solo está en la portada
  const flip = document.getElementById("bikeFlip");
  const wL = document.getElementById("rueda-izq");
  const wR = document.getElementById("rueda-der");
  const crank = document.getElementById("pedal");
  const estela = document.getElementById("estela");
  const NS = "http://www.w3.org/2000/svg";
  // cada pierna: contorno, muslo con calza, pantorrilla, media y zapatilla
  function makeLeg(g, t){
    const mk = (stroke, w) => { const p = document.createElementNS(NS, "path"); p.setAttribute("fill","none"); p.setAttribute("stroke",stroke); p.setAttribute("stroke-width",w); p.setAttribute("stroke-linecap","round"); p.setAttribute("stroke-linejoin","round"); g.appendChild(p); return p; };
    return { ink: mk("#141010", 22), skin: mk(t.skin, 16), shorts: mk(t.shorts, 20), sock: mk("#F0892A", 11), shoeInk: mk("#141010", 12), shoe: mk("#FFFFFF", 7) };
  }
  const legNear = makeLeg(document.getElementById("leg-near"), {skin:"#C98A5E", shorts:"#3E8C8A"});
  const legFar  = makeLeg(document.getElementById("leg-far"),  {skin:"#9C6440", shorts:"#2C6664"});
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const VIEW_W = 490, WHEEL_R = 61;          // unidades del viewBox
  const EASE = 0.085;                         // inercia: menor = más suave
  const FLIP_ON_RETURN = false;               // solo avanza: nunca se da vuelta

  // Piernas: cadera en el asiento, pies en los pedales (cinemática inversa de 2 huesos)
  const HIP = [166, 66], THIGH = 92, SHIN = 100, BB = [195, 209], CRANK = 36;

  let target = 0, x = 0, lastX = null, dir = 1, rot = 0;

  const section = document.getElementById("ride");
  function measure(){
    // 0 cuando la franja entra por abajo de la pantalla, 1 cuando sale por arriba
    const rect = section.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight - rect.top) / (innerHeight + rect.height)));
    const bw = bike.offsetWidth;
    const t = -bw + (innerWidth + bw) * p;   // de afuera a la izquierda → afuera a la derecha
    if (lastX === null) { target = t; x = t; lastX = x; return; }
    // Solo hacia abajo: al subir la bici no retrocede.
    // Si la franja vuelve a quedar debajo de la pantalla, se reinicia para pasar otra vez.
    if (p === 0) { target = t; x = t; lastX = x; }
    else target = Math.max(target, t);
  }

  function drawLeg(L, foot){
    const dx = foot[0] - HIP[0], dy = foot[1] - HIP[1];
    const len = Math.hypot(dx, dy); const d = Math.min(len, THIGH + SHIN - 0.5);
    const a = (THIGH*THIGH - SHIN*SHIN + d*d) / (2*d);
    const h = Math.sqrt(Math.max(0, THIGH*THIGH - a*a));
    const ux = dx / len, uy = dy / len;
    const px = HIP[0] + a*ux, py = HIP[1] + a*uy;
    let kx = px - h*uy, ky = py + h*ux;
    if (kx < px) { kx = px + h*uy; ky = py - h*ux; }   // rodilla hacia adelante
    const f = n => n.toFixed(1);
    const lerp = (t) => [HIP[0] + (kx-HIP[0])*t, HIP[1] + (ky-HIP[1])*t];
    const sockTop = [kx + (foot[0]-kx)*0.72, ky + (foot[1]-ky)*0.72];
    const sh = lerp(0.55);
    L.ink.setAttribute("d", `M${f(HIP[0])} ${f(HIP[1])} L${f(kx)} ${f(ky)} L${f(foot[0])} ${f(foot[1])}`);
    L.skin.setAttribute("d", `M${f(HIP[0])} ${f(HIP[1])} L${f(kx)} ${f(ky)} L${f(foot[0])} ${f(foot[1])}`);
    L.shorts.setAttribute("d", `M${f(HIP[0])} ${f(HIP[1])} L${f(sh[0])} ${f(sh[1])}`);
    L.sock.setAttribute("d", `M${f(sockTop[0])} ${f(sockTop[1])} L${f(foot[0])} ${f(foot[1])}`);
    const shoe = `M${f(foot[0]-8)} ${f(foot[1]+2)} L${f(foot[0]+14)} ${f(foot[1]+3)}`;
    L.shoeInk.setAttribute("d", shoe); L.shoe.setAttribute("d", shoe);
  }

  function frame(){
    x = reduce ? target : x + (target - x) * EASE;
    const dx = x - lastX; lastX = x;

    const scale = bike.offsetWidth / VIEW_W;
    rot += (dx / (WHEEL_R * scale)) * 180 / Math.PI;

    if (FLIP_ON_RETURN && Math.abs(dx) > 0.4) {
      const nd = dx > 0 ? 1 : -1;
      if (nd !== dir) { dir = nd; flip.style.transform = `scaleX(${dir})`; }
    }
    const a = FLIP_ON_RETURN ? rot * dir : rot;
    const c = a / 2.6;                         // cadencia de pedaleo
    const cr = c * Math.PI / 180;

    bike.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    wL.setAttribute("transform", `rotate(${a.toFixed(2)} 95 200)`);
    wR.setAttribute("transform", `rotate(${a.toFixed(2)} 325 200)`);
    crank.setAttribute("transform", `rotate(${c.toFixed(2)} ${BB[0]} ${BB[1]})`);

    const near = [BB[0] - CRANK*Math.sin(cr), BB[1] + CRANK*Math.cos(cr)];
    const far  = [BB[0] + CRANK*Math.sin(cr), BB[1] - CRANK*Math.cos(cr)];
    drawLeg(legNear, near);
    drawLeg(legFar, far);
    estela.setAttribute("opacity", Math.min(0.85, Math.abs(dx) / 6).toFixed(2));


    requestAnimationFrame(frame);
  }

  addEventListener("scroll", measure, {passive:true});
  addEventListener("resize", measure);
  new ResizeObserver(measure).observe(document.body);
  measure(); frame();
})();

/* ===== Aparición suave de bloques al entrar en pantalla ===== */
(function(){
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = document.querySelectorAll(".head, .tiles, .grid, .svc, .contact, .pdp-info, .related, .map");
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), {rootMargin:"0px 0px -8% 0px"});
  // Solo lo que está más abajo de la pantalla al cargar; lo visible aparece de una
  els.forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight * .9) return;
    el.classList.add("reveal"); io.observe(el);
  });
})();

/* ===== Buscador (lupita del encabezado) =====
   Busca en PRODUCTS por marca, modelo, categoría y características, sin importar tildes ni mayúsculas. */
(function(){
  const bar = document.querySelector("header .bar");
  if (!bar) return;
  const norm = t => String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  const SUGGEST = ["Rodado 29", "Eléctrica", "Plegable", "Niños", "Canasto", "Kova"];

  // Texto donde se busca cada producto
  const index = PRODUCTS.map(p => ({p, text: norm([p.brand, p.name, CAT_LABELS[p.cat], p.cat === "electrica" ? "electrica bicicleta electrica" : "", p.specs.join(" "), Object.values(p.ficha).join(" ")].join(" "))}));

  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "search-btn"; btn.id = "searchBtn";
  btn.setAttribute("aria-label", "Buscar modelos"); btn.setAttribute("aria-haspopup", "dialog");
  btn.innerHTML = ICON;
  bar.appendChild(btn);

  const dlg = document.createElement("dialog");
  dlg.className = "search";
  dlg.setAttribute("aria-label", "Buscar modelos");
  dlg.innerHTML = `
    <div class="search-box">
      <label class="search-field">${ICON}
        <input type="search" id="searchInput" placeholder="Buscá por marca, modelo o rodado…" autocomplete="off" aria-controls="searchResults">
        <button type="button" class="search-close" aria-label="Cerrar buscador">Esc</button>
      </label>
      <div class="search-body">
        <div class="search-suggest"><span>Probá con</span>${SUGGEST.map(s => `<button type="button" class="chip">${s}</button>`).join("")}</div>
        <p class="search-count" aria-live="polite"></p>
        <ul class="search-results" id="searchResults"></ul>
      </div>
    </div>`;
  document.body.appendChild(dlg);
  const input = dlg.querySelector("input"), list = dlg.querySelector(".search-results"), count = dlg.querySelector(".search-count"), suggest = dlg.querySelector(".search-suggest");

  function render(){
    const q = norm(input.value.trim());
    suggest.hidden = !!q;
    if (!q) { list.innerHTML = ""; count.textContent = ""; return; }
    const words = q.split(/\s+/);
    const found = index.filter(x => words.every(w => x.text.includes(w))).map(x => x.p);
    count.textContent = found.length ? `${found.length} ${found.length === 1 ? "resultado" : "resultados"}` : "";
    list.innerHTML = found.map(p => `
      <li><a href="producto.html?id=${p.id}">
        <img src="img/${p.img}" alt="" loading="lazy">
        <span class="sr-info"><small>${p.brand} · ${CAT_LABELS[p.cat]}</small><b>${p.name}</b></span>
        <span class="sr-price">${money(p.price)}</span>
      </a></li>`).join("");
    if (!found.length) {
      const li = document.createElement("li"); li.className = "search-empty";
      li.textContent = `No encontramos “${input.value.trim()}”. Consultanos por WhatsApp con el botón verde.`;
      list.appendChild(li);
    }
  }
  function open(){ dlg.showModal(); input.focus(); input.select(); }
  btn.addEventListener("click", open);
  dlg.querySelector(".search-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });   // clic afuera cierra
  input.addEventListener("input", render);
  suggest.addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) { input.value = c.textContent; render(); input.focus(); } });
  input.addEventListener("keydown", e => {
    const first = list.querySelector("a");
    if (e.key === "Enter" && first) { e.preventDefault(); location.href = first.href; }
    if (e.key === "ArrowDown" && first) { e.preventDefault(); first.focus(); }
  });
  list.addEventListener("keydown", e => {
    const links = [...list.querySelectorAll("a")], i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown" && i < links.length - 1) { e.preventDefault(); links[i + 1].focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); (i > 0 ? links[i - 1] : input).focus(); }
  });
  // Atajos: "/" o Cmd/Ctrl+K abren el buscador
  addEventListener("keydown", e => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) {
      if (!dlg.open) { e.preventDefault(); open(); }
    }
  });
})();
