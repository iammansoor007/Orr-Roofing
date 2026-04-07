import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import serviceDetail from "@/assets/orrroofing3.jpg";
import {
  Wrench,
  Home,
  Building2,
  Sun,
  CloudRain,
  Shield,
  TreePine,
  Droplets,
  Hammer,
  Square,
  Award,
  ArrowRight,
  Layout,
  Building,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import completeData from "../src/data/completeData.json";

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ value, suffix = "" }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const duration = 2000;
    const startValue = 0;
    const endValue = value;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * eased);
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};

const iconMap = {
  Wrench: Wrench,
  Home: Home,
  Building2: Building2,
  Sun: Sun,
  CloudRain: CloudRain,
  Shield: Shield,
  TreePine: TreePine,
  Droplets: Droplets,
  Hammer: Hammer,
  Square: Square,
  Layout: Layout,
  Building: Building,
};

const CompactServiceCard = ({ service }: { service: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ServiceIcon = iconMap[service.icon as keyof typeof iconMap] || Wrench;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      <div className="relative bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
        
        <div className="relative z-10 flex items-start gap-4">
          <div className="relative">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <ServiceIcon className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h4>
              <span className="text-xs font-mono text-primary/60 bg-primary/5 px-2 py-1 rounded-full">
                {service.number}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>
            <motion.div
              className="flex items-center gap-2 mt-4"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                Learn more
              </span>
              <ArrowRight className="w-3 h-3 text-primary" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);
  const ServiceIcon = iconMap[service.icon as keyof typeof iconMap] || Wrench;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 10 });
  const springY = useSpring(y, { stiffness: 100, damping: 10 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = (cardRef.current as HTMLElement).getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 0.4;
    const yPct = (mouseY / rect.height - 0.5) * 0.4;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
      }}
      className="relative group"
    >
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur group-hover:blur-md" />
      
      {/* Card content */}
      <div className="relative bg-card rounded-2xl overflow-hidden border border-border group-hover:border-primary/30 transition-all duration-500">
        {/* Image Section - FIXED: Removed dark overlay that was causing fading */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
          {service.image && !imageError ? (
            <>
              <motion.img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onError={() => setImageError(true)}
              />
              {/* Lighter gradient overlay for better text readability without fading image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <ServiceIcon className="w-20 h-20 text-primary/30" />
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20 shadow-lg">
              {service.tag}
            </div>
          </div>
          
          {/* Number badge */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
              {service.number}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <ServiceIcon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                {service.title}
              </h3>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Features list */}
          <div className="space-y-2 mb-6">
            {service.features?.slice(0, 3).map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ x: 5 }}
            className="w-full py-2.5 rounded-xl bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 group/btn"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 28,
    restDelta: 0.001,
  });

  const clipPathLeftToRight = useTransform(
    smoothProgress,
    [0, 0.1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const imageScale = useTransform(smoothProgress, [0, 0.1], [1.15, 1]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.08], [0.5, 0.1]);

  const { badge, headline, description, stats, services, cta } =
    completeData.services;
  const featuredService = services[0];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".split-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-background via-background to-primary/5 overflow-hidden py-20 md:py-28"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,_hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-28">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-primary uppercase tracking-wider text-xs font-semibold">
                  {badge}
                </span>
              </div>

              {/* Heading */}
              <div className="overflow-hidden mb-6">
                <h2 className="split-text text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] tracking-tight">
                  {headline.prefix}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                    {headline.highlight}
                  </span>
                  <br />
                  <span className="text-foreground">{headline.suffix}</span>
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-4 mb-8">
                {description.map((text: string, idx: number) => (
                  <p
                    key={idx}
                    className="text-muted-foreground text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8 pt-6 border-t border-border">
                {stats.map((stat: any, idx: number) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Service */}
              <CompactServiceCard service={featuredService} />
            </motion.div>
          </div>

          {/* Image Section */}
          <div className="lg:col-span-7">
            <div className="relative">
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ clipPath: clipPathLeftToRight }}
              >
                <div className="relative aspect-[4/5]">
                  <motion.img
                    src={serviceDetail}
                    alt="Orr Roofing & Construction"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ scale: imageScale }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent"
                    style={{ opacity: overlayOpacity }}
                  />
                  
                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-5 py-3 rounded-xl shadow-xl border border-primary/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-white">
                        24/7 Emergency Service
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
            </div>
          </div>
        </div>

        {/* Services Grid Section */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-primary/60" />
              <span className="text-sm font-semibold tracking-wider uppercase text-primary">
                Our Services
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span>Professional</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span>Licensed</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span>Insured</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(1).map((service: any, index: number) => (
              <ServiceCard
                key={service.number}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-12 border border-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {cta.title}
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                {cta.description}
              </p>
              <motion.a
                href={cta.buttonLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span>{cta.buttonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          className="relative block w-full h-10 md:h-12"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#redGradient)"
            d="M0,24L60,26.7C120,29,240,34,360,34C480,34,600,29,720,26.7C840,24,960,24,1080,26.7C1200,29,1320,34,1380,36.7L1440,39L1440,60L1380,60C1320,60,1200,60,1080,60C960,60,840,60,720,60C600,60,480,60,360,60C240,60,120,60,60,60L0,60Z"
          />
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.04"
              />
              <stop
                offset="50%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.06"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.04"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Services;