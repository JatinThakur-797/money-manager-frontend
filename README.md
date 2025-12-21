Money Manager Frontend

Money Manager Frontend is a modern web application built with React and Vite that provides a clean, responsive user interface for managing personal finances. This project pairs with the Money Manager API backend to enable users to track income, expenses, categories, budgets, and view financial summaries.

Live Demo: https://yourmoneymanager.netlify.app/

Table of Contents

1. About
2. Features
3. Tech Stack
4. Getting Started
5. Prerequisites
6. Installation
7. Configuration
8. Running Locally
9. API Integration
10. Deployment
11. Contributing
12. License
13. Contact

1. About

The Money Manager Frontend delivers a user-friendly interface for visualizing and managing financial data. It consumes the Money Manager API backend and enables users to:
Add and view transactions
Filter and categorize expenses and income
Visualize financial summaries
Manage budgets and categories
The UI is optimized for both desktop and mobile screens.

2. Features

Dashboard with income/expense overview
Transaction List with add/edit/delete functionality
Category Management
Budget Overview
Responsive Layout
API-driven data management

3. Tech Stack
Layer	Technology
Frontend Framework	React
Bundler	Vite
Styling	CSS / Tailwind / your choice
HTTP Client	Axios / Fetch
Deployment	Netlify

4. Getting Started
Prerequisites

Ensure the following are installed on your development machine:
Node.js (v14+ recommended)
npm or Yarn
Installation
Clone the repository

git clone https://github.com/JatinThakur-797/money-manager-frontend.git
cd money-manager-frontend

Install dependencies

npm install
or
yarn

Configuration
Create an environment file to define API base URL and other variables:
cp .env.production .env.local


Edit .env.local (or create .env based on your setup):
VITE_API_BASE_URL=https://your-backend-domain.com/api
Replace https://your-backend-domain.com/api with your real Money Manager API URL.

Running Locally

Start the development server:

npm run dev
or
yarn dev

Visit http://localhost:5173 (default Vite port) in your browser.

5. API Integration

The frontend makes HTTP requests to the Money Manager backend to perform:
Fetching transaction lists
Posting new transactions
Updating/deleting existing transactions
Retrieving category and budget data

Example with Axios:

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTransactions = async () => {
  const response = await axios.get(`${API_BASE_URL}/transactions`);
  return response.data;
};


Ensure CORS is enabled on your backend.

6. Deployment

This project is configured for easy deployment on Netlify.
Connect the repository to Netlify.
Set environment variables in Netlify dashboard:
VITE_API_BASE_URL
Set build command:

npm run build
Set publish directory:
dist


After deployment, your live app will be available at:

https://yourmoneymanager.netlify.app/

(Replace this with your actual deployed link if different.)

8. Contributing

Contributions are welcome. If you would like to contribute:

Fork the repository.

Create a new branch for your feature:

git checkout -b feature/your-feature


Commit your changes:

git commit -m "Add feature"


Push to your fork:

git push origin feature/your-feature


Open a Pull Request.

9. License

This project is open source and available under the MIT License.

10. Contact

Maintained by Jatin Thakur
GitHub: https://github.com/JatinThakur-797
