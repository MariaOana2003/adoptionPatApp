export class AdoptionForm {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    petExperience: string;
    petCare: string;

    constructor( fullName: string, email: string, phone: string, address: string, petExperience: string, petCare: string) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.petExperience = petExperience;
        this.petCare = petCare;
    }
}

  