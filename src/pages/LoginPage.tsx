import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthForm } from "@/components/AuthForm";
import { ShoppingBag, Store, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { role } = useParams<{ role?: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Validate role parameter
    if (role && !["buyer", "seller", "middleman"].includes(role)) {
      navigate("/");
    }
  }, [role, navigate]);

  if (!role) {
    return (
      <AuthLayout 
        title="Login" 
        subtitle="Welcome back! Please select your account type."
        className="bg-gradient-to-r from-blue-50 to-indigo-50"
        showBackLink={true}
        backLinkUrl="/"
        backLinkText=""
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
          {[
            {
              to: "/login/buyer",
              bg: "bg-blue-50",
              iconBg: "bg-blue-500",
              icon: <ShoppingBag size={24} />, 
              title: "Buyer",
              titleColor: "text-blue-600",
              desc: "Access your buyer account"
            },
            {
              to: "/login/seller",
              bg: "bg-green-50",
              iconBg: "bg-green-500",
              icon: <Store size={24} />, 
              title: "Seller",
              titleColor: "text-green-600",
              desc: "Access your seller dashboard"
            },
            {
              to: "/login/middleman",
              bg: "bg-purple-50",
              iconBg: "bg-purple-500",
              icon: <UserCheck size={24} />, 
              title: "Middleman",
              titleColor: "text-purple-600",
              desc: "Access your middleman account"
            }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 * i, type: 'spring' }}
            >
              <Link to={card.to} className="hover:scale-105 transition-transform duration-200 block h-full">
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
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center text-gray-500 text-base">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>

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
      title={`${formattedRole} Login`} 
      subtitle={`Welcome back! Login to access your ${role} dashboard.`}
      className="bg-gradient-to-r from-blue-50 to-indigo-50"
      showBackLink={true}
      backLinkUrl="/login"
      backLinkText=""
    >
      <AuthForm type="login" role={role as "buyer" | "seller" | "middleman" | "admin"} />
      {role !== "admin" && (
        <p className="text-center text-base mt-6">
          Don't have an account?{" "}
          <Link to={`/signup/${role}`} className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      )}

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

export default LoginPage;
