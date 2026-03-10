"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Apple,
  HandCoins,
  HeartHandshake,
  Megaphone,
  Stethoscope,
  GraduationCap,
  Scale,
  Users,
  Vote,
  ShieldAlert,
  Landmark,
  Link2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ArrowLeft,
  X,
  Search,
  Accessibility,
  type LucideIcon,
} from "lucide-react";
import { getQuestion, getStartQuestion, getServices } from "@/lib/directory";
import type { Question, ServiceResult, QuestionOption } from "@/types/directory";

const iconMap: Record<string, LucideIcon> = {
  Apple,
  HandCoins,
  HeartHandshake,
  Megaphone,
  Stethoscope,
  GraduationCap,
  Scale,
  Users,
  Vote,
  ShieldAlert,
  Landmark,
  Link2,
};

type Step =
  | { type: "welcome" }
  | { type: "question"; question: Question }
  | { type: "location"; serviceIds: string[]; fromLabel: string }
  | { type: "result"; services: ServiceResult[]; fromLabel: string; suburb: string };

export default function FindServicesPage() {
  const [step, setStep] = useState<Step>({ type: "welcome" });
  const [history, setHistory] = useState<Step[]>([]);
  const [transitioning, setTransitioning] = useState(false);

  const navigateTo = useCallback(
    (next: Step) => {
      setTransitioning(true);
      setTimeout(() => {
        setHistory((h) => [...h, step]);
        setStep(next);
        setTransitioning(false);
      }, 200);
    },
    [step]
  );

  const goBack = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setHistory((h) => {
        const prev = h[h.length - 1];
        if (prev) setStep(prev);
        return h.slice(0, -1);
      });
      setTransitioning(false);
    }, 200);
  }, []);

  const handleStart = () => {
    navigateTo({ type: "question", question: getStartQuestion() });
  };

  const handleOption = (option: QuestionOption) => {
    if (option.services) {
      // Go to location step before showing results
      navigateTo({ type: "location", serviceIds: option.services, fromLabel: option.label });
    } else if (option.next) {
      const nextQ = getQuestion(option.next);
      if (nextQ) navigateTo({ type: "question", question: nextQ });
    }
  };

  const handleLocationSubmit = (suburb: string) => {
    if (step.type === "location") {
      const services = getServices(step.serviceIds);
      navigateTo({ type: "result", services, fromLabel: step.fromLabel, suburb });
    }
  };

  const handleStartOver = () => {
    setTransitioning(true);
    setTimeout(() => {
      setHistory([]);
      setStep({ type: "welcome" });
      setTransitioning(false);
    }, 200);
  };

  // Progress tracking
  const totalSteps = 4;
  const currentStep =
    step.type === "welcome"
      ? 0
      : step.type === "result"
        ? totalSteps
        : step.type === "location"
          ? totalSteps - 1
          : history.length;
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="w-full border-b border-zinc-100">
        <div className="flex items-center justify-between px-5 md:px-8 h-14">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/brand/icv-logo.png"
              alt="ICV"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-zinc-100">
          <div
            className="h-full bg-icv-green transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-5 md:px-8 pt-12 md:pt-20 pb-16">
        <div
          className={`w-full transition-all duration-200 ${
            step.type === "result" ? "max-w-4xl" : "max-w-2xl"
          } ${
            transitioning
              ? "opacity-0 translate-y-3"
              : "opacity-100 translate-y-0"
          }`}
        >
          {step.type === "welcome" && (
            <WelcomeScreen onStart={handleStart} />
          )}

          {step.type === "question" && (
            <QuestionScreen
              question={step.question}
              onSelect={handleOption}
              onBack={history.length > 0 ? goBack : undefined}
            />
          )}

          {step.type === "location" && (
            <LocationScreen
              onSubmit={handleLocationSubmit}
              onBack={goBack}
            />
          )}

          {step.type === "result" && (
            <ResultScreen
              services={step.services}
              fromLabel={step.fromLabel}
              suburb={step.suburb}
              onBack={goBack}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Welcome ────────────────────────────────────────────────── */

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <p className="text-sm font-medium text-icv-green uppercase tracking-wider mb-4">
        ICV Service Finder
      </p>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-heading leading-tight mb-4">
        Find the right support
      </h1>
      <p className="text-lg md:text-xl text-foreground/55 mb-10 max-w-lg">
        Answer a few quick questions and we&apos;ll direct you to the ICV
        service that can help.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-3.5 bg-icv-green hover:bg-icv-green-dark text-white font-medium text-base transition-colors"
      >
        Get started
      </button>
      <p className="mt-8 text-sm text-foreground/40">
        Takes about 30 seconds. You can also call us directly at{" "}
        <a
          href="tel:0393282067"
          className="text-icv-green-dark hover:underline"
        >
          (03) 9328 2067
        </a>
      </p>
    </div>
  );
}

/* ── Question ───────────────────────────────────────────────── */

function QuestionScreen({
  question,
  onSelect,
  onBack,
}: {
  question: Question;
  onSelect: (option: QuestionOption) => void;
  onBack?: () => void;
}) {
  return (
    <div>
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/70 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
      <h2 className="text-2xl md:text-3xl font-medium text-heading mb-2">
        {question.title}
      </h2>
      {question.subtitle && (
        <p className="text-base md:text-lg text-foreground/50 mb-8">
          {question.subtitle}
        </p>
      )}
      {!question.subtitle && <div className="mb-8" />}

      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const Icon = iconMap[option.icon] ?? Users;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className="group flex items-center gap-4 w-full text-left border border-zinc-200 hover:border-icv-green p-5 md:p-6 transition-all"
            >
              <div className="w-10 h-10 bg-zinc-100 group-hover:bg-icv-green flex items-center justify-center shrink-0 transition-colors">
                <Icon className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-base md:text-lg font-medium text-heading block">
                  {option.label}
                </span>
                <span className="text-sm md:text-base text-foreground/50 mt-0.5 block">
                  {option.description}
                </span>
              </div>
              <svg
                className="w-5 h-5 text-zinc-300 group-hover:text-icv-green shrink-0 transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Location ───────────────────────────────────────────────── */

function LocationScreen({
  onSubmit,
  onBack,
}: {
  onSubmit: (suburb: string) => void;
  onBack: () => void;
}) {
  const [suburb, setSuburb] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(suburb.trim() || "Melbourne");
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/70 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="text-2xl md:text-3xl font-medium text-heading mb-2">
        Where are you located?
      </h2>
      <p className="text-base md:text-lg text-foreground/50 mb-8">
        Enter your suburb or postcode so we can show the most relevant services near you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="suburb-input"
            className="block text-sm font-medium text-heading mb-2"
          >
            Suburb or postcode
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              id="suburb-input"
              type="text"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              placeholder="e.g. Craigieburn or 3064"
              className="w-full pl-12 pr-4 py-4 border border-zinc-200 text-base text-heading placeholder:text-zinc-400 focus:outline-none focus:border-icv-green transition-colors"
              autoFocus
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="px-8 py-3.5 bg-icv-green hover:bg-icv-green-dark text-white font-medium text-base transition-colors"
          >
            Show results
          </button>
          <button
            type="button"
            onClick={() => onSubmit("Melbourne")}
            className="px-6 py-3.5 text-base text-foreground/40 hover:text-foreground/60 transition-colors"
          >
            Skip — show all results
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Result ──────────────────────────────────────────────────── */

function ResultScreen({
  services,
  fromLabel,
  suburb,
  onBack,
  onStartOver,
}: {
  services: ServiceResult[];
  fromLabel: string;
  suburb: string;
  onBack: () => void;
  onStartOver: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/70 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <p className="text-sm font-medium text-icv-green uppercase tracking-wider mb-2">
        {fromLabel}
      </p>
      <h2 className="text-2xl md:text-3xl font-medium text-heading mb-2">
        {services.length} {services.length === 1 ? "service" : "services"} found
        {suburb && suburb !== "Melbourne" && (
          <span className="text-foreground/40"> near {suburb}</span>
        )}
      </h2>
      <p className="text-base text-foreground/50 mb-8">
        Contact any of the services below for support. Results are based on your answers.
      </p>

      <div className="flex flex-col gap-4">
        {services.map((service) => (
          <DirectoryCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onStartOver}
          className="px-6 py-3 border border-zinc-200 text-base font-medium text-foreground/70 hover:bg-zinc-50 transition-colors"
        >
          Find a different service
        </button>
        <Link
          href="/"
          className="px-6 py-3 text-base text-foreground/40 hover:text-foreground/60 transition-colors text-center"
        >
          Return to ICV homepage
        </Link>
      </div>
    </div>
  );
}

/* ── Directory Card ──────────────────────────────────────────── */

function DirectoryCard({ service }: { service: ServiceResult }) {
  const [expanded, setExpanded] = useState(false);

  const isOpen = service.status?.toLowerCase().startsWith("open");
  const isClosed = service.status?.toLowerCase().startsWith("closed");
  const is247 = service.status?.includes("24/7");

  return (
    <div className="border border-zinc-200 bg-white">
      {/* Header */}
      <div className="p-5 md:p-6">
        {/* Service name + org */}
        <h3 className="text-lg md:text-xl font-medium text-heading mb-0.5">
          {service.name}
        </h3>
        {service.organisation && (
          <p className="text-sm text-foreground/50 mb-3">
            {service.organisation}
          </p>
        )}

        {/* Location + Status row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm mb-3">
          {service.location && (
            <span className="inline-flex items-center gap-1.5 text-foreground/60">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              Service located in <span className="font-medium text-heading">{service.location}</span>
            </span>
          )}
          {service.status && (
            <span
              className={`inline-flex items-center gap-1.5 ${
                isOpen || is247
                  ? "text-green-700"
                  : isClosed
                    ? "text-red-600"
                    : "text-foreground/60"
              }`}
            >
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Service is currently <span className="font-medium">{service.status}</span>
            </span>
          )}
        </div>

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-1 bg-icv-green/10 text-icv-green-dark text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-foreground/60 leading-relaxed">
          {service.description}
        </p>

        {/* Expandable details */}
        {(service.eligibilityList || service.accessibility) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm font-medium text-icv-green-dark hover:underline"
          >
            {expanded ? "Show less" : "Show details"}
          </button>
        )}

        {expanded && (
          <div className="mt-4 pt-4 border-t border-zinc-100 space-y-4">
            {/* Eligibility list */}
            {service.eligibilityList && service.eligibilityList.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
                  Eligibility
                </p>
                <ul className="space-y-1.5">
                  {service.eligibilityList.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-foreground/65 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accessibility */}
            {service.accessibility && (
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Accessibility className="w-4 h-4 text-icv-green-dark shrink-0" />
                <span>
                  Service has <span className="font-medium text-heading">{service.accessibility}</span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact bar */}
      <div className="border-t border-zinc-100 px-5 md:px-6 py-3 flex flex-wrap items-center gap-4">
        {service.phone && (
          <a
            href={`tel:${service.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-icv-green-dark hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            {service.phone}
          </a>
        )}
        {service.email && (
          <a
            href={`mailto:${service.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-icv-green-dark hover:underline"
          >
            <Mail className="w-3.5 h-3.5" />
            {service.email}
          </a>
        )}
        {service.website && (
          <a
            href={service.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-icv-green-dark hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Visit website
          </a>
        )}
        {service.address && (
          <span className="inline-flex items-center gap-2 text-sm text-foreground/50">
            <MapPin className="w-3.5 h-3.5" />
            {service.address}
          </span>
        )}
      </div>
    </div>
  );
}
