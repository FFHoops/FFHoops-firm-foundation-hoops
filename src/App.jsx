import { useState } from "react";

const C = {
  bg: "#0a1628", card: "rgba(10,18,35,0.82)", border: "rgba(255,255,255,0.12)",
  orange: "#FF6B1A", orangeDim: "rgba(255,107,26,0.15)", orangeGlow: "rgba(255,107,26,0.30)",
  white: "#F0F4FF", muted: "#7A8BA8", mutedLight: "#B0C0D8",
  green: "#22C55E", greenDim: "rgba(34,197,94,0.12)",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Outfit:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a1628;color:${C.white};font-family:'Outfit',sans-serif;min-height:100vh}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}
.app{min-height:100vh;position:relative;overflow-x:hidden}
.app::before{
  content:'';position:fixed;inset:0;
  background-image:url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80');
  background-size:cover;background-position:center;
  pointer-events:none;z-index:0;
}
.app::after{
  content:'';position:fixed;inset:0;
  background:linear-gradient(160deg,rgba(5,10,25,0.88) 0%,rgba(10,18,40,0.80) 50%,rgba(5,10,25,0.92) 100%);
  pointer-events:none;z-index:0;
}
nav{
  position:sticky;top:0;z-index:10;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 20px;height:64px;
  border-bottom:1px solid ${C.border};
  backdrop-filter:blur(14px);background:rgba(5,10,25,0.75);
}
.logo{font-family:'Barlow Condensed',sans-serif;font-size:clamp(13px,2.5vw,22px);font-weight:900;letter-spacing:2px;text-transform:uppercase}
.logo em{color:${C.orange};font-style:normal}
.pill-nav{display:flex;gap:2px;background:${C.card};border:1px solid ${C.border};border-radius:100px;padding:3px}
.pill-btn{
  padding:6px 12px;border-radius:100px;border:none;
  background:transparent;color:${C.mutedLight};
  font-family:'Outfit',sans-serif;font-size:clamp(10px,2vw,13px);font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap;
}
.pill-btn.on{background:${C.orange};color:#fff;font-weight:600}
.pill-btn:hover:not(.on){color:${C.white}}
.page{position:relative;z-index:1;max-width:1040px;margin:0 auto;padding:40px 20px 80px}
.eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:${C.orange};
  border:1px solid rgba(255,107,26,0.28);background:${C.orangeDim};border-radius:100px;padding:5px 14px;margin-bottom:24px;
}
.hero-h1{
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(36px,7vw,106px);font-weight:900;line-height:.92;letter-spacing:-1px;text-transform:uppercase;margin-bottom:20px;word-break:break-word;
}
.hero-h1 .acc{color:${C.orange};display:block}
.hero-sub{font-size:clamp(14px,2vw,17px);color:${C.mutedLight};line-height:1.65;max-width:100%;margin-bottom:36px}
.cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:56px}
.btn-main{
  background:${C.orange};color:#fff;border:none;border-radius:100px;
  padding:13px 30px;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;
  cursor:pointer;transition:all .2s;letter-spacing:.3px;
}
.btn-main:hover{background:#FF8040;transform:translateY(-1px);box-shadow:0 8px 24px ${C.orangeGlow}}
.btn-main-full{
  background:${C.orange};color:#fff;border:none;border-radius:12px;
  padding:15px;font-family:'Outfit',sans-serif;font-size:15px;font-weight:600;
  cursor:pointer;transition:all .2s;width:100%;letter-spacing:.3px;
}
.btn-main-full:hover{background:#FF8040;box-shadow:0 8px 24px ${C.orangeGlow}}
.btn-ghost{
  background:transparent;color:${C.white};border:1px solid ${C.border};border-radius:100px;
  padding:13px 30px;font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;
}
.btn-ghost:hover{border-color:${C.orange};color:${C.orange}}
.btn-back{
  background:transparent;border:1px solid ${C.border};color:${C.muted};border-radius:100px;
  padding:11px 26px;font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;transition:all .2s;
}
.btn-back:hover{border-color:${C.white};color:${C.white}}
.stat-bar{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid ${C.border};border-radius:16px;background:${C.card};margin-bottom:48px;overflow:hidden}
.stat-item{padding:20px 16px;border-right:1px solid ${C.border};text-align:center}
.stat-item:last-child{border-right:none}
.stat-num{font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;color:${C.orange};line-height:1;margin-bottom:4px}
.stat-lbl{font-size:10px;color:${C.muted};text-transform:uppercase;letter-spacing:1.5px;font-weight:600}
.sec-tag{font-size:11px;color:${C.orange};font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:8px}
.sec-h2{font-family:'Barlow Condensed',sans-serif;font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:.5px;text-transform:uppercase;margin-bottom:20px;line-height:1}
/* Session cards ‚Äî horizontal row layout */
.sgrid{display:flex;flex-direction:column;gap:12px;margin-bottom:0}
.scard{
  background:${C.card};border:1px solid ${C.border};border-radius:14px;
  padding:20px 24px;cursor:pointer;transition:all .2s;
  display:flex;align-items:center;gap:20px;position:relative;overflow:hidden;
}
.scard::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:${C.orange};opacity:0;transition:opacity .2s}
.scard:hover,.scard.sel{border-color:rgba(255,107,26,0.5);background:rgba(255,107,26,0.05)}
.scard:hover::before,.scard.sel::before{opacity:1}
.chk{
  width:24px;height:24px;border-radius:50%;border:2px solid ${C.border};
  display:flex;align-items:center;justify-content:center;
  font-size:12px;color:#fff;font-weight:700;flex-shrink:0;transition:all .2s;
  margin-left:auto;
}
.scard.sel .chk{background:${C.orange};border-color:${C.orange}}
.s-emoji{font-size:28px;flex-shrink:0}
.s-info{flex:1;min-width:0}
.s-name{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;margin-bottom:2px;color:${C.white}}
.s-desc{font-size:13px;color:${C.mutedLight};line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.s-price-col{text-align:right;flex-shrink:0}
.s-price{font-size:22px;font-weight:700;color:${C.orange};white-space:nowrap}
.s-price small{display:block;font-size:11px;color:${C.muted};font-weight:400}
/* free banner */
.free-banner{
  display:flex;align-items:center;gap:14px;
  background:${C.greenDim};border:1px solid rgba(34,197,94,0.3);
  border-radius:12px;padding:14px 20px;margin-bottom:24px;
}
.free-icon{width:36px;height:36px;border-radius:8px;flex-shrink:0;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);display:flex;align-items:center;justify-content:center;font-size:18px}
.free-text strong{display:block;font-size:14px;font-weight:600;color:${C.green};margin-bottom:1px}
.free-text span{font-size:12px;color:${C.mutedLight}}
/* booking layout */
.book-steps{display:flex;flex-direction:column;gap:20px}
.book-step{background:${C.card};border:1px solid ${C.border};border-radius:16px;overflow:hidden}
.book-step-header{
  display:flex;align-items:center;gap:12px;
  padding:16px 20px;border-bottom:1px solid ${C.border};
  background:rgba(255,255,255,0.02);
}
.step-num{
  width:28px;height:28px;border-radius:50%;
  background:${C.orange};color:#fff;
  font-size:13px;font-weight:700;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.step-num.done{background:${C.green}}
.book-step-title{font-size:14px;font-weight:600;color:${C.white};letter-spacing:.3px}
.book-step-body{padding:20px}
/* day picker */
.day-strip{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
.day-btn{
  border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid ${C.border};
  color:${C.mutedLight};font-family:'Outfit',sans-serif;font-size:11px;font-weight:600;
  cursor:pointer;transition:all .2s;padding:10px 4px;text-align:center;
}
.day-btn:hover,.day-btn.sel{border-color:${C.orange};color:${C.orange};background:${C.orangeDim}}
/* time grid */
.slot-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.slot-btn{
  padding:10px 4px;border-radius:10px;text-align:center;
  background:rgba(255,255,255,0.04);border:1px solid ${C.border};
  color:${C.mutedLight};font-family:'Outfit',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;
}
.slot-btn:hover,.slot-btn.sel{border-color:${C.orange};color:${C.orange};background:${C.orangeDim}}
.slot-btn.taken{opacity:.25;cursor:not-allowed;pointer-events:none;text-decoration:line-through}
/* contact form */
.fgroup{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted}}
input,select,textarea{
  background:rgba(255,255,255,0.05);border:1px solid ${C.border};border-radius:10px;
  padding:12px 15px;color:${C.white};font-family:'Outfit',sans-serif;font-size:15px;
  outline:none;transition:border-color .2s;width:100%;
}
input:focus,select:focus,textarea:focus{border-color:${C.orange}}
input::placeholder{color:${C.muted}}
textarea{min-height:80px;resize:vertical}
.divider{height:1px;background:${C.border};margin:20px 0}
.intake-wrap{max-width:660px;margin:0 auto}
.prog-bar{height:2px;background:${C.border};border-radius:100px;margin-bottom:40px;overflow:hidden}
.prog-fill{height:100%;background:${C.orange};border-radius:100px;transition:width .4s ease}
.step-meta{font-size:11px;color:${C.muted};text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:8px}
.step-title{font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;margin-bottom:6px;line-height:1}
.step-sub{font-size:14px;color:${C.mutedLight};margin-bottom:32px}
.pick-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.pick-grid.cols3{grid-template-columns:1fr 1fr 1fr}
.pick-opt{
  background:${C.bg};border:1px solid ${C.border};border-radius:10px;
  padding:13px 15px;cursor:pointer;transition:all .2s;
  display:flex;align-items:center;gap:10px;font-size:14px;color:${C.white};
}
.pick-opt:hover,.pick-opt.sel{border-color:${C.orange};background:${C.orangeDim}}
.pick-dot{
  width:18px;height:18px;border-radius:50%;border:2px solid ${C.border};flex-shrink:0;transition:all .2s;
  display:flex;align-items:center;justify-content:center;
}
.pick-opt.sel .pick-dot{background:${C.orange};border-color:${C.orange}}
.pick-opt.sel .pick-dot::after{content:'';width:6px;height:6px;border-radius:50%;background:#fff}
.pick-sq{
  width:18px;height:18px;border-radius:4px;border:2px solid ${C.border};flex-shrink:0;
  transition:all .2s;display:flex;align-items:center;justify-content:center;font-size:10px;
}
.pick-opt.sel .pick-sq{background:${C.orange};border-color:${C.orange};color:#fff}
.step-nav{display:flex;justify-content:space-between;align-items:center;margin-top:36px}
.success{text-align:center;padding:48px 24px}
.success-ring{
  width:80px;height:80px;border-radius:50%;border:2px solid ${C.orange};background:${C.orangeDim};
  display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 20px;
}
.success h2{font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
.success p{color:${C.mutedLight};font-size:15px;line-height:1.65;max-width:380px;margin:0 auto 28px}
.admin-login{max-width:380px;margin:60px auto;background:${C.card};border:1px solid ${C.border};border-radius:20px;padding:40px;text-align:center}
.admin-login h2{font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.admin-login p{font-size:13px;color:${C.muted};margin-bottom:28px}
.admin-dash{max-width:700px;margin:0 auto}
.admin-section{background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:24px;margin-bottom:20px}
.admin-section-title{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:${C.orange};margin-bottom:16px}
.admin-days{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
.admin-day{
  border-radius:10px;padding:10px 4px;text-align:center;
  font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;
  border:1px solid ${C.border};color:${C.muted};background:rgba(255,255,255,0.03);
}
.admin-day.on{background:${C.orangeDim};border-color:${C.orange};color:${C.orange}}
.admin-slots{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.admin-slot{
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 16px;border-radius:10px;border:1px solid ${C.border};
  background:rgba(255,255,255,0.03);cursor:pointer;transition:all .2s;
}
.admin-slot.on{background:${C.orangeDim};border-color:${C.orange}}
.admin-slot-time{font-size:14px;font-weight:500;color:${C.white}}
.admin-slot.on .admin-slot-time{color:${C.orange}}
.admin-toggle{
  width:36px;height:20px;border-radius:100px;transition:all .2s;flex-shrink:0;
  background:${C.border};position:relative;
}
.admin-toggle::after{
  content:'';position:absolute;top:3px;left:3px;
  width:14px;height:14px;border-radius:50%;background:#fff;transition:all .2s;
}
.admin-slot.on .admin-toggle{background:${C.orange}}
.admin-slot.on .admin-toggle::after{left:19px}
.admin-save-note{font-size:12px;color:${C.green};text-align:center;margin-top:12px;min-height:18px}
.admin-logout{background:transparent;border:1px solid ${C.border};color:${C.muted};border-radius:100px;padding:8px 20px;font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;transition:all .2s}
.admin-logout:hover{border-color:${C.white};color:${C.white}}
.bio-card{
  background:${C.card};border:1px solid ${C.border};border-radius:20px;
  padding:32px 24px;text-align:center;position:sticky;top:84px;
}
.bio-avatar{
  width:120px;height:120px;border-radius:50%;margin:0 auto 16px;
  background:linear-gradient(135deg,${C.orange},#FF9A5C);
  display:flex;align-items:center;justify-content:center;
  font-size:48px;border:3px solid ${C.orange};
}
.bio-name{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}
.bio-title{font-size:13px;color:${C.orange};font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px}
.bio-divider{height:1px;background:${C.border};margin:16px 0}
.bio-stat{display:flex;justify-content:space-between;align-items:center;padding:8px 0;font-size:14px}
.bio-stat-label{color:${C.muted}}
.bio-stat-val{color:${C.white};font-weight:600}
.bio-content{display:flex;flex-direction:column;gap:24px}
.bio-section{background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:28px}
.bio-section-title{
  font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;
  letter-spacing:1px;text-transform:uppercase;color:${C.orange};margin-bottom:14px;
  display:flex;align-items:center;gap:10px;
}
.bio-section p{font-size:15px;color:${C.mutedLight};line-height:1.8;margin-bottom:12px}
.bio-section p:last-child{margin-bottom:0}
.bio-highlights{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px}
.bio-highlight{
  background:${C.orangeDim};border:1px solid rgba(255,107,26,0.2);
  border-radius:10px;padding:12px 14px;
  font-size:13px;color:${C.white};line-height:1.5;
}
.bio-highlight strong{display:block;color:${C.orange};font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
@media(max-width:700px){
  .bio-layout{grid-template-columns:1fr}
  .bio-card{position:static}
  .bio-highlights{grid-template-columns:1fr}
}
`;

const css2end = `
@media(max-width:700px){
  nav{padding:0 16px}
  .logo{font-size:14px;letter-spacing:1px}
  .pill-btn{padding:6px 12px;font-size:11px}
  .page{padding:36px 20px 60px}
  .stat-bar{flex-wrap:wrap}
  .stat-item{border-right:none;border-bottom:1px solid ${C.border}}
  .sgrid{grid-template-columns:1fr}
  .book-row{grid-template-columns:1fr}
  .fgrid{grid-template-columns:1fr}
  .pick-grid,.pick-grid.cols3{grid-template-columns:1fr}
  .slot-grid{grid-template-columns:repeat(3,1fr)}
}
`;

const SESSIONS = [
  { id:"1on1",  emoji:"üèÄ", name:"1-on-1 Training",  desc:"Fully personalized sessions focused entirely on your development and individual goals.", price:"$65",  unit:"/ session" },
  { id:"small", emoji:"üë•", name:"Small Group (2‚Äì5)", desc:"Train alongside peers in a tight-knit, competitive, and high-energy environment.",    price:"$45", unit:"/ person"  },
  { id:"large", emoji:"üèüÔ∏è", name:"Large Group (6+)",  desc:"Ideal for teams, clubs, or AAU squads. Structured drills and team-level development.", price:"$25", unit:"/ person"  },
];

const POSITIONS = ["Point Guard","Shooting Guard","Small Forward","Power Forward","Center","Multiple"];
const LEVELS    = ["Beginner","Recreational","HS JV","HS Varsity","AAU / Club","Collegiate","Pro / Post-College"];
const EXPERIENCE = ["< 1 year","1‚Äì3 years","3‚Äì5 years","5‚Äì10 years","10+ years"];
const GOALS = [
  "Improve ball handling","Sharpen shooting","Increase athleticism","Develop post game",
  "Basketball IQ","College / pro prep","Build confidence","Stay active & have fun",
];

const EMAILJS_SERVICE  = "service_3feg00e";
const EMAILJS_TEMPLATE = "template_4fbrt3p";
const EMAILJS_KEY      = "aWoyLdSWPELufF-hk";

const COACH_PASSWORD = "ffhoops1";

const ALL_TIMES = ["7:00 AM","8:30 AM","10:00 AM","11:30 AM","1:00 PM","2:30 PM","4:00 PM","5:30 PM","7:00 PM","8:30 PM"];
const ALL_DAYS  = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

export default function App() {
  const [tab, setTab] = useState("home");

  // booking
  const [bk, setBk] = useState({ session:"", day:"", time:"", name:"", email:"", phone:"", notes:"" });
  const [bkDone, setBkDone] = useState(false);
  const [bkSending, setBkSending] = useState(false);
  const [bkError, setBkError] = useState("");

  // intake
  const [step, setStep] = useState(0);
  const [intakeDone, setIntakeDone] = useState(false);
  const [fi, setFi] = useState({
    firstName:"", lastName:"", email:"", phone:"", age:"",
    position:"", level:"", experience:"",
    goals:[], days:[],
  });

  // admin
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [adminErr, setAdminErr] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [activeDays, setActiveDays]   = useState(["MON","TUE","WED","THU","FRI","SAT","SUN"]);
  const [activeTimes, setActiveTimes] = useState(["7:00 AM","8:30 AM","10:00 AM","1:00 PM","2:30 PM","4:00 PM","7:00 PM","8:30 PM"]);

  const SLOTS = ALL_TIMES.map(t => ({ t, taken: !activeTimes.includes(t) }));
  const DAYS  = activeDays.length > 0 ? ALL_DAYS : ALL_DAYS;

  const TOTAL_STEPS = 4;
  const toggle = (field, val) =>
    setFi(p => ({ ...p, [field]: p[field].includes(val) ? p[field].filter(x=>x!==val) : [...p[field], val] }));

  function goBook(id) { setBk(p=>({...p,session:id})); setBkDone(false); setTab("book"); }

  async function sendBooking() {
    if(!bk.session||!bk.day||!bk.time||!bk.name||!bk.phone){
      setBkError("Please complete all required fields before submitting.");
      return;
    }
    setBkSending(true);
    setBkError("");
    const sessionName = SESSIONS.find(s=>s.id===bk.session)?.name || bk.session;
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          service_id: EMAILJS_SERVICE,
          template_id: EMAILJS_TEMPLATE,
          user_id: EMAILJS_KEY,
          template_params: {
            name: bk.name,
            phone: bk.phone,
            email: bk.email || "Not provided",
            session: sessionName,
            day: bk.day,
            time: bk.time,
            notes: bk.notes || "None",
          }
        })
      });
      if(res.ok){ setBkDone(true); }
      else { setBkError("Something went wrong. Please call us at 727-366-4401."); }
    } catch(e) {
      setBkError("Could not send. Please call us at 727-366-4401.");
    }
    setBkSending(false);
  }

  function toggleDay(d)  { setActiveDays(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]); }
  function toggleTime(t) { setActiveTimes(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]); }
  function saveAdmin()   { setSavedNote("‚úì Changes saved!"); setTimeout(()=>setSavedNote(""),2500); }
  function adminLogin()  {
    if(adminPw===COACH_PASSWORD){ setAdminAuthed(true); setAdminErr(""); setAdminPw(""); }
    else { setAdminErr("Incorrect password. Try again."); }
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* NAV */}
        <nav>
          <div className="logo">Firm Foundation <em>Hoops</em></div>
          <div className="pill-nav">
            <button className={`pill-btn ${tab==="home"?"on":""}`} onClick={()=>setTab("home")}>Home</button>
            <button className={`pill-btn ${tab==="bio"?"on":""}`} onClick={()=>setTab("bio")}>About</button>
            <button className={`pill-btn ${tab==="intake"?"on":""}`} onClick={()=>{setTab("intake");setStep(0);setIntakeDone(false);}}>Questionnaire</button>
            <button className={`pill-btn ${tab==="book"?"on":""}`} onClick={()=>{setTab("book");setBkDone(false);}}>Book</button>
          </div>
        </nav>

        {/* ‚ïê‚ïê HOME ‚ïê‚ïê */}
        {tab==="home" && (
          <div className="page">
            {/* Hero */}
            <div style={{marginBottom:40}}>
              <div className="eyebrow">üèÄ Elite Basketball Development</div>
              <h1 className="hero-h1">Train Hard.<span className="acc">Play Better.</span></h1>
              <p className="hero-sub">Professional coaching for athletes at every level. 1-on-1 and group sessions in Tampa, FL.</p>
              <div className="cta-row">
                <button className="btn-main" onClick={()=>{setTab("book");setBkDone(false);}}>Book a Session ‚Üí</button>
                <button className="btn-ghost" onClick={()=>{setTab("intake");setStep(0);setIntakeDone(false);}}>New Athlete Form</button>
              </div>
            </div>

            {/* Stats */}


            {/* Session Types */}
            <div className="sec-tag">Programs</div>
            <div className="sec-h2">Session Types</div>
            <div className="sgrid" style={{marginBottom:24}}>
              {SESSIONS.map(s=>(
                <div key={s.id} className="scard" onClick={()=>goBook(s.id)}>
                  <span className="s-emoji">{s.emoji}</span>
                  <div className="s-info">
                    <div className="s-name">{s.name}</div>
                    <div className="s-desc">{s.desc}</div>
                  </div>
                  <div className="s-price-col">
                    <div className="s-price">{s.price}</div>
                    <small style={{fontSize:11,color:C.muted}}>{s.unit}</small>
                  </div>
                  <div className="chk">‚úì</div>
                </div>
              ))}
            </div>
            <p style={{fontSize:12,color:C.muted,textAlign:"center"}}>Tap any session to book ‚Üí Your first session is <span style={{color:C.green,fontWeight:600}}>FREE</span></p>
          </div>
        )}

        {/* ‚ïê‚ïê BIO ‚ïê‚ïê */}
        {tab==="bio" && (
          <div className="page">
            <div className="sec-tag">Meet Your Coach</div>
            <div className="sec-h2">About Me</div>
            <div className="bio-layout">

              {/* Sidebar Card */}
              <div className="bio-card">
                <div className="bio-avatar">üèÄ</div>
                <div className="bio-name">Matt Richie</div>
                <div className="bio-title">Head Trainer & Founder</div>
                <div className="bio-divider"/>
                <div className="bio-stat"><span className="bio-stat-label">Experience</span><span className="bio-stat-val">30 Years</span></div>
                <div className="bio-stat"><span className="bio-stat-label">Athletes</span><span className="bio-stat-val">Ages 8‚Äì18</span></div>
                <div className="bio-stat"><span className="bio-stat-label">Location</span><span className="bio-stat-val">Tampa, FL</span></div>
                <div className="bio-stat"><span className="bio-stat-label">Specialty</span><span className="bio-stat-val">Fundamentals</span></div>
                <div className="bio-divider"/>
                <button className="btn-main" style={{width:"100%",borderRadius:10}} onClick={()=>{setTab("book");setBkDone(false);}}>Book a Session ‚Üí</button>
              </div>

              {/* Main Content */}
              <div className="bio-content">

                <div className="bio-section">
                  <div className="bio-section-title">üìñ My Story</div>
                  <p>Coach Matt grew up in Indiana, where his love for basketball took root at the age of 8. What began as a passion quickly evolved into a lifelong commitment to the game ‚Äî one defined by relentless work ethic, competitive drive, and an unwavering dedication to growth.</p>
                  <p>After an accomplished playing career, Coach Matt turned that same energy toward developing the next generation of players. He has coached athletes across all levels ‚Äî from beginners just learning the game to elite varsity competitors ‚Äî and brings the same intensity and attention to detail to every single session.</p>
                </div>

                <div className="bio-section">
                  <div className="bio-section-title">üèÜ Playing Background</div>
                  <p>Coach Matt's playing career speaks for itself. As a standout performer in Indiana ‚Äî one of the country's most competitive high school basketball landscapes ‚Äî he established himself as a complete, high-IQ player on both ends of the floor.</p>
                  <div className="bio-highlights">
                    <div className="bio-highlight"><strong>High School Stats</strong>Averaged 20 PPG, 6 APG &amp; 6 RPG</div>
                    <div className="bio-highlight"><strong>All-Conference</strong>1st Team All-Conference ‚Äî 2 consecutive years</div>
                    <div className="bio-highlight"><strong>ü•á International</strong>Gold Medal ‚Äî Team USA 17U, United World Games, Austria</div>
                    <div className="bio-highlight"><strong>College</strong>Played collegiate basketball ¬∑ B.S. in Business Management</div>
                  </div>
                </div>

                <div className="bio-section">
                  <div className="bio-section-title">üéì Coaching Philosophy</div>
                  <p>At Firm Foundation Hoops, everything starts with the fundamentals. Coach Matt believes that elite players aren't built on highlight plays ‚Äî they're built through mastery of the basics: ball handling, proper shooting mechanics, and the ability to create space and opportunities with and without the basketball.</p>
                  <p>His coaching style is uplifting, regimented, detail-oriented, and deeply passionate. Every rep has a purpose. Every correction is an investment. Athletes don't just leave better players ‚Äî they leave with a stronger understanding of the game.</p>
                  <div style={{
                    margin:"20px 0 0",padding:"18px 20px",
                    borderLeft:`3px solid ${C.orange}`,
                    background:C.orangeDim,borderRadius:"0 10px 10px 0"
                  }}>
                    <p style={{fontStyle:"italic",fontSize:15,color:C.white,lineHeight:1.6,margin:0}}>
                      "Hard work beats talent when talent doesn't work hard."
                    </p>
                    <p style={{fontSize:12,color:C.muted,marginTop:8,marginBottom:0,fontWeight:600}}>‚Äî Tim Notke</p>
                  </div>
                </div>

                <div className="bio-section">
                  <div className="bio-section-title">‚≠ê What We Focus On</div>
                  <p>Every training session at Firm Foundation Hoops is built around three core pillars that Coach Matt believes separate good players from great ones.</p>
                  <div className="bio-highlights">
                    <div className="bio-highlight"><strong>üèÄ Ball Handling</strong>Developing tight, confident, game-speed dribbling under pressure</div>
                    <div className="bio-highlight"><strong>üéØ Shooting Form</strong>Building repeatable, mechanically sound shooting technique</div>
                    <div className="bio-highlight"><strong>üß† Movement & IQ</strong>Learning how to get open and create advantages with and without the ball</div>
                    <div className="bio-highlight"><strong>üí™ Mindset</strong>Instilling discipline, confidence, and a competitive standard in every athlete</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ‚ïê‚ïê INTAKE ‚ïê‚ïê */}
        {tab==="intake" && (
          <div className="page">
            <div className="intake-wrap">
              {intakeDone ? (
                <div className="success">
                  <div className="success-ring">‚úì</div>
                  <h2>You're In!</h2>
                  <p>Thanks {fi.firstName||"Athlete"}! We've received your info and will reach out soon to get your training started.</p>
                  <button className="btn-main" onClick={()=>{setTab("book");setBkDone(false);}}>Book Your First Session ‚Üí</button>
                </div>
              ) : (
                <>
                  <div className="prog-bar">
                    <div className="prog-fill" style={{width:`${((step+1)/TOTAL_STEPS)*100}%`}} />
                  </div>

                  {/* Step 1 ‚Äî Personal */}
                  {step===0 && (<>
                    <div className="step-meta">Step 1 of 4</div>
                    <div className="step-title">About You</div>
                    <div className="step-sub">Let's get your basic info so we can stay in touch.</div>
                    <div className="fgrid" style={{marginBottom:16}}>
                      <div className="fgroup"><label>First Name</label><input value={fi.firstName} onChange={e=>setFi(p=>({...p,firstName:e.target.value}))} placeholder="First name" /></div>
                      <div className="fgroup"><label>Last Name</label><input value={fi.lastName} onChange={e=>setFi(p=>({...p,lastName:e.target.value}))} placeholder="Last name" /></div>
                    </div>
                    <div className="fgroup"><label>Email Address</label><input type="email" value={fi.email} onChange={e=>setFi(p=>({...p,email:e.target.value}))} placeholder="your@email.com" /></div>
                    <div className="fgrid">
                      <div className="fgroup"><label>Phone Number</label><input value={fi.phone} onChange={e=>setFi(p=>({...p,phone:e.target.value}))} placeholder="(555) 000-0000" /></div>
                      <div className="fgroup"><label>Age</label><input type="number" value={fi.age} onChange={e=>setFi(p=>({...p,age:e.target.value}))} placeholder="Age" /></div>
                    </div>
                  </>)}

                  {/* Step 2 ‚Äî Skill Level */}
                  {step===1 && (<>
                    <div className="step-meta">Step 2 of 4</div>
                    <div className="step-title">Your Level</div>
                    <div className="step-sub">Help us understand where you are so we can place you right.</div>
                    <div className="sub-label" style={{marginBottom:12}}>Current Skill Level</div>
                    <div className="pick-grid" style={{marginBottom:24}}>
                      {LEVELS.map(l=>(
                        <div key={l} className={`pick-opt ${fi.level===l?"sel":""}`} onClick={()=>setFi(p=>({...p,level:l}))}>
                          <div className="pick-dot"/>{l}
                        </div>
                      ))}
                    </div>
                    <div className="sub-label" style={{marginBottom:12}}>Years of Experience</div>
                    <div className="pick-grid">
                      {EXPERIENCE.map(ex=>(
                        <div key={ex} className={`pick-opt ${fi.experience===ex?"sel":""}`} onClick={()=>setFi(p=>({...p,experience:ex}))}>
                          <div className="pick-dot"/>{ex}
                        </div>
                      ))}
                    </div>
                  </>)}

                  {/* Step 3 ‚Äî Position */}
                  {step===2 && (<>
                    <div className="step-meta">Step 3 of 4</div>
                    <div className="step-title">Your Game</div>
                    <div className="step-sub">What position do you play? We'll tailor drills to your role.</div>
                    <div className="pick-grid cols3">
                      {POSITIONS.map(p=>(
                        <div key={p} className={`pick-opt ${fi.position===p?"sel":""}`} onClick={()=>setFi(prev=>({...prev,position:p}))}>
                          <div className="pick-dot"/>{p}
                        </div>
                      ))}
                    </div>
                  </>)}

                  {/* Step 4 ‚Äî Goals & Availability */}
                  {step===3 && (<>
                    <div className="step-meta">Step 4 of 4</div>
                    <div className="step-title">Goals & Availability</div>
                    <div className="step-sub">What are you working toward, and when can you train?</div>
                    <div className="sub-label" style={{marginBottom:12}}>Training Goals (select all that apply)</div>
                    <div className="pick-grid" style={{marginBottom:28}}>
                      {GOALS.map(g=>(
                        <div key={g} className={`pick-opt ${fi.goals.includes(g)?"sel":""}`} onClick={()=>toggle("goals",g)}>
                          <div className="pick-sq">{fi.goals.includes(g)?"‚úì":""}</div>{g}
                        </div>
                      ))}
                    </div>
                    <div className="sub-label" style={{marginBottom:12}}>Available Days</div>
                    <div className="day-strip">
                      {ALL_DAYS.map(d=>(
                        <div key={d} className={`day-btn ${fi.days.includes(d)?"sel":""}`} onClick={()=>toggle("days",d)}>{d}</div>
                      ))}
                    </div>
                  </>)}

                  <div className="step-nav">
                    {step>0 ? <button className="btn-back" onClick={()=>setStep(s=>s-1)}>‚Üê Back</button> : <div/>}
                    {step<TOTAL_STEPS-1
                      ? <button className="btn-main" onClick={()=>setStep(s=>s+1)}>Continue ‚Üí</button>
                      : <button className="btn-main" onClick={()=>setIntakeDone(true)}>Submit ‚Üí</button>
                    }
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ‚ïê‚ïê BOOK ‚ïê‚ïê */}
        {tab==="book" && (
          <div className="page">
            {bkDone ? (
              <div className="success">
                <div className="success-ring">üèÄ</div>
                <h2>You're Booked!</h2>
                <p>Thanks {bk.name||"Athlete"}! Your session request has been received. We'll confirm within 24 hours.</p>
                <button className="btn-main" onClick={()=>{setBkDone(false);setBkError("");setBkSending(false);setBk({session:"",day:"",time:"",name:"",email:"",phone:"",notes:""});}}>Book Another ‚Üí</button>
              </div>
            ) : (<>
              <div className="sec-tag">Scheduling</div>
              <div className="sec-h2">Book a Session</div>

              <div className="free-banner">
                <div className="free-icon">üéÅ</div>
                <div className="free-text">
                  <strong>Your First Session is FREE</strong>
                  <span>No commitment. Come experience Firm Foundation Hoops ‚Äî on us.</span>
                </div>
              </div>

              <div className="book-steps">

                {/* Step 1 ‚Äî Session Type */}
                <div className="book-step">
                  <div className="book-step-header">
                    <div className={`step-num ${bk.session?"done":""}`}>{bk.session?"‚úì":"1"}</div>
                    <div className="book-step-title">Choose a Session Type</div>
                    {bk.session && <div style={{marginLeft:"auto",fontSize:12,color:C.orange,fontWeight:600}}>{SESSIONS.find(s=>s.id===bk.session)?.name}</div>}
                  </div>
                  <div className="book-step-body">
                    <div className="sgrid">
                      {SESSIONS.map(s=>(
                        <div key={s.id} className={`scard ${bk.session===s.id?"sel":""}`} onClick={()=>setBk(p=>({...p,session:s.id}))}>
                          <span className="s-emoji">{s.emoji}</span>
                          <div className="s-info">
                            <div className="s-name">{s.name}</div>
                            <div className="s-desc">{s.desc}</div>
                          </div>
                          <div className="s-price-col">
                            <div className="s-price">{s.price}</div>
                            <small style={{fontSize:11,color:C.muted}}>{s.unit}</small>
                          </div>
                          <div className="chk">‚úì</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 2 ‚Äî Day */}
                <div className="book-step">
                  <div className="book-step-header">
                    <div className={`step-num ${bk.day?"done":""}`}>{bk.day?"‚úì":"2"}</div>
                    <div className="book-step-title">Pick a Day</div>
                    {bk.day && <div style={{marginLeft:"auto",fontSize:12,color:C.orange,fontWeight:600}}>{bk.day}</div>}
                  </div>
                  <div className="book-step-body">
                    <div className="day-strip">
                      {ALL_DAYS.filter(d=>activeDays.includes(d)).map(d=>(
                        <div key={d} className={`day-btn ${bk.day===d?"sel":""}`} onClick={()=>setBk(p=>({...p,day:d}))}>{d}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3 ‚Äî Time */}
                <div className="book-step">
                  <div className="book-step-header">
                    <div className={`step-num ${bk.time?"done":""}`}>{bk.time?"‚úì":"3"}</div>
                    <div className="book-step-title">Pick a Time</div>
                    {bk.time && <div style={{marginLeft:"auto",fontSize:12,color:C.orange,fontWeight:600}}>{bk.time}</div>}
                  </div>
                  <div className="book-step-body">
                    <div className="slot-grid">
                      {SLOTS.map(s=>(
                        <div key={s.t}
                          className={`slot-btn ${s.taken?"taken":""} ${bk.time===s.t&&!s.taken?"sel":""}`}
                          onClick={()=>!s.taken&&setBk(p=>({...p,time:s.t}))}
                        >{s.t}</div>
                      ))}
                    </div>
                    <div style={{fontSize:11,color:C.muted,marginTop:10}}>Grayed out slots are unavailable</div>
                  </div>
                </div>

                {/* Step 4 ‚Äî Contact */}
                <div className="book-step">
                  <div className="book-step-header">
                    <div className="step-num">4</div>
                    <div className="book-step-title">Your Contact Info</div>
                  </div>
                  <div className="book-step-body">
                    <div className="fgrid" style={{marginBottom:14}}>
                      <div className="fgroup"><label>Full Name *</label><input value={bk.name} onChange={e=>setBk(p=>({...p,name:e.target.value}))} placeholder="Your full name" /></div>
                      <div className="fgroup"><label>Phone *</label><input value={bk.phone} onChange={e=>setBk(p=>({...p,phone:e.target.value}))} placeholder="(555) 000-0000" /></div>
                      <div className="fgroup"><label>Email</label><input type="email" value={bk.email} onChange={e=>setBk(p=>({...p,email:e.target.value}))} placeholder="your@email.com" /></div>
                      <div className="fgroup"><label>Notes (optional)</label><input value={bk.notes} onChange={e=>setBk(p=>({...p,notes:e.target.value}))} placeholder="Injuries, goals, questions..." /></div>
                    </div>
                    {bkError && <p style={{color:"#FF6B6B",fontSize:13,marginBottom:12,textAlign:"center"}}>{bkError}</p>}
                    <button className="btn-main-full" onClick={sendBooking} disabled={bkSending} style={{opacity:bkSending?.6:1}}>
                      {bkSending ? "Sending..." : "Request Session ‚Üí"}
                    </button>
                  </div>
                </div>

              </div>
            </>)}
          </div>
        )}

        {/* ‚ïê‚ïê ADMIN ‚ïê‚ïê */}
        {tab==="admin" && (
          <div className="page">
            {!adminAuthed ? (
              <div className="admin-login">
                <div style={{fontSize:40,marginBottom:12}}>üîí</div>
                <h2>Coach Login</h2>
                <p>Enter your password to manage availability.</p>
                <div className="fgroup" style={{textAlign:"left",marginBottom:12}}>
                  <label>Password</label>
                  <input
                    type="password" value={adminPw}
                    onChange={e=>setAdminPw(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&adminLogin()}
                    placeholder="Enter password"
                  />
                </div>
                {adminErr && <p style={{color:"#FF6B6B",fontSize:13,marginBottom:12}}>{adminErr}</p>}
                <button className="btn-main" style={{width:"100%",borderRadius:10}} onClick={adminLogin}>Sign In ‚Üí</button>
                <button className="btn-back" style={{marginTop:12,width:"100%",borderRadius:10,textAlign:"center"}} onClick={()=>setTab("home")}>‚Üê Back to Home</button>
              </div>
            ) : (
              <div className="admin-dash">
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28,flexWrap:"wrap",gap:12}}>
                  <div>
                    <div className="sec-tag">Coach Dashboard</div>
                    <div className="sec-h2" style={{marginBottom:0}}>Manage Availability</div>
                  </div>
                  <button className="admin-logout" onClick={()=>{setAdminAuthed(false);setTab("home");}}>Sign Out</button>
                </div>

                {/* Days */}
                <div className="admin-section">
                  <div className="admin-section-title">üìÖ Available Days</div>
                  <p style={{fontSize:13,color:C.muted,marginBottom:16}}>Tap a day to toggle it on or off for athletes to select.</p>
                  <div className="admin-days">
                    {ALL_DAYS.map(d=>(
                      <div key={d} className={`admin-day ${activeDays.includes(d)?"on":""}`} onClick={()=>toggleDay(d)}>
                        {d}<br/>
                        <span style={{fontSize:9,marginTop:2,display:"block"}}>{activeDays.includes(d)?"ON":"OFF"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Times */}
                <div className="admin-section">
                  <div className="admin-section-title">‚è∞ Available Time Slots</div>
                  <p style={{fontSize:13,color:C.muted,marginBottom:16}}>Toggle time slots on or off. Disabled slots will appear grayed out for athletes.</p>
                  <div className="admin-slots">
                    {ALL_TIMES.map(t=>(
                      <div key={t} className={`admin-slot ${activeTimes.includes(t)?"on":""}`} onClick={()=>toggleTime(t)}>
                        <span className="admin-slot-time">{t}</span>
                        <div className="admin-toggle"/>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-main" style={{width:"100%",borderRadius:12,padding:15,fontSize:15}} onClick={saveAdmin}>
                  Save Changes
                </button>
                {savedNote && <div className="admin-save-note">{savedNote}</div>}
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <footer style={{
          position:"relative",zIndex:1,
          borderTop:`1px solid ${C.border}`,
          padding:"24px 40px",
          display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,
          background:C.card,
        }}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:900,letterSpacing:3,textTransform:"uppercase",color:C.white}}>
            Firm Foundation <span style={{color:C.orange}}>Hoops</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:15,color:C.mutedLight}}>
            <span style={{fontSize:18}}>üìû</span>
            <a href="tel:7273664401" style={{color:C.orange,fontWeight:600,textDecoration:"none",letterSpacing:.5}}>727-366-4401</a>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:15,color:C.mutedLight}}>
            <span style={{fontSize:18}}>‚úâÔ∏è</span>
            <a href="mailto:ffhoops813@gmail.com" style={{color:C.orange,fontWeight:600,textDecoration:"none",letterSpacing:.5}}>ffhoops813@gmail.com</a>
          </div>
          <div style={{fontSize:12,color:C.muted}}>¬© {new Date().getFullYear()} Firm Foundation Hoops. All rights reserved.</div>
          <button className="admin-logout" style={{fontSize:11,padding:"6px 14px"}} onClick={()=>{setTab("admin");setAdminAuthed(false);setAdminPw("");}}>Coach Login</button>
        </footer>

      </div>
    </>
  );
}

