export const habitsResolvers = {
  Query: {
    async habits() {
      console.log('habits');
      return [{
        _id: 'someid',
        name: 'default habit'
      }]
    }
  }
}