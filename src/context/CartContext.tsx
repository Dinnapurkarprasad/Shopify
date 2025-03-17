import { createContext, useContext, useState, ReactNode } from "react";
type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

type CartItem = {
  id: number;
  title: string;
  description: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; 
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);



  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
     
      const newCartItem: CartItem = {
        id: product.id,
        title: product.title,
        description: product.description || "", 
        name: product.title, 
        price: product.price,
        quantity: 1,
        image: product.image,
      };
      return [...prevItems, newCartItem];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  


  
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};