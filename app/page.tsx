import { Navbar } from "@/components/navbar"
import { ProductList } from "@/components/product-list"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold text-balance">
              Bem-vindo à UTILITARY
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
              Descubra nossa coleção de camisas de alta qualidade, impermeáveis e que não amassam. Conforto,
              estilo e preços justos para você.
            </p>
          </div>
        </section>
        <ProductList />
      </main>
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 UTILITARY. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}
