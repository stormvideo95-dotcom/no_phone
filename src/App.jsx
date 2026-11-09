import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, X, Check, Sun, Moon, Sparkles, SlidersHorizontal, Heart, Clock3, BookOpen, Film, Palette, Utensils, Trees, Music2, Footprints, Dices, WandSparkles, ChevronDown } from 'lucide-react';

const initialItems = [
  ['Massagematrasje (3 soorten)','Ontspanning','🧖'],['Massage','Ontspanning','💆'],['Film kijken','Samen','🎬'],['Gezelschapsspel','Spelletjes','🎲'],['Koekjes bakken','Koken & bakken','🍪'],['Brood kneden','Koken & bakken','🍞'],['Tekenen','Creatief','✏️'],['Verven','Creatief','🎨'],['Fotoalbums bekijken','Samen','📷'],['Ideetjes uit boek Gezinstijd','Inspiratie','📚'],['Ideetjes uit boek Lijst te doen met kind','Inspiratie','💡'],['Dansen','Samen','💃'],['Samen iets koken','Koken & bakken','🍳'],['Vuurtje stoken op terras','Buiten','🔥'],['Voorlezen (boek brief koning)','Samen','📖'],['Bos (herfst decoratie)','Buiten','🍂'],['Bad met bubbels','Ontspanning','🫧'],['Hobby uitleggen','Samen','🧶'],['Voetbadje','Ontspanning','🦶'],['Gelaatsverzorging','Ontspanning','🧴'],['Kruiswoordraadsel','Spelletjes','🧩'],['Kerstversiering maken','Creatief','🎄'],['Houten figuren maken bv kerstboom','Creatief','🪵'],['Klankschaal luisteren','Ontspanning','🎵']
].map(([title,category,emoji],i)=>({id:i+1,title,category,emoji,done:false}));

const categories = ['Alles','Samen','Ontspanning','Creatief','Koken & bakken','Spelletjes','Buiten','Inspiratie'];
const icons = ['✨','💆','🎬','🎲','🍪','🎨','📚','🌿','🎵','❤️','🧩','🫧'];
const categoryEmoji = { 'Samen':'🤍','Ontspanning':'🫧','Creatief':'🎨','Koken & bakken':'🍪','Spelletjes':'🎲','Buiten':'🌿','Inspiratie':'💡' };

function loadItems() {
  try { const saved = localStorage.getItem('no-phone-items-v1'); return saved ? JSON.parse(saved) : initialItems; }
  catch { return initialItems; }
}

function ActivityDialog({ item, onSave, onClose }) {
  const [title,setTitle] = useState(item?.title || '');
  const [category,setCategory] = useState(item?.category || 'Samen');
  const [emoji,setEmoji] = useState(item?.emoji || '✨');
  const [error,setError] = useState('');
  function submit(e) { e.preventDefault(); if (!title.trim()) { setError('Geef je activiteit een naam.'); return; } onSave({...item,title:title.trim(),category,emoji}); }
  return <div className="scrim" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <form className="dialog" onSubmit={submit}>
      <div className="dialog-top"><div><span className="eyebrow">{item ? 'ACTIVITEIT AANPASSEN' : 'IETS LEUKS TOEVOEGEN'}</span><h2>{item ? 'Pas je idee aan' : 'Nieuw idee'}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Sluiten"><X size={20}/></button></div>
      <label className="field-label" htmlFor="activity-title">Naam van de activiteit</label>
      <input id="activity-title" autoFocus value={title} onChange={e=>{setTitle(e.target.value);setError('');}} placeholder="Bijvoorbeeld: samen sterren kijken" maxLength={90}/>
      {error && <p className="error">{error}</p>}
      <label className="field-label">Categorie</label>
      <div className="select-wrap"><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.filter(c=>c!=='Alles').map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={18}/></div>
      <label className="field-label">Kies een symbool</label>
      <div className="emoji-picker">{icons.map(icon=><button type="button" key={icon} className={emoji===icon?'emoji-choice selected':'emoji-choice'} onClick={()=>setEmoji(icon)}>{icon}</button>)}</div>
      <div className="dialog-actions"><button type="button" className="text-button" onClick={onClose}>Annuleren</button><button className="primary-button" type="submit"><Check size={18}/>{item?'Bewaren':'Toevoegen'}</button></div>
    </form>
  </div>;
}

export default function App() {
  const [items,setItems] = useState(loadItems);
  const [category,setCategory] = useState('Alles');
  const [query,setQuery] = useState('');
  const [editMode,setEditMode] = useState(false);
  const [dialog,setDialog] = useState(null);
  const [dark,setDark] = useState(()=>localStorage.getItem('no-phone-theme')==='dark');
  const [showDone,setShowDone] = useState(true);
  useEffect(()=>{localStorage.setItem('no-phone-items-v1',JSON.stringify(items));},[items]);
  useEffect(()=>{localStorage.setItem('no-phone-theme',dark?'dark':'light');document.documentElement.dataset.theme=dark?'dark':'light';},[dark]);
  const filtered = useMemo(()=>items.filter(item=>(category==='Alles'||item.category===category)&&(showDone||!item.done)&&item.title.toLowerCase().includes(query.toLowerCase())),[items,category,query,showDone]);
  const doneCount=items.filter(i=>i.done).length;
  const progress=items.length?Math.round(doneCount/items.length*100):0;
  function saveItem(next) { setItems(old=>next.id?old.map(i=>i.id===next.id?next:i):[...old,{...next,id:Math.max(0,...old.map(i=>i.id))+1,done:false}]);setDialog(null); }
  function removeItem(id) { if(window.confirm('Wil je deze activiteit verwijderen?'))setItems(old=>old.filter(i=>i.id!==id)); }
  function toggleDone(id) { setItems(old=>old.map(i=>i.id===id?{...i,done:!i.done}:i)); }
  return <main className="app-shell">
    <header className="topbar"><a className="brand" href="#" aria-label="No Phone start"><span className="brand-mark"><Heart size={19} fill="currentColor"/></span><span>no phone<span className="brand-dot">.</span></span></a><div className="top-actions"><span className="offline-label"><span className="status-dot"/>Jullie offline moment</span><button className="icon-button theme-toggle" onClick={()=>setDark(!dark)} aria-label="Thema wisselen">{dark?<Sun size={20}/>:<Moon size={20}/>}</button></div></header>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow hero-eyebrow"><Sparkles size={14}/> EVEN WEG VAN HET SCHERM</span><h1>Meer tijd voor<br/><em>elkaar.</em></h1><p>Kleine plannen, mooie momenten. Kies iets leuks en geniet samen — helemaal zonder telefoon.</p>
        <div className="hero-meta"><span><Heart size={16}/> {items.length} ideeën</span><span><Clock3 size={16}/> Tijd voor elkaar</span></div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="sun-disc"/><div className="art-card art-card-one">✿</div><div className="art-card art-card-two">☼</div><div className="art-note">samen is<br/>het mooiste</div><div className="art-spark">✳</div></div>
    </section>
    <section className="progress-panel"><div className="progress-heading"><div><span className="eyebrow">JULLIE MOMENTEN</span><h2>Al zoveel leuks te doen</h2></div><div className="progress-count"><strong>{doneCount}</strong><span> / {items.length} gedaan</span></div></div><div className="progress-track"><div className="progress-fill" style={{width:progress+'%'}}/></div><div className="progress-foot"><span>{progress===100&&items.length?'Alles gedaan. Wat een mooie momenten!':'Elk idee is een kans op een mooie herinnering.'}</span><span>{progress}%</span></div></section>
    <section className="list-section">
      <div className="section-heading"><div><span className="eyebrow">DE LEUKE DINGEN</span><h2>Wat gaan we doen?</h2></div><button className="primary-button add-button" onClick={()=>setDialog({})}><Plus size={19}/>Nieuw idee</button></div>
      <div className="toolbar"><div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Zoek een activiteit…"/></div><button className={editMode?'mode-button active':'mode-button'} onClick={()=>setEditMode(!editMode)}><SlidersHorizontal size={17}/>{editMode?'Bewerken':'Bewerk lijst'}</button></div>
      <div className="filters">{categories.map(c=><button key={c} className={category===c?'filter-chip active':'filter-chip'} onClick={()=>setCategory(c)}>{c==='Alles'?'✦':categoryEmoji[c]||'✦'} <span>{c}</span></button>)}</div>
      <div className="list-caption"><span>{filtered.length} {filtered.length===1?'activiteit':'activiteiten'}</span><button className="show-done" onClick={()=>setShowDone(!showDone)}>{showDone?'Verberg afgeronde':'Toon afgeronde'}</button></div>
      {filtered.length ? <div className="activity-grid">{filtered.map((item,index)=><article key={item.id} className={'activity-card'+(item.done?' is-done':'')} style={{'--card-index':index%8}}><button className="activity-main" onClick={()=>toggleDone(item.id)} aria-label={item.done?'Markeer als niet afgerond':'Markeer als afgerond'}><span className="activity-emoji">{item.emoji||'✨'}</span><span className="activity-content"><span className="activity-title">{item.title}</span><span className="activity-category">{item.category}</span></span><span className="done-check">{item.done?<Check size={17}/>:<span/>}</span></button>{editMode&&<div className="card-actions"><button onClick={()=>setDialog(item)}><Pencil size={15}/> Bewerken</button><button className="delete-action" onClick={()=>removeItem(item.id)}><Trash2 size={15}/> Verwijderen</button></div>}</article>)}</div>:<div className="empty-state"><span>🌱</span><h3>Nog niets gevonden</h3><p>Probeer een andere zoekterm of kies een andere categorie.</p><button className="text-button" onClick={()=>{setQuery('');setCategory('Alles');}}>Wis filters</button></div>}
      <div className="list-footer"><span>♡</span> Leg je telefoon weg. Dit moment is van jullie.</div>
    </section>
    <footer className="footer"><span>NO PHONE <span className="brand-dot">.</span></span><span>Gemaakt voor echte momenten, samen.</span></footer>
    {dialog&&<ActivityDialog item={dialog.id?dialog:null} onSave={saveItem} onClose={()=>setDialog(null)}/>}
  </main>;
}
