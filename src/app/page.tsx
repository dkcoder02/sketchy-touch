"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Pencil,
  Users,
  Zap,
  Sparkles,
  Lightbulb,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRightIcon,
  CheckIcon,
} from "lucide-react";
import {
  Button,
  ShimmerButton,
  TypingAnimation,
  PulsatingButton,
  HyperText,
  MagicCard,
  AnimatedSubscribeButton,
  AnimatedGridPattern,
  GridPattern,
} from "@/components/ui/index";
export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Pencil className="h-8 w-8 text-indigo-600" />
                <HyperText
                  className="ml-2 text-xl font-bold text-gray-800"
                  text="SketchyBoard"
                />
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/sign-in">
                <PulsatingButton pulseColor="indigo-600">
                  Log in
                </PulsatingButton>
              </Link>
              <Link href="/sign-up">
                <Button className="ml-4">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Collaborate with a{" "}
              <span className="text-indigo-600">Sketchy</span> Touch
            </motion.h1>
            <TypingAnimation
              className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              duration={50}
              text="Bring your ideas to life with our virtual collaborative whiteboard. Sketch, share, and animate your thoughts in real-time."
            />
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/workspace">
                  <ShimmerButton
                    shimmerSize="0.18em"
                    shimmerDuration="2s"
                    className="w-full"
                  >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                      Get Started
                    </span>
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Sketch Area */}
      <div className="relative bg-gray-50 py-16 sm:py-24">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative bg-white shadow-xl rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="absolute inset-0">
                <svg
                  className="h-full w-full"
                  fill="none"
                  viewBox="0 0 800 400"
                >
                  <motion.path
                    d="M0,100 Q200,150 400,100 T800,100"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="400"
                    cy="100"
                    r="20"
                    fill="#4F46E5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  />
                </svg>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Watch Your Ideas Come to Life
                </h2>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-gray-500">
                  Our unique animation system brings a playful, hand-drawn feel
                  to your diagrams and sketches.
                </p>
              </div>
              <GridPattern
                width={20}
                height={20}
                x={-1}
                y={-1}
                className={cn(
                  "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
                )}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to sketch and collaborate
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: "Hand-drawn feel",
                  description:
                    "Create diagrams that look like they were sketched by hand, adding a personal touch to your ideas.",
                  icon: Pencil,
                },
                {
                  name: "Real-time collaboration",
                  description:
                    "Work together with your team in real-time, no matter where they are in the world.",
                  icon: Users,
                },
                {
                  name: "Fancy animations",
                  description:
                    "Bring your sketches to life with our built-in animation tools, making your presentations more engaging.",
                  icon: Sparkles,
                },
                {
                  name: "Lightning-fast performance",
                  description:
                    "Enjoy a smooth, responsive drawing experience thanks to our optimized rendering engine.",
                  icon: Zap,
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simplify your collaborative process
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {[
                {
                  step: 1,
                  title: "Create a board",
                  description:
                    "Start with a blank canvas or choose from our templates.",
                },
                {
                  step: 2,
                  title: "Invite your team",
                  description: "Share your board and collaborate in real-time.",
                },
                {
                  step: 3,
                  title: "Sketch and animate",
                  description:
                    "Bring your ideas to life with our intuitive tools.",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    {item.step}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Use Cases
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Perfect for teams of all sizes
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: "Brainstorming Sessions",
                  description: "Capture ideas quickly and collaboratively.",
                },
                {
                  title: "Project Planning",
                  description: "Visualize project timelines and dependencies.",
                },
                {
                  title: "Design Thinking Workshops",
                  description:
                    "Guide your team through creative problem-solving.",
                },
                {
                  title: "Remote Team Meetings",
                  description:
                    "Keep everyone engaged with interactive visuals.",
                },
              ].map((item) => (
                <div key={item.title} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Lightbulb className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {item.title}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {item.description}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Loved by teams worldwide
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: "Sarah J.",
                  role: "Product Manager",
                  quote:
                    "SketchyBoard has revolutionized our brainstorming sessions. The hand-drawn feel adds a personal touch to our ideas.",
                },
                {
                  name: "Mike T.",
                  role: "UX Designer",
                  quote:
                    "The animation features in SketchyBoard allow me to bring my design concepts to life in ways I never thought possible.",
                },
              ].map((testimonial) => (
                <MagicCard
                  key={testimonial.name}
                  className="cursor-pointer bg-white shadow overflow-hidden sm:rounded-lg"
                  gradientColor="#D9D9D955"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <p className="text-base text-gray-500 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Product
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {["Features", "Pricing", "Use Cases", "Security"].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-base text-gray-300 hover:text-white"
                          >
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {[
                      "Documentation",
                      "Guides",
                      "API Status",
                      "Contact Us",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-base text-gray-300 hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {["About", "Blog", "Jobs", "Press"].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-base text-gray-300 hover:text-white"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {["Privacy", "Terms", "Cookie Policy", "Trademark"].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-base text-gray-300 hover:text-white"
                          >
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 xl:mt-0">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-4 text-base text-gray-300">
                Get the latest news and articles to your inbox every month.
              </p>
              <form className="mt-4 sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <AnimatedSubscribeButton
                    buttonColor="#000000"
                    buttonTextColor="#ffffff"
                    subscribeStatus={false}
                    initialText={
                      <span className="group inline-flex items-center">
                        Subscribe{" "}
                        <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    }
                    changeText={
                      <span className="group inline-flex items-center">
                        <CheckIcon className="mr-2 size-4" />
                        Subscribed{" "}
                      </span>
                    }
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {[
                { name: "Facebook", icon: Facebook },
                { name: "Twitter", icon: Twitter },
                { name: "Instagram", icon: Instagram },
                { name: "LinkedIn", icon: Linkedin },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2023 SketchyBoard, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
