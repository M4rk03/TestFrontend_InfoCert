class ContactModel {
    public name: string;
    public tel: string;
    public mail: string;

    constructor(name: string, tel: string, mail: string) {
        this.name = name;
        this.tel = tel;
        this.mail = mail;
    }
}

export default ContactModel;