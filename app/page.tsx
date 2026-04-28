'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Users, 
  Home, 
  TrendingUp, 
  FileText, 
  Award,
  ChevronRight,
  Star,
  ExternalLink,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- DATA ---

const HERO_SLIDES = [
  {
    image: 'https://picsum.photos/seed/luxury1/1920/1080',
    title: 'Tu propiedad en buenas manos.',
    subtitle: 'Nobilta Terra: Trayectoria familiar en Puerto Madero uniendo sueños con realidades.',
  },
  {
    image: 'https://picsum.photos/seed/luxury2/1920/1080',
    title: 'Vende tu casa al mejor precio.',
    subtitle: 'Estrategias de marketing premium para que tu propiedad destaque en el mercado.',
  },
  {
    image: 'https://picsum.photos/seed/luxury3/1920/1080',
    title: 'Especialistas en Créditos IAF.',
    subtitle: 'Asesoramiento exclusivo para personal militar. Facilitamos tu camino al hogar propio.',
  },
];

const SERVICES = [
  {
    title: 'Venta de propiedades',
    description: 'Encontramos al comprador ideal para tu hogar con estrategias de marketing precisas.',
    icon: Home,
  },
  {
    title: 'Tasación profesional',
    description: 'Tasamos tu inmueble con valores reales de mercado para que no pierdas tiempo ni dinero.',
    icon: TrendingUp,
    featured: true,
  },
  {
    title: 'Captación activa',
    description: 'Ponemos tu propiedad frente a las personas indicadas. Priorizamos la calidad de publicación.',
    icon: ShieldCheck,
    highlight: true,
  },
  {
    title: 'Acompañamiento integral',
    description: 'Te asesoramos en cada paso del proceso legal y comercial para tu total tranquilidad.',
    icon: FileText,
  },
  {
    title: 'Créditos IAF',
    description: 'Especialistas en la gestión y aplicación de créditos IAF para personal militar. Nuestro diferencial clave.',
    icon: Award,
  },
];

const RECENTLY_SOLD = [
  {
    id: 101,
    title: 'Residencia Los Álamos',
    location: 'Olivos, Buenos Aires',
    image: 'https://picsum.photos/seed/sold1/800/600',
    type: 'Vendido en 45 días',
  },
  {
    id: 102,
    title: 'Exclusivo Piso 14',
    location: 'Recoleta, CABA',
    image: 'https://picsum.photos/seed/sold2/800/600',
    type: 'Vendido en 60 días',
  },
  {
    id: 103,
    title: 'Chau PH Belgrano',
    location: 'Belgrano, CABA',
    image: 'https://picsum.photos/seed/sold3/800/600',
    type: 'Vendido (Crédito IAF)',
  },
];

const PROPERTIES = [
  {
    id: 1,
    title: 'PH Estilo Francés 4 Amb.',
    location: 'San Cristóbal, CABA',
    price: 'USD 115.000',
    image: '/imgi_18_2045348694.jpg',
    beds: 4,
    baths: 1,
    type: 'PH',
  },
  {
    id: 2,
    title: 'PH PB c/Patio 3 Amb.',
    location: 'Barracas, CABA',
    price: 'USD 70.000',
    image: '/imgi_16_2045348036.jpg',
    beds: 3,
    baths: 1,
    type: 'PH',
  },
  {
    id: 3,
    title: 'Tríplex Estilo Andaluz 5 Amb.',
    location: 'Balvanera, CABA',
    price: 'USD 125.000',
    image: '/imgi_9_2043574380.jpg',
    beds: 5,
    baths: 3,
    type: 'Tríplex',
  },
  {
    id: 4,
    title: 'Depto Luminoso c/Cochera',
    location: 'Barracas, CABA',
    price: 'USD 75.000',
    image: '/imgi_14_2047137049.jpg',
    beds: 3,
    baths: 1,
    type: 'Departamento',
  },
];

const TESTIMONIALS = [
  {
    name: 'Jorge Martínez',
    role: 'Vendedor',
    content: 'La atención personalizada de Nobilta Terra no tiene comparación. Después de 20 años en el rubro se nota la experiencia y la seriedad.',
  },
  {
    name: 'Marta Solís',
    role: 'Compradora',
    content: 'Me ayudaron con todo el papelerío del IAF, que es bastante complejo. Totalmente recomendados para personal militar.',
  },
  {
    name: 'Ricardo G.',
    role: 'Propietario',
    content: 'Tasaron mi casa en el valor justo y la vendieron en menos de 3 meses. Gente de confianza.',
  },
];

// --- COMPONENTS ---

export default function LandingPage() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState('Todos');
  const [currentHeroSlide, setCurrentHeroSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProperties = activeCategory === 'Todos' 
    ? PROPERTIES 
    : PROPERTIES.filter(p => {
        if (activeCategory === 'Solares/Lotes') return p.type === 'Lote' || p.beds === 0;
        if (activeCategory === 'Departamentos') return p.title.toLowerCase().includes('departamento') || p.title.toLowerCase().includes('ph') || p.title.toLowerCase().includes('dúplex');
        if (activeCategory === 'Casas') return p.title.toLowerCase().includes('casa');
        return true;
      });

  const categories = ['Todos', 'Casas', 'Departamentos', 'Solares/Lotes'];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 px-6 lg:px-12 py-4 flex justify-between items-center",
          scrolled || mobileMenuOpen ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3" : "bg-transparent text-white"
        )}
      >
        <div className="flex items-center gap-2 relative z-50">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center font-display font-bold text-xl text-white">NT</div>
          <span className={cn("font-display font-bold text-xl tracking-tight", (scrolled || mobileMenuOpen) ? "text-slate-900" : "text-white")}>
            Nobilta <span className="font-light text-slate-400">Terra</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center font-medium text-sm">
          <a href="#inicio" className="hover:text-slate-400 transition-colors">Inicio</a>
          <a href="#nosotros" className="hover:text-slate-400 transition-colors">Nosotros</a>
          <a href="#servicios" className="hover:text-slate-400 transition-colors">Servicios</a>
          <a href="#propiedades" className="hover:text-slate-400 transition-colors">Propiedades</a>
          <a 
            href="https://wa.me/5491100000000" 
            className={cn(
              "px-5 py-2.5 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-sm border",
              (scrolled || mobileMenuOpen) 
                ? "bg-slate-900 text-white border-slate-900" 
                : "bg-white/10 backdrop-blur-md text-white border-white/20"
            )}
          >
            <Phone size={14} className={cn((scrolled || mobileMenuOpen) ? "text-white" : "text-emerald-400")} fill="currentColor" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={cn("w-6 h-0.5 mb-1.5 transition-all", (scrolled || mobileMenuOpen) ? "bg-slate-900" : "bg-white", mobileMenuOpen && "rotate-45 translate-y-2")} />
          <div className={cn("w-6 h-0.5 mb-1.5 transition-all", (scrolled || mobileMenuOpen) ? "bg-slate-900" : "bg-white", mobileMenuOpen && "opacity-0")} />
          <div className={cn("w-6 h-0.5 transition-all", (scrolled || mobileMenuOpen) ? "bg-slate-900" : "bg-white", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
        </button>

        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-900">Inicio</a>
          <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-900">Nosotros</a>
          <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-900">Servicios</a>
          <a href="#propiedades" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-900">Propiedades</a>
          <a 
            href="https://wa.me/5491100000000" 
            className="bg-[#25D366] text-white px-8 py-4 rounded-full flex items-center gap-3 font-bold shadow-lg"
          >
            <Phone size={20} fill="currentColor" />
            WhatsApp
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        {HERO_SLIDES.map((slide, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentHeroSlide === idx ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image 
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-40"
              priority={idx === 0}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-slate-900/40 z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            key={currentHeroSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-5xl md:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              {HERO_SLIDES[currentHeroSlide].title}
            </h1>
            <p className="text-xl md:text-3xl text-stone-100 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
              {HERO_SLIDES[currentHeroSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <a 
                href="https://wa.me/5491100000000"
                className="w-full sm:w-auto bg-slate-100 hover:bg-white text-slate-900 px-10 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-2xl hover:scale-105 active:scale-95"
              >
                Tasación Gratuita
                <ChevronRight size={20} />
              </a>
              <a 
                href="#propiedades"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
              >
                Ver Propiedades
              </a>
            </div>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroSlide(idx)}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                currentHeroSlide === idx ? "w-12 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </section>

      {/* Stats Quick Section */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
           <div className="text-center">
             <p className="text-4xl font-display font-bold text-slate-900">20+</p>
             <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Años</p>
           </div>
           <div className="text-center">
             <p className="text-4xl font-display font-bold text-slate-900">500+</p>
             <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Ventas</p>
           </div>
           <div className="text-center">
             <p className="text-4xl font-display font-bold text-slate-900">1.2k</p>
             <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Tasaciones</p>
           </div>
           <div className="text-center">
             <p className="text-4xl font-display font-bold text-slate-900">100%</p>
             <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Legales</p>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-24 px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/portrait/800/1000"
                alt="Nobilta Terra Team"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                <div>
                   <p className="text-white text-2xl font-display font-bold">Trayectoria que trasciende</p>
                   <p className="text-slate-300">Empresa familiar de 2da generación</p>
                </div>
              </div>
            </div>
            <div>
              <span className="text-slate-400 font-bold tracking-widest text-sm uppercase">Nuestra Presentación</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-8 text-slate-900">
                La experiencia no se compra, se construye día a día.
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  En <strong>Nobilta Terra</strong>, no solo vendemos metros cuadrados; gestionamos el patrimonio de familias que confían en nuestra mirada profesional y ética. 
                </p>
                <p>
                  Surgimos como una respuesta a la necesidad de transparencia en el mercado inmobiliario del AMBA. Nos especializamos en la <strong>jerarquización de activos</strong>: aplicamos técnicas de marketing de lujo a propiedades de todo el mercado para que destaquen sobre la competencia.
                </p>
                <div className="space-y-4 pt-4">
                   <div className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center mt-1 flex-shrink-0">
                       <ShieldCheck className="text-white" size={14} />
                     </div>
                     <p className="text-base"><strong>Seguridad Jurídica:</strong> Revisamos cada título antes de publicar.</p>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center mt-1 flex-shrink-0">
                       <Clock className="text-white" size={14} />
                     </div>
                     <p className="text-base"><strong>Celeridad Operativa:</strong> Optimizamos los tiempos de venta mediante filtros activos de interesados.</p>
                   </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-center pt-8">
                 <a 
                   href="https://wa.me/5491100000000"
                   className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-black transition-all shadow-xl flex items-center gap-3 w-full sm:w-auto justify-center"
                 >
                   Conversar ahora
                   <ChevronRight size={20} />
                 </a>
                 <div className="flex gap-4">
                    <div className="text-center px-6 border-r border-slate-100">
                      <p className="text-2xl font-bold text-slate-900">20+</p>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Años</p>
                    </div>
                    <div className="text-center px-6">
                      <p className="text-2xl font-bold text-slate-900">500+</p>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Éxitos</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Track Record (Sold) */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-display font-bold">Track Record: Recientemente Vendidos</h3>
              <p className="text-slate-500 mt-2">La mejor referencia es el trabajo cumplido.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               {RECENTLY_SOLD.map((sold) => (
                 <div key={sold.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <Image 
                      src={sold.image}
                      alt={sold.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                       <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded w-fit mb-2">
                         {sold.type}
                       </span>
                       <h4 className="text-white font-bold text-xl">{sold.title}</h4>
                       <p className="text-stone-300 text-sm">{sold.location}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 px-6 lg:px-24 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Lo que hacemos por vos</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Un servicio boutique donde cada cliente es una prioridad, no un número de legajo.</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className={cn(
                "p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden",
                service.featured 
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xl lg:scale-105 z-10" 
                  : "bg-white border-slate-100 hover:shadow-xl"
              )}
            >
              {service.highlight && (
                <div className="absolute top-4 right-4 bg-slate-900 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                  Diferencial
                </div>
              )}
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                service.featured ? "bg-white text-slate-900" : "bg-slate-100 text-slate-900"
              )}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className={cn("leading-relaxed", service.featured ? "text-slate-400" : "text-slate-500")}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto text-center mt-12">
           <a 
             href="https://wa.me/5491100000000"
             className="inline-flex items-center gap-3 bg-white border border-slate-200 px-8 py-4 rounded-2xl font-bold text-slate-900 hover:shadow-lg transition-all"
           >
             Consultar servicios específicos
             <ExternalLink size={18} />
           </a>
        </div>
      </section>

      {/* Tasaciones Section - NEW PROMIMENT SECTION */}
      <section className="py-24 px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto bg-stone-900 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl">
           <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
              <span className="text-stone-400 font-bold uppercase tracking-widest text-sm mb-4">Tasaciones Profesionales</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
                No arriesgues tu capital con valores de fantasía.
              </h2>
              <p className="text-stone-400 text-lg mb-8 leading-relaxed">
                Una tasación incorrecta es el principal motivo por el cual una propiedad se estanca meses en el mercado. Aplicamos análisis comparativo de mercado (ACM) real, basado en cierres efectivos, no solo en precios de publicación.
              </p>
              <ul className="space-y-4 mb-12">
                 {['Visita presencial técnica', 'Informe comparativo detallado', 'Asesoramiento impositivo inicial', 'Estimación de tiempos de cierre'].map((item, i) => (
                   <li key={i} className="flex gap-3 items-center text-stone-200">
                     <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                       <Check size={14} className="text-white" />
                     </div>
                     {item}
                   </li>
                 ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                   href="https://wa.me/5491100000000"
                   className="w-fit bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold transition-all shadow-lg hover:bg-stone-100 flex items-center gap-3"
                >
                   Tasación Gratuita
                   <ChevronRight size={20} />
                </a>
                <a 
                   href="#nosotros"
                   className="w-fit border border-stone-700 text-stone-300 hover:bg-stone-800 px-10 py-5 rounded-2xl font-bold transition-all flex items-center gap-3"
                >
                   Nuestra Metodología
                </a>
              </div>
           </div>
           <div className="lg:w-1/2 relative bg-stone-800 p-1">
              <Image 
                src="https://picsum.photos/seed/valuation/1000/1200"
                alt="Tasaciones"
                fill
                className="object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900 lg:from-stone-900/80 to-transparent" />
           </div>
        </div>
      </section>

      {/* IAF Highlight Section - FULL WIDTH & INTERACTIVE */}
      <section id="iaf" className="relative bg-slate-950 text-white overflow-hidden py-24 px-6 lg:px-24">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#1e293b_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#0f172a_0%,transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <Award size={32} className="text-white" />
                </div>
                <span className="text-slate-400 font-bold tracking-widest text-sm uppercase">División Especializada</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Créditos IAF: Su hogar, nuestra misión.
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                En Nobilta Terra entendemos el lenguaje y los tiempos de la familia militar. Somos especialistas en la gestión de créditos del Instituto de Ayuda Financiera.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white font-bold">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  Carpeta 100% Lista
                </div>
                <p className="text-sm text-slate-500">Nos encargamos de que la propiedad elegida cumpla con los requisitos técnicos de tasación del IAF.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white font-bold">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  Gestión Notarial Expansiva
                </div>
                <p className="text-sm text-slate-500">Coordinamos con las escribanías autorizadas para agilizar los plazos de escrituración y desembolso.</p>
              </div>
            </div>

            <div className="pt-4">
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10 inline-block">
                 <p className="text-slate-300 italic mb-0">
                   &ldquo;Acompañamos a quienes sirven al país en el paso más importante de su vida familiar.&rdquo;
                 </p>
               </div>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white text-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative"
          >
            <div className="absolute top-0 right-12 w-24 h-24 bg-slate-100 rounded-b-3xl flex items-center justify-center -translate-y-2">
              <Star className="text-slate-300 w-12 h-12 fill-current" />
            </div>

            <h3 className="font-display text-2xl font-bold mb-8">Estimador de Orientación</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Valor de la propiedad (USD)</label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="50000" 
                    max="300000" 
                    step="5000"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                    defaultValue="120000"
                    id="property-value"
                    onChange={(e) => {
                      const display = document.getElementById('value-display');
                      if (display) display.innerText = `USD ${Number(e.target.value).toLocaleString()}`;
                    }}
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                    <span>50k</span>
                    <span id="value-display" className="text-slate-900 text-sm">USD 120.000</span>
                    <span>300k</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-sm text-slate-500">
                Los créditos IAF suelen cubrir hasta un porcentaje significativo del valor de tasación. El monto final depende de su haber mensual y capacidad de descuento.
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-900 text-white rounded-2xl">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Aprobación</p>
                  <p className="text-lg font-bold">Referencial</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Tasa Anual</p>
                  <p className="text-lg font-bold text-slate-900">Preferencial</p>
                </div>
              </div>

              <a 
                href="https://wa.me/5491100000000"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-900/10"
              >
                Solicitar Consultoría IAF Gratis
                <ChevronRight size={20} />
              </a>
              <p className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-tight">Especialistas certificados en normativa IAF 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Captación Section */}
      <section className="py-24 px-6 lg:px-24 bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <Image 
            src="https://picsum.photos/seed/realty/1200/800"
            alt="Real Estate"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-slate-400 font-bold tracking-widest text-sm uppercase block mb-4">Captación Activa</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Tu casa merece el mejor escenario.
            </h2>
            <div className="space-y-6 text-slate-300 text-lg">
              <p>Nuestra <strong>Captación Activa</strong> no es solo subir una foto. Es crear una estrategia de publicación premiun en los principales portales, redes y círculos privados.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Star className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Fotos de Calidad</h4>
                    <p className="text-sm text-slate-400">Jerarquizamos cada ambiente.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Filtro de Interesados</h4>
                    <p className="text-sm text-slate-400">Solo visitas calificadas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10">
             <h3 className="text-2xl font-bold mb-6 italic">¿Empezamos?</h3>
             <p className="text-slate-400 mb-8 font-light">&ldquo;Creamos redes. Aseguramos que sepan que estamos.&rdquo;</p>
             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
               <a 
                 href="https://wa.me/5491100000000"
                 className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors shadow-2xl shadow-black/40"
               >
                 Contactar por WhatsApp
                 <ChevronRight size={20} />
               </a>
               <p className="text-center text-xs text-slate-500 uppercase tracking-widest font-bold">Atención personalizada inmediata</p>
             </form>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="propiedades" className="py-24 px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-slate-400 font-bold tracking-widest text-sm uppercase">Selección Nobilta</span>
            <h2 className="font-display text-4xl font-bold mt-4">Unidades Destacadas</h2>
            <p className="text-slate-500 mt-4 italic">No somos un catálogo masivo, somos una selección de confianza.</p>
          </div>
          <div className="flex flex-col items-end gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-all border",
                    activeCategory === cat 
                      ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                      : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <a 
              href="https://www.zonaprop.com.ar/inmobiliarias/nobilta-terra-servicios-inmobiliarios_30788903-inmuebles.html" 
              target="_blank"
              className="text-slate-900 font-bold flex items-center gap-2 hover:underline group"
            >
              Ver catálogo en Zonaprop
              <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.map((prop) => (
            <motion.div 
              key={prop.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image 
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md text-white font-bold px-4 py-1.5 rounded-full text-sm">
                  {prop.price}
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-2xl mb-1 text-slate-900">{prop.title}</h3>
                <div className="flex items-center gap-1 text-slate-400 text-sm mb-6">
                  <MapPin size={14} />
                  {prop.location}
                </div>
                <div className="flex items-center gap-6 border-t pt-6 text-slate-500 text-sm font-bold">
                  {prop.beds > 0 ? (
                    <div className="flex items-center gap-1.5 focus:outline-none">
                      <Users size={16} className="text-slate-300" />
                      {prop.beds} Amb.
                    </div>
                  ) : (
                    <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-600 text-[10px] uppercase font-bold tracking-widest">{prop.type}</span>
                  )}
                  {prop.baths > 0 && (
                    <div className="flex items-center gap-1.5 focus:outline-none">
                      <Home size={16} className="text-slate-300" />
                      {prop.baths} Baños
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl font-bold mb-6">Testimonios y Referencias</h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              En 20 años hemos tejido una red de relaciones que supera lo comercial. Somos vecinos cuidando lo más valioso de otros vecinos.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex text-slate-300"><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /></div>
                <span className="font-bold text-slate-900 tracking-tight">4.9/5 en Google Business</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className={cn("p-8 rounded-3xl bg-white border border-slate-100 shadow-sm", idx === 0 && "md:col-span-2 shadow-xl border-slate-200")}>
                <p className="text-slate-600 italic mb-8 text-lg leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                  <Award size={24} className="text-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white text-slate-900 rounded-lg flex items-center justify-center font-display font-bold text-xl">NT</div>
              <span className="font-display font-bold text-2xl tracking-tight">Nobilta <span className="font-light text-slate-600">Terra</span></span>
            </div>
            <p className="text-slate-400 max-w-sm text-lg mb-8 leading-relaxed">
              Trayectoria familiar, visión moderna. Estamos aquí para asegurar que tu próximo paso inmobiliario sea un éxito absoluto.
            </p>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-center gap-3"><Phone size={18} className="text-slate-600" /> +54 11 0000 0000</div>
              <div className="flex items-center gap-3"><MapPin size={18} className="text-slate-600" /> Juana Manso, Puerto Madero, CABA</div>
              <div className="flex items-center gap-3"><Clock size={18} className="text-slate-600" /> Lun - Vie: 10:00 - 18:00 hs</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6 text-slate-100">Navegación</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios Inmobiliarios</a></li>
              <li><a href="#propiedades" className="hover:text-white transition-colors">Propiedades Destacadas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6 text-slate-100">Conexión Directa</h4>
            <a 
              href="https://wa.me/5491100000000" 
              className="bg-white/5 text-white border border-white/10 px-6 py-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all group"
            >
              <Phone size={28} className="text-emerald-500" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">Online <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /></p>
                <p className="font-bold text-xl leading-tight">WhatsApp</p>
              </div>
            </a>
            <p className="mt-8 text-sm text-slate-600 italic border-l border-slate-800 pl-4">
              &ldquo;Arquitectura de negocios inmobiliarios.&rdquo;
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-600 font-medium uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Nobilta Terra. Real Estate Boutique.</p>
          <div className="flex gap-8">
            <a href="https://www.zonaprop.com.ar/inmobiliarias/nobilta-terra-servicios-inmobiliarios_30788903-inmuebles.html" className="hover:text-white transition-colors">Zonaprop</a>
            <a href="#" className="hover:text-white transition-colors">Google Reviews</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <motion.a 
        href="https://wa.me/5491100000000"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -10, 0] 
        }}
        transition={{ 
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          y: { 
            repeat: Infinity, 
            duration: 3, 
            ease: "easeInOut" 
          } 
        }}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-transform transform hover:scale-110 active:scale-95 group focus:outline-none"
        aria-label="WhatsApp"
      >
        <div className="relative">
          <Phone size={28} fill="currentColor" className="relative z-10" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#25D366]" />
        </div>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¿En qué podemos ayudarte?
        </span>
      </motion.a>
    </div>
  );
}
