import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import {
  Github, Linkedin, Download, Mail, ArrowRight, ArrowUpRight,
  Code2, Palette, Lightbulb, Trophy, Briefcase, GraduationCap,
  Users, Award, Flag, Sparkles, Maximize2,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CertificatesModal, type Certificate } from "../components/CertificatesModal";
import { BeyondCodeModal, type Interest } from "../components/BeyondCodeModal";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const PORTRAIT =
  "https://images.unsplash.com/photo-1634938332514-6f3d23c8cc42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFuJTIwc29mdHdhcmUlMjBlbmdpbmVlciUyMGxvb2tpbmclMjBhdCUyMGNhbWVyYSUyMGRhcmslMjBiYWNrZ3JvdW5kJTIwc3R1ZGlvfGVufDF8fHx8MTc4MTcyNDg3OXww&ixlib=rb-4.1.0&q=80&w=1080";

const timeline = [
  { year: "2022", title: "Started B.E Computer Engineering", desc: "Began my journey into software engineering and product development.", icon: GraduationCap, image: "https://images.unsplash.com/photo-1499080863200-1f37ed9cb653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwZG9jdW1lbnQlMjBwcmVtaXVtJTIwZGFya3xlbnwxfHx8fDE3ODMwNzk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { year: "2023", title: "Discovered UI/UX Design", desc: "Participated in my first hackathon while exploring design thinking.", icon: Palette, image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZSUyMGNvbG9yJTIwcGFsZXR0ZSUyMGRhcmt8ZW58MXx8fHwxNzgzMDgxNjE3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { year: "2024", title: "Joined Programmers Club", desc: "Contributed as an Event Management Team member and collaborated on technical events.", icon: Users, image: "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { year: "2024", title: "AI Codex Finalist", desc: "Reached the finals and gained valuable experience building under pressure.", icon: Flag, image: "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { year: "2025", title: "Won IIGC Hackathon", desc: "My first major hackathon victory, validating both technical and teamwork skills.", icon: Trophy, image: "https://images.unsplash.com/photo-1638636241638-aef5120c5153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwZG9jdW1lbnQlMjBwcmVtaXVtJTIwZGFya3xlbnwxfHx8fDE3ODMwNzk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { year: "2025", title: "Webathon Finalist", desc: "Continued competing in high-level development competitions.", icon: Award, image: "https://images.unsplash.com/photo-1770486036751-e55247238964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { year: "2026", title: "Joined EVJoints", desc: "Worked as a UI/UX Design Intern on real-world EV products.", icon: Briefcase, image: "https://images.unsplash.com/photo-1660836685837-47651f406b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { year: "2026", title: "Graduated", desc: "Completed B.E in Computer Engineering with no backlogs.", icon: GraduationCap, image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwZG9jdW1lbnQlMjBwcmVtaXVtJTIwZGFya3xlbnwxfHx8fDE3ODMwNzk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
];

const buildCards = [
  {
    title: "Full Stack Development",
    desc: "Building scalable, modern web applications using React, Node.js, Express and MongoDB.",
    icon: Code2,
    accent: "168, 85, 247",
  },
  {
    title: "UI/UX Design",
    desc: "Designing intuitive interfaces, design systems and experiences that put users first.",
    icon: Palette,
    accent: "249, 115, 22",
  },
  {
    title: "Problem Solving",
    desc: "Turning ideas into practical digital solutions through hackathons, product thinking and continuous learning.",
    icon: Lightbulb,
    accent: "59, 130, 246",
  },
];

const bento = [
  { id: "fitness", emoji: "🏋️", title: "Fitness", desc: "Discipline and consistency built at the gym.", chip: "🏋️ Discipline • Consistency", span: "col-span-2 md:col-span-2 md:row-span-2", accent: "168, 85, 247", image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBneW0lMjBmaXRuZXNzJTIwd2VpZ2h0cyUyMHRyYWluaW5nfGVufDF8fHx8MTc4MzA4MTYxMXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "design", emoji: "🎨", title: "Design", desc: "An eye for detail and aesthetics.", chip: "🎨 Craft • Detail", span: "col-span-1 md:col-span-1", accent: "249, 115, 22", image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZSUyMGNvbG9yJTIwcGFsZXR0ZSUyMGRhcmt8ZW58MXx8fHwxNzgzMDgxNjE3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "travel", emoji: "✈️", title: "Travel", desc: "New places, new perspectives.", chip: "📍 Exploring Places", span: "col-span-1 md:col-span-1", accent: "59, 130, 246", image: "https://images.unsplash.com/photo-1527605158555-853f200063e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmclMjB3aW5kb3clMjB0cmF2ZWwlMjBjbG91ZHN8ZW58MXx8fHwxNzgzMDgxNjE0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "hackathons", emoji: "🚀", title: "Hackathons", desc: "Building fast and shipping under pressure.", chip: "🏆 1 Win • 4+ Finals", span: "col-span-2 md:col-span-2", accent: "34, 197, 94", image: "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "learning", emoji: "📚", title: "Continuous Learning", desc: "Always chasing the next idea worth understanding.", chip: "📚 Always Improving", span: "col-span-2 md:col-span-4", accent: "236, 72, 153", image: "https://images.unsplash.com/photo-1499080863200-1f37ed9cb653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwZG9jdW1lbnQlMjBwcmVtaXVtJTIwZGFya3xlbnwxfHx8fDE3ODMwNzk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
];

const certificates: Certificate[] = [
  { id: "evjoints", title: "EVJoints Internship", subtitle: "UI/UX Design Intern", image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwZG9jdW1lbnQlMjBwcmVtaXVtJTIwZGFya3xlbnwxfHx8fDE3ODMwNzk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "iigc", title: "IIGC Winner", subtitle: "IIGC Hackathon 2025", image: "https://images.unsplash.com/photo-1638636241638-aef5120c5153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwZG9jdW1lbnQlMjBwcmVtaXVtJTIwZGFya3xlbnwxfHx8fDE3ODMwNzk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "mern", title: "Full Stack MERN", subtitle: "MERN Certification", image: "https://images.unsplash.com/photo-1607501197654-dcd586bbf39e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwZG9jdW1lbnQlMjBwcmVtaXVtJTIwZGFya3xlbnwxfHx8fDE3ODMwNzk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "aicodex", title: "AI Codex Finalist", subtitle: "AI Codex 2024", image: "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "webathon", title: "Webathon Finalist", subtitle: "Webathon 2025", image: "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "club", title: "Programmers Club", subtitle: "Event Management Team", image: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "uiux", title: "UI/UX Design", subtitle: "Design Fundamentals", image: "https://images.unsplash.com/photo-1770486036751-e55247238964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "diploma", title: "B.E Computer Engineering", subtitle: "Graduated 2026", image: "https://images.unsplash.com/photo-1499080863200-1f37ed9cb653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjZXJ0aWZpY2F0ZSUyMGF3YXJkJTIwZG9jdW1lbnQlMjBwcmVtaXVtJTIwZGFya3xlbnwxfHx8fDE3ODMwNzk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "pattern", title: "Open Source", subtitle: "Community Contributions", image: "https://images.unsplash.com/photo-1660836685837-47651f406b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoYWNrYXRob24lMjBjb2RpbmclMjB0ZWFtJTIwdGVjaG5vbG9neSUyMGRhcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3ODMwNzk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
];

// Rich modal content for each "Beyond the Code" interest, keyed by card id.
const interestModals: Record<string, Interest> = {
  fitness: {
    id: "fitness",
    title: "Fitness",
    emoji: "🏋️",
    chip: "🏋️ Discipline • Consistency",
    accent: "168, 85, 247",
    story:
      "The gym taught me discipline, consistency and long-term thinking. Those same habits influence how I approach software engineering — showing up every day, improving gradually and enjoying the process.",
    images: [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBneW0lMjBmaXRuZXNzJTIwd2VpZ2h0cyUyMHRyYWluaW5nfGVufDF8fHx8MTc4MzA4MTYxMXww&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1590487988256-9ed24133863e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwd2VpZ2h0cyUyMGRhcmslMjBtb29keSUyMHRyYWluaW5nJTIwZGlzY2lwbGluZXxlbnwxfHx8fDE3ODMxMDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1521805103424-d8f8430e8933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxneW0lMjB3b3Jrb3V0JTIwd2VpZ2h0cyUyMGRhcmslMjBtb29keSUyMHRyYWluaW5nJTIwZGlzY2lwbGluZXxlbnwxfHx8fDE3ODMxMDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxneW0lMjB3b3Jrb3V0JTIwd2VpZ2h0cyUyMGRhcmslMjBtb29keSUyMHRyYWluaW5nJTIwZGlzY2lwbGluZXxlbnwxfHx8fDE3ODMxMDQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1200",
    ],
  },
  design: {
    id: "design",
    title: "Design",
    emoji: "🎨",
    chip: "🎨 Craft • Detail",
    accent: "249, 115, 22",
    story:
      "Design is where empathy meets craft. Studying interfaces, spacing and motion sharpens my attention to detail and helps me build products that feel effortless to use.",
    images: [
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZSUyMGNvbG9yJTIwcGFsZXR0ZSUyMGRhcmt8ZW58MXx8fHwxNzgzMDgxNjE3fDA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZSUyMGNvbG9yJTIwcGFsZXR0ZSUyMGRhcmt8ZW58MXx8fHwxNzgzMDgxNjE3fDA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1621111848501-8d3634f82336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZSUyMGNvbG9yJTIwcGFsZXR0ZSUyMGRhcmt8ZW58MXx8fHwxNzgzMDgxNjE3fDA&ixlib=rb-4.1.0&q=80&w=1200",
    ],
  },
  travel: {
    id: "travel",
    title: "Travel",
    emoji: "✈️",
    chip: "📍 Exploring Places",
    accent: "59, 130, 246",
    story:
      "Travel constantly reminds me that growth happens outside familiar environments. Every journey improves adaptability, planning and perspective.",
    images: [
      "https://images.unsplash.com/photo-1587307519295-2605c1396225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzY2VuaWMlMjBtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHRyYXZlbCUyMEluZGlhJTIwaGlsbHMlMjBuYXR1cmV8ZW58MXx8fHwxNzgzMTA0MjA4fDA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1578645546130-a8e4c5becb17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzY2VuaWMlMjBtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHRyYXZlbCUyMEluZGlhJTIwaGlsbHMlMjBuYXR1cmV8ZW58MXx8fHwxNzgzMTA0MjA4fDA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1663089551295-cee8e58807a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzY2VuaWMlMjBtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHRyYXZlbCUyMEluZGlhJTIwaGlsbHMlMjBuYXR1cmV8ZW58MXx8fHwxNzgzMTA0MjA4fDA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1572238916064-69673fdc419f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VuaWMlMjBtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHRyYXZlbCUyMEluZGlhJTIwaGlsbHMlMjBuYXR1cmV8ZW58MXx8fHwxNzgzMTA0MjA4fDA&ixlib=rb-4.1.0&q=80&w=1200",
    ],
  },
  hackathons: {
    id: "hackathons",
    title: "Hackathons",
    emoji: "🚀",
    chip: "🏆 1 Win • 4+ Finals",
    accent: "34, 197, 94",
    story:
      "Hackathons taught me how to build under pressure, collaborate with diverse teams and transform ideas into working products within tight deadlines.",
    achievements: [
      { label: "IIGC Winner", icon: "trophy" },
      { label: "AICodex Finalist", icon: "medal" },
      { label: "Webathon Finalist", icon: "medal" },
    ],
    images: [
      "https://images.unsplash.com/photo-1746396887626-6bd54c6b2181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjB0ZWFtJTIwd2lubmluZyUyMGF3YXJkJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbiUyMHN0YWdlfGVufDF8fHx8MTc4MzA5ODU3Mnww&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwcHJlc2VudGF0aW9uJTIwc3RhZ2UlMjBzdHVkZW50cyUyMGxhcHRvcHN8ZW58MXx8fHwxNzgzMTA0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1756273343749-63f7d6ea0cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwcHJlc2VudGF0aW9uJTIwc3RhZ2UlMjBzdHVkZW50cyUyMGxhcHRvcHN8ZW58MXx8fHwxNzgzMTA0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1200",
      "https://images.unsplash.com/photo-1651608670845-e124df680a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwcHJlc2VudGF0aW9uJTIwc3RhZ2UlMjBzdHVkZW50cyUyMGxhcHRvcHN8ZW58MXx8fHwxNzgzMTA0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1200",
    ],
  },
  learning: {
    id: "learning",
    title: "Continuous Learning",
    emoji: "📚",
    chip: "📚 Always Improving",
    accent: "236, 72, 153",
    story:
      "Learning never stops. From certifications to workshops, I keep sharpening my craft — each certificate below marks a step in an ongoing journey.",
    certificates,
  },
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

// Magnetic button — subtly pulls toward the cursor for a premium feel.
function MagneticButton({
  children,
  className = "",
  href,
  to,
  download,
  target,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  to?: string;
  download?: boolean;
  target?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.25, y: y * 0.25 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const inner = (
    <motion.span
      className={`inline-flex items-center justify-center gap-2 ${className}`}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 14 }}
    >
      {children}
    </motion.span>
  );

  const commonProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: "flex w-full sm:w-auto",
  };

  if (to) {
    return (
      <Link to={to} {...commonProps}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} download={download} target={target} rel={target ? "noreferrer" : undefined} {...commonProps}>
      {inner}
    </a>
  );
}

const primaryBtn =
  "w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors text-sm md:text-base";
const secondaryBtn =
  "w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium text-white text-sm md:text-base";

/* -------------------------------------------------------------------------- */
/*  Timeline item                                                              */
/* -------------------------------------------------------------------------- */

function MobileBuildAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex md:hidden h-[270px] gap-2.5">
      {buildCards.map((card, i) => {
        const Icon = card.icon;
        const isOpen = active === i;

        return (
          <motion.button
            key={card.title}
            type="button"
            onClick={() => setActive(i)}
            aria-expanded={isOpen}
            initial={false}
            animate={{ flexGrow: isOpen ? 7 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexBasis: 0, borderColor: isOpen ? `rgba(${card.accent}, 0.28)` : "rgba(255,255,255,0.08)", transitionProperty: "border-color", transitionDuration: "0.5s" }}
            className="relative rounded-2xl bg-white/[0.03] border overflow-hidden min-w-0 h-full"
          >
            {/* Accent glow */}
            <motion.div
              initial={false}
              animate={{ opacity: isOpen ? 0.4 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-[70px] pointer-events-none"
              style={{ backgroundColor: `rgb(${card.accent})` }}
            />

            {/* ---- EXPANDED CONTENT (pre-laid-out at final width so text never re-wraps) ---- */}
            <motion.div
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 w-[72vw] max-w-[340px] flex flex-col justify-end items-start text-left p-5"
              style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border shrink-0"
                style={{ backgroundColor: `rgba(${card.accent}, 0.12)`, borderColor: `rgba(${card.accent}, 0.25)` }}
              >
                <Icon className="w-4 h-4" style={{ color: `rgb(${card.accent})` }} />
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">{card.title}</h3>
              <p className="text-white/55 text-xs leading-relaxed">{card.desc}</p>
            </motion.div>

            {/* ---- COLLAPSED STRIP ---- */}
            <motion.div
              initial={false}
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-between py-4 pointer-events-none"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0"
                style={{ backgroundColor: `rgba(${card.accent}, 0.10)`, borderColor: `rgba(${card.accent}, 0.20)` }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: `rgb(${card.accent})` }} />
              </div>

              <span
                className="text-[11px] font-medium text-white/45 whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {card.title}
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}

function TimelineItem({ item, index }: { item: (typeof timeline)[number]; index: number }) {
  const Icon = item.icon;
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={`relative flex items-center md:justify-normal justify-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} group`}
    >
      {/* Node */}
      <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-[#0c0c0e] text-white/60 shadow-lg shadow-black/50 group-hover:text-white group-hover:border-white/25 transition-colors">
        <Icon className="w-4 h-4" />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`group/card ml-16 md:ml-0 w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ${isLeft ? "md:mr-auto" : "md:ml-auto"} rounded-3xl bg-white/[0.03] border border-white/8 backdrop-blur-sm hover:border-white/15 hover:bg-white/[0.05] transition-colors shadow-xl overflow-hidden`}
      >
        {/* Image banner */}
        <div className="relative h-36 sm:h-40 overflow-hidden bg-[#111113]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/30 to-transparent z-10" />
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
          />
          <span className="absolute top-3 left-3 z-20 text-xs font-mono text-white px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/15">
            {item.year}
          </span>
          <div className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80">
            <Icon className="w-4 h-4" />
          </div>
        </div>
        {/* Text */}
        <div className="p-6">
          <h4 className="text-lg md:text-xl font-semibold text-white mb-2">{item.title}</h4>
          <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<number | null>(null);
  const [activeInterest, setActiveInterest] = useState<Interest | null>(null);

  // Timeline progress line
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Hero portrait subtle parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(heroProgress, [0, 1], [0, -40]);

  return (
    <div className="text-white/90 relative overflow-clip">
      {/* ================= SECTION 01 — HERO ================= */}
      <section ref={heroRef} className="relative pt-24 md:pt-32 pb-10 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 uppercase tracking-widest mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> About
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-8"
            >
              Beyond <br className="hidden sm:block" /> The Code.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-xl mb-10"
            >
              <p>
                I'm Aman Khan, a Computer Engineering graduate passionate about building digital
                products where engineering, thoughtful design and real-world problem solving come together.
              </p>
              <p>
                Through hackathons, internships, product design and full-stack development, I've focused on
                creating experiences that are not only functional but meaningful.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 w-full sm:w-auto"
            >
              <MagneticButton href="https://github.com" target="_blank" className={primaryBtn}>
                <Github className="w-4 h-4" /> GitHub
              </MagneticButton>
              <MagneticButton href="https://linkedin.com" target="_blank" className={secondaryBtn}>
                <Linkedin className="w-4 h-4" /> LinkedIn
              </MagneticButton>
              <MagneticButton href="/resume.pdf" download className={secondaryBtn}>
                <Download className="w-4 h-4" /> Resume
              </MagneticButton>
              <MagneticButton to="/contact" className={secondaryBtn}>
                <Mail className="w-4 h-4" /> Contact
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — cinematic portrait, blended into the background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Soft purple ambient light behind the person */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(147,51,234,0.22),transparent_60%)] blur-2xl pointer-events-none" />

            <motion.div style={{ y: portraitY }} className="relative w-full">
              <ImageWithFallback
                src={PORTRAIT}
                alt="Aman Khan"
                className="w-full aspect-[4/5] object-cover grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-1000"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 50% 42%, #000 55%, transparent 78%)",
                  maskImage:
                    "radial-gradient(circle at 50% 42%, #000 55%, transparent 78%)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 02 — BUILDING THE FOUNDATION ================= */}
      <section className="relative py-10 px-6 max-w-5xl mx-auto z-10">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">The Journey</h2>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">Building The Foundation</p>
          <p className="text-white/55 text-lg font-light max-w-2xl mx-auto">
            The milestones that shaped my growth as a developer, designer and problem solver.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Base line */}
          <div className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-px bg-white/8" />
          {/* Growing progress line */}
          <motion.div
            style={{ scaleY: lineScale as MotionValue<number> }}
            className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-px origin-top bg-gradient-to-b from-indigo-400 via-purple-500 to-blue-500"
          />

          <div className="space-y-10 md:space-y-14 relative">
            {timeline.map((item, i) => (
              <TimelineItem key={`${item.year}-${item.title}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 03 — WHAT I BUILD ================= */}
      <section className="relative py-10 px-6 max-w-7xl mx-auto z-10">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-12 text-center md:text-left">
          <h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">Expertise</h2>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white">What I Build</p>
        </motion.div>

        {/* Desktop: 3-column grid (unchanged) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {buildCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/8 backdrop-blur-sm hover:border-white/15 transition-colors overflow-hidden"
              >
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: `rgb(${card.accent})` }}
                />
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-7 border transition-colors"
                  style={{ backgroundColor: `rgba(${card.accent}, 0.12)`, borderColor: `rgba(${card.accent}, 0.25)` }}
                >
                  <Icon className="w-6 h-6" style={{ color: `rgb(${card.accent})` }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 relative">{card.title}</h3>
                <p className="text-white/55 leading-relaxed relative">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: horizontal accordion — active card expands, others collapse to narrow strips */}
        <MobileBuildAccordion />
      </section>

      {/* ================= SECTION 04 — FEATURED ACHIEVEMENT ================= */}
      <section className="relative py-10 px-6 max-w-7xl mx-auto z-10">
        <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative">
          {/* Section eyebrow */}
          <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Trophy className="w-3.5 h-3.5" /> Featured Achievement
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left — story */}
            <div className="lg:col-span-5 text-center lg:text-left order-2 lg:order-1">
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-3">
                Winner
              </h2>
              <p className="text-xl md:text-2xl text-amber-200/80 font-light mb-8">IIGC Hackathon 2025</p>
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Built and delivered a complete solution within 36 hours, collaborating under intense
                time constraints and securing 1st place among dozens of competing teams.
              </p>

              {/* Premium glass statistic cards */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[
                  { value: "1st", label: "Place" },
                  { value: "36 Hours", label: "Build Time" },
                  { value: "National", label: "Hackathon" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl overflow-hidden hover:border-amber-400/30 transition-colors"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <p className="relative text-lg md:text-2xl font-bold text-white leading-tight">{stat.value}</p>
                    <p className="relative text-[11px] md:text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Animated accent line connecting stats to the image */}
              <div className="hidden lg:block relative h-10 mt-2 ml-2">
                <svg className="absolute left-0 top-0 overflow-visible" width="100%" height="40">
                  <motion.line
                    x1="0" y1="0" x2="120" y2="40"
                    stroke="url(#accentGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  <defs>
                    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(251,191,36,0.6)" />
                      <stop offset="100%" stopColor="rgba(147,51,234,0.4)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <motion.button
                whileHover={{ x: 4 }}
                onClick={() =>
                  document.getElementById("recognition")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-2 mt-6 text-white/80 hover:text-white transition-colors font-medium"
              >
                Explore Achievements
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Right — real hackathon photograph as centerpiece */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
              {/* Purple ambient glow behind card */}
              <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.28),transparent_65%)] blur-2xl pointer-events-none" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative rounded-[1.5rem] p-1.5 bg-gradient-to-br from-white/15 to-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-sm"
              >
                <div className="relative rounded-[1.15rem] overflow-hidden bg-[#111113]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1746396887626-6bd54c6b2181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoYWNrYXRob24lMjB0ZWFtJTIwd2lubmluZyUyMGF3YXJkJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbiUyMHN0YWdlfGVufDF8fHx8MTc4MzA5ODU3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Winning moment at IIGC Hackathon 2025"
                    className="w-full aspect-[16/11] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Soft dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
                  {/* Soft light reflection sweeping across on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Caption chip */}
                  <div className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
                    <span className="text-base">🏆</span>
                    <span className="text-white text-sm font-medium">1st Place · IIGC 2025</span>
                  </div>
                </div>

                {/* Subtle floating glass particles */}
                <motion.div
                  animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 right-10 w-3 h-3 rounded-full bg-white/40 backdrop-blur-md border border-white/30 shadow-lg"
                />
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-amber-300/60 shadow-lg"
                />
                <motion.div
                  animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -bottom-2 left-16 w-2.5 h-2.5 rounded-full bg-purple-300/50 shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 05 — BEYOND THE CODE (BENTO) ================= */}
      <section className="relative py-10 px-6 max-w-7xl mx-auto z-10">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-12 text-center md:text-left">
          <h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">Life & Interests</h2>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Beyond The Code</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[168px] sm:auto-rows-[190px] gap-4 md:gap-5">
          {bento.map((card, i) => (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => setActiveInterest(interestModals[card.id])}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative text-left cursor-pointer rounded-[1.4rem] border border-white/10 hover:border-white/25 transition-[border-color,box-shadow] duration-300 overflow-hidden flex flex-col justify-end p-5 sm:p-6 shadow-lg hover:shadow-2xl ${card.span}`}
            >
              {/* Background image */}
              <ImageWithFallback
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Readability overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              {/* Accent ambient glow on hover */}
              <div
                className="absolute -bottom-16 -right-10 w-40 h-40 rounded-full blur-[70px] opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: `rgb(${card.accent})` }}
              />
              {/* Glass reflection sheen */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative">
                <div className="text-3xl sm:text-4xl mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-left w-fit drop-shadow-lg">
                  {card.emoji}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 leading-tight">{card.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2.5">{card.desc}</p>
                {/* Metadata chip */}
                <span className="inline-flex items-center text-[11px] font-medium text-white/80 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                  {card.chip}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ================= SECTION 06 — PROOF OF THE JOURNEY ================= */}
      <section id="recognition" className="relative py-10 px-6 max-w-7xl mx-auto z-10 scroll-mt-28">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3">Recognition</h2>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">Proof Of The Journey</p>
          <p className="text-white/55 text-lg font-light max-w-2xl mx-auto">
            The certifications and recognitions earned throughout my learning journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {certificates.slice(0, 4).map((cert, i) => (
            <motion.button
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              onClick={() => {
                setModalOpen(true);
                setActiveCert(i);
              }}
              className="group relative text-left rounded-[1.4rem] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-white/25 transition-colors shadow-xl"
            >
              {/* Hover accent glow */}
              <div className="absolute -inset-px rounded-[1.4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none z-0" />

              <div className="relative aspect-[4/3] overflow-hidden bg-[#111113] m-1.5 rounded-[1.1rem]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                <ImageWithFallback
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Number chip */}
                <div className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-xs font-mono text-white/90">
                  {i + 1}
                </div>
                {/* View hint on hover */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Maximize2 className="w-3 h-3" /> View
                </div>
              </div>
              <div className="relative px-4 pb-4 md:px-5 md:pb-5 pt-1">
                <h4 className="text-white font-medium text-sm md:text-base group-hover:text-indigo-300 transition-colors">{cert.title}</h4>
                <p className="text-white/50 text-xs md:text-sm mt-0.5">{cert.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setModalOpen(true);
              setActiveCert(null);
            }}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors font-medium"
          >
            View All Certificates
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* ================= SECTION 07 — PERSONAL PHILOSOPHY ================= */}
      <section className="relative py-20 md:py-28 px-6 max-w-5xl mx-auto z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl md:text-8xl text-white/10 font-serif leading-none mb-2 select-none">"</div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-3xl md:text-5xl font-light tracking-tight text-white leading-[1.3] -mt-8"
          >
            I believe great products are built where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300">curiosity meets consistency</span>,
            and where every line of code solves a real problem for real people.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= SECTION 08 — CLOSING CTA ================= */}
      <section className="relative py-10 px-6 max-w-4xl mx-auto z-10">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="relative p-10 md:p-16 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[360px] h-[360px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

          <h2 className="relative text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Let's Build Something Meaningful.
          </h2>
          <p className="relative text-white/60 text-lg mb-10 max-w-xl mx-auto font-light">
            I'm always excited to collaborate on impactful software, creative ideas and opportunities
            that challenge me to grow.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <MagneticButton to="/contact" className={primaryBtn}>
              <Mail className="w-4 h-4" /> Let's Talk
            </MagneticButton>
            <MagneticButton href="/resume.pdf" download className={secondaryBtn}>
              <Download className="w-4 h-4" /> View Resume
            </MagneticButton>
            <MagneticButton href="https://github.com" target="_blank" className={secondaryBtn}>
              <Github className="w-4 h-4" /> GitHub
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* ================= CERTIFICATES MODAL ================= */}
      <CertificatesModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setActiveCert(null);
        }}
        certificates={certificates}
        activeIndex={activeCert}
        setActiveIndex={setActiveCert}
      />

      {/* Beyond the Code — interest storytelling modal */}
      <BeyondCodeModal interest={activeInterest} onClose={() => setActiveInterest(null)} />
    </div>
  );
}
