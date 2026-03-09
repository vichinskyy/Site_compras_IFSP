import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Shirt, Heart, Truck } from "lucide-react"

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center text-3xl font-bold">Sobre Nós</h1>

          <div className="mb-8 text-center">
            <p className="text-lg text-muted-foreground">
              A “nome da marca” foi pensada exatamente para você que precisa de praticidade no dia a dia sem abrir mão da elegância.

              É com muito prazer que apresentamos a linha de roupas “nome da linha”.

              Confeccionadas em tecido premium, são isentas de amassados inconvenientes e totalmente impermeáveis, possibilitando usos mais intensos no cotidiano.

              Nossa tecnologia têxtil foi desenvolvida para acompanhar o ritmo de quem não para. Seja para uma reunião de negócios ou para um compromisso casual após o trabalho, você estará sempre com uma aparência impecável.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Shirt className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold">Qualidade Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Materiais selecionados para máximo conforto e durabilidade.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Heart className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold">Feito com Amor</h3>
                <p className="text-sm text-muted-foreground">
                  Cada peça é cuidadosamente produzida pensando em você.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Truck className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  Enviamos para todo o Brasil com frete grátis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
