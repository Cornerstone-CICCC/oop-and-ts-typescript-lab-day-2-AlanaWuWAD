function Logger <T extends { new (...args: any[]) }> (target: T, context: ClassDecoratorContext) {
    console.log(`Class ${context.name} was declared...`)
  
    return class ChildClass extends target {
      constructor(...args: any[]) { //['Nokia']
        args = [...args].map(arg => arg.toString().toUpperCase())
        super(...args) // NOKIA
      }
    }
  }
  
  @Logger
  class Phone {
    brand: string
  
    constructor(b: string) {
      this.brand = b
    }
  }
  
  const newPhone = new Phone("Nokia")
  console.log(newPhone.brand)
  