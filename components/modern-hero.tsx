"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Zap, Target, TrendingUp, Shield, Clock, Globe, BarChart3, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"

// Hero image configuration with bubbles positioned strictly on borders/outside
const heroConfig = [
    {
        id: 1,
        image: "/hero-image-1.svg",
        alt: "AI-Powered Technical Screening",
        title: "AI-Powered Screening",
        subtitle: "Intelligent candidate evaluation",
        badges: ["AI-Powered", "95% Accuracy", "Real-time"],
        bubbles: [
            { id: 1, text: "Smart Analysis", position: { x: "-5%", y: "15%" }, delay: 0.2, color: "primary", icon: Zap },
            { id: 2, text: "Bias-Free", position: { x: "95%", y: "5%" }, delay: 0.4, color: "success", icon: Shield },
            { id: 3, text: "Instant Results", position: { x: "5%", y: "95%" }, delay: 0.6, color: "accent", icon: Clock },
        ],
        icon: Zap,
    },
    {
        id: 2,
        image: "/hero-image-2.png",
        alt: "Enhanced Candidate Experience",
        title: "Candidate Experience",
        subtitle: "Seamless interview process",
        badges: ["24/7 Available", "Mobile Ready", "Instant Feedback"],
        bubbles: [
            { id: 1, text: "User Friendly", position: { x: "-9%", y: "8%" }, delay: 0.3, color: "accent", icon: Users },
            { id: 2, text: "Quick Setup", position: { x: "97%", y: "23%" }, delay: 0.5, color: "primary", icon: Zap },
            { id: 3, text: "Global Access", position: { x: "8%", y: "97%" }, delay: 0.7, color: "success", icon: Globe },
        ],
        icon: Target,
    },
    {
        id: 3,
        image: "/hero-image-3.svg",
        alt: "Advanced Analytics Dashboard",
        title: "Analytics Dashboard",
        subtitle: "Data-driven hiring insights",
        badges: ["Deep Insights", "60% Faster", "ROI Tracking"],
        bubbles: [
            { id: 1, text: "Performance Metrics", position: { x: "2%", y: "12%" }, delay: 0.2, color: "secondary", icon: BarChart3 },
            { id: 2, text: "Predictive Analytics", position: { x: "90%", y: "14%" }, delay: 0.4, color: "success", icon: TrendingUp },
            { id: 3, text: "Custom Reports", position: { x: "6%", y: "98%" }, delay: 0.6, color: "primary", icon: Award },
        ],
        icon: TrendingUp,
    },
]

// Enhanced bubble variants with more prominence
const bubbleVariants = {
    primary: "bg-white/98 backdrop-blur-md text-slate-700 border border-slate-200/60 shadow-xl shadow-primary/15",
    success: "bg-white/98 backdrop-blur-md text-slate-700 border border-slate-200/60 shadow-xl shadow-emerald-500/15",
    accent: "bg-white/98 backdrop-blur-md text-slate-700 border border-slate-200/60 shadow-xl shadow-violet-500/15",
    secondary: "bg-white/98 backdrop-blur-md text-slate-700 border border-slate-200/60 shadow-xl shadow-blue-500/15",
}

export default function ModernHero() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const heroRef = useRef(null)
    const isInView = useInView(heroRef, { once: true })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
            setIsLoaded(true)
        }
    }, [isInView, controls])

    // Auto-rotate images
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroConfig.length)
        }, 5000) // Change every 5 seconds

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const handleImageSelect = (index: number) => {
        setCurrentImageIndex(index)
        setIsAutoPlaying(false)
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    }

    const currentConfig = heroConfig[currentImageIndex]

    return (
        <section
            className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
            ref={heroRef}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                <div className="floating-orb floating-orb-1"></div>
                <div className="floating-orb floating-orb-2"></div>
                <div className="floating-orb floating-orb-3"></div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            </div>

            <div className="container">
                <motion.div
                    className="max-w-6xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center rounded-full border border-border/40 bg-background/90 backdrop-blur-sm px-6 py-2 text-sm mb-8 relative overflow-hidden group shadow-sm"
                        variants={itemVariants}
                    >
                        <span className="text-muted-foreground relative z-10">Revolutionizing Technical Hiring</span>
                        <div className="mx-3 h-4 w-px bg-border/60"></div>
                        <span className="text-primary font-medium relative z-10">2025</span>
                        <div className="absolute inset-0 bg-primary/3 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    </motion.div>

                    {/* Main headline */}
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
                        variants={itemVariants}
                    >
                        <span className="block mb-4">
                            <span className="relative inline-block">
                                <span className="relative z-10 text-gradient animate-gradient bg-gradient-to-r from-primary via-primary/80 to-primary">
                                    Interview Smarter.
                                </span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/15 -z-10 transform skew-x-12"></span>
                            </span>
                        </span>
                        <span className="block">
                            <span className="relative inline-block">
                                <span className="relative z-10">Hire Faster.</span>
                                <span
                                    className="absolute bottom-2 left-0 w-full h-3 bg-primary/8 -z-10 transform -skew-x-12"
                                    style={{ animationDelay: "1s" }}
                                ></span>
                            </span>
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
                        variants={itemVariants}
                    >
                        The AI-powered platform that revolutionizes your technical hiring process with
                        <span className="text-primary font-medium"> automated screening</span> and
                        <span className="text-primary font-medium"> unbiased evaluations</span>.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" variants={itemVariants}>
                        <Button asChild variant="gradient" size="lg" className="rounded-full px-8 py-6 text-lg btn-modern group">
                            <Link href="#contact" className="flex items-center">
                                <span className="relative z-10">Get Your Demo</span>
                                <ArrowRight className="relative z-10 ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-primary/5 transition-all duration-300 group"
                        >
                            <Link href="#videos" className="flex items-center">
                                <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                <span>Watch Demo</span>
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Enhanced Hero Image with Better Navigation */}
                    <motion.div
                        className="relative max-w-6xl mx-auto"
                        variants={itemVariants}
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{
                            opacity: isLoaded ? 1 : 0,
                            scale: isLoaded ? 1 : 0.95,
                            y: isLoaded ? 0 : 40,
                        }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Minimal Inline Navigation */}
                        <div className="flex justify-center gap-8 mb-12 relative z-20">
                            {heroConfig.map((config, index) => {
                                const IconComponent = config.icon
                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleImageSelect(index)}
                                        className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                            index === currentImageIndex
                                                ? "text-primary"
                                                : "text-muted-foreground hover:text-foreground"
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >	
                                    </motion.button>
                                )
                            })}
                        </div>

                        <div className="relative">
                            {/* Enhanced glow effect with primary color */}
                            <motion.div
                                className="absolute -inset-4 rounded-2xl blur-2xl opacity-60 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40"
                                animate={{
                                    opacity: [0.4, 0.7, 0.4],
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity, 
                                    repeatType: "reverse",
                                    ease: "easeInOut" 
                                }}
                            />

                            {/* Main container with reduced padding/bezel - removed overflow-hidden */}
                            <div className="relative bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl  shadow-2xl shadow-primary/20">
                                {/* Image carousel with extra padding for border bubbles */}
                                <div className="relative rounded-xl aspect-[16/10] sm:aspect-[16/9] p-2 overflow-visible">
                                    {/* Inner container with overflow hidden only for image */}
                                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentImageIndex}
                                                initial={{ opacity: 0, x: 50, scale: 0.98 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                exit={{ opacity: 0, x: -50, scale: 1.02 }}
                                                transition={{
                                                    duration: 0.6,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }}
                                                className="relative w-full h-full"
                                            >
                                                <Image
                                                    src={currentConfig.image}
                                                    alt={currentConfig.alt}
                                                    fill
                                                    className="object-cover object-center rounded-[32px]"
                                                    priority={currentImageIndex === 0}
                                                    onLoad={() => setIsLoaded(true)}
                                                />

                                                {/* Subtle overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent rounded-lg"></div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Enhanced Google-style Clean Bubbles - Positioned on borders only */}
                                    <AnimatePresence>
                                        {currentConfig.bubbles.map((bubble) => {
                                            const IconComponent = bubble.icon
                                            return (
                                                <motion.div
                                                    key={`${currentImageIndex}-${bubble.id}`}
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.7,
                                                        y: 30,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.7,
                                                        y: -20,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: bubble.delay,
                                                        ease: [0.25, 0.46, 0.45, 0.94],
                                                    }}
                                                    className={`absolute px-4 py-2.5 rounded-full text-sm font-semibold cursor-pointer select-none ${bubbleVariants[bubble.color as keyof typeof bubbleVariants]}`}
                                                    style={{
                                                        left: bubble.position.x,
                                                        top: bubble.position.y,
                                                        transform: "translate(-50%, -50%)",
                                                        zIndex: 30,
                                                        minWidth: "fit-content",
                                                    }}
                                                    whileHover={{
                                                        scale: 1.08,
                                                        y: -4,
                                                        transition: { 
                                                            duration: 0.2,
                                                            ease: "easeOut"
                                                        }
                                                    }}
                                                    whileTap={{
                                                        scale: 0.96,
                                                        transition: { duration: 0.1 }
                                                    }}
                                                >
                                                    {/* Enhanced glass morphism background */}
                                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/10 to-transparent"></div>
                                                    
                                                    {/* Content with icon - Enhanced Google style */}
                                                    <div className="relative flex items-center gap-2.5 whitespace-nowrap">
                                                        <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full shadow-sm ${
                                                            bubble.color === 'primary' ? 'bg-primary/15 text-primary' :
                                                            bubble.color === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                                            bubble.color === 'accent' ? 'bg-violet-100 text-violet-600' :
                                                            'bg-blue-100 text-blue-600'
                                                        }`}>
                                                            <IconComponent className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span className="text-slate-700 font-semibold text-sm tracking-wide">
                                                            {bubble.text}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Enhanced accent line with gradient */}
                                                    <div className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${
                                                        bubble.color === 'primary' ? 'from-transparent via-primary/30 to-transparent' :
                                                        bubble.color === 'success' ? 'from-transparent via-emerald-500/30 to-transparent' :
                                                        bubble.color === 'accent' ? 'from-transparent via-violet-500/30 to-transparent' :
                                                        'from-transparent via-blue-500/30 to-transparent'
                                                    }`} />
                                                    
                                                    {/* Subtle outer glow for prominence */}
                                                    <div className={`absolute inset-0 rounded-full -z-10 blur-sm opacity-40 ${
                                                        bubble.color === 'primary' ? 'bg-primary/20' :
                                                        bubble.color === 'success' ? 'bg-emerald-500/20' :
                                                        bubble.color === 'accent' ? 'bg-violet-500/20' :
                                                        'bg-blue-500/20'
                                                    }`} />
                                                </motion.div>
                                            )
                                        })}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
