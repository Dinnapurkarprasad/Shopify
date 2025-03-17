import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, UserIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useCart } from "@/context/CartContext";



const categories = ["All Categories", "Electronics", "Jewelry", "Men's Clothing", "Women's Clothing"];

const Navbar = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    const {cartItems}=useCart();

    const totalItems=cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);

    };

    return (
        <header className="border-b text-white">
            <div className="container mx-auto py-4 px-10 flex justify-between items-center">
                <Link to={'/'} className="text-2xl font-bold tracking-wide">
                    Shopify
                </Link>

                <nav className="flex items-center gap-10">
                    <div className="relative">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"ghost"}>
                                    {selectedCategory}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 max-h-[300px] mt-6 bg-black px-8 rounded-md overflow-y-auto z-50">
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={selectedCategory} onValueChange={handleCategorySelect} className="">
                                    {categories.map((category, index) => (
                                        <DropdownMenuRadioItem key={index} value={category} className="py-2 px-2">
                                            {category}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>


                    {/* Cart Button */}
                    <Link to="/cart" className="relative group">
                        <Button variant="outline" size="icon" className="border-0 group-hover:bg-gray-800 transition-all">
                            <ShoppingCart className="h-6 w-6 text-black" />
                        </Button>
                        <span className="absolute -top-2 -right-2 bg-red-600 text-xs font-semibold text-white rounded-full px-2 py-1">
                            {totalItems}
                        </span>
                    </Link>

                    {/* User Profile Icon */}
                    <Link to={'/profile'}>
                        <UserIcon className="w-6 h-6" />
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
