"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems,removeFromCart} = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)


  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
    }, 2000)
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-white">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Card className="w-full p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <CardTitle>Your cart is empty</CardTitle>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button><Link to={"/"}>Continue Shoping</Link></Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({totalItems})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 border-b last:border-0">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || `/placeholder.svg?height=96&width=96`}
                          alt={item.name}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="font-medium text-lg text-black">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 sm:mt-0">
                          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                            //   onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                            //   onChange={(e) => handleUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-14 h-8 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                            //   onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 sm:ml-4">
                            <div className="font-medium sm:mr-4">${(item.price * item.quantity).toFixed(2)}</div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Have a promo code?</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Enter code" className="flex-grow" />
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage