import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { Store, BarChart, Package, CreditCard, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SellerDashboard = () => {
  const dashboardCards = [
    {
      title: "Products",
      description: "Manage your product listings",
      icon: <Store className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/products"
    },
    {
      title: "Sales Analytics",
      description: "View your sales performance",
      icon: <BarChart className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/analytics"
    },
    {
      title: "Orders",
      description: "Track and fulfill customer orders",
      icon: <Package className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/orders"
    },
    {
      title: "Payments",
      description: "View and manage your payments",
      icon: <CreditCard className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/payments"
    },
    {
      title: "Messages",
      description: "Chat with middlemen and buyers",
      icon: <MessageCircle className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/chat"
    },
  ];

  return (
    <div className="page-container">
      <NavBar userType="seller" />
      <main className="flex-1 bg-green-50">
        <div className="container mx-auto px-4 py-8">
          {/* <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {dashboardCards.map((card, index) => (
              <Link to={card.link} key={index}>
                <Card className="dashboard-card hover:border-green-300 transition-all hover:shadow-md cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-4 p-6">
                    {card.icon}
                    <h2 className="text-xl font-semibold">{card.title}</h2>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <p className="text-gray-500 text-center py-8">No recent orders</p>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} <span className="text-black">Sell</span><span className="text-blue-600">Mate</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default SellerDashboard;
