import { useEffect, useRef, useState } from 'react'
import './App.css'

/* ---------- Iconos propios (SVG, trazo 24x24) ---------- */
const PATHS = {
  lock: (<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15.5" r="1.2" /></>),
  hash: <path d="M4 8.5h16M4 15.5h16M9.5 4 8 20M16 4l-1.5 16" />,
  pulse: <path d="M2.5 12h4l2.5-7 4 14 2.5-7h6" />,
  shield: (<><path d="M12 3 19 6v5.5c0 4.6-3 7.7-7 9.5-4-1.8-7-4.9-7-9.5V6z" /><path d="m9 12 2 2 4-4.2" /></>),
  eye: (<><path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>),
  pencil: <path d="m4 20 1-4.5L16.5 4a2 2 0 0 1 3 3L8 18.5zM14 6.5l3.5 3.5" />,
  bolt: <path d="M13 2 4.5 14H11l-1 8L19.500 10H13z" />,
  key: (<><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M16 7l3 3M14 9l2 2" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>),
  scale: <path d="M12 4v16M7 20h10M4.500 8h15M4.500 8 2.500 14a2.500 2.500 0 0 0 5 0zM19.500 8l-2 6a2.500 2.500 0 0 0 5 0z" />,
  risk: <path d="M12 3 22 20H2zM12 10v5M12 17.600v.2" />,
  cycle: <path d="M20 12a8 8 0 0 1-14 5.300M4 12a8 8 0 0 1 14-5.300M18 3v4h-4M6 21v-4h4" />,
  doc: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" />,
  star: <path d="m12 3 2.600 5.600 6.100.7-4.500 4.200 1.200 6L12 16.500 6.600 19.500l1.200-6L3.300 9.300l6.100-.7z" />,
  down: <path d="M12 4v16M6 14l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  external: <path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12.500 4.500 4.500L19 7.500" />,
  linkedin: <path d="M6 10v9M6 5.500v.1M11 19v-5.500a3 3 0 0 1 6 0V19M11 10v9" />,
  x: <path d="M5 5l14 14M19 5 5 19" />,
  facebook: <path d="M14 8.500h3V4.500h-3a4 4 0 0 0-4 4V11H7v4h3v6h4v-6h3l1-4h-4V8.500z" />,
  whatsapp: <path d="M4 20l1.300-4.200A8 8 0 1 1 8.300 18.800zM9.200 8.800c0 3.200 2.800 6 6 6" />,
  layers: <path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5" />,
}

function Icon({ name, size = 24, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {PATHS[name]}
    </svg>
  )
}

function Logo({ size = 30 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0a2150" stroke="rgba(255,255,255,.22)" strokeWidth="2" />
      <path d="M32 14 14 46h36z" fill="rgba(255,255,255,.1)" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="14" r="7" fill="#3578e0" stroke="#0a2150" strokeWidth="2" />
      <circle cx="14" cy="46" r="7" fill="#0f9a8b" stroke="#0a2150" strokeWidth="2" />
      <circle cx="50" cy="46" r="7" fill="#dc3a31" stroke="#0a2150" strokeWidth="2" />
    </svg>
  )
}

/* ---------- Contenido ---------- */
const PILLARS = [
  {
    key: 'C', name: 'Confidencialidad', q: '¿Quién puede verlo?', icon: 'lock', color: 'var(--c)',
    lead: 'La información solo es accesible para quienes están autorizados a conocerla.',
    body: 'Se trata de impedir la divulgación indebida. No importa si el dato es correcto o está disponible: si lo ve quien no debe, la confidencialidad se perdió. En gestión de seguridad se aplica el principio de mínimo privilegio y la clasificación de la información según su valor.',
    threats: [['eye', 'Acceso no autorizado'], ['key', 'Phishing y robo de credenciales'], ['layers', 'Filtración de bases de datos']],
    controls: ['Cifrado en tránsito y en reposo', 'Autenticación multifactor', 'Control de acceso por roles', 'Clasificación y etiquetado'],
    chile: 'Los datos personales y sensibles, como los de salud o los socioeconómicos, están protegidos por la Ley 19.628 y por la nueva Ley 21.719, que fortalece los derechos de las personas y las obligaciones de quienes tratan sus datos.',
  },
  {
    key: 'I', name: 'Integridad', q: '¿Es correcto y exacto?', icon: 'hash', color: 'var(--i)',
    lead: 'La información es exacta y completa, y solo cambia por acciones autorizadas.',
    body: 'Protege contra la modificación accidental o maliciosa. Un informe alterado, una transferencia con el monto cambiado o un registro clínico editado sin trazabilidad son fallas de integridad, aunque nadie haya robado nada.',
    threats: [['pencil', 'Modificación no autorizada'], ['bolt', 'Malware e inyección de datos'], ['doc', 'Errores humanos de ingreso']],
    controls: ['Funciones hash y firma electrónica', 'Control de versiones', 'Registros de auditoría (logs)', 'Segregación de funciones'],
    chile: 'La Ley 19.799 da valor jurídico a los documentos electrónicos y a la firma electrónica, y la Ley 21.459 sanciona la falsificación informática y el acceso ilícito a sistemas.',
  },
  {
    key: 'D', name: 'Disponibilidad', q: '¿Puedo usarlo ahora?', icon: 'pulse', color: 'var(--d)',
    lead: 'La información y los sistemas están operativos cuando las personas los necesitan.',
    body: 'Un dato perfecto y bien protegido no sirve si no se puede usar en el momento clave. La disponibilidad se mide en tiempos de respuesta, tiempos de recuperación (RTO) y puntos de recuperación (RPO), y se planifica antes de que ocurra el incidente.',
    threats: [['bolt', 'Ransomware'], ['pulse', 'Ataques de denegación de servicio'], ['risk', 'Sismos, cortes de energía y fallas']],
    controls: ['Respaldos con regla 3-2-1', 'Redundancia y alta disponibilidad', 'Plan de continuidad y recuperación', 'Monitoreo continuo'],
    chile: 'Chile es un país sísmico y con infraestructura crítica expuesta. La Ley 21.663 exige a los servicios esenciales gestionar riesgos y reportar incidentes ante la ANCI para sostener la continuidad operacional.',
  },
]

const TRADEOFFS = [
  ['C', 'D', 'Más barreras de acceso protegen los datos, pero pueden retrasar a quien necesita atenderlos en una urgencia.'],
  ['I', 'D', 'Validar y firmar cada cambio asegura exactitud, pero agrega pasos y tiempo a procesos que deben ser rápidos.'],
  ['D', 'C', 'Replicar la información en muchos lugares la mantiene disponible, pero multiplica los puntos donde puede filtrarse.'],
]

const CASE = [
  ['C', 'Solo el equipo tratante y el propio paciente acceden a su ficha. Un funcionario curioso que la abre sin motivo es una brecha de confidencialidad.'],
  ['I', 'Si alguien cambia una alergia o una dosis sin dejar rastro, el diagnóstico puede ser erróneo. Cada edición debe quedar firmada y registrada.'],
  ['D', 'Durante un ataque de ransomware el hospital no puede consultar fichas. Sin respaldos ni plan de contingencia, la atención se detiene.'],
]

const CYCLE = [
  ['layers', 'Identificar activos', 'Qué información existe, dónde está y quién es su responsable.'],
  ['risk', 'Analizar amenazas', 'Qué puede afectar cada activo y qué vulnerabilidades lo permiten.'],
  ['scale', 'Evaluar el riesgo', 'Probabilidad por impacto sobre confidencialidad, integridad y disponibilidad.'],
  ['shield', 'Tratar con controles', 'Mitigar, transferir, aceptar o evitar, con controles de la NCh-ISO 27002.'],
  ['cycle', 'Monitorear y mejorar', 'Medir, auditar y ajustar de forma continua dentro del SGSI.'],
]

const LAW = [
  ['1999', 'Ley 19.628', 'Protección de la vida privada: primera regulación de datos personales en Chile.', ['C']],
  ['2002', 'Ley 19.799', 'Documentos electrónicos y firma electrónica: valor legal a la integridad y autoría digital.', ['I']],
  ['2004', 'DS 83 y NCh-ISO 27001', 'Norma técnica del Estado y estándar para un Sistema de Gestión de Seguridad de la Información.', ['C', 'I', 'D']],
  ['2022', 'Ley 21.459', 'Delitos informáticos: acceso ilícito, sabotaje, interceptación y falsificación informática.', ['C', 'I', 'D']],
  ['2024', 'Ley 21.663', 'Marco de Ciberseguridad: crea la ANCI y obligaciones para servicios esenciales y operadores de importancia vital.', ['C', 'I', 'D']],
  ['2026', 'Ley 21.719', 'Nueva ley de datos personales y Agencia de Protección de Datos. Su vigencia plena comienza en diciembre de 2026.', ['C']],
]

const EXTRA = [
  ['key', 'Autenticidad', 'Garantizar que quien accede o firma es quien dice ser.'],
  ['scale', 'No repudio', 'Que nadie pueda negar una acción que realizó.'],
  ['clock', 'Trazabilidad', 'Poder reconstruir quién hizo qué, cuándo y desde dónde.'],
]

const LINKS = [['que-es', 'Concepto'], ['triada', 'Los tres pilares'], ['equilibrio', 'Equilibrio'], ['gestion', 'Gestión'], ['normativa', 'Normativa']]

const SOURCES = [
  ['Biblioteca del Congreso Nacional', 'https://www.bcn.cl/leychile'],
  ['Agencia Nacional de Ciberseguridad (ANCI)', 'https://anci.gob.cl'],
  ['CSIRT de Gobierno', 'https://www.csirt.gob.cl'],
]

const FOOT = [
  { title: 'La tríada', groups: [
    ['Fundamentos', [['Concepto', '#que-es'], ['Los tres pilares', '#triada'], ['Equilibrio entre pilares', '#equilibrio']]],
    ['Aplicación', [['Caso: ficha clínica electrónica', '#caso'], ['Gestión del riesgo', '#gestion']]],
  ] },
  { title: 'Marco en Chile', groups: [
    ['Leyes', [['Ley 19.628 y Ley 21.719', '#normativa'], ['Ley 19.799 firma electrónica', '#normativa'], ['Ley 21.459 delitos informáticos', '#normativa'], ['Ley 21.663 Ciberseguridad', '#normativa']]],
    ['Estándares', [['DS 83 y NCh-ISO 27001', '#normativa']]],
  ] },
  { title: 'Más', groups: [
    [null, [['Conceptos complementarios', '#complementos'], ['En resumen', '#resumen'], ['Volver arriba', '#top']]],
    ['Centro de referencia', SOURCES.map(([l, u]) => [l, u])],
  ] },
]

const byKey = Object.fromEntries(PILLARS.map((p) => [p.key, p]))

/* ---------- Triángulo ---------- */
const NODE = { C: [180, 46], I: [62, 226], D: [298, 226] }

function Triad({ active = null, center = null }) {
  return (
    <svg className="triad" viewBox="0 0 360 290" role="img" aria-label="Triángulo de la tríada: confidencialidad, integridad y disponibilidad">
      <path className="tri-fill" d="M180 46 L62 226 L298 226 Z" />
      <path className="tri-line" pathLength="1" d="M180 46 L62 226 L298 226 Z" />
      {PILLARS.map((p) => {
        const [x, y] = NODE[p.key]
        const on = active === p.key
        const dim = active && !on
        const ly = p.key === 'C' ? y - 40 : y + 50
        return (
          <g key={p.key} className={`node ${on ? 'on' : ''} ${dim ? 'dim' : ''}`} style={{ '--nc': p.color }}>
            <circle className="ring" cx={x} cy={y} r="30" />
            <circle className="dot" cx={x} cy={y} r="26" />
            <Icon name={p.icon} x={x - 13} y={y - 13} width="26" height="26" />
            <text x={x} y={ly} textAnchor="middle" className="node-label">{p.name}</text>
          </g>
        )
      })}
      {center ? (
        <text x="180" y="172" textAnchor="middle" className="tri-center" key={center}>{center}</text>
      ) : (
        <Icon name="shield" x="162" y="142" width="36" height="36" className="tri-shield" />
      )}
    </svg>
  )
}

function Tag({ k }) {
  const p = byKey[k]
  return <span className="tag" style={{ '--nc': p.color }} title={p.name}><Icon name={p.icon} size={14} /></span>
}

/* ---------- App ---------- */
export default function App() {
  const [active, setActive] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [section, setSection] = useState('top')
  const [copied, setCopied] = useState(false)
  const bar = useRef(null)
  const blocks = useRef([])

  // Barra de progreso de lectura
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      setScrolled(h.scrollTop > 30)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Revelado al hacer scroll
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Pilar activo segun la posicion de scroll
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.key) })
    }, { rootMargin: '-45% 0px -45% 0px' })
    blocks.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  // Seccion visible para resaltar el menu
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSection(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ;['top', ...LINKS.map((l) => l[0])].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2200) } catch { /* sin permiso */ }
  }
  const enc = encodeURIComponent(url)
  const SHARE = [
    ['linkedin', 'LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`],
    ['x', 'X', `https://twitter.com/intent/tweet?url=${enc}`],
    ['facebook', 'Facebook', `https://www.facebook.com/sharer/sharer.php?u=${enc}`],
    ['whatsapp', 'WhatsApp', `https://wa.me/?text=${enc}`],
  ]

  const current = active ? byKey[active] : null

  return (
    <main>
      <div className="progress" ref={bar} />

      <nav className={`nav ${scrolled || menu ? 'solid' : ''} ${menu ? 'open' : ''}`} aria-label="Secciones">
        <a className="brand" href="#top" onClick={() => setMenu(false)}><Logo size={32} /> <span>Tríada de la información</span></a>
        <div className="nav-links">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={section === id ? 'act' : ''} onClick={() => setMenu(false)}>{label}</a>
          ))}
        </div>
        <a className="nav-cta" href="#triada">Ver los pilares</a>
        <button className="menu-btn" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <Icon name={menu ? 'close' : 'menu'} size={22} />
        </button>
      </nav>

      {/* Hero */}
      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div className="hero-text">
            <p className="kicker"><Icon name="star" size={16} /> Gestión de Seguridad de la Información, Chile</p>
            <h1>La tríada de la información</h1>
            <p className="sub">Confidencialidad, integridad y disponibilidad son los tres criterios con los que una organización decide si su información está realmente protegida. Esta guía los explica desde la gestión de seguridad y desde la normativa chilena.</p>
            <a className="btn" href="#que-es">Comenzar el recorrido <Icon name="down" size={18} /></a>
          </div>
          <div className="hero-visual"><Triad /></div>
        </div>
      </header>

      {/* Que es */}
      <section id="que-es" className="sec">
        <div className="wrap two">
          <div className="rv">
            <h2>Un modelo para proteger lo que vale</h2>
            <p>La información es un activo: tiene valor, dueño y riesgos. La tríada, conocida en inglés como CIA, es el modelo base que usan los estándares como la NCh-ISO 27001 para definir qué significa proteger ese activo.</p>
            <p>Su utilidad en la gestión es práctica: cada incidente, amenaza o control se puede ubicar en uno o más de sus tres vértices. Si no se sabe qué criterio se está protegiendo, no se puede priorizar ni medir.</p>
          </div>
          <div className="questions rv">
            <h3>Un activo, tres preguntas</h3>
            {PILLARS.map((p, i) => (
              <div className="q" key={p.key} style={{ '--nc': p.color }}>
                <span className="q-ico"><Icon name={p.icon} /></span>
                <p>{['¿Quién puede verlo?', '¿Es correcto y nadie lo alteró?', '¿Puedo usarlo cuando lo necesito?'][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Escenario fijo */}
      <section id="triada" className="stage" style={{ '--accent': current ? current.color : 'var(--c)' }}>
        <div className="stage-visual">
          <Triad active={active} center={current ? current.q : null} />
        </div>
        <div className="stage-blocks">
          {PILLARS.map((p, i) => (
            <article key={p.key} data-key={p.key} ref={(el) => (blocks.current[i] = el)}
              className={`block ${active === p.key ? 'on' : ''}`} style={{ '--nc': p.color }}>
              <div className="panel">
              <span className="block-ico"><Icon name={p.icon} size={30} /></span>
              <h2>{p.name}</h2>
              <p className="lead">{p.lead}</p>
              <p>{p.body}</p>
              <div className="cols">
                <div>
                  <h3>Amenazas típicas</h3>
                  <ul className="threats">
                    {p.threats.map(([ic, t]) => <li key={t}><Icon name={ic} size={18} />{t}</li>)}
                  </ul>
                </div>
                <div>
                  <h3>Controles</h3>
                  <ul className="controls">
                    {p.controls.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
              <div className="chile"><Icon name="star" size={18} /><p><strong>En Chile.</strong> {p.chile}</p></div>
            </div>
            </article>
          ))}
        </div>
      </section>

      {/* Equilibrio */}
      <section id="equilibrio" className="sec alt">
        <div className="wrap">
          <h2 className="rv">Los tres pilares compiten entre sí</h2>
          <p className="intro rv">Proteger no es maximizar un vértice. La gestión de seguridad busca el equilibrio que corresponde al riesgo y al negocio de cada organización.</p>
          <div className="grid3">
            {TRADEOFFS.map(([a, b, t], i) => (
              <div className="card rv" key={a + b} style={{ '--delay': `${i * 90}ms` }}>
                <div className="pair"><Tag k={a} /><span className="vs" /><Tag k={b} /></div>
                <h3>{byKey[a].name} y {byKey[b].name.toLowerCase()}</h3>
                <p>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Caso */}
      <section id="caso" className="sec">
        <div className="wrap">
          <h2 className="rv">Un caso: la ficha clínica electrónica</h2>
          <p className="intro rv">Un hospital público chileno guarda las historias de sus pacientes en un sistema digital. Los tres criterios aparecen a la vez.</p>
          <div className="case">
            {CASE.map(([k, t], i) => (
              <div className="case-row rv" key={k} style={{ '--nc': byKey[k].color, '--delay': `${i * 90}ms` }}>
                <span className="case-ico"><Icon name={byKey[k].icon} size={26} /></span>
                <div><h3>{byKey[k].name}</h3><p>{t}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gestion de riesgos */}
      <section id="gestion" className="sec dark">
        <div className="wrap">
          <h2 className="rv">Cómo se gestiona: del activo al control</h2>
          <p className="intro rv">En un Sistema de Gestión de Seguridad de la Información (SGSI), la tríada es el criterio con el que se mide el impacto de cada riesgo. El proceso es un ciclo, no un proyecto que termina.</p>
          <ol className="cycle">
            {CYCLE.map(([ic, t, d], i) => (
              <li className="rv" key={t} style={{ '--delay': `${i * 110}ms` }}>
                <span className="step-n">{i + 1}</span>
                <Icon name={ic} size={28} />
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Marco chileno */}
      <section id="normativa" className="sec">
        <div className="wrap">
          <h2 className="rv">El marco normativo en Chile</h2>
          <p className="intro rv">Cada norma protege uno o varios vértices de la tríada. Los iconos indican cuáles.</p>
          <div className="timeline">
            {LAW.map(([y, n, d, tags], i) => (
              <div className="t-item rv" key={n} style={{ '--delay': `${(i % 3) * 60}ms` }}>
                <span className="t-year">{y}</span>
                <div className="t-body">
                  <div className="t-head"><h3>{n}</h3><span className="tags">{tags.map((k) => <Tag k={k} key={k} />)}</span></div>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mas alla */}
      <section id="complementos" className="sec alt">
        <div className="wrap">
          <h2 className="rv">Conceptos que complementan la tríada</h2>
          <div className="grid3">
            {EXTRA.map(([ic, t, d], i) => (
              <div className="card rv" key={t} style={{ '--delay': `${i * 90}ms` }}>
                <span className="plain-ico"><Icon name={ic} size={26} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section id="resumen" className="end">
        <div className="wrap rv">
          <h2>En resumen</h2>
          <div className="sum">
            {PILLARS.map((p) => (
              <div key={p.key} style={{ '--nc': p.color }}><span className="q-ico"><Icon name={p.icon} /></span><p>{p.name}: {p.lead.toLowerCase().replace(/\.$/, '')}.</p></div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-foot">
        <div className="wrap foot-cols">
          {FOOT.map((col) => (
            <div key={col.title}>
              <h3 className="foot-h">{col.title}</h3>
              {col.groups.map(([sub, links]) => (
                <div className="foot-group" key={sub || 'main'}>
                  {sub && <h4 className="foot-sub">{sub}</h4>}
                  <ul>
                    {links.map(([label, href]) => (
                      <li key={label}>
                        <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <div className="foot-share">
            <div className="copy-box">
              <input readOnly value={url} aria-label="Enlace de la infografía" onFocus={(e) => e.target.select()} />
              <button onClick={copy} aria-label="Copiar enlace"><Icon name={copied ? 'check' : 'arrow'} size={22} /></button>
            </div>
            <p className="copy-note">{copied ? 'Enlace copiado al portapapeles.' : 'Copia el enlace para compartir esta infografía con tu curso o tu equipo.'}</p>
            <h3 className="foot-h">Comparte esta infografía</h3>
            <div className="soc-row">
              {SHARE.map(([ic, name, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Compartir en ${name}`}><Icon name={ic} size={22} /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="foot-legal">
          <div className="wrap foot-legal-in">
            <a className="brand" href="#top"><Logo size={28} /> <span>Tríada de la información</span></a>
            <small>Material educativo para la asignatura Gestión de Seguridad de la Información. Verifica la vigencia de cada ley en bcn.cl.</small>
          </div>
        </div>
      </footer>
    </main>
  )
}