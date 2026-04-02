import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "@/assets/orrhero.png"; // CHANGE: new roofing background image
import {
  FiArrowRight,
  FiChevronDown,
  FiStar,
  FiThumbsUp,
  FiMail,
  FiPhone,
  FiUser,
  FiHome,
  FiDollarSign,
  FiBriefcase,
  FiSend,
  FiCheckCircle,
  FiUsers,
  FiUserCheck,
  FiMessageSquare,
  FiSmartphone,
  FiZap,
  FiClock,
  FiShield,
  FiTool,
  FiSun,
  FiCloudRain,
  FiAward,
} from "react-icons/fi";
import { RiBuildingLine, RiShieldCheckLine } from "react-icons/ri";
import completeData from "../src/data/completeData.json";

gsap.registerPlugin(ScrollTrigger);

// MODERN PROFESSIONAL FORM COMPONENT - UPDATED FOR ROOFING SERVICES
const RoofingInquiryForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    serviceType: "roof-replacement",
    serviceDetails: "",
    email: "",
    phone: "",
    address: "",
    urgency: "standard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(520);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setContainerHeight(Math.max(height, 500));
    }
  }, [step, isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Roofing quote request:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        serviceType: "roof-replacement",
        serviceDetails: "",
        email: "",
        phone: "",
        address: "",
        urgency: "standard",
      });
    }, 3000);
  };

  // CHANGED: Roofing & Construction service options
  const serviceOptions = [
    {
      value: "roof-replacement",
      label: "Roof Replacement",
      icon: FiHome,
      desc: "Full roof replacement with premium materials",
    },
    {
      value: "roof-repair",
      label: "Roof Repair",
      icon: FiTool,
      desc: "Leak fixes, storm damage, missing shingles",
    },
    {
      value: "emergency",
      label: "Emergency Service",
      icon: FiCloudRain,
      desc: "24/7 emergency tarping & repairs",
    },
    {
      value: "siding-windows",
      label: "Siding & Windows",
      icon: FiSun,
      desc: "Energy-efficient exterior upgrades",
    },
    {
      value: "deck-patio",
      label: "Deck or Patio",
      icon: RiBuildingLine,
      desc: "Custom outdoor living spaces",
    },
    {
      value: "interior-remodel",
      label: "Interior Remodel",
      icon: FiBriefcase,
      desc: "Kitchen, bath, basement renovation",
    },
  ];

  const urgencyOptions = [
    { value: "emergency", label: "🚨 Emergency (within 24-48 hrs)" },
    { value: "soon", label: "⚡ Soon (1-2 weeks)" },
    { value: "planned", label: "📅 Planning (1-3 months)" },
  ];

  const stepIcons = [FiUserCheck, FiMessageSquare, FiSmartphone];
  const stepLabels = ["Your Info", "Project Details", "Contact"];

  const SelectedIcon =
    serviceOptions.find((opt) => opt.value === formData.serviceType)?.icon ||
    FiHome;

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        {/* Form Header - UPDATED FOR ROOFING */}
        <div className="relative flex-shrink-0 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-100">
          <div className="px-5 sm:px-6 md:px-8 py-5 sm:py-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FiZap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Free Roofing Estimate
                  </h3>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Get your quote in 3 easy steps
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-primary/10 rounded-full px-3 py-1.5">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step >= i
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium text-primary ml-1">
                  Steps
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          style={{ minHeight: `${containerHeight}px` }}
          className="transition-all duration-300 ease-in-out"
        >
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="px-5 sm:px-6 md:px-8 py-6 sm:py-8"
            >
              {/* Step Indicators */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => {
                    const StepIcon = stepIcons[s - 1];
                    const isActive = step === s;
                    const isCompleted = step > s;
                    return (
                      <div
                        key={s}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? "bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/20"
                              : isCompleted
                                ? "bg-primary/20 text-primary"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {isCompleted ? (
                            <FiCheckCircle className="w-6 h-6" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold mt-2 transition-colors ${
                            isActive
                              ? "text-primary"
                              : isCompleted
                                ? "text-gray-700"
                                : "text-gray-400"
                          }`}
                        >
                          {stepLabels[s - 1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="relative mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step - 1) / 2) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {/* Step 1: Name */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="bg-primary/5 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiUser className="w-4 h-4 text-primary" />
                        <span className="text-xs text-gray-600">
                          Step 1 of 3 - Tell us who you are
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-100 rounded-xl py-3.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="John"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-100 rounded-xl py-3.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Property address
                        </label>
                        <div className="relative group">
                          <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-100 rounded-xl py-3.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="123 Main St, Canton, MI"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1 ml-1">
                          So we can accurately estimate your project
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={
                          !formData.firstName ||
                          !formData.lastName ||
                          !formData.address
                        }
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold mt-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
                      >
                        Continue
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Service Type - UPDATED FOR ROOFING */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="bg-primary/5 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiTool className="w-4 h-4 text-primary" />
                        <span className="text-xs text-gray-600">
                          Step 2 of 3 - What service do you need?
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Service needed
                        </label>
                        <div className="relative">
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-100 rounded-xl py-3.5 pl-12 pr-10 text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer bg-white"
                            style={{ height: "52px" }}
                          >
                            {serviceOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <SelectedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 ml-1">
                          {
                            serviceOptions.find(
                              (opt) => opt.value === formData.serviceType,
                            )?.desc
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Urgency
                        </label>
                        <div className="relative">
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-100 rounded-xl py-3.5 pl-4 pr-10 text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer bg-white"
                          >
                            {urgencyOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Additional details{" "}
                          <span className="text-gray-400 font-normal">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          name="serviceDetails"
                          value={formData.serviceDetails}
                          onChange={handleChange}
                          rows={3}
                          className="w-full border-2 border-gray-100 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                          placeholder="Tell us about your project, any known issues, insurance claim status, etc."
                          style={{ minHeight: "80px" }}
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-md"
                        >
                          Continue
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="bg-primary/5 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiShield className="w-4 h-4 text-primary" />
                        <span className="text-xs text-gray-600">
                          Step 3 of 3 - How should we reach you?
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email address
                        </label>
                        <div className="relative group">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-100 rounded-xl py-3.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="hello@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone number
                        </label>
                        <div className="relative group">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-100 rounded-xl py-3.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="+1 214-284-3212"
                            required
                          />
                        </div>
                      </div>
                      <div className="bg-primary/5 rounded-xl p-3 flex items-start gap-2">
                        <FiAward className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-600">
                          We'll send your free estimate within 24 hours. No
                          obligation, no hidden fees.
                        </p>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={
                            isSubmitting || !formData.email || !formData.phone
                          }
                          className="flex-1 bg-primary text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-md"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Get Free Estimate
                              <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-12 text-center flex flex-col items-center justify-center"
              style={{ minHeight: `${containerHeight}px` }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <FiCheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Estimate Request Sent!
              </h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Thanks for contacting Orr Roofing & Construction. We'll reach
                out within 24 hours with your free estimate.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// HERO COMPONENT - UPDATED FOR ORR ROOFING & CONSTRUCTION
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // UPDATED: Roofing-specific data
  const roofingData = {
    badge: "FREE ESTIMATES • LICENSED & INSURED",
    headlines: ["Quality Roofing", "Expert Construction"],
    description:
      "Need a new roof or emergency repairs? Orr Roofing & Construction provides fast, reliable service with free estimates. We handle insurance claims and offer 24/7 emergency service for storm damage.",
    buttons: [
      {
        text: "Free Estimate",
        href: "#quote",
        primary: true,
        icon: "FiDollarSign",
      },
      {
        text: "How We Work",
        href: "#how-it-works",
        primary: false,
        icon: "FiArrowRight",
      },
    ],
    stats: [
      {
        value: "24hr",
        label: "Emergency Response",
        icon: "FiClock",
      },
      {
        value: "Free",
        label: "Estimates",
        icon: "FiDollarSign",
      },
      {
        value: "100%",
        label: "Licensed & Insured",
        icon: "FiShield",
      },
      {
        value: "1000+",
        label: "Projects Done",
        icon: "FiHome",
      },
    ],
  };

  const { badge, headlines, description, buttons, stats, promoBadge } =
    roofingData;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) * 0.005,
        y: (clientY - innerHeight / 2) * 0.005,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const iconComponents = {
    FiArrowRight: FiArrowRight,
    RiBuildingLine: RiBuildingLine,
    FiStar: FiStar,
    FiThumbsUp: FiThumbsUp,
    RiShieldCheckLine: RiShieldCheckLine,
    FiDollarSign: FiDollarSign,
    FiClock: FiClock,
    FiShield: FiShield,
    FiHome: FiHome,
    FiTool: FiTool,
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 isolate"
    >
      {/* STATIC BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="Orr Roofing & Construction - Professional roofing services"
          className="w-full h-full object-cover absolute inset-0"
          style={{ transform: "none" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-slate-900/60" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Subtle floating elements */}
        <motion.div
          className="absolute top-[20%] right-[15%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[10%] w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center py-28 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-black text-xs uppercase tracking-wider font-medium">
                  {badge}
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.2] tracking-tight">
                {headlines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + 0.15 * i,
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {description}
              </motion.p>

              {promoBadge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mb-8 flex justify-center lg:justify-start"
                >
                  <div className="inline-flex items-center gap-3 bg-primary/20 backdrop-blur-sm border border-primary/40 rounded-full px-5 py-2">
                    <FiStar className="text-primary text-sm" />
                    <span className="text-white text-sm font-medium">
                      {promoBadge.text}
                    </span>
                    <a
                      href="#testimonials"
                      className="text-primary text-sm font-bold hover:underline"
                    >
                      {promoBadge.cta} →
                    </a>
                  </div>
                </motion.div>
              )}

              <motion.div
                className="mb-10 w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  {buttons.map((button, idx) => {
                    const Icon =
                      iconComponents[
                        button.icon as keyof typeof iconComponents
                      ];

                    return button.primary ? (
                      <motion.a
                        key={idx}
                        href={button.href}
                        className="
                          group relative overflow-hidden
                          min-w-[150px] sm:min-w-[170px]
                          flex-1 sm:flex-initial
                          px-5 sm:px-7 py-3.5
                          rounded-2xl
                          inline-flex items-center justify-center gap-2
                          text-sm sm:text-base font-semibold tracking-wide
                          bg-primary text-white
                          border border-primary/30
                          shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                          transition-all duration-300
                          hover:bg-white hover:text-primary hover:border-white/70
                          hover:shadow-[0_16px_40px_rgba(255,255,255,0.18)]
                          active:scale-[0.98]
                        "
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">{button.text}</span>
                        {Icon && (
                          <Icon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                        <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    ) : (
                      <motion.a
                        key={idx}
                        href={button.href}
                        className="
                          group relative overflow-hidden
                          min-w-[150px] sm:min-w-[170px]
                          flex-1 sm:flex-initial
                          px-5 sm:px-7 py-3.5
                          rounded-2xl
                          inline-flex items-center justify-center gap-2
                          text-sm sm:text-base font-semibold tracking-wide
                          backdrop-blur-xl
                          bg-white/10
                          text-white
                          border border-white/20
                          shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                          transition-all duration-300
                          hover:bg-white hover:text-slate-900 hover:border-white
                          hover:shadow-[0_16px_40px_rgba(255,255,255,0.16)]
                          active:scale-[0.98]
                        "
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">{button.text}</span>
                        {Icon && (
                          <Icon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                        <span className="absolute inset-0 bg-gradient-to-r from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {stats.map((stat, idx) => {
                  const StatIcon =
                    iconComponents[stat.icon as keyof typeof iconComponents];
                  return (
                    <div key={stat.label} className="flex items-center gap-3">
                      {StatIcon && (
                        <StatIcon className="w-6 h-6 text-primary/80" />
                      )}
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-white/50">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Column - Updated Form Component */}
            <div className="mt-8  py-4 lg:py-8 lg:mt-0 flex justify-center lg:justify-center">
              <RoofingInquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
