"use client"

import { ProductCard } from "./product-card"

const products = [
  {
    id: 1,
    name: "Camisa Azul Marinho",
    description: "Camisa casual de algodão, confortável para o dia a dia.",
    price: 59.90,
    image: "/images/camisa-gomes.jpg",
  },
  {
    id: 2,
    name: "Calça Clássica",
    description: "Calça clássica minimalista, perfeita para qualquer ocasião.",
    price: 59.90,
    image: "/images/calça-1.jpg",
  },
]

export function ProductList() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Nossa coleção</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
