class ContactModel {
    public img: string;
    public name: string;
    public mail: string;

    constructor(img: string, name: string, mail: string) {
        this.img = img;
        this.name = name;
        this.mail = mail;
    }
}

export default ContactModel;