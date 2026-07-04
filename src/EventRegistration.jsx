import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays, MapPin, Star, ChevronDown, Eye, Target, Lightbulb,
  GraduationCap, Briefcase, Building2, Users, Landmark, BookOpen, Rocket, Mic,
  Award, CheckCircle2, Wrench, Globe, Shield,
  DollarSign, CreditCard, Copy, Check, MessageCircle, Phone, Menu, X
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// ─── Images ───────────────────────────────────────────────────────────────────
const HERO_IMG    = "https://media.base44.com/images/public/6a497294003dabe88a0462c3/891e572d0_generated_f4266b09.png";
const DETAIL_IMG  = "https://media.base44.com/images/public/6a497294003dabe88a0462c3/08d72ae75_generated_a232d39d.png";
const CONF_IMG    = "https://media.base44.com/images/public/6a497294003dabe88a0462c3/33a29a5f9_generated_d9504bb8.png";
const CIRCLES_IMG = "https://media.base44.com/images/public/6a497294003dabe88a0462c3/9dd48fc43_generated_58f95a0e.png";
const SEAL_IMG    = "https://media.base44.com/images/public/6a497294003dabe88a0462c3/743ea9491_generated_fe29f921.png";

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "الرئيسية", href: "#hero" },
  { label: "لماذا البرنامج", href: "#vision" },
  { label: "المحاور", href: "#program" },
  { label: "المدرب", href: "#trainer" },
  { label: "التسجيل", href: "#registration" }
];

const AXES = [
  { num: "01", title: "فلسفة Investrade", subtitle: "من الاقتصاد التقليدي إلى اقتصاد الفرص", items: ["لماذا فشلت كثير من المبادرات؟", "مفهوم الفرص الضائعة", "كيف تُولد الفرص؟", "فلسفة Business Circles", "مفهوم القيمة المضافة", "اقتصاد المجتمعات الرقمية"] },
  { num: "02", title: "ثقافة Investrade", subtitle: "المحور الرئيسي للبرنامج", highlight: true, items: ["الانتقال من ردة الفعل إلى صناعة المستقبل", "من إدارة الأعمال إلى إدارة الفرص", "من العمل الفردي إلى المجتمعات الذكية", "من المنظمات المغلقة إلى النظم البيئية المتكاملة"], pillars: ["التفكير بالفرص قبل المشكلات", "الاستشراف قبل اتخاذ القرار", "اليقظة الإستراتيجية", "الشراكات الذكية", "بناء المجتمعات", "الذكاء الاصطناعي المساند للقرار", "الشفافية", "التعلم المستمر", "القيادة التشاركية", "صناعة الأثر"] },
  { num: "03", title: "اليقظة الإستراتيجية", items: ["مراقبة البيئة الخارجية", "رصد الاتجاهات العالمية", "تحليل المنافسين", "تحليل الابتكار", "رصد التقنيات الجديدة", "تحليل الأسواق", "قراءة الإشارات الضعيفة", "بناء نظام إنذار مبكر"] },
  { num: "04", title: "الاستشراف الإستراتيجي", items: ["السيناريوهات المستقبلية", "تحليل الاتجاهات", "التخطيط طويل المدى", "استشراف المخاطر", "تحليل الفرص", "بناء المؤسسات المرنة"] },
  { num: "05", title: "قيادة التغيير", subtitle: "وفق أفضل الممارسات العالمية", items: ["مقاومة التغيير", "بناء ثقافة التغيير", "قيادة فرق التحول", "إدارة أصحاب المصلحة", "الاتصال أثناء التغيير", "قياس نجاح التغيير"] },
  { num: "06", title: "تحليل الاتجاهات العالمية", items: ["الاقتصاد الرقمي", "الذكاء الاصطناعي", "الاقتصاد الأخضر", "ESG", "العمل عن بعد", "اقتصاد المنصات", "الاقتصاد التشاركي", "اقتصاد المبدعين (Creator Economy)", "اقتصاد المجتمعات (Community Economy)"] },
  { num: "07", title: "الذكاء الاصطناعي وصناعة القرار", items: ["أدوات AI", "AI Agents", "تحليل البيانات", "التنبؤ", "اتخاذ القرار", "الأتمتة", "AI Governance", "Artificial Wisdom"] },
  { num: "08", title: "Business Circles", subtitle: "قلب البرنامج", highlight: true, items: ["مفهوم الدائرة", "بناء المجتمع", "نمو المجتمع", "إدارة المجتمع", "تحفيز التفاعل", "خلق القيمة", "إدارة أصحاب المصلحة", "تحقيق الدخل", "بناء الثقة", "استدامة المجتمع"] },
  { num: "09", title: "اقتصاد الفرص", subtitle: "كيف نحوّل", items: ["الفكرة إلى مشروع", "المشروع إلى مجتمع", "المجتمع إلى اقتصاد"] },
  { num: "10", title: "صناعة الأثر", items: ["نظرية التغيير", "قياس الأثر", "الأثر الاقتصادي", "الأثر الاجتماعي", "مؤشرات الأداء", "الاستدامة"] },
  { num: "11", title: "مهارات المدرب العالمي", items: ["تصميم البرامج", "العرض الاحترافي", "Storytelling", "Facilitation", "التدريب الرقمي", "التدريب بالذكاء الاصطناعي", "إدارة النقاش", "بناء ورش العمل"] },
  { num: "12", title: "إنشاء إدارة ثقافة Investrade داخل المؤسسات", subtitle: "المحور الذي يميز البرنامج عن أي برنامج آخر — Investrade Culture Office (ICO)", highlight: true, items: [] }
];

const AUDIENCES = [
  { icon: GraduationCap, label: "المدربون المحترفون" },
  { icon: Briefcase, label: "المستشارون" },
  { icon: Landmark, label: "القيادات الحكومية" },
  { icon: Building2, label: "القيادات التنفيذية" },
  { icon: Users, label: "أعضاء مجالس الإدارة" },
  { icon: Building2, label: "رؤساء الغرف التجارية" },
  { icon: BookOpen, label: "الجامعات" },
  { icon: Rocket, label: "حاضنات الأعمال" },
  { icon: Users, label: "مسؤولو الموارد البشرية" },
  { icon: Briefcase, label: "مدراء التطوير المؤسسي" },
  { icon: Rocket, label: "رواد الأعمال" },
  { icon: Mic, label: "المؤثرون وقادة المجتمعات" }
];

const OUTCOMES = ["تدريب المؤسسات على ثقافة Investrade", "تأسيس دوائر Investrade داخل المؤسسات", "قيادة برامج التغيير", "تدريب القيادات", "الإشراف على بناء المجتمعات الرقمية", "تمثيل Investraders محلياً ودولياً"];
const TOOLS = ["محاكاة تفاعلية (Simulation)", "لعب أدوار (Role Play)", "تحليل حالات واقعية", "مختبرات الذكاء الاصطناعي", "ورش تصميم دوائر الأعمال", "مشاريع جماعية", "جلسات عصف ذهني", "تدريب عملي على منصة Investraders", "استخدام أدوات تحليل الاتجاهات واليقظة الإستراتيجية"];
const PROJECT_ITEMS = ["رؤية ورسالة الإدارة", "الهيكل التنظيمي", "مؤشرات الأداء", "خارطة أصحاب المصلحة", "خطة إنشاء دوائر المؤسسة", "برنامج نشر الثقافة", "خارطة الطريق للتنفيذ خلال ١٢ شهراً"];
const ICO_MISSION = ["الفرص", "التعاون", "الابتكار", "المجتمعات", "الاستثمار", "الذكاء الاصطناعي", "الاستدامة"];
const ICO_TASKS = ["نشر ثقافة Investrade", "إنشاء دوائر المؤسسة", "إدارة مجتمعات أصحاب المصلحة", "تطوير الشَراكات", "مراقبة الاتجاهات", "تحليل الفرص", "تدريب الموظفين", "بناء شبكة العلاقات", "قيادة مبادرات الابتكار", "قياس الأثر"];
const BANK_DETAILS = { bank: "Zitouna Bank", address: "Boulevard Qualité de la Vie 2015 Le Kram, Tunisia", iban: "TN 59 25 000 000 0000517460 14", swift: "BZITTNTT" };
const INCLUDES = ["توصيل VIP من وإلى المطار", "استراحات قهوة فاخرة", "مواد التدريب", "بطاقة عضوية الإمتياز", "شهادة تفويض Authorization لممارسة التدريب باسم Investraders", "شهادة ختم التدريب"];

// ─── Animation variant ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } })
};

// ─── Sub-components ────────────────────────────────────────────────────────────
function AxisCard({ axis, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`border rounded-xl overflow-hidden transition-all duration-500 ${axis.highlight ? "border-gold/30 bg-gradient-to-r from-gold/[0.04] to-transparent" : "border-white/[0.06] bg-white/[0.02]"} ${isOpen ? "border-gold/40" : ""}`}
    >
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 md:p-6 text-right hover:bg-white/[0.02] transition-colors">
        <span className="font-mono text-sm text-cyan-data/60 shrink-0">{axis.num}</span>
        <div className="flex-1 min-w-0">
          <h3 className={`font-heading font-bold text-base md:text-lg ${axis.highlight ? "text-gold" : "text-platinum"}`}>{axis.title}</h3>
          {axis.subtitle && <p className="text-platinum/40 text-sm mt-1 truncate">{axis.subtitle}</p>}
        </div>
        {axis.items.length > 0 && <ChevronDown className={`w-5 h-5 text-platinum/30 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-gold" : ""}`} />}
      </button>
      <AnimatePresence>
        {isOpen && axis.items.length > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 md:px-6 pb-6 pt-2">
              <div className="w-full h-px bg-white/[0.06] mb-4" />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {axis.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-data/60 mt-2 shrink-0" />
                    <span className="text-platinum/70 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              {axis.pillars && (
                <div className="mt-6">
                  <p className="text-gold/80 text-sm font-medium mb-3">الركائز العشر لثقافة Investrade:</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {axis.pillars.map((p, k) => (
                      <div key={k} className="text-center px-2 py-2 rounded-lg bg-gold/[0.06] border border-gold/10">
                        <span className="text-gold/50 text-xs block mb-1">{k + 1}</span>
                        <span className="text-platinum/70 text-xs leading-snug">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function EventRegistration() {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const [openAxis, setOpenAxis] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setFloatingVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({ title: "تم النسخ", description: "تم نسخ المعلومات بنجاح" });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="bg-obsidian min-h-screen">

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-obsidian/90 backdrop-blur-lg border-b border-white/[0.06]" : "bg-transparent"}`}
        dir="rtl"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="font-heading font-bold text-xl text-gold">Investraders</a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-platinum/60 text-sm hover:text-gold transition-colors">{link.label}</a>
            ))}
            <a href="#registration" className="px-5 py-2 text-sm font-medium bg-gold/10 border border-gold/30 text-gold rounded-lg hover:bg-gold/20 transition-colors">سجّل الآن</a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-platinum/60">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-obsidian/95 backdrop-blur-lg border-b border-white/[0.06] px-6 pb-6">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-platinum/60 text-base py-2 hover:text-gold transition-colors">{link.label}</a>
              ))}
              <a href="#registration" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium bg-gold text-obsidian rounded-lg">سجّل الآن</a>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" dir="rtl">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/70 to-obsidian" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold/30"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }} />
          ))}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
            <span className="inline-block px-5 py-2 border border-gold/30 rounded-full text-gold text-sm tracking-wide">تنظيم شبكة الحكمة الدولية — Wisdom Net</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            <span className="text-platinum">البرنامج الدولي لإعداد</span><br />
            <span className="text-gold">المدربين المعتمدين في</span><br />
            <span className="text-cyan-data text-5xl md:text-7xl lg:text-8xl">Investraders</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-gold/90 font-light mb-4 tracking-wide">
            Certified Investraders Master Trainer (CIMT)
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-lg md:text-xl text-platinum/70 font-light mb-10">
            "قيادة ثقافة الفرص... وصناعة الأثر"
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-platinum/80">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"><CalendarDays className="w-5 h-5 text-cyan-data" /><span className="text-sm md:text-base">١٠ - ١٣ أغسطس ٢٠٢٦</span></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"><MapPin className="w-5 h-5 text-cyan-data" /><span className="text-sm md:text-base">Mercure Istanbul Bomonti</span></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"><Star className="w-5 h-5 text-gold" /><span className="text-sm md:text-base">فندق ٥ نجوم</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#registration" className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold bg-gold text-obsidian rounded-lg overflow-hidden transition-all duration-500 hover:scale-105">
              <span className="relative z-10">سجّل الآن — احجز مقعدك</span>
              <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            <a href="#program" className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium border border-platinum/20 text-platinum rounded-lg hover:border-gold/50 hover:text-gold transition-all duration-300">استكشف البرنامج</a>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="mt-8 text-sm text-cyan-data/80 animate-pulse">⚡ المقاعد محدودة — Seats Are Limited</motion.p>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-gold/50" />
        </motion.div>
      </section>

      {/* ── VISION ── */}
      <section id="vision" className="py-24 md:py-32 bg-obsidian relative overflow-hidden" dir="rtl">
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
            <motion.div variants={fadeUp} custom={0} className="inline-block mb-4"><span className="text-cyan-data text-sm tracking-widest uppercase">لماذا هذا البرنامج</span></motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading font-bold text-3xl md:text-5xl text-platinum mb-6">من انتظار الفرص إلى <span className="text-gold">صناعتها</span></motion.h2>
            <motion.div variants={fadeUp} custom={2} className="w-20 h-0.5 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-20">
            <motion.p variants={fadeUp} custom={0} className="text-lg md:text-xl text-platinum/70 leading-[1.8] max-w-4xl mx-auto text-center">
              يشهد العالم تحولات غير مسبوقة بفعل الذكاء الاصطناعي، والاقتصاد الرقمي، والمنصات التفاعلية، والاقتصاد القائم على البيانات. وفي هذا السياق، لم تعد المؤسسات بحاجة فقط إلى إدارات تقليدية، بل إلى قيادات قادرة على استشراف المستقبل، وقراءة الاتجاهات، وتحويلها إلى فرص عملية.
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Eye, title: "الرؤية", text: "إعداد جيل جديد من المدربين والقادة والمستشارين القادرين على نشر ثقافة Investrade داخل المؤسسات الحكومية والخاصة، وتحويلها إلى ثقافة إدارية حديثة قائمة على استشراف المستقبل، واليقظة الإستراتيجية، واقتناص الفرص، وإدارة التغيير، وبناء المجتمعات الاقتصادية الذكية." },
              { icon: Target, title: "الرسالة", text: "تمكين المدربين من نقل فلسفة Investraders إلى المؤسسات، بحيث يصبحون سفراء للتغيير وقادة للتحول الاقتصادي والاجتماعي، وقادرين على تأسيس وحدات أو إدارات متخصصة في ثقافة Investrade داخل المؤسسات." },
              { icon: Lightbulb, title: "الفكرة الأساسية", text: "لا يهدف البرنامج إلى تخريج مدربين تقليديين، بل إلى إعداد قادة تغيير (Change Leaders) قادرين على إحداث تحول في طريقة تفكير الأفراد والمؤسسات، ونقلهم من ثقافة انتظار الفرص إلى ثقافة صناعتها." }
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={i} className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] hover:border-gold/20 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors"><item.icon className="w-7 h-7 text-gold" /></div>
                <h3 className="font-heading font-bold text-xl text-gold mb-4">{item.title}</h3>
                <p className="text-platinum/60 leading-[1.8] text-[15px]">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-2xl overflow-hidden mb-20">
            <img src={DETAIL_IMG} alt="" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-12">
            <motion.h3 variants={fadeUp} custom={0} className="font-heading font-bold text-2xl md:text-3xl text-platinum mb-3">ثقافة <span className="text-cyan-data">Investrade</span> كنموذج إداري جديد</motion.h3>
            <motion.p variants={fadeUp} custom={1} className="text-platinum/50 text-lg">تركز على</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["اليقظة الإستراتيجية", "الاستشراف وصناعة المستقبل", "بناء المجتمعات الاقتصادية", "اقتصاد الفرص", "القيادة التشاركية", "إدارة التغيير", "الذكاء الاصطناعي في اتخاذ القرار", "صناعة الأثر المستدام"].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i * 0.5} className="flex items-center justify-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-data/20 hover:bg-cyan-data/[0.03] transition-all duration-300">
                <span className="text-platinum/80 text-sm md:text-base text-center leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAM AXES ── */}
      <section id="program" className="py-24 md:py-32 bg-obsidian-light relative" dir="rtl">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-data text-sm tracking-widest">١٢ محوراً تدريبياً</span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-platinum mt-4 mb-4">محاور <span className="text-gold">البرنامج</span></h2>
            <p className="text-platinum/50 text-lg">٤ أيام تدريبية مكثفة</p>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-6" />
          </motion.div>
          <div className="space-y-3">
            {AXES.map((axis, i) => (
              <AxisCard key={i} axis={axis} isOpen={openAxis === i} onToggle={() => setOpenAxis(openAxis === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET AUDIENCE ── */}
      <section className="py-24 md:py-32 bg-obsidian relative overflow-hidden" dir="rtl">
        <div className="absolute inset-0">
          <img src={CONF_IMG} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-obsidian/90" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-data text-sm tracking-widest">من يستفيد؟</span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-platinum mt-4 mb-4">الفئة <span className="text-gold">المستهدفة</span></h2>
            <div className="w-20 h-0.5 bg-gold mx-auto" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {AUDIENCES.map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-gold/20 hover:bg-gold/[0.03] transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors"><item.icon className="w-6 h-6 text-gold/80" /></div>
                <span className="text-platinum/80 text-sm text-center font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="py-24 md:py-32 bg-obsidian-light relative" dir="rtl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
              <motion.div variants={fadeUp} custom={0}>
                <Award className="w-10 h-10 text-gold mb-4" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-platinum mb-3">مخرجات <span className="text-gold">البرنامج</span></h2>
                <p className="text-cyan-data text-sm mb-8">يحصل المتدرب على لقب: Certified Investraders Master Trainer (CIMT)</p>
              </motion.div>
              <motion.p variants={fadeUp} custom={1} className="text-platinum/60 mb-6 text-lg">ويصبح مؤهلاً لـ:</motion.p>
              <ul className="space-y-3">
                {OUTCOMES.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} custom={i + 2} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <span className="text-platinum/70 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-2xl overflow-hidden">
              <img src={CIRCLES_IMG} alt="" className="w-full h-full object-cover min-h-[300px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-light/80 to-transparent" />
            </motion.div>
          </div>

          {/* ICO */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-24">
            <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
              <span className="text-cyan-data text-sm tracking-widest">Investrade Culture Office (ICO)</span>
              <h2 className="font-heading font-bold text-2xl md:text-4xl text-platinum mt-4 mb-3">إنشاء إدارة ثقافة <span className="text-gold">Investrade</span> داخل المؤسسات</h2>
              <p className="text-platinum/50 max-w-2xl mx-auto">المحور الذي يميز البرنامج عن أي برنامج آخر</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} custom={1} className="p-6 rounded-xl bg-white/[0.02] border border-gold/10">
                <h4 className="font-heading font-bold text-lg text-gold mb-4">رسالة الإدارة</h4>
                <p className="text-platinum/60 mb-4 text-sm">بناء ثقافة مؤسسية تقوم على:</p>
                <div className="flex flex-wrap gap-2">{ICO_MISSION.map((m, i) => <span key={i} className="px-3 py-1.5 rounded-full bg-gold/[0.08] border border-gold/15 text-gold/80 text-xs">{m}</span>)}</div>
              </motion.div>
              <motion.div variants={fadeUp} custom={2} className="p-6 rounded-xl bg-white/[0.02] border border-cyan-data/10">
                <h4 className="font-heading font-bold text-lg text-cyan-data mb-4">مهام الإدارة</h4>
                <ul className="grid grid-cols-2 gap-2">{ICO_TASKS.map((t, i) => <li key={i} className="flex items-start gap-2 text-sm"><span className="w-1 h-1 rounded-full bg-cyan-data/60 mt-2 shrink-0" /><span className="text-platinum/60">{t}</span></li>)}</ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Final project */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-24 p-8 rounded-2xl bg-gradient-to-r from-gold/[0.04] to-transparent border border-gold/10">
            <motion.h3 variants={fadeUp} custom={0} className="font-heading font-bold text-2xl text-gold mb-3">المشروع النهائي</motion.h3>
            <motion.p variants={fadeUp} custom={1} className="text-platinum/60 mb-6">يقوم كل متدرب بإعداد خطة متكاملة لتأسيس إدارة ثقافة Investrade داخل مؤسسة حقيقية، تتضمن:</motion.p>
            <motion.div variants={fadeUp} custom={2} className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PROJECT_ITEMS.map((item, i) => <div key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" /><span className="text-platinum/70 text-sm">{item}</span></div>)}
            </motion.div>
          </motion.div>

          {/* Training tools */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-8"><Wrench className="w-6 h-6 text-cyan-data" /><h3 className="font-heading font-bold text-2xl text-platinum">أدوات التدريب</h3></motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TOOLS.map((tool, i) => <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06]"><span className="w-2 h-2 rounded-full bg-cyan-data/40 shrink-0" /><span className="text-platinum/70 text-sm">{tool}</span></div>)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CERTIFICATE ── */}
      <section className="py-24 md:py-32 bg-obsidian relative overflow-hidden" dir="rtl">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-data text-sm tracking-widest">الاعتماد الدولي</span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-platinum mt-4 mb-4">الشهادة <span className="text-gold">والاعتماد</span></h2>
            <div className="w-20 h-0.5 bg-gold mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h3 className="font-heading font-bold text-2xl text-gold mb-6">Certified Investraders Master Trainer (CIMT)</h3>
              <p className="text-platinum/70 leading-[1.8] mb-8">يحصل المشاركون الذين يجتازون البرنامج على شهادة CIMT ويُدرجون في السجل الدولي لمدربي Investraders، مع إمكانية اعتمادهم لتقديم البرامج التدريبية باسم المنصة في بلدانهم، والمساهمة في تأسيس إدارات ثقافة Investrade داخل المؤسسات الحكومية والخاصة.</p>
              <div className="space-y-4">
                {[
                  { icon: Award, text: "شهادة تفويض Authorization لممارسة التدريب باسم Investraders" },
                  { icon: Globe, text: "إدراج في السجل الدولي لمدربي Investraders" },
                  { icon: Shield, text: "بطاقة عضوية الإمتياز + شهادة ختم التدريب" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-gold/10">
                    <item.icon className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                    <span className="text-platinum/70 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <img src={SEAL_IMG} alt="" className="w-full h-full object-cover rounded-full" />
                <div className="absolute inset-0 rounded-full border-2 border-gold/30" />
                <div className="absolute inset-[-8px] rounded-full border border-gold/10" />
                <div className="absolute inset-[-16px] rounded-full border border-gold/5" />
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-20 text-center">
            <blockquote className="text-lg md:text-xl text-platinum/60 leading-[1.8] max-w-3xl mx-auto italic">
              "هذا البرنامج لا يهدف فقط إلى إعداد مدربين، بل إلى بناء حركة فكرية وإدارية تجعل من ثقافة Investrade نموذجاً معاصراً للإدارة يعتمد على الفرص، والتواصل، والذكاء الاصطناعي، وصناعة الأثر"
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ── TRAINER SECTION ── */}
      <section id="trainer" className="py-24 bg-obsidian border-t border-white/[0.04] relative overflow-hidden" dir="rtl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-data text-sm tracking-widest">خبير البرنامج</span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-platinum mt-4 mb-4">تعرّف على <span className="text-gold">المدرب</span></h2>
            <div className="w-20 h-0.5 bg-gold mx-auto" />
          </motion.div>
          
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="md:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 md:w-full md:h-auto md:aspect-[4/5]">
                {/* 
                  NOTE: Replace "/trainer.png" with the actual URL of the uploaded image
                */}
                <img src="/trainer.png" alt="د. ماهر خضر" className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10 border border-white/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent rounded-2xl z-20" />
                <div className="absolute -inset-4 border border-gold/20 rounded-2xl -z-10 transform rotate-3 transition-transform duration-500 hover:rotate-6" />
                <div className="absolute -inset-4 border border-cyan-data/20 rounded-2xl -z-10 transform -rotate-3 transition-transform duration-500 hover:-rotate-6" />
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="md:col-span-7">
              <h3 className="font-heading font-bold text-3xl text-platinum mb-2">د. ماهر خضر</h3>
              <p className="text-gold text-lg font-medium mb-2">دكتوراه تدريب الأعمال</p>
              <p className="text-cyan-data text-sm mb-6 leading-relaxed">رائد إدارة التغيير والاستشراف الاستراتيجي في الوطن العربي<br/>كبير خبراء استراتيجيات الذكاء الاصطناعي والحوكمة الذكية</p>
              
              <div className="space-y-4 text-platinum/70 leading-relaxed text-sm md:text-base text-justify">
                <p>يُعد الدكتور ماهر خضر من أبرز الخبراء العرب في مجالات إدارة التغيير، والاستشراف الاستراتيجي، وحوكمة الذكاء الاصطناعي، حيث كرّس مسيرته العلمية والمهنية لتطوير نماذج حديثة في القيادة والتحول المؤسسي، وتمكين المؤسسات من استشراف المستقبل والاستعداد لتحديات الاقتصاد الرقمي. ويُعرف بكونه من أوائل الخبراء العرب الذين طرحوا التحول من <span className="text-gold">إدارة الأعمال إلى إدارة الفرص</span>، وسعوا إلى دمج الذكاء الاصطناعي مع مبادئ الحوكمة الرشيدة والاستدامة وصناعة القرار الاستراتيجي.</p>
                <p>يشغل الدكتور ماهر خضر منصب كبير خبراء استراتيجيات الذكاء الاصطناعي، ويقود عدداً من المبادرات الدولية الهادفة إلى تعزيز الثقة والحوكمة والأمن في تطبيقات الذكاء الاصطناعي، كما يشارك في الحوارات والمنتديات العالمية المعنية بمستقبل الذكاء الاصطناعي والتحول الرقمي. وهو مؤسس شبكة الحكمة الدولية Wisdom Net ومنصة Investraders، التي تهدف إلى بناء مجتمعات اقتصادية ذكية تربط الأفراد والمؤسسات عبر دوائر تفاعلية (Circles) تعزز فرص الاستثمار والتجارة وريادة الأعمال في عصر الذكاء الاصطناعي.</p>
                <p>ويحاضر الدكتور ماهر خضر في مجالات الحوكمة المؤسسية، وإدارة التغيير، والاستشراف الاستراتيجي، والذكاء الاصطناعي، وإدارة المخاطر والأزمات، كما يقدم برامج تنفيذية واستشارات للقيادات العليا، ومجالس الإدارة، والجهات الحكومية، والقطاع الخاص، والمنظمات المهنية، انطلاقاً من إيمانه بأن المستقبل سيكون من نصيب المؤسسات التي تجمع بين الذكاء، والحكمة، والقدرة على تحويل التحديات إلى فرص مستدامة.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REGISTRATION ── */}
      <section id="registration" className="py-24 md:py-32 bg-obsidian relative overflow-hidden" dir="rtl">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-data text-sm tracking-widest">بوابة الانضمام</span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-platinum mt-4 mb-4">احجز مقعدك في <span className="text-gold">طليعة المستثمرين</span></h2>
            <div className="w-20 h-0.5 bg-gold mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Price + Bank */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="p-8 rounded-2xl bg-gradient-to-b from-gold/[0.08] to-transparent border border-gold/20 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-8 h-8 text-gold" />
                  <div>
                    <p className="text-platinum/50 text-sm">قيمة الاستثمار</p>
                    <div className="flex items-center gap-3">
                      <p className="font-heading font-bold text-2xl text-platinum/40 line-through">1,950$</p>
                      <p className="font-heading font-bold text-4xl text-gold">1,190$</p>
                    </div>
                  </div>
                </div>
                <p className="text-platinum/60 text-sm mb-4">تشمل:</p>
                <ul className="space-y-3">
                  {INCLUDES.map((item, i) => <li key={i} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" /><span className="text-platinum/70 text-sm leading-relaxed">{item}</span></li>)}
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-4"><CreditCard className="w-5 h-5 text-cyan-data" /><h4 className="font-heading font-bold text-platinum">تفاصيل التحويل البنكي</h4></div>
                <p className="text-platinum/50 text-xs mb-4">يُرجى التحويل على حسابات شبكة الحكمة — Wisdom Net</p>
                <div className="space-y-3">
                  {[
                    { label: "البنك", value: BANK_DETAILS.bank, key: "bank" },
                    { label: "العنوان", value: BANK_DETAILS.address, key: "address" },
                    { label: "IBAN", value: BANK_DETAILS.iban, key: "iban" },
                    { label: "SWIFT", value: BANK_DETAILS.swift, key: "swift" }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="min-w-0"><p className="text-platinum/40 text-xs">{item.label}</p><p className="text-platinum/80 text-sm font-mono truncate">{item.value}</p></div>
                      <button onClick={() => copyToClipboard(item.value, item.key)} className="shrink-0 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        {copiedField === item.key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-platinum/40" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* WhatsApp CTA */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col">
              <div className="flex-1 p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-8"><MessageCircle className="w-10 h-10 text-gold" /></div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-platinum mb-4">سجّل الآن عبر واتساب</h3>
                <p className="text-platinum/60 mb-8 max-w-sm leading-relaxed">تواصل معنا مباشرة عبر واتساب لحجز مقعدك في البرنامج والاستفسار عن أي تفاصيل إضافية.</p>
                <a href="https://wa.me/21627777751" target="_blank" rel="noopener noreferrer" className="group relative w-full max-w-sm inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold bg-gold text-obsidian rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] mb-4">
                  <Phone className="w-5 h-5" />
                  <span className="relative z-10">احجز مقعدك الآن</span>
                  <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                <div className="flex items-center gap-2 text-platinum/40 text-sm"><Phone className="w-4 h-4" /><span dir="ltr">+216 27 777 751</span></div>
                <div className="mt-8 w-full h-px bg-white/[0.06]" />
                <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center">
                  <div className="p-4 rounded-lg bg-white/[0.02]"><p className="text-platinum/40 text-xs mb-1">التاريخ</p><p className="text-platinum/80 text-sm font-medium">١٠ - ١٣ أغسطس ٢٠٢٦</p></div>
                  <div className="p-4 rounded-lg bg-white/[0.02]"><p className="text-platinum/40 text-xs mb-1">المدة</p><p className="text-platinum/80 text-sm font-medium">٤ أيام تدريبية</p></div>
                  <div className="p-4 rounded-lg bg-white/[0.02]"><p className="text-platinum/40 text-xs mb-1">المكان</p><p className="text-platinum/80 text-sm font-medium">Mercure Istanbul Bomonti</p></div>
                  <div className="p-4 rounded-lg bg-white/[0.02]"><p className="text-platinum/40 text-xs mb-1">الفندق</p><p className="text-platinum/80 text-sm font-medium">٥ نجوم ⭐</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pt-12 pb-28 md:pb-12 bg-obsidian border-t border-white/[0.06]" dir="rtl">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
            <div>
              <p className="text-gold font-heading font-bold text-lg mb-1">Investraders</p>
              <p className="text-platinum/40 text-sm">تنظيم شبكة الحكمة الدولية — Wisdom Net</p>
              <p className="text-platinum/30 text-xs mt-1">Wisdom Net is a recognized Innovator in the Program of the AI Hub for Sustainable Development, UNDP, with International Tech-Partners like Microsoft, AWS and CENICA</p>
            </div>
            <a href="https://wa.me/21627777751" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gold/20 text-gold text-sm hover:bg-gold/10 transition-colors">
              <Phone className="w-4 h-4" /><span dir="ltr">+216 27 777 751</span>
            </a>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
            <p className="text-platinum/20 text-xs">Mercure Istanbul Bomonti — ١٠ - ١٣ أغسطس ٢٠٢٦ — فندق ٥ نجوم</p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CTA ── */}
      <AnimatePresence>
        {floatingVisible && (
          <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            href="https://wa.me/21627777751" target="_blank" rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 bg-gold text-obsidian font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-sm">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">سجّل الآن</span>
          </motion.a>
        )}
      </AnimatePresence>

    </div>
  );
}
