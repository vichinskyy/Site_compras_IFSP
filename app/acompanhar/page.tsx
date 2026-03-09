"use client"

import { useState } from "react"
import { Search, Package, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart, Order } from "@/context/cart-context"
import { Navbar } from "@/components/navbar"

export default function AcompanharPage() {
  const { getOrderByCode } = useCart()
  const [searchCode, setSearchCode] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    const found = getOrderByCode(searchCode)
    setOrder(found || null)
    setSearched(true)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-center text-3xl font-bold">
            Acompanhar Pedido
          </h1>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o código do pedido"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          {searched && !order && (
            <Card className="border-destructive">
              <CardContent className="p-6 text-center">
                <p className="text-destructive">
                  Pedido não encontrado. Verifique o código e tente novamente.
                </p>
              </CardContent>
            </Card>
          )}

          {order && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Pedido {order.code}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 dark:bg-green-950">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400">
                      {order.status}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      Realizado em {order.date}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold">Itens do Pedido</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between rounded-lg bg-muted p-3"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Tamanho: {item.size} | Qtd: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      R${" "}
                      {order.items
                        .reduce((acc, item) => acc + item.price * item.quantity, 0)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 border-t pt-4 text-sm">
                  <p>
                    <span className="font-medium">E-mail:</span> {order.email}
                  </p>
                  <p>
                    <span className="font-medium">Endereço:</span> {order.address}
                  </p>
                  <p>
                    <span className="font-medium">Pagamento:</span>{" "}
                    {order.paymentMethod === "pix"
                      ? "PIX"
                      : order.paymentMethod === "cartao"
                        ? "Cartão de Crédito"
                        : "Boleto Bancário"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  )
}
