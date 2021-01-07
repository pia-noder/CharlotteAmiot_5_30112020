/////////////Former l'objet envoyé dans le local storage//////////
class infoProduct{
    constructor(id, option, quantity){
        this.id = id;
        this.option = option;
        this.quantity = quantity;
    }
}

/////Création des classes pour les objets à envoyer au serveur/////
class infoContact {
    constructor(firstName,lastName, address, city, email){
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.city = city;
      this.email = email;
    }
}

class infoSend {
    constructor(contact,products){
      this.contact = contact;
      this.products = products;
    }
}