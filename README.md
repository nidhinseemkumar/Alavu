# Alavu 📏

**Alavu** (the Malayalam word for *Measure*) is a premium, high-precision **Material Volume Calculator** designed for contractors, engineers, and DIY enthusiasts. Built with React Native and Expo, it provides a sleek, dark-themed experience for calculating the volume of cuboids and cylinders with real-time updates and unified results.

![Alavu Logo](https://img.shields.io/badge/Alavu-Material_Volume_Calculator-FFAB00?style=for-the-badge&logo=materialdesign&logoColor=white)

---

## ✨ Key Features

- **Dual Shape Support**: Calculate volumes for both **Cuboids** (Length × Width × Height) and **Cylinders** (π × Radius² × Height).
- **Multi-Unit Integration**: Convert and calculate seamlessly between:
  - 🌍 **Meters (m)**
  - 📏 **Centimeters (cm)**
  - 📐 **Inches (in)**
  - 🦶 **Feet (ft)**
- **Unified Result Dashboard**: A split-pane real-time display showing your inputs alongside the final result in cubic meters (m³).
- **Responsive Animations**: Smooth transitions and auto-scrolling focus for a frictionless data entry experience.
- **Premium Aesthetics**: A custom "Amber Glow" dark theme designed for high visibility in various lighting conditions.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Expo Go](https://expo.dev/expo-go) app (on your iOS/Android device)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nidhinseemkumar/Alavu.git
   cd Alavu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open the app:**
   Scan the QR code displayed in your terminal using the Expo Go app.

---

## 🛠 Built With

- **Framework**: [React Native](https://reactnative.dev/)
- **Platform**: [Expo SDK 54](https://expo.dev/)
- **Icons**: [Material Community Icons](https://materialdesignicons.com/)
- **Styling**: Vanilla StyleSheet (Custom Design System)

---

## 📐 Calculation Logic

### 1. Cuboid Volume
Uses the formula:
$$V = L \times W \times H$$
*Inputs are normalized to meters before calculation.*

### 2. Cylinder Volume
Uses the formula:
$$V = \pi \times r^2 \times h$$
*Inputs are normalized to meters before calculation.*

---

## 👤 Author

**Nidhin Seemkumar**
- GitHub: [@nidhinseemkumar](https://github.com/nidhinseemkumar)
- Email: [nidhinseem@gmail.com](mailto:nidhinseem@gmail.com)

---

## 📄 License

© 2026 Nidhin Seemkumar. All Rights Reserved.
This project is private and intended for demonstration purposes.
