class ContactModel {
    public name: string;
    public tel: number;
    public mail: string;

    constructor(name: string, tel: number, mail: string) {
        this.name = name;
        this.tel = tel;
        this.mail = mail;
    }
}

export default ContactModel;