import { Component} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { CommonModule } from '@angular/common';
import { Pet } from '../../Models/pet';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
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
  selector: 'app-single-post',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NgFor,
    NgIf
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent {
  pet: any;
  currentImageIndex: number = 0;
  currentImage: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
      this.getSinglePet();
  }

  async getSinglePet() {
      const petId = this.route.snapshot.paramMap.get('id');
      if (petId) {
          const petDoc = await getDoc(doc(db, 'pets', petId));
          if(petDoc.exists()){
              const petData = petDoc.data();
              this.pet = new Pet(petData['id'] ,petData['name'], petData['species'], petData['breeds'], petData['age'], petData['description'], petData['status'], petData['images'],  petData['weight'], petData['height'], petData['location'],petData['preferences'], petData['favoriteActivities'], petData['food'], petData['typeOfAnimal']);
              this.currentImage = this.pet.images[0];
          } else {
              console.log('No such document!');
          }
      } else {
          console.log('No document ID provided!');
      }
  }

  nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.pet.images.length;
      this.currentImage = this.pet.images[this.currentImageIndex];
  }

  prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.pet.images.length) % this.pet.images.length;
      this.currentImage = this.pet.images[this.currentImageIndex];
  }
  goToFormPage(pageName: string): void{
    this.router.navigate([pageName]);
  }
}
