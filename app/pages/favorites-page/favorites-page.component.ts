import { Component } from '@angular/core';
import { Pet } from '../../Models/pet';
import { Router, RouterModule } from '@angular/router';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';


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
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    NgFor,
    RouterModule,
    NgIf
  ],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent {

  pets: Pet[] = [];

  constructor(private router: Router) { // Injectăm Router în constructor
    this.getPet();
  }

  goToPost(pageName: string, id: string): void {
    this.router.navigate([`${pageName}/${id}`]);
  }

  async getPet() {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['name']}`);
      const pet = new Pet(doc.id, doc.data()['name'], doc.data()['species'], doc.data()['breeds'], doc.data()['age'], doc.data()['description'], doc.data()['status'], doc.data()['images'], doc.data()['weight'], doc.data()['height'], doc.data()['location'], doc.data()['preferences'], doc.data()['favoriteActivities'], doc.data()['food'], doc.data()['typeOfAnimal']);
      this.pets.push(pet);
    });
  }
  async addToFavorite(pet: Pet): Promise<void> {
    try {
      const favoriteRef = doc(db, "favorites", pet.id); // Use the pet ID as the document ID
  
      // Check if the pet already exists in favorites
      const docSnapshot = await getDoc(favoriteRef);
      if (docSnapshot.exists()) {
        console.log(`Pet ${pet.name} is already in favorites`);
        return; // Exit the function if the pet already exists
      }
  
      // Ensure that the pet object is valid and contains the required properties
      if (!pet || !pet.hasOwnProperty('weight') || pet.weight === undefined) {
        console.error("Error: Invalid or missing pet data.");
        return;
      }
  
      // Obtain the image URLs from the pet object
      const imageUrls = pet.images || [];
  
      // Add the pet information and image URLs to the "favorites" collection
      await setDoc(favoriteRef, {
        petId: pet.id,
        name: pet.name,
        species: pet.species,
        breeds: pet.breeds,
        age: pet.age,
        description: pet.description,
        status: pet.status,
        images: imageUrls,
        weight: pet.weight,
        height: pet.height,
        location: pet.location
      });
  
      console.log(`Pet ${pet.name} added to favorites`);
    } catch (error) {
      console.error("Error adding pet to favorites: ", error);
    }
  }
  
}
