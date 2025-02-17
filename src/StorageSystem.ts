// 🔄 Multi-Type Storage System
// 📦 Create a system that can store and manage different types of data.
//
// 1. Implement a class `Storage<T, U>` that can store multiple types of data.
// 2. Implement a method `addItem` that stores a new item of a generic type.
// 3. Implement a method `removeItem` that removes an item by value.
// 4. Implement a method `getItems` that returns all stored items.
// 5. Implement a method `findItem` that searches for an item by a given property value.
// 6. Implement a method `updateItem` that updates an item by its property value.

class MyStorage<T, U> {
  items: T[] = []

  addItem(item: T): string {
    this.items.push(item)
    if(typeof item === 'number'){
      return `${item} added to storage.`
    }else if(typeof item === 'object'){
      return `User ${item.name} added.`
    }
  }

  getItems():T[] {
    return this.items
  }

  removeItem(id:T): string {
    if(typeof id === 'number'){
      this.items = this.items.filter(item => item != id)
      return `${id} removed from storage.`
    }else if(typeof id === 'object'){
      const remove = this.items.find(item => item.id === id.id)
      this.items = this.items.filter(item => item.id != id.id)
      return `${remove.name} removed from storage.`
    }
  }

  findItem<K extends keyof T>(prop:K, val: T[K]): T | string {
    const itemFind = this.items.find(item => item[prop] === val);
    return !itemFind? `Not found!`: itemFind
  }

  updateItem<K extends keyof T>(prop:K, id:number, update:T): string {
    let existId = this.items.find(item => item[prop] === id)
    if(existId){
      const name = existId.name
      this.items[this.items.indexOf(existId)] = update
      return `${name} updated successfully.`
    }else{
      this.items.push(update) 
      return `${update.name} added!`
    }
  }
}

// Test cases
const numberStrStorage = new MyStorage<number, string>();

console.log(numberStrStorage.addItem(10)); // "10 added to storage."
console.log(numberStrStorage.addItem(20)); // "20 added to storage."
console.log(numberStrStorage.getItems()); // [10, 20]
console.log(numberStrStorage.removeItem(10)); // "10 removed from storage."
console.log(numberStrStorage.getItems()); // [20]

const userStorage = new MyStorage<{ id: number; name: string }, string>();

console.log(userStorage.addItem({ id: 1, name: "Alice" })); // "User Alice added."
console.log(userStorage.addItem({ id: 2, name: "Bob" })); // "User Bob added."
console.log(userStorage.getItems()); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
console.log(userStorage.removeItem({id:1, name: "Alice"})); 
console.log(userStorage.findItem("name", "Alice")); // { id: 1, name: "Alice" }
console.log(userStorage.updateItem("id", 1, { id: 1, name: "Alice Updated" })); // "Alice updated successfully."
console.log(userStorage.getItems()); // [{ id: 1, name: "Alice Updated" }, { id: 2, name: "Bob" }]


// const dd = { id: 1, name: "Alice Updated" }
// dd.id
// dd?.id
// dd['id']

