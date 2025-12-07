import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    try {
      if (mode === "login") {
        await login(email, password);
        toast.success("Logged in successfully! 🎉");
      } else {
        await register(name, email, password);
        toast.success("Account created successfully! 🚀");
      }

      //redirect to home (quiz page)
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex items-center justify-center px-4">
      {/* background effects */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-32 -left-40 h-80 w-80 rounded-full bg-indigo-600/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-slate-900/90 border border-slate-700/70 shadow-[0_0_30px_-8px_rgba(80,70,255,0.4)] backdrop-blur-xl rounded-2xl">
          <CardHeader className="space-y-1 text-center">
            <motion.p
              className="text-xs uppercase tracking-[0.25em] text-indigo-400"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              AI QUIZ STUDIO
            </motion.p>
            <motion.h1
              className="text-3xl font-bold text-slate-50"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {mode === "login"
                ? "Welcome back 👋"
                : "Join the quiz revolution"}
            </motion.h1>
            <p className="text-sm text-slate-300">
              {mode === "login"
                ? "Sign in to continue your personalised learning."
                : "Create your account and unlock AI-powered quizzes."}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-slate-200 font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Deepak Verma"
                    className="bg-slate-800/60 border-slate-700/70 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="email" className="text-slate-200 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-slate-800/60 border-slate-700/70 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="password"
                  className="text-slate-200 font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="bg-slate-800/60 border-slate-700/70 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
                  required
                />
              </div>

              {formError && (
                <p className="text-xs text-red-400 font-medium text-center -mt-1">
                  {formError}
                </p>
              )}

              <Button
                className="
                  w-full mt-3
                  bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
                  hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400
                  shadow-lg shadow-indigo-500/30
                  text-white font-semibold tracking-wide rounded-xl
                "
                type="submit"
                disabled={loading}
                asChild
              >
                <motion.button whileTap={{ scale: 0.97 }}>
                  {loading
                    ? "Please wait..."
                    : mode === "login"
                    ? "Login"
                    : "Create account"}
                </motion.button>
              </Button>

              <button
                type="button"
                className="w-full text-xs text-slate-400 mt-4 hover:text-slate-200 transition"
                onClick={() => {
                  setFormError("");
                  setMode((m) => (m === "login" ? "register" : "login"));
                }}
              >
                {mode === "login"
                  ? "New here? Create an account"
                  : "Already have an account? Login"}
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
