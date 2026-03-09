"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useCart } from "@/context/cart-context"
import { Check } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const sizes = ["PP", "P", "M", "G", "GG"]

export function ProductCard({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setIsOpen(false)
      setSelectedSize("")
    }, 1500)
  }

  return (
    <>
      <Card
        className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-lg font-bold">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="relative mx-auto aspect-square w-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <p className="text-center text-2xl font-bold">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            <div>
              <p className="mb-2 font-medium">Selecione o tamanho:</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || added}
              className="w-full"
            >
              {added ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Adicionado!
                </>
              ) : (
                "Adicionar ao Carrinho"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
