import type { ReactNode } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const onDashboard = location.pathname === "/dashboard";
  const onQuiz = location.pathname === "/";

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-indigo-600/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
      </div>

      {/* top nav */}
      <header className="relative z-20 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
          {/* logo with title */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/90 text-sm font-bold">
              QZ
            </div>
            <div>
              <div className="text-sm font-semibold">
                Quizzy AI-Powered Quiz
              </div>
              <div className="text-[11px] text-slate-400">
                Powered by Gemini
              </div>
            </div>
          </motion.div>

          {user && (
            <>
              {/* Desktop / tablet nav */}
              <motion.div
                className="hidden sm:flex items-center gap-4 text-xs"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {/* Nav buttons */}
                <div className="flex items-center gap-2">
                  <Link to="/">
                    <Button
                      size="sm"
                      className={`
                        px-5 font-semibold transition-all rounded-xl
                        ${
                          onQuiz
                            ? "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-slate-800/60 border border-slate-700 text-slate-300 hover:bg-slate-700/60"
                        }
                      `}
                    >
                      Quiz
                    </Button>
                  </Link>

                  <Link to="/dashboard">
                    <Button
                      size="sm"
                      className={`
                        px-5 font-semibold transition-all rounded-xl
                        ${
                          onDashboard
                            ? "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-slate-800/60 border border-slate-700 text-slate-300 hover:bg-slate-700/60"
                        }
                      `}
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>

                {/* User info */}
                <div className="flex flex-col items-end">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-slate-400 text-[11px]">
                    {user.email}
                  </span>
                </div>

                {/* Logout */}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-700/70 bg-slate-900/60 hover:bg-slate-800"
                  onClick={logout}
                >
                  Logout
                </Button>
              </motion.div>

              {/* Mobile hamburger */}
              <div className="sm:hidden flex items-center gap-2">
                <div className="flex flex-col items-end text-[11px] leading-tight">
                  <span className="font-medium max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <span className="text-slate-400 max-w-[140px] truncate">
                    {user.email}
                  </span>
                </div>

                <button
                  aria-label="Toggle navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-900/70 hover:bg-slate-800 transition-colors"
                  onClick={() => setMobileOpen((o) => !o)}
                >
                  {/* simple hamburger icon */}
                  <div className="space-y-1.5">
                    <span className="block h-0.5 w-5 bg-slate-200 rounded-full" />
                    <span className="block h-0.5 w-5 bg-slate-200 rounded-full" />
                    <span className="block h-0.5 w-5 bg-slate-200 rounded-full" />
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {user && mobileOpen && (
            <motion.div
              className="sm:hidden mx-auto max-w-5xl px-4 pb-3"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <div className="rounded-2xl border border-slate-800 bg-slate-900/95 shadow-lg shadow-black/40 p-3 space-y-3">
                <div className="flex flex-col gap-2">
                  <Link to="/" onClick={closeMobile}>
                    <Button
                      size="sm"
                      className={`
                        w-full justify-center rounded-xl font-semibold
                        ${
                          onQuiz
                            ? "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-slate-800/70 border border-slate-700 text-slate-200 hover:bg-slate-700/70"
                        }
                      `}
                    >
                      Quiz
                    </Button>
                  </Link>

                  <Link to="/dashboard" onClick={closeMobile}>
                    <Button
                      size="sm"
                      className={`
                        w-full justify-center rounded-xl font-semibold
                        ${
                          onDashboard
                            ? "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-slate-800/70 border border-slate-700 text-slate-200 hover:bg-slate-700/70"
                        }
                      `}
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800 mt-1">
                  <div className="flex flex-col text-[11px]">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-slate-400">{user.email}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-700/70 bg-slate-900/70 hover:bg-slate-800"
                    onClick={() => {
                      closeMobile();
                      logout();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* main */}
      <main className="relative z-10 mx-auto flex max-w-5xl px-4 pb-8 pt-6">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
