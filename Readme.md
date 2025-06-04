# 🤝 Contributing Guide

We welcome contributions! Please follow the steps below to contribute effectively.

### 🛠️ Setup

Make sure you have:

* Node.js & npm installed
* MongoDB running locally or via Atlas
* Forked and cloned this repository

```bash
git clone https://github.com/MERN-STACK-WORKSHOP/Mern_Ordering_System.git
cd Mern_Ordering_System
```

---

### 🔄 Step 1: Get the Latest Updates

Before starting any work, **sync your local repo** with the main repository:

```bash
git checkout main
git pull origin main
```

If you forked the project, also make sure your `upstream` remote is set:

```bash
git remote add upstream https://github.com/MERN-STACK-WORKSHOP/Mern_Ordering_System.git
git pull upstream main
```

---

### 🌿 Step 2: Create a Feature Branch

Create a descriptive branch name for your feature or fix:

```bash
git checkout -b feature/add-cart-ui
```

> 🔁 Never commit directly to the `main` branch.

---

### 🧪 Step 3: Make Changes & Test

Make your changes in the `backend/` or `frontend/` folders as needed. Make sure everything runs properly:

```bash
# For backend
cd backend
npm install
npm run dev

# For frontend
cd ../frontend
npm install
npm start
```

---

### 📤 Step 4: Commit & Push

After testing, commit your work:

```bash
git add .
git commit -m "Add: Cart UI component with add/remove logic"
git push origin feature/add-cart-ui
```

---

### 🔁 Step 5: Create a Pull Request

Go to your fork on GitHub and click **“Compare & pull request”**.

* Choose `main` as the base branch
* Describe what your PR adds/fixes
* Reference any related issues (e.g., `Closes #5`)

---

### ✅ PR Review Checklist

Please ensure:

* Your code follows existing styles
* There are no console errors or build failures
* Major features are tested manually

---

### 🧹 Cleanup (Optional)

After your PR is merged, you can delete the branch:

```bash
git checkout main
git pull origin main
git branch -d feature/add-cart-ui
```