import { Navbar } from "@/components/navbar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageCircle } from "lucide-react"

export default function AjudaPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center text-3xl font-bold">
            Central de Ajuda
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Como faço para acompanhar meu pedido?
                  </AccordionTrigger>
                  <AccordionContent>
                    Após finalizar sua compra, você receberá um código de pedido.
                    Acesse a página Acompanhar Pedido no menu e insira o código
                    para ver o status da sua encomenda.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Quais são as formas de pagamento aceitas?
                  </AccordionTrigger>
                  <AccordionContent>
                    Aceitamos PIX, cartão de crédito e boleto bancário. O PIX
                    oferece aprovação instantânea, enquanto o boleto pode levar
                    até 3 dias úteis para compensar.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Qual o prazo de entrega?</AccordionTrigger>
                  <AccordionContent>
                    O prazo de entrega varia de acordo com sua localização.
                    Geralmente, entregas são realizadas em 5 a 10 dias úteis para
                    todo o Brasil.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Posso trocar ou devolver?</AccordionTrigger>
                  <AccordionContent>
                    Sim! Você tem até 7 dias após o recebimento para solicitar
                    troca ou devolução. O produto deve estar em perfeitas
                    condições, sem uso e com etiqueta.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Como escolher o tamanho correto?
                  </AccordionTrigger>
                  <AccordionContent>
                    Oferecemos tamanhos PP, P, M, G e GG. Recomendamos medir uma
                    camisa que você já possui e comparar com nossa tabela de
                    medidas disponível na página do produto.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fale Conosco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">E-mail</p>
                    <p className="text-sm text-muted-foreground">
                      contato@lojacamisas.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Telefone</p>
                    <p className="text-sm text-muted-foreground">
                      (11) 99999-9999
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      (11) 99999-9999
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
