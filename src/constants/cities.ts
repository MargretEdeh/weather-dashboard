import type { City } from "../types/city"
import newyork from "../assets/newyork.jpeg"
import sanfrancico from "../assets/sanfrancisco.jpeg"
import LA from "../assets/LA.jpeg"
import chigago from "../assets/chigago.jpeg"

export const defaultCities: City[] = [
  {
    name: "New York",
    image: newyork,
  },
  {
    name: "San Francisco",
    image: sanfrancico ,
  },
  {
    name: "Los Angeles",
    image: LA,
  },
  {
    name: "Chicago",
    image: chigago,
  },
]

