// An algorithm to find all the Armstrong numbers between the two numbers and print them.
// Armstrong: When we cube each digit of the number and add, it should be equal to the given number.

// Input:
// 100 200
// 100 400
// 0   100

// Output:
// 153

// 153
// 370
// 371

// 0
// 1

// We are going to loop through all the numbers between the given two numbers.
// Then we will check if the current number is Armstrong or not and print it.

// function to check if given number is Armstrong or not
let isArmstrong = (num) => {
  let sum = 0;
  let temp = num;

  while (num > 0) {
    let d = parseInt(num % 10);

    d = d ** 3;
    sum += d;

    num = parseInt(num / 10);
  }

  return sum === temp;
};

// Function to print all the Armstrong number
// Time complexity: O(n * d). where n is the difference between the two numbers and d is the no of digits in the biggest number.
// We are going to loop through the given range of numbers that will take O(n) where n is the difference between the given numbers
// Then we will be checking if the number is Armstrong or not that will take O(d) where d is the number of digits in the biggest number,
// so Time complexity is O(n * d)
// Space complexity: O(1). We are using constant space, so Space complexity is O(1).
let printArmstrong = (start, end) => {
  // loop through given range of numbers
  for (let i = start; i <= end; i++) {
    // If the it is Armstrong then print
    if (isArmstrong(i)) {
      console.log(i);
    }
  }
};

printArmstrong(0, 100);
printArmstrong(100, 200);
printArmstrong(300, 700);

// Output:
// 0
// 1

// 153

// 370
// 371
// 407
