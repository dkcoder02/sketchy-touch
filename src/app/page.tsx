"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Pencil,
  Users,
  Zap,
  Lightbulb,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRightIcon,
  CheckIcon,
  UserPlus,
  Share2,
  Play,
  PenTool,
  GitBranch,
  Palette,
} from "lucide-react";
import {
  Button,
  ShimmerButton,
  TypingAnimation,
  HyperText,
  AnimatedSubscribeButton,
  AnimatedGridPattern,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/index";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import { useEffect } from "react";
const features = [
  { icon: Pencil, title: "Sketch Your Ideas", description: "Use our intuitive drawing tools to quickly sketch out your concepts and designs.", color: "bg-purple-500" },
  { icon: Users, title: "Collaborate in Real-Time", description: "Work together with your team, no matter where they are located.", color: "bg-blue-500" },
  { icon: Zap, title: "Animate Your Thoughts", description: "Bring your sketches to life with easy-to-use animation tools.", color: "bg-yellow-500" },
  { icon: Lightbulb, title: "Inspire Creativity", description: "Unlock your team's creative potential with our collaborative environment.", color: "bg-green-500" },
  { icon: Share2, title: "Easy Sharing", description: "Share your sketches and animations with clients or stakeholders effortlessly.", color: "bg-pink-500" },
  { icon: Play, title: "Interactive Presentations", description: "Turn your sketches into engaging, interactive presentations.", color: "bg-red-500" },
]
const useCases = [
  {
    icon: Lightbulb,
    title: "Brainstorming Sessions",
    description: "Capture ideas quickly and collaboratively.",
    color: "text-yellow-500",
  },
  {
    icon: GitBranch,
    title: "Project Planning",
    description: "Visualize project timelines and dependencies.",
    color: "text-blue-500",
  },
  {
    icon: Pencil,
    title: "Design Thinking Workshops",
    description: "Guide your team through creative problem-solving.",
    color: "text-purple-500",
  },
  {
    icon: Users,
    title: "Remote Team Meetings",
    description: "Keep everyone engaged with interactive visuals.",
    color: "text-green-500",
  },
]

export default function Home() {

  const { session } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/workspace");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-800 shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex p-4 justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Pencil className="h-8 w-8 text-[#ff7700]" />
                <HyperText
                  className="ml-2 text-xl font-bold text-[#ff7700]"
                  text="SketchyBoard"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button className="ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shadow-sm h-9 px-4 py-2 bg-gray-100 text-gray-900 border-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white shadow h-9 px-4 py-2 bg-[#ff7700] hover:bg-[#ff7700]/90 transition-colors">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="">
        <div className=" min-h-screen py-16 px-4 flex  items-center justify-center sm:py-24 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="text-center">
            <motion.h1
              className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Collaborate with a{" "}
              <span className="text-orange-500">Sketchy</span> Touch
            </motion.h1>
            <TypingAnimation
              className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              duration={50}
              text="Bring your ideas to life with our virtual collaborative whiteboard. Sketch, share, and animate your thoughts in real-time."
            />
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/sign-in">
                  <ShimmerButton
                    shimmerSize="0.18em"
                    shimmerDuration="2s"
                    shimmerColor="#ff7700"
                    className="w-full"
                    background="#ff7700"
                  >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                      Sign Up Now
                    </span>
                  </ShimmerButton>
                </Link>
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
      </header>

      {/* Features */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">Our <span className="text-orange-500">Features</span></h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-950 py-16 sm:py-24">
        <section className="mb-24">
          <h2 className="text-center text-sm font-semibold text-white uppercase tracking-wide mb-2">HOW IT WORKS</h2>
          <h3 className="text-center text-4xl font-bold mb-12 text-gray-400 ">Simplify your collaborative process</h3>
          <div className="grid md:grid-cols-3   gap-8 m-8">
            {[
              { number: 1, title: "Create a board", description: "Start with a blank canvas or choose from our templates.", icon: PenTool },
              { number: 2, title: "Invite your team", description: "Share your board and collaborate in real-time.", icon: Users },
              { number: 3, title: "Sketch and animate", description: "Bring your ideas to life with our intuitive tools.", icon: Zap },
            ].map((step, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-400 group-hover:text-primary-foreground transition-colors duration-300">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                  <CardTitle className="text-white text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <CardDescription className="text-2xl">{step.description}</CardDescription>
                  <step.icon className="mt-4 transition-colors duration-300" size={30} />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Use Cases */}
      <div className="bg-gray-900 text-gray-100 py-16 sm:py-24">
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl sm:text-4xl font-extrabold text-orange-400 mb-12">
              Perfect for teams of all sizes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {useCases.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 flex flex-col justify-center items-center"
                >
                  <CardHeader className="flex flex-row items-center space-x-2 justify-left">
                    <div className={`p-2 rounded-full ${feature.color} bg-opacity-20`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

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
                    buttonColor="#ff7700"
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
            <p className="mt-8 text-base text-[#ff7700] md:mt-0 md:order-1">
              &copy; 2024 SketchyBoard, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
