import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Pet } from '../../Models/pet';
import { collection, getDocs, getFirestore, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

const firebaseConfig = {
  apiKey: "AIzaSyDSHMmGRs1wmXEolbsWJ2hmK_O6niYYjxM",
  authDomain: "adoption-pet.firebaseapp.com",
  databaseURL: "https://adoption-pet-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "adoption-pet",
  storageBucket: "adoption-pet.appspot.com",
  messagingSenderId: "772943822244",
  appId: "1:772943822244:web:0d0fca1903576b236b5531",
  measurementId: "G-PT09X49TVY"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    MatSelectModule
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'] // Folosim `styleUrls` (plural)
})
export class MainPageComponent {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  filter: string = 'all';

  constructor(private router: Router) { // Injectăm Router în constructor
    this.getPet();
  }

  async getPet() {
    const querySnapshot = await getDocs(collection(db, "pets"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['name']}`);
      const pet = new Pet(doc.id, doc.data()['name'], doc.data()['species'], doc.data()['breeds'], doc.data()['age'], doc.data()['description'], doc.data()['status'], doc.data()['images'], doc.data()['weight'], doc.data()['height'], doc.data()['location'], doc.data()['preferences'], doc.data()['favoriteActivities'], doc.data()['food'], doc.data()['typeOfAnimal']);
      this.pets.push(pet);
    });
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPets = this.pets.filter(pet => {
      const speciesMatch = this.filter === 'all' || pet.species.toLowerCase() === this.filter.toLowerCase();
      return speciesMatch;
    });
  }

  onFilterChange(event: any) {
    this.filter = event.value;
    this.applyFilters();
  }

  goToPost(pageName: string, id: string): void {
    this.router.navigate([`${pageName}/${id}`]);
  }

  async addToFavorite(pet: Pet): Promise<void> {
    try {
      // Verificăm dacă toate proprietățile necesare ale obiectului pet sunt definite și au valori valide
      if (
        pet.id &&
        pet.name &&
        pet.species &&
        pet.breeds &&
        pet.age &&
        pet.description &&
        pet.status &&
        pet.images &&
        pet.weight &&
        pet.height &&
        pet.location
      ) {
        // Obținem o referință către documentul corespunzător pet-ului în colecția "favorites"
        const favoriteRef = doc(db, "favorites", pet.id);

        // Verificăm dacă pet-ul există deja în colecția "favorites"
        const docSnapshot = await getDoc(favoriteRef);
        if (docSnapshot.exists()) {
          console.log(`Pet ${pet.name} is already in favorites`);
          return; // Ieșim din funcție dacă pet-ul există deja în colecția "favorites"
        }

        // Adăugăm pet-ul la colecția "favorites"
        await setDoc(favoriteRef, {
          id: pet.id,
          name: pet.name,
          species: pet.species,
          breeds: pet.breeds,
          age: pet.age,
          description: pet.description,
          status: pet.status,
          images: pet.images,
          weight: pet.weight,
          height: pet.height,
          location: pet.location
        });

        console.log(`Pet ${pet.name} added to favorites`);
      } else {
        console.error("One or more required properties of the pet object are undefined or null.");
      }
    } catch (error) {
      console.error("Error adding pet to favorites: ", error);
    }
  }
}
