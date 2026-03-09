"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useCart } from "@/context/cart-context"
import { Navbar } from "@/components/navbar"

export default function CarrinhoPage() {
  const { items, removeItem, clearCart, getTotal, addOrder } = useCart()
  const router = useRouter()
  const [showCheckout, setShowCheckout] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderCode, setOrderCode] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    paymentMethod: "",
  })

  const generateOrderCode = () => {
    return `PED-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  }

  const handleFinalizePurchase = () => {
    if (!formData.email || !formData.address || !formData.paymentMethod) return

    const code = generateOrderCode()
    setOrderCode(code)

    addOrder({
      code,
      items: [...items],
      email: formData.email,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      status: "Pedido Confirmado",
      date: new Date().toLocaleDateString("pt-BR"),
    })

    clearCart()
    setShowCheckout(false)
    setShowConfirmation(true)
  }

  if (items.length === 0 && !showConfirmation) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground">
              Adicione produtos para continuar comprando.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar às Compras
              </Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Carrinho de Compras</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.size}`}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Tamanho: {item.size}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id, item.size)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Resumo do Pedido</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {getTotal().toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>R$ {getTotal().toFixed(2).replace(".", ",")}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="mt-6 w-full"
                  onClick={() => setShowCheckout(true)}
                >
                  Finalizar Compra
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Finalizar Pedido</DialogTitle>
            <DialogDescription>
              Preencha seus dados para concluir a compra.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço Completo</Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro, cidade"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment">Forma de Pagamento</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMethod: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                  <SelectItem value="boleto">Boleto Bancário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>R$ {getTotal().toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleFinalizePurchase}
              disabled={
                !formData.email || !formData.address || !formData.paymentMethod
              }
            >
              Confirmar Pedido
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              Pedido Confirmado!
            </DialogTitle>
            <DialogDescription className="text-center">
              Seu pedido foi realizado com sucesso.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <p>Código do pedido:</p>
            <p className="rounded-lg bg-muted p-4 font-mono text-lg font-bold">
              {orderCode}
            </p>
            <p className="text-sm text-muted-foreground">
              Use este código para acompanhar seu pedido.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowConfirmation(false)
                  router.push("/")
                }}
              >
                Continuar Comprando
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setShowConfirmation(false)
                  router.push("/acompanhar")
                }}
              >
                Acompanhar Pedido
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
