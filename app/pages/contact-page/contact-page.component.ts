import { Component } from '@angular/core';
import { Form } from '../../Models/form';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {

  name: string = '';
  email: string = '';
  message: string = '';

  async sendForm(): Promise<void> {
    try {
      const newForm = new Form(this.name, this.email, this.message);
      const docSnapshot = await addDoc(collection(db, "forms"), {
        name: newForm.name,
        email: newForm.email,
        message: newForm.message
      });
      console.log("Document written with ID: ", docSnapshot.id);
      // Reset form
      this.name = '';
      this.email = '';
      this.message = '';
      alert('Form sent successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}
