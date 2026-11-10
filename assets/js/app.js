/* =========================================================
   LAJUR MOTOR — stok unit, inspeksi, simulasi kredit, WhatsApp
   ========================================================= */
(function () {
  'use strict';
  const D = window.DEALER;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rp = (n) => 'Rp' + Math.round(n).toLocaleString('id-ID');
  const jt = (n) => 'Rp' + (n / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' jt';
  const km = (n) => n.toLocaleString('id-ID') + ' km';
  const unitById = (id) => D.UNITS.find((u) => u.id === id);
  const title = (u) => `${u.brand} ${u.model}`;
  const taxText = (ym) => { const [y, m] = ym.split('-').map(Number); return new Date(y, m - 1, 1).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }); };

  /* ---------------- illustration ---------------- */
  const DARK = '#1b1c1e';
  function wheel(cx, cy, r, knobby) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${DARK}" ${knobby ? `stroke="${DARK}" stroke-width="4" stroke-dasharray="3 3"` : ''}/>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.6).toFixed(1)}" fill="#c3c6ca"/><circle cx="${cx}" cy="${cy}" r="${(r * 0.2).toFixed(1)}" fill="${DARK}"/>`;
  }
  function bikeSVG(u) {
    const c = u.color, light = '#f3e7a6', metal = '#7a7f86';
    const shapes = {
      Matic: `${wheel(62, 116, 22)}${wheel(184, 116, 22)}
        <rect x="86" y="100" width="34" height="7" rx="3.5" fill="${metal}"/>
        <path d="M34 104C30 78 52 64 90 64h32c4 10 8 20 16 24h12l12-32 8-18 10 2-8 22 18 44h-14c-6-14-16-20-26-16H86c-6-4-14-6-24-4-12 2-20 10-22 18Z" fill="${c}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
        <path d="M52 64c8-12 56-14 72-6v6Z" fill="${DARK}"/>
        <rect x="122" y="86" width="30" height="6" rx="2" fill="${DARK}"/>
        <path d="M166 38l26-6" stroke="${DARK}" stroke-width="5" stroke-linecap="round"/>
        <path d="M176 46l10 2-2 8-10-2Z" fill="${light}"/>
        <rect x="32" y="82" width="8" height="5" rx="1" fill="#c0392b"/>`,
      Bebek: `${wheel(62, 114, 24)}${wheel(186, 114, 24)}
        <rect x="100" y="90" width="42" height="20" rx="4" fill="#3a3d42"/>
        <rect x="88" y="108" width="40" height="7" rx="3.5" fill="${metal}"/>
        <path d="M120 92l38 6" stroke="${DARK}" stroke-width="5" stroke-linecap="round"/>
        <path d="M36 100c-2-20 18-30 52-30h32v22l-34 4c-10-6-30-6-40 4Z" fill="${c}" stroke="rgba(0,0,0,.25)"/>
        <path d="M150 104l8-44 12-20 10 2-6 22 12 40Z" fill="${c}" stroke="rgba(0,0,0,.25)"/>
        <path d="M50 70c12-12 54-12 72-6v6Z" fill="${DARK}"/>
        <path d="M164 40l26-6" stroke="${DARK}" stroke-width="5" stroke-linecap="round"/>
        <path d="M172 48l10 2-2 8-10-2Z" fill="${light}"/>`,
      Sport: `${wheel(62, 114, 26)}${wheel(186, 114, 26)}
        <path d="M60 102l40 4-2 6-40-4Z" fill="${metal}"/>
        <path d="M40 98l18-24 40-6 20-14 32-6 22 2 24 12-2 26-18 12-28 4h-28l-16-8Z" fill="${c}" stroke="rgba(0,0,0,.25)"/>
        <path d="M98 68l20-14 32-6-4 18Z" fill="rgba(0,0,0,.18)"/>
        <path d="M46 74l14-8 38-2v4l-40 6Z" fill="${DARK}"/>
        <path d="M172 50l14-10 10 22Z" fill="rgba(170,195,220,.85)"/>
        <path d="M188 66l8 2-2 8-8-2Z" fill="${light}"/>
        <rect x="104" y="92" width="36" height="14" rx="3" fill="#3a3d42"/>`,
      Trail: `${wheel(60, 110, 28, true)}${wheel(186, 110, 28, true)}
        <path d="M166 50l20 60" stroke="#9aa0a6" stroke-width="6" stroke-linecap="round"/>
        <rect x="102" y="86" width="38" height="22" rx="4" fill="#3a3d42"/>
        <path d="M70 92l40 4" stroke="${metal}" stroke-width="6" stroke-linecap="round"/>
        <path d="M26 74l54-6 18 8-38 10Z" fill="${c}" stroke="rgba(0,0,0,.25)"/>
        <path d="M88 74l44-12 20 4-12 20-36 4Z" fill="${c}" stroke="rgba(0,0,0,.25)"/>
        <path d="M72 70l60-10 2 4-56 10Z" fill="${DARK}"/>
        <path d="M168 72l36 4-8 6-26-2Z" fill="${c}" stroke="rgba(0,0,0,.25)"/>
        <path d="M148 50l26-4" stroke="${DARK}" stroke-width="5" stroke-linecap="round"/>
        <path d="M160 56l10 1-1 8-10-1Z" fill="${light}"/>`,
    };
    return `<svg viewBox="0 0 240 150" role="img" aria-label="Ilustrasi ${esc(title(u))} warna ${esc(u.colorName)}">
      <ellipse cx="122" cy="140" rx="100" ry="5" fill="rgba(0,0,0,.08)"/>${shapes[u.type] || shapes.Matic}</svg>`;
  }

  /* ---------------- credit ---------------- */
  function installment(price, dpPct, tenor) {
    const principal = price * (1 - dpPct / 100);
    return Math.ceil((principal * (1 + (D.CREDIT.flatRatePerMonth / 100) * tenor)) / tenor / 1000) * 1000;
  }
  const lowestInstallment = (u) => installment(u.price, D.CREDIT.minDpPct, Math.max(...D.CREDIT.tenors));

  /* ---------------- inspection ---------------- */
  const notesOf = (u) => D.CHECKS.filter((c) => u.checks[c]).length;

  /* ---------------- listing ---------------- */
  const f = { type: '', brand: '', price: '', year: '', sort: 'new' };
  function renderFacts() {
    const min = Math.min(...D.UNITS.map((u) => u.price));
    $('#facts').innerHTML = [
      ['Unit tersedia', D.UNITS.length], ['Mulai dari', jt(min)], ['Titik inspeksi', D.INSPECTION_POINTS], ['Garansi mesin', '1 bulan'],
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  }
  function renderFilters() {
    $('#typeChips').innerHTML = ['', ...D.TYPES].map((t) => {
      const n = t ? D.UNITS.filter((u) => u.type === t).length : D.UNITS.length;
      return `<button type="button" class="chip" data-type="${t}" aria-pressed="${f.type === t}">${t || 'Semua'}<small>${n}</small></button>`;
    }).join('');
  }
  function renderGrid() {
    let list = D.UNITS.filter((u) => (!f.type || u.type === f.type) && (!f.brand || u.brand === f.brand) &&
      (!f.price || u.price <= Number(f.price)) && (!f.year || u.year >= Number(f.year)));
    const sorters = { low: (a, b) => a.price - b.price, km: (a, b) => a.km - b.km, year: (a, b) => b.year - a.year, new: () => 0 };
    list = [...list].sort(sorters[f.sort]);
    $('#countText').textContent = `${list.length} dari ${D.UNITS.length} unit`;
    $('#grid').innerHTML = list.length ? list.map((u) => {
      const n = notesOf(u);
      return `<button class="unit" type="button" data-open="${u.id}">
        <div class="unit__art">${bikeSVG(u)}<span class="plate">${esc(u.plate)}</span><span class="tag">${esc(u.type)} · ${u.cc} cc</span></div>
        <div class="unit__body">
          <h3><small>${esc(u.brand)}</small>${esc(u.model)}</h3>
          <dl class="specs"><div><dt>Tahun</dt><dd>${u.year}</dd></div><div><dt>Odometer</dt><dd>${km(u.km)}</dd></div><div><dt>Pajak s.d.</dt><dd>${taxText(u.tax)}</dd></div></dl>
          <p class="notes-sum ${n ? '' : 'notes-sum--ok'}">${n ? `${n} catatan inspeksi` : 'Lolos inspeksi tanpa catatan'}</p>
          <div class="unit__price"><b>${rp(u.price)}</b><span>kredit mulai ${rp(lowestInstallment(u))}/bln</span></div>
        </div></button>`;
    }).join('') : '<p class="empty">Belum ada unit yang cocok. Coba longgarkan filter harga atau tahun.</p>';
  }

  /* ---------------- detail ---------------- */
  let st = null;
  function nextDays(n) {
    const out = [], d = new Date(); d.setHours(0, 0, 0, 0);
    for (let i = 1; i <= n; i++) { const x = new Date(d); x.setDate(d.getDate() + i); out.push(x); }
    return out;
  }
  function openUnit(id) {
    st = { id, dp: D.CREDIT.minDpPct, tenor: 24, day: 0, time: '13.00', name: st?.name || '', phone: st?.phone || '', sent: '' };
    renderUnit(); $('#unitLayer').hidden = false; document.body.style.overflow = 'hidden'; $('#unitLayer .x').focus();
  }
  function closeUnit() { $('#unitLayer').hidden = true; document.body.style.overflow = ''; }

  function renderUnit() {
    const u = unitById(st.id), days = nextDays(6);
    const dpNom = Math.round(u.price * st.dp / 100 / 1000) * 1000;
    $('#unitBody').innerHTML = `
      <div class="u">
        <div class="u__main">
          <div class="u__art">${bikeSVG(u)}<span class="plate">${esc(u.plate)}</span></div>
          <h2 id="uTitle"><small>${esc(u.brand)} · ${esc(u.type)}</small>${esc(u.model)} ${u.year}</h2>
          <dl class="spec-table">
            <div><dt>Odometer</dt><dd>${km(u.km)}</dd></div><div><dt>Mesin</dt><dd>${u.cc} cc</dd></div>
            <div><dt>Warna</dt><dd>${esc(u.colorName)}</dd></div><div><dt>Tangan ke</dt><dd>${u.owner}</dd></div>
            <div><dt>Pajak s.d.</dt><dd>${taxText(u.tax)}</dd></div><div><dt>STNK</dt><dd>Asli, aktif</dd></div>
            <div><dt>BPKB</dt><dd>Asli, ada</dd></div><div><dt>Plat</dt><dd>${esc(u.plate)}</dd></div>
          </dl>
          <div>
            <h3>Hasil inspeksi</h3>
            <ul class="report">${D.CHECKS.map((c) => u.checks[c]
              ? `<li class="note"><i>!</i><b>${c}</b><span>${esc(u.checks[c])}</span></li>`
              : `<li class="ok"><i>✓</i><b>${c}</b><span>Baik, tidak ada catatan</span></li>`).join('')}</ul>
          </div>
        </div>
        <aside class="u__side">
          <div class="u__price">${rp(u.price)}<small>Harga cash · ${D.WARRANTY}</small></div>
          <div class="sim">
            <h3>Simulasi kredit</h3>
            <div class="range-row"><label for="dp">DP <output>${st.dp}% · ${rp(dpNom)}</output></label>
              <input id="dp" type="range" min="${D.CREDIT.minDpPct}" max="60" step="5" value="${st.dp}" /></div>
            <div class="range-row"><span class="preview-label">Tenor</span>
              <div class="tenors">${D.CREDIT.tenors.map((t) => `<button type="button" data-tenor="${t}" aria-pressed="${t === st.tenor}">${t} bln</button>`).join('')}</div></div>
            <div class="result"><span>Angsuran</span><b>${rp(installment(u.price, st.dp, st.tenor))}<small style="font-size:.9rem">/bln</small></b></div>
            <p class="fine">Perkiraan dengan bunga flat ${String(D.CREDIT.flatRatePerMonth).replace('.', ',')}% per bulan. Angka final mengikuti persetujuan leasing.</p>
          </div>
          <form class="visit" id="visitForm" novalidate>
            <h3>Lihat unit / test ride</h3>
            ${st.sent ? `<p class="preview-label">Mode demo · pesan yang akan diterima admin</p><div class="wa-preview"><div>${esc(st.sent)}</div></div>
              <button type="button" class="btn btn--line" id="editVisit">Ubah jadwal</button>` : `
            <div class="two">
              <label class="field"><span>Tanggal</span><select id="v-day">${days.map((d, i) => `<option value="${i}" ${i === st.day ? 'selected' : ''}>${d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}</option>`).join('')}</select></label>
              <label class="field"><span>Jam</span><select id="v-time">${['10.00', '13.00', '16.00', '19.00'].map((t) => `<option ${t === st.time ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
            </div>
            <div class="two">
              <label class="field"><span>Nama</span><input id="v-name" autocomplete="name" value="${esc(st.name)}" /></label>
              <label class="field"><span>No. WhatsApp</span><input id="v-phone" inputmode="tel" placeholder="08xx" value="${esc(st.phone)}" /></label>
            </div>
            <p class="err" id="vErr" hidden></p>
            <button class="btn btn--wa" type="submit">Jadwalkan via WhatsApp</button>`}
          </form>
        </aside>
      </div>`;
  }

  function keepVisit() { if ($('#v-name')) { st.name = $('#v-name').value.trim(); st.phone = $('#v-phone').value.trim(); st.day = Number($('#v-day').value); st.time = $('#v-time').value; } }

  function visitMessage() {
    const u = unitById(st.id), day = nextDays(6)[st.day];
    return [
      `Halo ${D.name}, saya mau lihat unit & test ride 🏍️`, '',
      `Unit: ${title(u)} ${u.year} (${u.colorName})`, `Plat: ${u.plate}`, `Harga: ${rp(u.price)}`, '',
      `Jadwal: ${day.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}, pukul ${st.time}`,
      `Rencana bayar: kredit DP ${st.dp}%, tenor ${st.tenor} bulan (simulasi ${rp(installment(u.price, st.dp, st.tenor))}/bln)`, '',
      `Nama: ${st.name}`, `No. WA: ${st.phone}`,
    ].join('\n');
  }

  function send(msg, onDemo) {
    if (D.DEMO || !D.WA_NUMBER) { onDemo(msg); return; }
    window.open(`https://wa.me/${D.WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  }

  /* ---------------- events ---------------- */
  function bind() {
    $('#typeChips').addEventListener('click', (e) => { const b = e.target.closest('[data-type]'); if (!b) return; f.type = b.dataset.type; renderFilters(); renderGrid(); });
    [['#fBrand', 'brand'], ['#fPrice', 'price'], ['#fYear', 'year'], ['#fSort', 'sort']].forEach(([s, k]) => $(s).addEventListener('change', (e) => { f[k] = e.target.value; renderGrid(); }));
    $('#grid').addEventListener('click', (e) => { const c = e.target.closest('[data-open]'); if (c) openUnit(c.dataset.open); });

    $('#unitBody').addEventListener('input', (e) => { if (e.target.id === 'dp') { keepVisit(); st.dp = Number(e.target.value); renderUnit(); $('#dp').focus(); } });
    $('#unitBody').addEventListener('click', (e) => {
      const t = e.target.closest('[data-tenor]');
      if (t) { keepVisit(); st.tenor = Number(t.dataset.tenor); renderUnit(); return; }
      if (e.target.closest('#editVisit')) { st.sent = ''; renderUnit(); }
    });
    $('#unitBody').addEventListener('submit', (e) => {
      if (e.target.id !== 'visitForm') return;
      e.preventDefault(); keepVisit();
      const err = $('#vErr');
      if (!st.name) { err.textContent = 'Isi nama dulu.'; err.hidden = false; return; }
      if (!/^(\+?62|0)8\d{7,12}$/.test(st.phone.replace(/[\s-]/g, ''))) { err.textContent = 'Nomor WhatsApp belum valid, contoh 0812xxxxxxx.'; err.hidden = false; return; }
      send(visitMessage(), (m) => { st.sent = m; renderUnit(); });
    });

    $('#sellForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const model = $('#s-model').value.trim(), year = $('#s-year').value.trim(), kmv = $('#s-km').value.trim(), name = $('#s-name').value.trim(), err = $('#sellErr');
      if (!model || !/^(19|20)\d{2}$/.test(year) || !name) { err.textContent = 'Isi merek & tipe, tahun (4 angka), dan nama.'; err.hidden = false; return; }
      err.hidden = true;
      const msg = [`Halo ${D.name}, saya mau ${$('#s-mode').value.toLowerCase()} motor.`, '', `Motor: ${model} ${year}`, `Kilometer: ${kmv ? Number(kmv).toLocaleString('id-ID') + ' km' : '-'}`, `Nama: ${name}`, '', 'Boleh minta kisaran harga dan jadwal inspeksinya?'].join('\n');
      send(msg, (m) => {
        $('#sellForm').innerHTML = `<p class="preview-label">Mode demo · pesan yang akan diterima admin</p><div class="wa-preview"><div>${esc(m)}</div></div>`;
      });
    });

    document.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeUnit(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#unitLayer').hidden) closeUnit(); });
  }

  function renderStatic() {
    $('#fBrand').innerHTML += [...new Set(D.UNITS.map((u) => u.brand))].map((b) => `<option>${esc(b)}</option>`).join('');
    $('#faqList').innerHTML = D.FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
    $('#footInfo').textContent = `${D.address} · ${D.hours}`;
    if (D.DEMO) { $('#demoBar').hidden = false; $('#demoLink').href = D.DEV_CONTACT_URL; }
  }

  renderStatic(); renderFacts(); renderFilters(); renderGrid(); bind();
})();
