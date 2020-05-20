export class FirebaseData<dataType>{
    key: string;
    data: dataType;

    constructor(key, data) {
        this.key = key;
        this.data = data;
    }
}