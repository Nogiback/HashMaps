"use strict";
class HashMap {
    constructor() {
        this.size = 16;
        this.array = new Array(this.size).fill(null);
        this.loadFactor = 0.75;
    }
    hash(key) {
        let hashCode = 0;
        const primeNum = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * primeNum + key.charCodeAt(i)) % this.array.length;
        }
        return hashCode;
    }
    resize() {
        this.size = this.size * 2;
        const oldArray = this.array;
        this.array = new Array(this.size).fill(null);
        oldArray.forEach((bucket) => {
            if (!bucket)
                return;
            bucket.forEach((item) => {
                this.set(item[0], item[1]);
            });
        });
    }
    set(key, value) {
        // Checking if loadFactor has been reached, if so, resize HashMap
        if (this.length() / this.array.length >= this.loadFactor) {
            this.resize();
        }
        // Getting the hash code (AKA index)
        const index = this.hash(key);
        // Create empty array at index, if bucket is empty
        if (!this.array[index]) {
            this.array[index] = [];
        }
        // Replace value of [key, value] pair if same key is found in HashMap
        for (let i = 0; i < this.array[index].length; i++) {
            if (this.array[index][i][0] === key) {
                this.array[index][i][1] = value;
                return;
            }
        }
        // Add new [key,value] pair into bucket
        this.array[index].push([key, value]);
    }
    get(key) {
        const index = this.hash(key);
        if (this.array[index]) {
            for (let i = 0; i < this.array[index].length; i++) {
                if (this.array[index][i][0] === key) {
                    return this.array[index][i][1];
                }
                else {
                    return null;
                }
            }
        }
        else {
            return null;
        }
    }
    has(key) {
        const index = this.hash(key);
        if (this.array[index]) {
            for (let i = 0; i < this.array[index].length; i++) {
                if (this.array[index][i][0] === key) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }
    remove(key) {
        const index = this.hash(key);
        if (this.array[index]) {
            for (let i = 0; i < this.array[index].length; i++) {
                if (this.array[index][i][0] === key) {
                    this.array[index].splice(i, 1);
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }
    length() {
        let length = 0;
        this.array.forEach((bucket) => {
            if (!bucket)
                return;
            length += bucket.length;
        });
        return length;
    }
    clear() {
        this.array.fill(null);
    }
    keys() {
        let keysArray = [];
        this.array.forEach((bucket) => {
            if (!bucket)
                return;
            bucket.forEach((item) => {
                keysArray.push(item[0]);
            });
        });
        return keysArray;
    }
    values() {
        let valuesArray = [];
        this.array.forEach((bucket) => {
            if (!bucket)
                return;
            bucket.forEach((item) => {
                valuesArray.push(item[1]);
            });
        });
        return valuesArray;
    }
    entries() {
        let entriesArray = [];
        this.array.forEach((bucket) => {
            if (!bucket)
                return;
            bucket.forEach((item) => {
                entriesArray.push([item[0], item[1]]);
            });
        });
        return entriesArray;
    }
}
const myHashMap = new HashMap();
myHashMap.set("name", "Peter");
myHashMap.set("DOB", "23/05/1991");
myHashMap.set("city", "Toronto");
myHashMap.set("country", "Canada");
myHashMap.set("food", "Rice");
myHashMap.set("sport", "Hockey");
myHashMap.set("animal", "Panda");
myHashMap.set("music", "Metalcore");
myHashMap.set("game", "Rocket League");
myHashMap.set("show", "Community");
console.log(myHashMap.array.length); // Returns original size of array: 16
myHashMap.set("car", "Toyota Corolla");
myHashMap.set("computer", "Macbook");
myHashMap.set("drink", "Beer");
myHashMap.set("job", "Web Developer");
myHashMap.set("movie", "Kung Fu Panda");
myHashMap.set("shoe", "Vans");
myHashMap.set("friend", "Dusty");
myHashMap.set("ethnicity", "Vietnamese");
myHashMap.set("colour", "Blue");
myHashMap.set("school", "Guelph");
myHashMap.set("curriculum", "Full Stack Development");
myHashMap.set("phone", "iPhone");
myHashMap.set("clothes", "Hoodie");
myHashMap.set("language", "English");
myHashMap.set("breakfast", "Burritos");
myHashMap.set("park", "Algonquin");
myHashMap.set("activity", "Hiking");
myHashMap.set("instrument", "Piano");
myHashMap.set("problems", "So many...");
console.log(myHashMap.array.length); // Returns length of resized array: 64
console.log(myHashMap.get("name")); // Returns Peter
console.log(myHashMap.get("food")); // Returns Rice
console.log(myHashMap.get("music")); // Returns Metalcore
console.log(myHashMap.has("name")); // Returns true
console.log(myHashMap.has("country")); // Returns true
console.log(myHashMap.has("religion")); // Returns false
console.log(myHashMap.remove("show")); // Returns true, removes [key,value] pair
console.log(myHashMap.remove("stuff")); // Returns false, key does not exist.
console.log(myHashMap.length()); // Returns 28
console.log(myHashMap.keys()); // Returns array of only keys
console.log(myHashMap.values()); // Returns array of only values
console.log(myHashMap.entries()); // Returns array of [key, value] pairs
myHashMap.clear();
console.log(myHashMap.length()); // Returns 0
