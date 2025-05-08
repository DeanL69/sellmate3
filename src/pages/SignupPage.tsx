import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthForm } from "@/components/AuthForm";
import { ShoppingBag, Store, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';

const SignupPage = () => {
  const { role } = useParams<{ role?: string }>();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  useEffect(() => {
    if (role && !["buyer", "seller", "middleman"].includes(role)) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleRoleSelect = (selectedRole: string) => {
    setShowTerms(true);
    sessionStorage.setItem("selectedRole", selectedRole);
  };

  const handleAcceptTerms = () => {
    setShowTerms(false);
    setTermsAccepted(true);
    const selectedRole = sessionStorage.getItem("selectedRole");
    if (selectedRole) {
      navigate(`/signup/${selectedRole}`);
    }
  };

  if (!role) {
    return (
      <AuthLayout 
        title="Sign Up" 
        subtitle="Select your role to create an account"
        className="bg-gradient-to-r from-blue-50 to-indigo-50"
        showBackLink={true}
        backLinkUrl="/"
        backLinkText=""
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
          {[
            {
              role: "buyer",
              bg: "bg-blue-50",
              iconBg: "bg-blue-500",
              icon: <ShoppingBag size={24} />, 
              title: "Buyer",
              titleColor: "text-blue-600",
              desc: "Find trusted middlemen to help with your purchases"
            },
            {
              role: "seller",
              bg: "bg-green-50",
              iconBg: "bg-green-500",
              icon: <Store size={24} />, 
              title: "Seller",
              titleColor: "text-green-600",
              desc: "Sell your products with secure transaction support"
            },
            {
              role: "middleman",
              bg: "bg-purple-50",
              iconBg: "bg-purple-500",
              icon: <UserCheck size={24} />, 
              title: "Middleman",
              titleColor: "text-purple-600",
              desc: "Facilitate safe exchanges between buyers and sellers"
            }
          ].map((card, i) => (
            <motion.div
              key={card.role}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 * i, type: 'spring' }}
            >
              <div className="hover:scale-105 transition-transform duration-200 cursor-pointer h-full" onClick={() => handleRoleSelect(card.role)}>
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
        
        <div className="mt-10 text-center text-gray-500 text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>

        <Dialog open={showTerms} onOpenChange={setShowTerms}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>
                Please read and accept our terms of service before continuing
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh]">
              <div className="p-5 space-y-5">
                <h3 className="font-semibold text-lg">1. Introduction</h3>
                <p className="text-sm text-gray-700">
                  Welcome to Sellmate ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at sellmate.com (together or individually "Service") operated by Sellmate.
                </p>
                
                <h3 className="font-semibold text-lg">2. User Accounts</h3>
                <p className="text-sm text-gray-700">
                  When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                
                <h3 className="font-semibold text-lg">3. Middleman Services</h3>
                <p className="text-sm text-gray-700">
                  Sellmate provides a platform that connects buyers, sellers, and middlemen to facilitate secure transactions. Middlemen on our platform are independent contractors and not employees of Sellmate.
                </p>
                
                <h3 className="font-semibold text-lg">4. Fees and Payment</h3>
                <p className="text-sm text-gray-700">
                  Sellmate charges a service fee for transactions facilitated through our platform. The fee structure is clearly displayed before you confirm a transaction. All payments are in Philippine Pesos (₱).
                </p>
                
                <h3 className="font-semibold text-lg">5. Prohibited Uses</h3>
                <p className="text-sm text-gray-700">
                  You may use our Service only for lawful purposes and in accordance with Terms. You agree not to use our Service for any illegal purpose or to solicit others to perform or participate in any unlawful acts.
                </p>
                
                <h3 className="font-semibold text-lg">6. Termination</h3>
                <p className="text-sm text-gray-700">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                
                <h3 className="font-semibold text-lg">7. Limitation of Liability</h3>
                <p className="text-sm text-gray-700">
                  In no event shall Sellmate, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
                </p>
                
                <h3 className="font-semibold text-lg">8. Changes to Terms</h3>
                <p className="text-sm text-gray-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>

                <h3 className="font-semibold text-lg">9. Currency</h3>
                <p className="text-sm text-gray-700">
                  All monetary transactions and price displays on Sellmate are in Philippine Pesos (₱).
                </p>
              </div>
            </ScrollArea>
            <DialogFooter className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the terms and conditions
                </label>
              </div>
              <Button 
                onClick={handleAcceptTerms} 
                disabled={!termsAccepted}
                className="text-base py-2 px-6"
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <footer className="mt-10 text-center text-sm text-gray-500">
          <div className="flex justify-center flex-wrap space-x-4 mb-2">
            <Link to="/about" className="hover:text-blue-600">About Us</Link>
            <Link to="/careers" className="hover:text-blue-600">Careers</Link>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link to="/security" className="hover:text-blue-600">Security</Link>
          </div>
          <p>© {new Date().getFullYear()} Sellmate. All rights reserved.</p>
        </footer>
      </AuthLayout>
    );
  }

  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <AuthLayout 
      title={`${formattedRole} Sign Up`} 
      subtitle={`Create your ${role} account to get started`}
      className="bg-gradient-to-r from-blue-50 to-indigo-50"
      showBackLink={true}
      backLinkUrl="/signup"
      backLinkText=""
    >
      <AuthForm type="signup" role={role as "buyer" | "seller" | "middleman"} />
      <p className="text-center text-base mt-6">
        Already have an account?{" "}
        <Link to={`/login/${role}`} className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>

      <footer className="mt-10 text-center text-sm text-gray-500">
        <div className="flex justify-center flex-wrap space-x-4 mb-2">
          <Link to="/about" className="hover:text-blue-600">About Us</Link>
          <Link to="/careers" className="hover:text-blue-600">Careers</Link>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link to="/security" className="hover:text-blue-600">Security</Link>
        </div>
        <p>© {new Date().getFullYear()} Sellmate. All rights reserved.</p>
      </footer>
    </AuthLayout>
  );
};

export default SignupPage;
