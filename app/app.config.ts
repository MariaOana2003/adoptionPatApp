import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"adoption-pet","appId":"1:772943822244:web:0d0fca1903576b236b5531","databaseURL":"https://adoption-pet-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"adoption-pet.appspot.com","apiKey":"AIzaSyDSHMmGRs1wmXEolbsWJ2hmK_O6niYYjxM","authDomain":"adoption-pet.firebaseapp.com","messagingSenderId":"772943822244","measurementId":"G-PT09X49TVY"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())]
};
