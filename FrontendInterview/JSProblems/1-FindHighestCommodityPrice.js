// Given a list of timestamps and commodity prices,
// find out highest commodity price at given timestamp.
// timestamps are not necessarily in sorted order,
// there can be multiple entries for a timestamp as well.
// Followup: after each timestamp, commodity price entry, we are putting a checkpoint,
// given a timestamp and checkpoint find maximum commodity prices till then.

// Reading the base problem statement,
// we know that we have to store a list of commodity prices for a given stamp and the prices can be in a random order.
// Thus we will create a hashMap and store the commodity prices in an array at the given timestamp. We will timestamp as the key.

class Store {
  constructor() {
    this.store = new Map();
  }

  add(timestamp, price) {
    // check if timestamp is already present
    // then push the new commodity price
    if (this.store.has(timestamp)) {
      const prices = this.store.get(timestamp);
      this.store.set(timestamp, [price, ...prices]);
      // create a new entry for the timestamp
    } else {
      this.store.set(timestamp, [price]);
    }
  }

  // To get the highest price, we will get all the commodity prices of the timestamp and return the highest among it.
  highestPrice(timestamp) {
    const prices = this.store.get(timestamp) ?? [];
    return Math.max(...prices) ?? 0;
  }
}

// const Store = function(){
//   this.store = new Map();

//   this.add = (timeStamp, price) => {
//     // check if timestamp is already present
//     // then push the new commodity price
//     if(this.store.has(timeStamp)){
//        const prices = this.store.get(timeStamp);
//        this.store.set(timeStamp, [price, ...prices]);
//     }
//     // create a new entry for the timestamp
//     else{
//       this.store.set(timeStamp, [price]);
//     }
//   };

//   this.highestPrice = (timeStamp) => {
//     const prices = this.store.get(timeStamp) ?? [];
//     return Math.max(...prices) ?? 0;
//   };
// };
