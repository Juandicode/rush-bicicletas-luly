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
   id: nombre en la dirección de la página del modelo (producto.html?id=…), sin espacios ni tildes.
   img: foto principal dentro de img/. imgs: fotos extra para la galería (opcional).
   specs: datos cortos de la tarjeta. ficha: tabla de características. desc: descripción. */
const PRODUCTS = [
  {id:"baccio-sunny-man-29", cat:"mtb", brand:"Baccio", name:"Sunny Man 29", price:279, from:true, tag:"Más vendida",
   img:"bicis/baccio-sunny-man-29.jpg", imgs:["bicis/baccio-sunny-man-29-2.jpg","bicis/baccio-sunny-man-29-3.jpg"],
   specs:["Rodado 29","Aluminio","21 vel.","Disco"],
   ficha:{"Tipo":"Mountain bike","Rodado":"29 (también en 27.5)","Cuadro":"Aluminio con fusible","Horquilla":"Suspensión delantera, dirección ahead","Transmisión":"Shimano, 21 velocidades","Frenos":"A disco","Llantas":"Aluminio doble pared, rayos negros","Colores":"Naranja, azul, azul y naranja"},
   desc:"Nuestra más vendida. Una MTB de aluminio liviana y rendidora para empezar a salir al campo o moverte por la ciudad, con cambios Shimano y frenos a disco."},
  {id:"baccio-alpina-x-29", cat:"mtb", brand:"Baccio", name:"Alpina X 29", price:229,
   img:"bicis/baccio-alpina-29.jpg", imgs:["bicis/baccio-alpina-29-2.jpg","bicis/baccio-alpina-29-3.jpg"],
   specs:["Rodado 29","Acero","21 vel.","Disco"],
   ficha:{"Tipo":"Mountain bike","Rodado":"29","Cuadro":"Acero","Horquilla":"Suspensión delantera","Transmisión":"21 velocidades","Frenos":"A disco","Llantas":"Aluminio","Colores":"Blanco, negro con naranja, negro con azul"},
   desc:"La opción más accesible en rodado 29. Cuadro de acero resistente, suspensión delantera y frenos a disco para uso recreativo y paseos."},
  {id:"spro-zero3-29", cat:"mtb", brand:"S-Pro", name:"Zero3 29", price:349,
   img:"bicis/spro-zero3-29.jpg", imgs:["bicis/spro-zero3-29-2.jpg","bicis/spro-zero3-29-3.jpg"],
   specs:["Rodado 29","Aluminio 6000","Shimano 21 vel.","Disco"],
   ficha:{"Tipo":"Mountain bike","Rodado":"29","Cuadro":"Aluminio serie 6000, cableado interno y fusible","Dirección":"Semi integrada","Horquilla":"Suspensión con bloqueo y precarga","Transmisión":"Shimano TX35, 21 velocidades","Frenos":"Disco mecánico","Llantas":"Aluminio doble pared","Extras":"Pata de apoyo"},
   desc:"Cuadro de aluminio con cableado interno y horquilla con bloqueo: una MTB completa y prolija para salir a rodar todos los fines de semana."},
  {id:"spro-vx-29", cat:"mtb", brand:"S-Pro", name:"VX 29", price:409,
   img:"bicis/spro-vx-29.jpg", imgs:["bicis/spro-vx-29-2.jpg","bicis/spro-vx-29-3.jpg","bicis/spro-vx-29-4.jpg"],
   specs:["Rodado 29","Suspensión con bloqueo","Shimano 21 vel."],
   ficha:{"Tipo":"Mountain bike","Rodado":"29","Cuadro":"Aluminio serie 6000 hidroformado, cableado interno, fusible y anclajes para accesorios","Dirección":"Semi integrada","Horquilla":"Suspensión con bloqueo y precarga","Transmisión":"Shimano TX35, 21 velocidades","Frenos":"Disco mecánico (trasero con anclaje interno)","Llantas":"Aluminio doble pared","Tija":"Aluminio","Colores":"Plateado, naranja, blanco, gris"},
   desc:"Cuadro hidroformado con terminaciones de bici de mayor gama. Ideal si buscás una 29 cómoda y firme para caminos de tierra y ciudad."},
  {id:"kova-nepal-29", cat:"mtb", brand:"Kova", name:"Nepal 29", price:449,
   img:"bicis/kova-nepal-29.jpg", imgs:["bicis/kova-nepal-29-2.jpg"],
   specs:["Rodado 29","Aluminio 6061","Shimano 21 vel.","Disco"],
   ficha:{"Tipo":"Mountain bike","Rodado":"29","Cuadro":"Aluminio 6061, tubos hidroformados y cableado interno","Horquilla":"Suspensión delantera con bloqueo","Transmisión":"Shimano, 21 velocidades","Frenos":"Disco Logan acero/aluminio","Llantas":"Aluminio doble pared 18 mm","Manubrio y avance":"Aluminio","Talles":"M y L","Colores":"Gris, celeste"},
   desc:"Una de las 29 más elegidas en Uruguay. Aluminio 6061, suspensión con bloqueo y frenos a disco: equilibrada para campo y asfalto."},
  {id:"gt-aggressor-sport-29", cat:"mtb", brand:"GT", name:"Aggressor Sport 29", price:599,
   img:"bicis/gt-aggressor-sport-29.jpg", imgs:["bicis/gt-aggressor-sport-29-2.jpg","bicis/gt-aggressor-sport-29-3.jpg"],
   specs:["Rodado 29","Aluminio","Suntour 75 mm","21 vel."],
   ficha:{"Tipo":"Mountain bike","Rodado":"29","Cuadro":"Aluminio, geometría triple triángulo","Horquilla":"SR Suntour M3030, 75 mm","Transmisión":"microSHIFT, 21 velocidades","Frenos":"A disco","Color":"Negro","Garantía":"12 meses en el cuadro"},
   desc:"El clásico triple triángulo de GT en su versión de entrada: una rígida de aluminio pensada para aprender y disfrutar en senderos."},
  {id:"scott-aspect-970", cat:"mtb", brand:"Scott", name:"Aspect 970", price:729,
   img:"bicis/scott-aspect-970.jpg",
   specs:["Rodado 29","Aluminio 6061","Suntour XCE","21 vel."],
   ficha:{"Tipo":"Mountain bike","Rodado":"29","Cuadro":"Aluminio 6061, cableado interno","Horquilla":"SR Suntour XCE 28, con precarga","Transmisión":"Shimano Tourney, 21 velocidades","Frenos":"Tektro, disco mecánico","Componentes":"Syncros"},
   desc:"Calidad Scott a un precio accesible. Cuadro de aluminio 6061 con cableado interno y componentes Syncros."},
  {id:"cannondale-trail-7", cat:"mtb", brand:"Cannondale", name:"Trail 7", price:739,
   img:"bicis/cannondale-trail-7.jpg", imgs:["bicis/cannondale-trail-7-2.jpg","bicis/cannondale-trail-7-3.jpg","bicis/cannondale-trail-7-4.jpg"],
   specs:["Rodado 29","SmartForm C3","microSHIFT 2×8","Disco hidráulico"],
   ficha:{"Tipo":"Mountain bike","Rodado":"29 (27.5 en talles XS y S)","Cuadro":"Aluminio SmartForm C3, cableado interno StraightShot, compatible con tija telescópica","Horquilla":"SR Suntour XCT DS, 100 mm","Transmisión":"microSHIFT, 2×8 (36/22 · 11-34)","Frenos":"Tektro M275 hidráulicos, discos 160 mm","Llantas":"WTB SX19","Cubiertas":"WTB Ranger Comp 29×2.25","Manubrio":"Aluminio 6061, 700 mm"},
   desc:"Una rígida robusta de aluminio con frenos hidráulicos y geometría pensada para ganar confianza en la montaña."},
  {id:"scott-aspect-960", cat:"mtb", brand:"Scott", name:"Aspect 960", price:790,
   img:"bicis/scott-aspect-960.jpg",
   specs:["Rodado 29","Aluminio 6061","Shimano 2×8","Disco hidráulico"],
   ficha:{"Tipo":"Mountain bike","Rodado":"29","Cuadro":"Aluminio 6061, cableado interno","Horquilla":"SR Suntour XCE 28, con precarga","Transmisión":"Shimano Tourney, 2×8 velocidades","Frenos":"Clarks Clout, disco hidráulico","Componentes":"Syncros"},
   desc:"Un paso arriba de la 970: transmisión 2×8 y frenos hidráulicos para frenar más con menos esfuerzo."},
  {id:"cannondale-trail-6", cat:"mtb", brand:"Cannondale", name:"Trail 6", price:790,
   img:"bicis/cannondale-trail-6.jpg", imgs:["bicis/cannondale-trail-6-2.jpg","bicis/cannondale-trail-6-3.jpg","bicis/cannondale-trail-6-4.jpg"],
   specs:["Rodado 29","Shimano Acera 2×8","Disco hidráulico"],
   ficha:{"Tipo":"Mountain bike","Rodado":"29 (27.5 en talles XS y S)","Cuadro":"Aluminio SmartForm C3, cableado interno StraightShot, compatible con tija telescópica","Horquilla":"SR Suntour XCT, 100 mm","Transmisión":"Shimano Acera / Altus, 2×8 (36/22 · 11-34)","Frenos":"Tektro M275 hidráulicos, discos 160 mm","Llantas":"WTB SX19","Cubiertas":"WTB Ranger Comp 29×2.25","Manubrio":"Aluminio 6061, 720 mm"},
   desc:"El mismo cuadro SmartForm de la Trail 7 con transmisión Shimano: suave, precisa y fácil de mantener."},
  {id:"gt-aggressor-expert-29", cat:"mtb", brand:"GT", name:"Aggressor Expert 29", price:799,
   img:"bicis/gt-aggressor-expert-29.jpg", imgs:["bicis/gt-aggressor-expert-29-2.jpg","bicis/gt-aggressor-expert-29-3.jpg","bicis/gt-aggressor-expert-29-4.jpg","bicis/gt-aggressor-expert-29-5.jpg"],
   specs:["Rodado 29","Shimano Acera 8 vel.","Disco hidráulico"],
   ficha:{"Tipo":"Mountain bike","Rodado":"29","Cuadro":"Aluminio 6061, triple triángulo con vainas flotantes","Horquilla":"SR Suntour XCM-D2, 80 mm, precarga y bloqueo hidráulico","Transmisión":"Shimano Acera, 8 velocidades (12-32)","Frenos":"Tektro M275 hidráulicos, discos 160 mm","Cubiertas":"WTB Range Comp","Talles":"S, M y L","Colores":"Azul oscuro, plateado","Garantía":"12 meses"},
   desc:"La Aggressor más completa: horquilla con bloqueo hidráulico, Shimano Acera y frenos hidráulicos Tektro. Ágil y liviana."},
  {id:"bravo-spinning-comp", cat:"spinning", brand:"Bravo", name:"Spinning Comp", price:389, tag:"Spinning",
   img:"bicis/bravo-spinning-comp.jpg", imgs:["bicis/bravo-spinning-comp-2.jpg","bicis/bravo-spinning-comp-3.jpg","bicis/bravo-spinning-comp-4.jpg"],
   specs:["Volante 18 kg","Hasta 100 kg","Uso doméstico"],
   ficha:{"Uso":"Doméstico","Transmisión":"A cadena","Freno":"Por fricción, con bloqueo de emergencia","Volante de inercia":"18 kg","Peso máximo del usuario":"100 kg","Medidas":"130 × 48.5 × 118 cm","Manubrio":"Con ajuste vertical","Incluye":"Consola, portacaramañola con caramañola y ruedas para moverla"},
   desc:"Bicicleta de spinning para entrenar en casa, con volante de 18 kg para un pedaleo firme y parejo."},
  {id:"spro-e-strada", cat:"electrica", brand:"S-Pro", name:"E-Strada", price:890, tag:"Eléctrica",
   img:"bicis/spro-e-strada.jpg",
   specs:["Motor 250W","Batería 36V 7.8Ah","Rodado 26"],
   ficha:{"Tipo":"Bicicleta eléctrica urbana","Rodado":"26 (cubiertas CST 26×1.95)","Cuadro":"Aluminio","Horquilla":"Rígida","Transmisión":"Shimano, 7 velocidades","Frenos":"V-brake","Motor":"36V 250W, con acelerador","Batería":"36V 7.8Ah","Velocidad máxima":"25 km/h","Autonomía aprox.":"45 a 55 km","Extras":"Parrilla de acero, guardabarros"},
   desc:"La eléctrica de entrada de S-Pro para moverte por la ciudad sin transpirar. Con parrilla y guardabarros para el día a día."},
  {id:"spro-e-clipper", cat:"electrica", brand:"S-Pro", name:"E-Clipper plegable", price:1099, tag:"Eléctrica",
   img:"bicis/spro-e-clipper.jpg", imgs:["bicis/spro-e-clipper-2.jpg"],
   specs:["Motor 48V 350W","Plegable","Rodado 20"],
   ficha:{"Tipo":"Bicicleta eléctrica plegable","Rodado":"20 (cubiertas 20×2.6)","Cuadro":"Aluminio plegable","Horquilla":"Rígida","Transmisión":"Shimano, 7 velocidades","Frenos":"Disco mecánico","Motor":"48V 350W, con acelerador","Batería":"48V 10.4Ah","Velocidad máxima":"32 km/h","Autonomía aprox.":"50 a 60 km","Panel":"LCD color","Luces":"LED delantera, trasera y de freno","Peso":"22 kg aprox.","Medidas":"1.60 × 1.20 × 0.64 m"},
   desc:"Se pliega para guardarla en casa o llevarla en el auto. Cubiertas anchas, motor de 350W y la mejor autonomía de la línea."},
  {id:"spro-carrot", cat:"electrica", brand:"S-Pro", name:"Carrot", price:1149, tag:"Eléctrica",
   img:"bicis/spro-carrot.jpg", imgs:["bicis/spro-carrot-2.jpg"],
   specs:["Motor 350W","Hasta 32 km/h","45 a 55 km"],
   ficha:{"Tipo":"Bicicleta eléctrica urbana","Rodado":"26 (cubiertas CST 26×2.10)","Cuadro":"Aluminio serie 6000, batería integrada","Horquilla":"Suspensión con bloqueo","Transmisión":"Shimano, 7 velocidades","Frenos":"Disco mecánico","Motor":"36V 350W, con acelerador","Batería":"36V 10.4Ah","Velocidad máxima":"32 km/h","Autonomía aprox.":"45 a 55 km","Panel":"LCD color","Luces":"LED delantera, trasera y de freno","Extras":"Parrilla de aluminio, guardabarros"},
   desc:"Cuadro bajo para subir y bajar fácil, batería integrada y suspensión. Cómoda para todos los días."},
  {id:"spro-mob-700", cat:"electrica", brand:"S-Pro", name:"MOB 700", price:1179, tag:"Eléctrica",
   img:"bicis/spro-mob-29.jpg", imgs:["bicis/spro-mob-29-2.jpg"],
   specs:["Motor 350W","Batería integrada","Rodado 700c"],
   ficha:{"Tipo":"Bicicleta eléctrica urbana","Rodado":"700c (cubiertas CST 700×40c)","Cuadro":"Aluminio, batería integrada y cableado interno","Horquilla":"Suspensión ZOOM con bloqueo","Transmisión":"Shimano, 7 velocidades","Frenos":"Disco mecánico","Motor":"36V 350W, con acelerador","Batería":"36V 10.4Ah","Velocidad máxima":"32 km/h","Autonomía aprox.":"45 a 55 km","Panel":"LCD con control de asistencia","Extras":"Parrilla de aluminio, guardabarros"},
   desc:"Rueda grande 700c para rodar rápido y parejo en la ciudad, con batería escondida en el cuadro."},
  {id:"camara-29", cat:"repuesto", brand:"Repuestos", name:"Cámara rodado 29", price:9,
   img:"repuestos/camara-29.jpg", specs:["Válvula auto o presta"],
   ficha:{"Rodado":"29","Medida":"Para cubiertas 1.75 a 2.20","Válvula":"Auto (Schrader) o presta (fina)"},
   desc:"Cámara de butilo para rodado 29. Te la cambiamos en el taller en el momento."},
  {id:"cubierta-29", cat:"repuesto", brand:"Repuestos", name:"Cubierta MTB 29×2.20", price:32,
   img:"repuestos/cubierta-29.jpg", specs:["Taco mixto"],
   ficha:{"Medida":"29 × 2.20","Uso":"Mountain bike","Dibujo":"Taco mixto, para tierra y asfalto"},
   desc:"Cubierta de taco mixto que agarra bien en tierra sin frenarte en el asfalto."},
  {id:"kit-frenos-disco", cat:"repuesto", brand:"Repuestos", name:"Kit frenos a disco", price:45,
   img:"repuestos/frenos-disco.jpg", specs:["Mecánico, delantero y trasero"],
   ficha:{"Tipo":"Disco mecánico","Incluye":"2 cálipers, 2 discos de 160 mm y tornillería","Uso":"Delantero y trasero"},
   desc:"Kit completo para pasar tu bici a frenos a disco o renovar los que tenés. Lo instalamos en el taller."},
  {id:"casco-ventilado", cat:"repuesto", brand:"Accesorios", name:"Casco ventilado", price:39,
   img:"repuestos/casco.jpg", specs:["Talles M y L"],
   ficha:{"Tipo":"Casco de MTB con visera","Ventilación":"Múltiples entradas de aire","Ajuste":"Regulador trasero","Talles":"M y L"},
   desc:"Casco liviano y fresco con visera, para salir con seguridad."},
  {id:"candado-u", cat:"repuesto", brand:"Accesorios", name:"Candado U + cable", price:24,
   img:"repuestos/candado-u.jpg", specs:["Llave doble"],
   ficha:{"Tipo":"Candado en U con cable de acero","Material":"Acero","Incluye":"2 llaves, cable y soporte"},
   desc:"El U traba el cuadro y el cable asegura la rueda delantera."},
  {id:"luces-led-usb", cat:"repuesto", brand:"Accesorios", name:"Kit luces LED USB", price:18,
   img:"repuestos/luces-led.jpg", specs:["Delantera y trasera"],
   ficha:{"Incluye":"Luz delantera blanca y trasera roja","Carga":"USB (cables incluidos)","Colocación":"Soportes de silicona, sin herramientas"},
   desc:"Para ver y que te vean de noche. Se cargan por USB y se ponen en segundos."},
];
const CAT_LABELS = {mtb:"Montaña", spinning:"Spinning", electrica:"Eléctricas", repuesto:"Repuestos y accesorios"};
const CAT_PAGE = {mtb:["bicicletas.html","Bicicletas"], spinning:["bicicletas.html","Bicicletas"], electrica:["electricas.html","Eléctricas"], repuesto:["repuestos.html","Repuestos"]};
const money = n => `US$ ${n.toLocaleString("es-UY")}`;

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
  document.querySelectorAll(".wa-float").forEach(a => a.href = waURL(`Hola Rush Bicicletas! Quiero consultar por ${p.brand} ${p.name} (${money(p.price)}).`));

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
            ${p.cat === "repuesto" ? `<li><b>Te lo colocamos en el taller.</b></li>` : `<li><b>Te la entregamos armada y regulada</b> por nuestro taller.</li>`}
            <li><b>Medios de pago:</b> efectivo, transferencia y tarjetas.</li>
          </ul>
          <p class="note">Precio de referencia en dólares, sujeto a cambio.</p>
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
  const SUGGEST = ["Rodado 29", "Eléctrica", "Cannondale", "Disco hidráulico", "Casco", "Spinning"];

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
