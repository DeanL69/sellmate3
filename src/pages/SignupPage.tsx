import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthForm } from "@/components/AuthForm";
import { ShoppingBag, Store, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SignupPage = () => {
  const [step, setStep] = useState<"form" | "role">("form");
  const [signupRole, setSignupRole] = useState<"buyer" | "seller" | "middleman">("buyer");
  const [showMiddlemanDialog, setShowMiddlemanDialog] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();

  // Called after successful signup
  const handleSignupSuccess = (userData) => {
    setSignupName(userData.name);
    setSignupEmail(userData.email);
    setSignupPassword(userData.password);
    setStep("role");
  };

  // Called after role selection
  const handleRoleSelect = (role: string) => {
    setSignupRole(role as "buyer" | "seller" | "middleman");
    if (role === "buyer") {
      navigate("/dashboard/buyer");
    } else if (role === "seller") {
      navigate("/dashboard/seller");
    } else if (role === "middleman") {
      setShowMiddlemanDialog(true);
    }
  };

  const handleConfirmMiddleman = () => {
    setShowMiddlemanDialog(false);
    navigate("/apply/middleman", { state: { name: signupName, email: signupEmail, password: signupPassword } });
  };

  const handleCancelMiddleman = () => {
    setShowMiddlemanDialog(false);
  };

  return (
    <AuthLayout
      title={step === "form" ? "Sign Up" : "Sign Up"}
      subtitle={step === "form" ? "" : "Select your role to create an account"}
      className="bg-gradient-to-r from-blue-50 to-indigo-50"
      showBackLink={true}
      backLinkUrl="/"
      backLinkText=""
    >
      {step === "form" ? (
        <>
          <AuthForm type="signup" role={signupRole} onSuccess={handleSignupSuccess} />
          <p className="text-center text-base mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
            {[
              {
                role: "buyer",
                bg: "bg-blue-50",
                iconBg: "bg-blue-500",
                icon: <ShoppingBag size={24} />, 
                title: "Buyer",
                titleColor: "text-blue-600",
                desc: "Find trusted middlemen to help with your purchases",
                locked: false
              },
              {
                role: "seller",
                bg: "bg-green-50",
                iconBg: "bg-green-500",
                icon: <Store size={24} />, 
                title: "Seller",
                titleColor: "text-green-600",
                desc: "Sell your products with secure transaction support",
                locked: false
              },
              {
                role: "middleman",
                bg: "bg-purple-50",
                iconBg: "bg-purple-500",
                icon: <UserCheck size={24} />, 
                title: "Middleman",
                titleColor: "text-purple-600",
                desc: "Facilitate safe exchanges between buyers and sellers",
                locked: true
              }
            ].map((card, i) => (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * i, type: 'spring' }}
              >
                <div
                  className={`hover:scale-105 transition-transform duration-200 h-full ${card.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !card.locked ? handleRoleSelect(card.role) : setShowMiddlemanDialog(true)}
                >
                  <Card className={`overflow-hidden ${card.bg} border-none hover:shadow-md transition-all h-full`}>
                    <div className="p-6 flex flex-col items-center text-center">
                      <motion.div
                        className={`${card.iconBg} text-white rounded-full p-4 mb-4`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.1 * i }}
                      >
                        {card.icon}
                      </motion.div>
                      <h3 className={`text-xl font-semibold ${card.titleColor}`}>{card.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{card.desc}</p>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
          <Dialog open={showMiddlemanDialog} onOpenChange={setShowMiddlemanDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Apply for Middleman</DialogTitle>
              </DialogHeader>
              <div className="py-4 text-base">Do you want to apply for middleman?</div>
              <DialogFooter className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleCancelMiddleman}>Cancel</Button>
                <Button onClick={handleConfirmMiddleman}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
      <footer className="mt-10 text-center text-sm text-gray-500">
        <div className="flex justify-center flex-wrap space-x-4 mb-2">
          <a href="/about" className="hover:text-blue-600">About Us</a>
          <a href="/careers" className="hover:text-blue-600">Careers</a>
          <a href="/blog" className="hover:text-blue-600">Blog</a>
          <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
          <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
          <a href="/security" className="hover:text-blue-600">Security</a>
        </div>
        <p>© {new Date().getFullYear()} Sellmate. All rights reserved.</p>
      </footer>
    </AuthLayout>
  );
};

export default SignupPage;
