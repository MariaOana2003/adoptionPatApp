export class Pet {
  id: string;
  name: string;
  species: string;
  breeds: string;
  age: number;
  description: string;
  status: string;
  images: string[];
  weight: number; // Greutatea animalului în kilograme
  height: number; // Înălțimea animalului în centimetri
  location: string; // Locatia animalului (de ex. adresa centrului de adopție)
  preferences: string; // Preferințele animalului (de ex. dacă este compatibil cu copiii sau alte animale)
  favoriteActivities: string; // Activitățile preferate ale animalului
  food: string;
  typeOfAnimal: string;

  constructor(
    id: string,
    name: string,
    species: string,
    breeds: string,
    age: number,
    description: string,
    status: string,
    images: string[],
    weight: number,
    height: number,
    location: string,
    preferences: string,
    favoriteActivities: string,
    food: string,
    typeOfAnimal: string

  ) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.breeds = breeds;
    this.age = age;
    this.description = description;
    this.status = status;
    this.images = images;
    this.weight = weight;
    this.height = height;
    this.location = location;
    this.preferences = preferences;
    this.favoriteActivities = favoriteActivities;
    this.food = food;
    this.typeOfAnimal = typeOfAnimal;

  }
}
