import axios from "axios";
import { useEffect, useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCart } from "@/context/CartContext";
import toast,{Toaster} from "react-hot-toast"

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type ProductsCardProps = {
  selectedCategory: string;
};


const ProductsCard = ({ selectedCategory }: ProductsCardProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();


  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };
    getProduct();
  }, []);


  if (loading) {
    return (
       <div className="text-center mt-10 text-white font-bold text-4xl">
        Loading.....
       </div>
    );
  }

  const handleLoadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 3); // Increase number of visible products by 3
  };
  const notify = () => toast.success("item Added to Cart");

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      electronics: "bg-blue-100 text-blue-800",
      jewelery: "bg-purple-100 text-purple-800",
      "men's clothing": "bg-green-100 text-green-800",
      "women's clothing": "bg-pink-100 text-pink-800",
    };
    return categories[category] || "bg-gray-100 text-gray-800";
  };

  // const filteredProducts = selectedCategory === "All Categories"
  // ? products
  // : products.filter((product) => product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg inline-block">
          <h3 className="text-lg font-semibold mb-2">Oops! Something went wrong</h3>
          <p>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    
    <div>
      <Toaster/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, visibleProducts).map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative">
              <div className="aspect-square overflow-hidden p-6  bg-white flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="object-contain max-h-[200px] w-auto transition-transform hover:scale-105"
                />
              </div>
              <Badge className={`absolute top-2 right-2 ${getCategoryColor(product.category)}`}>
                {product.category}
              </Badge>
            </div>
            <CardContent className="flex-grow pt-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                {product.description}
              </p>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating.rate)
                        ? "fill-primary text-primary"
                        : i < product.rating.rate
                        ? "fill-primary text-primary opacity-50"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" onClick={() => {
                  addToCart(product); 
                  notify(); 
                }} >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="text-center mt-6">
          <Button onClick={handleLoadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  
  );
};

export default ProductsCard;