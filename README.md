# React Native Auth Flow

This project features a dark-themed UI, robust form handling, and a scalable architecture, making it a perfect starting point for a new application.


## Screenshots and Demo

| Login Screen | Signup Screen | Home Screen |
| :----------: | :-----------: | :---------: |
| <img width="411" height="858" alt="Screenshot 2025-09-16 at 11 11 00 AM" src="https://github.com/user-attachments/assets/4dffb092-5c3e-4ce8-8eca-7428587c34f8" /> | <img width="411" height="858" alt="Screenshot 2025-09-16 at 11 11 30 AM" src="https://github.com/user-attachments/assets/b33cda99-4b62-4360-8c0d-183d79fb2715" /> | <img width="411" height="858" alt="Screenshot 2025-09-16 at 2 43 09 PM" src="https://github.com/user-attachments/assets/2c0922a3-8a22-40be-b877-b27fdae7bef1" /> |




https://github.com/user-attachments/assets/20370d4b-b851-4f33-9e38-5ab470190b96



---
## ✨ Features

* **Authentication Flow:** Complete signup and login functionality using `AsyncStorage` as a mock database.
* **State Management:** Global auth state is managed cleanly with React's Context API.
* **Form Handling:** Robust, type-safe forms built with `react-hook-form` and `zod` for validation.
* **Themed UI:** A consistent, dark-themed UI styled with **Tailwind CSS** via `nativewind`. The theme (colors, fonts, spacing) is fully configurable.
* **Reusable Components:** A suite of reusable, variant-driven components, including:
    * `ControlledInput` with icon and password-toggle support.
    * `Button` with variants for intent, size, and style, built with `tailwind-variants`.
* **Navigation:** A smooth, auth-aware navigation system built with `react-navigation` that automatically directs users to the correct screen.
* **Iconography:** Beautiful and lightweight icons from `lucide-react-native`.
* **TypeScript:** End-to-end type safety.

---
## 🛠️ Tech Stack

* **Framework:** React Native
* **Language:** TypeScript
* **Navigation:** React Navigation (Native Stack)
* **State Management:** React Context API
* **Styling:** Tailwind CSS (NativeWind) & `tailwind-variants`
* **Form Handling:** React Hook Form & Zod
* **Icons:** Lucide React Native
* **Local Storage:** AsyncStorage

---
## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Ensure you have a React Native development environment set up. If not, follow the official guide for your OS and target platform (iOS/Android):
[React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:haidernayyar/auth-app.git
    cd auth-app
    ```

2.  **Install dependencies:**
    ```bash
    # Using Yarn
    yarn install

    # Or using npm
    npm install
    ```

3.  **Install iOS dependencies (for macOS):**
    ```bash
    npx pod-install ios
    ```

4.  **Run the application:**

    * **For iOS:**
        ```bash
        npx react-native run-ios
        ```
    * **For Android:**
        ```bash
        npx react-native run-android
        ```
