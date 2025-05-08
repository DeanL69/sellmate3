import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'active' | 'sold';
}

const ProductsPage = () => {
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 299.99,
      category: 'Electronics',
      status: 'active',
    },
    {
      id: '2',
      name: 'Smartphone XL',
      price: 899.99,
      category: 'Electronics',
      status: 'active',
    },
    {
      id: '3',
      name: 'Designer T-shirt',
      price: 49.99,
      category: 'Clothing',
      status: 'sold',
    },
    {
      id: '4',
      name: 'Running Shoes',
      price: 129.99,
      category: 'Clothing',
      status: 'sold',
    }
  ];

  const handleGoBack = () => {
    navigate('/dashboard/seller');
  };

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'sold': return <Badge className="bg-blue-100 text-blue-800">Sold</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="page-container">
      <NavBar userType="seller" />
      <main className="flex-1 bg-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleGoBack} className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
              <h1 className="text-3xl font-bold">My Products</h1>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Manage Your Product Catalog</CardTitle>
              <CardDescription>
                Add, edit, and organize your product listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="sold">Sold</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <ProductsList products={products} getStatusBadge={getStatusBadge} />
                </TabsContent>

                <TabsContent value="active" className="mt-0">
                  <ProductsList 
                    products={products.filter(product => product.status === 'active')} 
                    getStatusBadge={getStatusBadge} 
                  />
                </TabsContent>

                <TabsContent value="sold" className="mt-0">
                  <ProductsList 
                    products={products.filter(product => product.status === 'sold')} 
                    getStatusBadge={getStatusBadge} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} MultiPortal. All rights reserved.
      </footer>
    </div>
  );
};

const ProductsList = ({ 
  products, 
  getStatusBadge 
}: { 
  products: Product[],
  getStatusBadge: (status: Product['status']) => React.ReactNode
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-sm text-gray-500">
            <th className="text-left py-3 px-4">Product</th>
            <th className="text-left py-3 px-4">Category</th>
            <th className="text-left py-3 px-4">Price</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{product.name}</td>
              <td className="py-3 px-4 text-gray-600">{product.category}</td>
              <td className="py-3 px-4">₱{product.price.toFixed(2)}</td>
              <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
