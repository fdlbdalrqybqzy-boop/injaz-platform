// توثيق عربي لملف client/src/pages/Home.tsx.
// هذا الملف جزء من منصة إنجاز، ويحتوي على منطق أو تنسيقات مرتبطة بالمسار client/src/pages/Home.tsx.
// التعليقات داخل الكود توضّح مسؤولية الأجزاء المهمة وتحافظ على سهولة الصيانة.

/**
 * Injaz design reminder: Neo-brutalist digital operations aesthetic.
 * Keep the asymmetric composition, charcoal-blue surfaces, restrained glass layers,
 * Tajawal/IBM Plex Arabic hierarchy, and Injaz Signal Blue #2F8CFF as the action color.
 */
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpLeft,
  ArrowUpRight,
  UserRound,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Gauge,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Network,
  Phone,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const WHATSAPP_NUMBER = "967775882916"; // Replace with Injaz's verified WhatsApp business number.
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function WhatsAppIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06.02C5.52.02.2 5.34.2 11.88c0 2.09.55 4.13 1.59 5.93L.1 23.98l6.31-1.65a11.84 11.84 0 0 0 5.65 1.44h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.14-3.41-8.43ZM12.07 21.7h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.22-3.75.98 1-3.65-.24-.38a9.82 9.82 0 0 1-1.5-5.18C2.2 6.45 6.63 2.02 12.06 2.02c2.63 0 5.1 1.03 6.96 2.89a9.8 9.8 0 0 1 2.88 6.99c0 5.42-4.42 9.8-9.83 9.8Zm5.39-7.36c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46s1.07 2.85 1.22 3.05c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

const navItems = [
  ["الرئيسية", "home"],
  ["من نحن", "about"],
  ["خدماتنا", "services"],
  ["أعمالنا", "work"],
  ["فريقنا", "team"],
  ["تواصل معنا", "contact"],
] as const;

const services = [
  { number: "01", title: "تطوير المواقع الإلكترونية", english: "Web Development", text: "مواقع سريعة ومرنة تمثّل علامتك وتحوّل الزيارات إلى فرص واضحة.", accent: "واجهة ترفع حضورك", image: "/manus-storage/web-development_45f2d778.jpg", imageAlt: "مطور يعمل على حاسوب محاط بشاشات برمجية" },
  { number: "02", title: "تطوير الأنظمة الإدارية", english: "Management Systems", text: "منظومات داخلية تضبط العمليات والصلاحيات وتمنح فريقك رؤية موحدة.", accent: "القرار في مكانه", image: "/manus-storage/management-systems_44a12148.jpg", imageAlt: "واجهة نظام إدارة ملفات وبيانات رقمية على شاشة حاسوب" },
  { number: "03", title: "حلول الأتمتة", english: "Automation Solutions", text: "نربط خطوات العمل المتكررة لتنجز أكثر بوقت أقل وبأخطاء أقل.", accent: "أتمتة بلا تعقيد", image: "/manus-storage/automation_d1865846.jpg", imageAlt: "فريق عمل يناقش حلولًا رقمية وذكاءً اصطناعيًا" },
  { number: "04", title: "لوحات التحكم", english: "Admin Dashboards", text: "بيانات حية وواجهات متابعة تساعدك على فهم الأداء قبل اتخاذ القرار.", accent: "وضوح لحظي", image: "/manus-storage/dashboards_9c0812b1.jpg", imageAlt: "محلل بيانات يراجع مؤشرات أداء ولوحة تحكم" },
  { number: "05", title: "تطبيقات الأعمال المخصصة", english: "Custom Business Apps", text: "نبني أدوات مصممة لطريقة عملك، لا قوالب تفرض عليك طريقة جديدة.", accent: "حل على مقاسك", image: "/manus-storage/custom-apps_445abe96.jpg", imageAlt: "فريق هندسي يتعاون على تطوير تطبيقات أعمال" },
];

const projectFilters = [
  { id: "all", label: "الكل" },
  { id: "web", label: "تطوير المواقع" },
  { id: "systems", label: "تطوير الأنظمة" },
  { id: "dashboards", label: "لوحات التحكم" },
  { id: "automation", label: "حلول الأتمتة" },
  { id: "apps", label: "تطبيقات مخصصة" },
] as const;

const projects = [
  { id: "insight", category: "dashboards", categoryLabel: "لوحات التحكم", title: "لوحة تحكم تحليلات لحظية", description: "رؤية فورية للأداء والمبيعات تساعد الفريق على اتخاذ القرار في الوقت المناسب.", tags: ["React", "Node.js", "WebSocket"], metric: "+68%", metricLabel: "تفاعل المستخدم", image: "/manus-storage/injaz-dashboard-preview_307ca07f.png" },
  { id: "operations", category: "systems", categoryLabel: "تطوير الأنظمة", title: "منظومة إدارة الأعمال", description: "نظام موحد يربط الموارد والمبيعات والتقارير ضمن مسار تشغيلي واضح.", tags: ["Laravel", "MySQL", "Redis"], metric: "360°", metricLabel: "رؤية تشغيلية", image: "/manus-storage/injaz-automation-orbit_7c8838d0.png" },
  { id: "portal", category: "web", categoryLabel: "تطوير المواقع", title: "بوابة خدمات رقمية", description: "تجربة ويب خفيفة تربط العميل بالخدمة وتبني رحلة قابلة للقياس.", tags: ["Next.js", "API", "Tailwind"], metric: "+42%", metricLabel: "سرعة الوصول", image: "/manus-storage/injaz-hero-grid_2b156a36.png" },
  { id: "workflow", category: "automation", categoryLabel: "حلول الأتمتة", title: "أتمتة مسار المعاملات", description: "تحويل الخطوات المتكررة إلى تدفق ذكي يقلل وقت المتابعة والأخطاء.", tags: ["Node.js", "PostgreSQL", "n8n"], metric: "-42%", metricLabel: "وقت المتابعة", image: "/manus-storage/automation_d1865846.jpg" },
  { id: "custom", category: "apps", categoryLabel: "تطبيقات مخصصة", title: "تطبيق عمليات ميدانية", description: "أداة مخصصة تمنح الفرق الميدانية بياناتها وإجراءاتها في متناول اليد.", tags: ["React Native", "PHP", "MySQL"], metric: "24/7", metricLabel: "تشغيل مستمر", image: "/manus-storage/custom-apps_445abe96.jpg" },
];

const team = [
  { name: "فضل مثنى", role: "", roleAr: "الرئيس التنفيذي والمؤسس", bio: "يقود رؤية إنجاز الاستراتيجية، بخبرة في بناء المنتجات الرقمية وإدارة الحلول التقنية وقيادة فرق البرمجة.", image: "/fadhel.jpg", imageAlt: "فضل مثنى، الرئيس التنفيذي والمؤسس لمنصة إنجاز", founder: true },
  { name: "فريق الواجهة", role: "Frontend Developer", roleAr: "مطور واجهات أمامية", bio: "يصمم تجارب واضحة وسريعة تحوّل الأفكار إلى واجهات قابلة للاستخدام.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85", imageAlt: "عضوة في فريق تطوير الواجهات", founder: false },
  { name: "فريق الأنظمة", role: "Backend Developer", roleAr: "مطور أنظمة خلفية", bio: "يبني منطقاً موثوقاً وواجهات برمجية تربط كل عملية ببياناتها.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85", imageAlt: "عضو في فريق تطوير الأنظمة الخلفية", founder: false },
  { name: "فريق الحلول", role: "System Architect", roleAr: "مهندس معمارية أنظمة", bio: "يرسم خريطة تقنية تنمو مع أعمالك وتبقى سهلة الفهم والإدارة.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85", imageAlt: "عضو في فريق معمارية الأنظمة", founder: false },
];

const routeFor = (id: string) => id === "home" ? "/" : `/${id}`;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const reduceMotion = useReducedMotion();
  const filteredProjects = useMemo(() => selectedFilter === "all" ? projects : projects.filter((project) => project.category === selectedFilter), [selectedFilter]);
  const activePage = location === "/" ? "home" : location.replace(/^\//, "");

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("أكمل الاسم والبريد الإلكتروني والرسالة أولاً.");
      return;
    }
    const message = `مرحباً إنجاز، أنا ${form.name}.\nالبريد الإلكتروني: ${form.email}\nرقم الجوال: ${form.phone || "غير مذكور"}\nالموضوع: ${form.subject || "طلب تواصل"}\nالرسالة: ${form.message}`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    toast.success("تم تجهيز رسالتك لفتح محادثة WhatsApp.");
  };

  const reveal = { initial: { opacity: 0, y: reduceMotion ? 0 : 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-70px" }, transition: { duration: 0.55 } };

  return (
    <div dir="rtl" className={`min-h-screen overflow-x-hidden selection:bg-[#2F8CFF] selection:text-white page-${activePage}`}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#07111f]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="group flex items-center gap-3" aria-label="إنجاز، الرئيسية">
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-[#2F8CFF]/50 bg-[#0b1a2c] shadow-[0_0_25px_rgba(47,140,255,.18)]">
              <img src="/manus-storage/injaz-mark_1f0c2724.png" alt="" className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="leading-none"><strong className="block text-lg font-extrabold tracking-tight text-white">إنجاز</strong><small className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6faeff]">INJAZ / SYSTEMS</small></span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
            {navItems.map(([label, id]) => <a key={id} href={routeFor(id)} onClick={(e) => { e.preventDefault(); navigate(routeFor(id)); }} className="text-sm text-slate-400 transition-colors hover:text-white">{label}</a>)}
          </nav>
          <button onClick={() => navigate(routeFor("contact"))} className="hidden items-center gap-2 rounded-lg bg-[#2F8CFF] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_25px_rgba(47,140,255,.24)] transition hover:bg-[#57a3ff] active:scale-[.97] sm:flex">اطلب خدمتك <ArrowUpLeft size={16} /></button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-white/10 p-2 text-slate-200 lg:hidden" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {menuOpen && <nav className="border-t border-white/10 bg-[#091727] px-5 py-4 lg:hidden">{navItems.map(([label, id]) => <a key={id} href={routeFor(id)} onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigate(routeFor(id)); }} className="block border-b border-white/[0.06] py-3 text-sm text-slate-300 last:border-0">{label}</a>)}</nav>}
      </header>

      <main>
        <section id="home" className="relative isolate min-h-[760px] overflow-hidden border-b border-white/[0.08] pt-28 lg:min-h-[820px] lg:pt-36">
          <img src="/manus-storage/injaz-hero-grid_2b156a36.png" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-65" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#07111f_0%,rgba(7,17,31,.88)_33%,rgba(7,17,31,.25)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_44%,rgba(47,140,255,.19),transparent_28%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8 lg:pb-32">
            <motion.div {...reveal} className="max-w-2xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2F8CFF]/35 bg-[#0b1c31]/75 px-3 py-1.5 text-sm font-bold text-[#b7d8ff]"><Sparkles size={15} className="text-[#8fc4ff]" /> وكالة برمجة احترافية</div>
              <p className="mb-5 font-mono text-xs tracking-[0.22em] text-[#5da6ff]">DIGITAL SOLUTIONS / ADEN &amp; YEMEN</p>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-[76px]">نبني حلولاً رقمية<br /><span className="text-[#2F8CFF]">احترافية للشركات في عدن واليمن</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-9 text-slate-300">في إنجاز نساعد الشركات والمحلات والمكاتب في عدن واليمن على بناء مواقع وأنظمة إدارية ومتاجر إلكترونية وحلول أتمتة تجذب العملاء وتنظم العمل وتزيد المبيعات.</p><p className="mt-4 text-base font-bold text-[#8fc4ff]">إنجاز... كل شيء يبدأ بضغطة.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><button onClick={() => navigate(routeFor("contact"))} className="group inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-l from-[#7c3aed] to-[#2F8CFF] px-6 py-3.5 font-bold text-white shadow-[0_15px_40px_rgba(47,140,255,.25)] transition hover:brightness-110 active:scale-[.97]">ابدأ مشروعك الآن <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /></button><button onClick={() => navigate(routeFor("work"))} className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/[0.04] px-6 py-3.5 font-bold text-white transition hover:border-[#8fc4ff]/70 hover:bg-white/10">شاهد أعمالنا <ArrowLeft size={18} /></button></div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-xs text-slate-400"><span><b className="font-mono text-base text-white">+50</b> مشروع منجز</span><span><b className="font-mono text-base text-white">+30</b> عميل سعيد</span><span><b className="font-mono text-base text-white">5★</b> تقييم العملاء</span></div>
            </motion.div>
            <motion.div {...reveal} transition={{ duration: .6, delay: .12 }} className="relative mx-auto w-full max-w-[540px] lg:mr-auto lg:ml-0">
              <div className="absolute -inset-8 rounded-full bg-[#2F8CFF]/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#091827]/75 p-3 shadow-2xl backdrop-blur-xl"><div className="rounded-xl border border-white/[0.08] bg-[#0b1c2d] p-4 sm:p-5"><div className="mb-5 flex items-center justify-between border-b border-white/[0.08] pb-4"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#2F8CFF]" /><span className="font-mono text-[10px] tracking-widest text-slate-400">INJAZ / CONTROL ROOM</span></div><span className="font-mono text-[10px] text-emerald-400">● LIVE</span></div><div className="grid grid-cols-3 gap-2"><div className="col-span-2 rounded-lg border border-[#2F8CFF]/25 bg-[#102843] p-3"><div className="flex justify-between text-[10px] text-slate-400"><span>PROJECT FLOW</span><span className="text-[#75b6ff]">+24.8%</span></div><div className="mt-5 flex h-20 items-end gap-1.5">{[32,44,38,62,53,77,68,92,82,100,88,108].map((height, i) => <span key={i} style={{ height: `${height * .65}px` }} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#2F8CFF] to-[#8bc7ff]/50" />)}</div></div><div className="rounded-lg border border-white/10 bg-[#0e2135] p-3"><div className="text-[10px] text-slate-500">STATUS</div><div className="mt-4 text-2xl font-bold text-white">08</div><div className="mt-1 text-[10px] text-emerald-400">systems online</div></div></div><div className="mt-2 grid grid-cols-2 gap-2"><div className="rounded-lg border border-white/10 bg-[#0e2135] p-3"><div className="flex items-center gap-2 text-[10px] text-slate-500"><Network size={13} className="text-[#5da6ff]" /> AUTOMATION MAP</div><div className="mt-5 flex items-center justify-between"><span className="h-3 w-3 rounded-full bg-[#2F8CFF] shadow-[0_0_15px_#2F8CFF]" /><span className="h-px w-10 bg-[#2F8CFF]/50" /><span className="h-3 w-3 rounded-full bg-cyan-300" /><span className="h-px w-10 bg-cyan-300/40" /><span className="h-3 w-3 rounded-full bg-white/70" /></div></div><div className="rounded-lg border border-white/10 bg-[#0e2135] p-3"><div className="text-[10px] text-slate-500">RESPONSE TIME</div><div className="mt-3 font-mono text-xl text-white">120<span className="text-xs text-slate-500">ms</span></div><div className="mt-2 h-1 rounded-full bg-white/10"><span className="block h-full w-3/4 rounded-full bg-[#2F8CFF]" /></div></div></div><div className="mt-3 flex items-center justify-between rounded-lg border border-[#2F8CFF]/20 bg-[#0b1b2c] px-3 py-2 text-[10px] text-slate-400"><span className="font-mono">deploy_pipeline</span><span className="flex items-center gap-1 text-emerald-400"><Check size={13} /> stable</span></div></div></div><div className="absolute -bottom-5 -right-5 rounded-lg border border-white/15 bg-[#10243a] px-4 py-3 shadow-xl"><div className="font-mono text-[9px] text-slate-500">NEXT MILESTONE</div><div className="mt-1 text-sm font-bold text-white">وضوح أكبر.</div></div></motion.div>
          </div>
        </section>

        <section id="about" className="light-section border-b border-slate-200 bg-white py-24 text-slate-900 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-8"><motion.div {...reveal}><div className="section-kicker">01 / ABOUT INJAZ</div><h2 className="section-title mt-5">تقنية تفهم<br /><span>إيقاع عملك.</span></h2></motion.div><motion.div {...reveal} transition={{ duration: .55, delay: .1 }} className="max-w-2xl lg:pt-8"><p className="text-2xl font-medium leading-[1.65] text-slate-200">في إنجاز، لا نبدأ من التقنية. نبدأ من السؤال: <span className="text-[#5da6ff]">ما الذي يجب أن يصبح أسهل؟</span></p><p className="mt-7 leading-8 text-slate-400">نحن وكالة حلول تقنية من عدن، نساعد الشركات والفرق الطموحة على بناء أنظمة رقمية عالية الجودة، وأتمتة العمليات، وتحويل البيانات المتفرقة إلى خطوات يمكن إدارتها. نعمل بوضوح من أول خريطة إلى آخر سطر كود.</p><div className="mt-9 grid gap-3 sm:grid-cols-3"><div className="glass-stat"><ShieldCheck size={19} className="text-[#5da6ff]" /><b>ثقة</b><span>بنية تستمر</span></div><div className="glass-stat"><Cpu size={19} className="text-[#5da6ff]" /><b>مرونة</b><span>حلول تتطور</span></div><div className="glass-stat"><Sparkles size={19} className="text-[#5da6ff]" /><b>أثر</b><span>نتيجة تُرى</span></div></div></motion.div></div></section>

        <section id="services" className="light-section bg-white py-24 text-slate-900 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><motion.div {...reveal} className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="section-kicker">02 / CAPABILITIES</div><h2 className="section-title mt-5">الخدمة المناسبة<br /><span>للمشكلة الحقيقية.</span></h2></div><p className="max-w-sm text-sm leading-7 text-slate-400">من واجهة رقمية أنيقة إلى نظام داخلي كامل، نجمع التفكير التصميمي مع الهندسة العملية.</p></motion.div><div className="mb-8 grid gap-3 lg:grid-cols-6"><div className="rounded-xl border border-[#2F8CFF]/20 bg-[#0b1d31] p-5 lg:col-span-2"><div className="flex items-center justify-between"><span className="font-mono text-[10px] tracking-[.18em] text-[#5da6ff]">OPERATIONS / MAP</span><span className="flex items-center gap-1 font-mono text-[9px] text-emerald-400"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> READY</span></div><div className="mt-5 flex items-center gap-2"><span className="bracket-mark">{"{"}</span><div className="h-px flex-1 bg-gradient-to-l from-[#2F8CFF] to-transparent" /><span className="signal-dot" /><div className="h-px flex-1 bg-gradient-to-r from-[#2F8CFF] to-transparent" /><span className="bracket-mark">{"}"}</span></div><p className="mt-5 text-sm leading-7 text-slate-400">نربط الاستراتيجية بالواجهة، والواجهة بالبيانات، والبيانات بقرار يمكن تنفيذه.</p></div><div className="grid grid-cols-3 gap-2 lg:col-span-4"><div className="rounded-xl border border-white/10 bg-[#0b1a2b] p-4"><span className="font-mono text-[10px] text-slate-500">BUILD</span><b className="mt-3 block font-mono text-2xl text-white">05</b><span className="text-[11px] text-slate-500">مسارات خدمة</span></div><div className="rounded-xl border border-white/10 bg-[#0b1a2b] p-4"><span className="font-mono text-[10px] text-slate-500">CONNECT</span><b className="mt-3 block font-mono text-2xl text-white">API</b><span className="text-[11px] text-slate-500">منظومة مترابطة</span></div><div className="rounded-xl border border-white/10 bg-[#0b1a2b] p-4"><span className="font-mono text-[10px] text-slate-500">SHIP</span><b className="mt-3 block font-mono text-2xl text-[#5da6ff]">∞</b><span className="text-[11px] text-slate-500">قابلية للنمو</span></div></div></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">{services.map((service, index) => <motion.article key={service.number} {...reveal} transition={{ duration: .45, delay: index * .06 }} className={`service-card group ${index === 0 ? "lg:col-span-2" : index === 1 ? "lg:col-span-2" : "lg:col-span-1"}`}><img src={service.image} alt={service.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="service-card-overlay" /><div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between"><div className="flex items-start justify-between"><span className="rounded border border-white/20 bg-[#07111f]/45 px-2 py-1 font-mono text-[10px] tracking-[.18em] text-[#b9dcff] backdrop-blur-sm">SERVICE / {service.number}</span><span className="font-mono text-xs text-white/60">{service.number}</span></div><div><p className="font-mono text-[10px] tracking-wide text-[#9dceff]">{service.english}</p><h3 className="mt-3 text-xl font-bold leading-8 text-white">{service.title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-slate-200/85">{service.text}</p><div className="mt-7 flex items-center justify-between border-t border-white/20 pt-4 text-xs text-slate-200/75"><span>{service.accent}</span><ArrowUpLeft size={15} className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" /></div></div></div></motion.article>)}</div></div></section>

        <section id="work" className="light-section work-showcase border-y border-slate-200 bg-white py-24 text-slate-900 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><motion.div {...reveal} className="mb-10 flex flex-col gap-7"><div className="max-w-2xl"><div className="section-kicker">03 / OUR PROJECTS</div><h2 className="section-title mt-5">مشاريع <span className="work-gradient">نفخر بها</span></h2><p className="mt-5 max-w-xl text-base leading-8 text-slate-500">نخبة من المشاريع التي عملنا عليها مع عملائنا في مختلف القطاعات.</p></div><div className="work-filters" role="tablist" aria-label="فلترة المشاريع">{projectFilters.map((filter) => <button key={filter.id} type="button" role="tab" aria-selected={selectedFilter === filter.id} onClick={() => setSelectedFilter(filter.id)} className={`work-filter ${selectedFilter === filter.id ? "is-active" : ""}`}>{filter.label}</button>)}</div></motion.div><div className="work-project-grid">{filteredProjects.map((project, index) => <motion.article key={project.id} {...reveal} transition={{ duration: .45, delay: index * .06 }} className="project-card"><div className="project-card-media"><img src={project.image} alt={project.title} loading="lazy" /><div className="project-card-shade" /><span className="project-category">{project.categoryLabel}</span><span className="project-index">0{index + 1}</span></div><div className="project-card-body"><div className="flex items-start justify-between gap-4"><div><h3>{project.title}</h3><p>{project.description}</p></div><span className="project-metric">{project.metric}</span></div><div className="project-card-footer"><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="project-metric-label">{project.metricLabel}</span></div></div></motion.article>)}</div>{filteredProjects.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500">لا توجد مشاريع ضمن هذا التصنيف حالياً.</div>}</div></section>

        <section id="team" className="team-section" dir="rtl"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><motion.div {...reveal} className="team-section-heading"><div className="section-kicker">04 / THE TEAM</div><h2 className="team-section-title mt-5">العقول خلف<br /><span>الإنجاز الحقيقي.</span></h2><p>فريق صغير بخبرات عملية، يعمل على تحويل الأهداف المعقدة إلى منتجات رقمية مفهومة وقابلة للنمو.</p></motion.div><div className="team-grid">{team.map((member, index) => <motion.article key={member.name} {...reveal} transition={{ duration: .45, delay: index * .07 }} className={`team-card team-card-light ${member.founder ? "team-card-founder" : ""}`}><div className="team-card-topline"><span>INJAZ / 0{index + 1}</span><span className="team-status"><i /> متاح للعمل</span></div><div className="team-avatar-wrap"><img src={member.image} alt={member.imageAlt} className="team-avatar" loading={index > 0 ? "lazy" : "eager"} /></div><div className="team-card-copy"><h3>{member.name}</h3><p className="team-role-ar">{member.roleAr}</p>{member.role && <p className="team-role-en">{member.role}</p>}<p className="team-bio">{member.bio}</p></div><div className="team-socials" aria-label={`روابط ${member.name}`}><a href="#" aria-label={`${member.name} على LinkedIn`} title="LinkedIn"><Linkedin size={16} /></a><a href="#" aria-label={`${member.name} على X`} title="X"><X size={16} /></a><a href="#" aria-label={`${member.name} على GitHub`} title="GitHub"><Code2 size={16} /></a></div></motion.article>)}</div></div></section>

        <section id="contact" dir="rtl" className="contact-section relative overflow-hidden border-t border-slate-200 bg-[#f6f9fc] py-24 text-slate-900 lg:py-32">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#2F8CFF]/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div {...reveal} className="mb-12 max-w-3xl">
              <div className="section-kicker">05 / START YOUR PROJECT</div>
              <h2 className="section-title mt-5">ابدأ مشروعك<br /><span>بخطوة واضحة.</span></h2>
              <p className="mt-7 max-w-2xl leading-8 text-slate-400">أرسل لنا تفاصيل فكرتك، وسنرتب معك الخطوة التالية ببساطة ووضوح. املأ النموذج أو تواصل معنا مباشرة عبر القنوات المتاحة.</p>
            </motion.div>
            <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
              <motion.div {...reveal} transition={{ duration: .55, delay: .05 }} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <a href="mailto:info@injaz.online" className="contact-card group"><span className="contact-card-icon"><Mail size={19} /></span><span><small>البريد الإلكتروني</small><strong>info@injaz.online</strong></span><ArrowUpLeft size={17} className="contact-card-arrow" /></a>
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="contact-card group"><span className="contact-card-icon"><Phone size={19} /></span><span><small>رقم الجوال</small><strong dir="ltr">+967 775 882 916</strong></span><ArrowUpLeft size={17} className="contact-card-arrow" /></a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="contact-card contact-card-whatsapp group"><span className="contact-card-icon"><WhatsAppIcon size={19} /></span><span><small>تواصل سريع</small><strong dir="ltr">WhatsApp / 967 775 882 916</strong></span><ArrowUpLeft size={17} className="contact-card-arrow" /></a>
                  <div className="contact-card"><span className="contact-card-icon"><Database size={19} /></span><span><small>العنوان</small><strong>اليمن - عدن</strong></span><span className="signal-dot mr-auto" /></div>
                </div>
                <div className="request-note"><div className="flex items-center justify-between font-mono text-[10px] tracking-[.16em] text-slate-500"><span>INJAZ / REQUEST DESK</span><span className="flex items-center gap-1 text-emerald-600"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ONLINE</span></div><p className="mt-4 text-sm leading-7 text-slate-600">لا تحتاج إلى تجهيز عرض كامل. يكفينا أن نعرف ما الذي تريد أن يصبح أسهل.</p></div>
              </motion.div>
              <motion.form {...reveal} transition={{ duration: .55, delay: .1 }} onSubmit={handleSubmit} className="contact-form rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,.12)] sm:p-8">
                <div className="mb-7 flex items-start justify-between gap-4"><div><h3 className="text-xl font-bold text-white">أرسل رسالتك</h3><p className="mt-1 text-xs text-slate-400">سنراجع التفاصيل ونتواصل معك عبر WhatsApp.</p></div><Send size={21} className="text-[#5da6ff]" /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="field-label">الاسم الكامل *<span className="field-with-icon"><UserRound size={16} /><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="اكتب اسمك الكامل" className="field-input" /></span></label>
                  <label className="field-label">البريد الإلكتروني *<span className="field-with-icon"><Mail size={16} /><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@example.com" className="field-input" dir="ltr" /></span></label>
                  <label className="field-label">رقم الجوال<span className="field-with-icon"><Phone size={16} /><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+967 ..." className="field-input" dir="ltr" /></span></label>
                  <label className="field-label">الموضوع<span className="field-with-icon"><Layers3 size={16} /><input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="كيف يمكننا مساعدتك؟" className="field-input" /></span></label>
                  <label className="field-label sm:col-span-2">رسالتك *<span className="field-with-icon items-start"><Send size={16} className="mt-3" /><textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="اكتب تفاصيل مشروعك أو سؤالك هنا..." className="field-input min-h-36 resize-y" /></span></label>
                </div>
                <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-l from-[#2F8CFF] via-[#3d9bff] to-[#6b5cff] px-5 py-4 font-bold text-white shadow-[0_15px_40px_rgba(47,140,255,.24)] transition hover:brightness-110 active:scale-[.99]">{submitted ? <><Check size={18} /> تم تجهيز رسالتك</> : <>إرسال الرسالة <ArrowLeft size={18} /></>}</button>
                <p className="mt-4 text-center text-[11px] leading-6 text-slate-400">بالضغط على الإرسال سيتم تجهيز رسالة WhatsApp بالبيانات التي أدخلتها.</p>
              </motion.form>
            </div>
          </div>
        </section>

        <section className="footer-light border-t border-slate-200 bg-[#f8fafc] py-16 text-slate-900 lg:py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="footer-light-cta mb-12 flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><p className="font-mono text-[10px] tracking-[.2em] text-emerald-700">DIRECT CHANNEL / WHATSAPP</p><h3 className="mt-3 text-2xl font-extrabold text-slate-900">لنبدأ الحديث عن خطوتك التالية.</h3><p className="mt-2 text-sm text-slate-600">تواصل معنا مباشرة وسنعود إليك بتوجيه عملي واضح.</p></div><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-xl bg-[#1fc56d] px-5 py-3 font-bold text-white shadow-[0_12px_30px_rgba(31,197,109,.25)] transition hover:bg-[#2ddc7d] active:scale-[.97]"><WhatsAppIcon size={22} /> تواصل عبر واتساب 775882916 967+</a></div><div className="grid gap-10 border-b border-slate-200 pb-12 md:grid-cols-[1.2fr_.8fr_.9fr]"><div><a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="inline-flex items-center gap-3" aria-label="إنجاز، الرئيسية"><span className="grid h-12 w-12 place-items-center rounded-xl border border-blue-200 bg-blue-50"><img src="/manus-storage/injaz-mark_1f0c2724.png" alt="" className="h-8 w-8 object-contain" /></span><span><strong className="block text-xl font-extrabold text-slate-900">إنجاز</strong><small className="font-mono text-[10px] tracking-[.24em] text-[#6faeff]">INJAZ / SYSTEMS</small></span></a><p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">نحوّل التعقيد إلى أنظمة واضحة، وأتمتة عملية، وتجارب رقمية تنجز أكثر.</p><div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3" aria-label="روابط التواصل الاجتماعي"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp" className="social-link social-link-whatsapp"><WhatsAppIcon size={17} /></a><a href="https://www.linkedin.com/in/%D9%81%D8%B6%D9%84-%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D9%82%D9%8A%D8%A8-%D9%82%D8%B2%D9%8A%D8%B9-1466a742b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="social-link"><Linkedin size={17} /></a><a href="#" aria-label="X" title="X" className="social-link"><X size={17} /></a><a href="https://www.instagram.com/fdl__10?igsi=MW02bmZrZnh2eDd6Nw==" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram" className="social-link"><Instagram size={17} /></a></div></div><div><p className="footer-heading">روابط سريعة</p><nav className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-slate-700">{navItems.map(([label, id]) => <a key={id} href={routeFor(id)} onClick={(e) => { e.preventDefault(); navigate(routeFor(id)); }} className="transition hover:text-[#2563eb]">{label}</a>)}</nav></div><div><p className="footer-heading">تواصل معنا</p><div className="space-y-4 text-sm"><a href="mailto:info@injaz.online" className="flex items-center gap-3 text-slate-700 transition hover:text-[#2563eb]"><Mail size={16} className="text-[#5da6ff]" /> info@injaz.online</a><a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-3 text-slate-700 transition hover:text-[#2563eb]"><Phone size={16} className="text-[#2563eb]" /> <bdi dir="ltr" className="phone-ltr">+967 775 882 916</bdi></a><div className="flex items-center gap-3 text-slate-700"><Database size={16} className="text-[#5da6ff]" /> اليمن - عدن</div></div></div></div><div className="flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 إنجاز Injaz - جميع الحقوق محفوظة</p><span className="font-mono tracking-widest">INJAZ / ADEN / YE</span></div></div></section>
      </main>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب 775882916 967+" className="floating-whatsapp fixed bottom-5 left-5 z-40 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#1fc56d] px-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(31,197,109,.3)] transition hover:scale-105 hover:bg-[#2ddc7d] active:scale-[.97] sm:px-5"><WhatsAppIcon size={21} /> <span className="hidden sm:inline">تواصل عبر واتساب 775882916 967+</span></a>
    </div>
  );
}
