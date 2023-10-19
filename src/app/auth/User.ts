export class User{
    username:string
    fname:string
    lname:string
    created_date:Date

    constructor(username:string, fname:string,lname:string,created_date:Date){
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.created_date = created_date;
    }

}