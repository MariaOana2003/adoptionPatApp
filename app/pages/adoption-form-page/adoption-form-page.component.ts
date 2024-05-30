import { Component } from '@angular/core';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { FormsModule } from '@angular/forms';
import { AdoptionForm } from '../../Models/adoptForm';

// Initialize Firebase app
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
  selector: 'app-adoption-form-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adoption-form-page.component.html',
  styleUrls: ['./adoption-form-page.component.css']
})
export class AdoptionFormPageComponent {

    fullName: string = '';
    email: string = '';
    phone:  string = '';
    address: string = '';
    petExperience:  string ='';
    petCare: string = '';


  async sendForm(): Promise<void> {
    try {
      const newForm = new AdoptionForm(this.fullName, this.email, this.phone, this.address, this.petExperience, this.petCare);
      const docSnapshot = await addDoc(collection(db, "adoptionForms"),{
        fullName: newForm.fullName,
        email: newForm.email,
        phone: newForm.phone,
        address: newForm.address,
        petExperience: newForm.petExperience,
        petCare: newForm.petCare
      });
      console.log("Document written with ID: ", docSnapshot.id);
      // Reset form
      this.fullName = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.petExperience = '';
      this.petCare = '';
      alert('Form sent successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}
