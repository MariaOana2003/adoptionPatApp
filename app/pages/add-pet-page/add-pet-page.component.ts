import { Component } from '@angular/core';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Pet } from '../../Models/pet';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

// Eliminăm inițializarea Firebase

@Component({
  selector: 'app-add-pet-page',
  standalone: true,
  imports: [FormsModule, MatButton],
  templateUrl: './add-pet-page.component.html',
  styleUrls: ['./add-pet-page.component.css']
})
export class AddPetPageComponent {
  id = "";
  name = "";
  species = "";
  breeds = "";
  age = 0;
  description = "";
  status = "";
  images: string[] = [];
  weight = 0;
  height = 0;
  location = "";
  preferences = "";
  favoriteActivities = "";
  food = "";
  typeOfAnimal = "";
  selectedFiles: File[] = [];

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  async uploadImages(): Promise<string[]> {
    const storage = getStorage(); // Obținem o referință la storage fără inițializare
    const uploadPromises = this.selectedFiles.map(file => {
      const filePath = `pets/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);
      return uploadBytes(storageRef, file)
        .then(() => getDownloadURL(storageRef));
    });
    return Promise.all(uploadPromises);
  }

  async addPet() {
    try {
      const db = getFirestore(); // Obținem o referință la firestore fără inițializare
      const storage = getStorage(); // Obținem o referință la storage fără inițializare

      this.images = await this.uploadImages();
      const newPet = new Pet(this.id, this.name, this.species, this.breeds, Number(this.age), this.description, this.status, this.images, this.weight, this.height, this.location, this.preferences, this.favoriteActivities, this.food, this.typeOfAnimal);
      const docRef = await addDoc(collection(db, "pets"), {
        name: newPet.name,
        species: newPet.species,
        breeds: newPet.breeds,
        age: newPet.age,
        description: newPet.description,
        status: newPet.status,
        images: newPet.images,
        weight: newPet.weight,
        height: newPet.height,
        location: newPet.location,
        preferences: newPet.preferences,
        favoriteActivities: newPet.favoriteActivities,
        food: newPet.food,
        typeOfAnimal: newPet.typeOfAnimal
      });
      console.log("Document written with ID: ", docRef.id);
      this.resetForm();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  resetForm() {
    this.id = "";
    this.name = "";
    this.species = "";
    this.breeds = "";
    this.age = 0;
    this.description = "";
    this.status = "";
    this.images = [];
    this.weight = 0;
    this.height = 0;
    this.location = "";
    this.preferences = "";
    this.favoriteActivities = "";
    this.food = "";
    this.typeOfAnimal = "";
    this.selectedFiles = [];
  }
}
