const mongoose = require('mongoose');
const Submission = require('./models/Submission');
const db = require('./config/db');

// Connect to MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    // Define the sample submissions
    const submissions = [
      // Python Functions
      { userId: 'user1', submissionDate: new Date(), code: 'def sum_two_numbers(a, b): return a + b' },
      { userId: 'user2', submissionDate: new Date(), code: 'def factorial(n): if n == 0: return 1 else: return n * factorial(n-1)' },
      { userId: 'user3', submissionDate: new Date(), code: 'def fibonacci(n): a, b = 0, 1; while a < n: print(a, end=" "); a, b = b, a + b; print()' },
      { userId: 'user4', submissionDate: new Date(), code: 'def reverse_string(s): return s[::-1]' },
      { userId: 'user5', submissionDate: new Date(), code: 'def is_prime(num): if num <= 1: return False; for i in range(2, int(num**0.5) + 1): if num % i == 0: return False; return True' },

      // C Functions
      { userId: 'user6', submissionDate: new Date(), code: 'int factorial(int n) { if (n == 0) return 1; return n * factorial(n - 1); }' },
      { userId: 'user7', submissionDate: new Date(), code: 'int gcd(int a, int b) { while (b != 0) { int t = b; b = a % b; a = t; } return a; }' },
      { userId: 'user8', submissionDate: new Date(), code: 'void reverse_array(int arr[], int size) { int start = 0, end = size - 1; while (start < end) { int temp = arr[start]; arr[start] = arr[end]; arr[end] = temp; start++; end--; } }' },
      { userId: 'user9', submissionDate: new Date(), code: 'int is_prime(int num) { if (num <= 1) return 0; for (int i = 2; i <= num / 2; i++) { if (num % i == 0) return 0; } return 1; }' },
      { userId: 'user10', submissionDate: new Date(), code: 'void bubble_sort(int arr[], int size) { for (int i = 0; i < size - 1; i++) { for (int j = 0; j < size - i - 1; j++) { if (arr[j] > arr[j + 1]) { int temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp; } } } }' },

      // C++ Functions
      { userId: 'user11', submissionDate: new Date(), code: 'int factorial(int n) { if (n == 0) return 1; return n * factorial(n - 1); }' },
      { userId: 'user12', submissionDate: new Date(), code: 'int gcd(int a, int b) { while (b != 0) { int t = b; b = a % b; a = t; } return a; }' },
      { userId: 'user13', submissionDate: new Date(), code: 'void reverse_array(int arr[], int size) { int start = 0, end = size - 1; while (start < end) { int temp = arr[start]; arr[start] = arr[end]; arr[end] = temp; start++; end--; } }' },
      { userId: 'user14', submissionDate: new Date(), code: 'bool is_prime(int num) { if (num <= 1) return false; for (int i = 2; i <= num / 2; i++) { if (num % i == 0) return false; } return true; }' },
      { userId: 'user15', submissionDate: new Date(), code: 'void bubble_sort(int arr[], int size) { for (int i = 0; i < size - 1; i++) { for (int j = 0; j < size - i - 1; j++) { if (arr[j] > arr[j + 1]) { int temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp; } } } }' },

      // More sample submissions (repeated to reach 100)
      ...Array(85).fill().map((_, index) => ({
        userId: `user${index + 16}`,
        submissionDate: new Date(),
        code: `// Sample code ${index + 16}`
      }))
    ];

    // Insert sample data
    await Submission.insertMany(submissions);

    console.log('Sample submissions inserted');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.disconnect();
  });
