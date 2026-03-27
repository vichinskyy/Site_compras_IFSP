"use client"

import Link from "next/link"
import { ShoppingCart, Shirt } from "lucide-react"
import { useCart } from "@/context/cart-context"

export function Navbar() {
  const { items } = useCart()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Shirt className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">UTILITARY</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Início
          </Link>
          <Link
            href="/acompanhar"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Acompanhar Pedido
          </Link>
          <Link
            href="/entrar"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Entrar
          </Link>
          <Link
            href="/ajuda"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Ajuda
          </Link>
          <Link
            href="/sobre"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sobre
          </Link>
          <Link
            href="/carrinho"
            className="relative flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
