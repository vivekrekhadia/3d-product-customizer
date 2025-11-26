# 3D Product Customizer

A modern, interactive 3D product customization application built with **React**, **TypeScript**, and **Three.js**. This application allows users to view 3D models, customize their appearance (colors), switch between different models, upload custom models, and save/manage their designs.

![Project Banner](https://via.placeholder.com/1200x600?text=3D+Product+Customizer+Preview)

## 🚀 Features

- **Interactive 3D Viewer**: Real-time 3D rendering using **React Three Fiber**. Rotate, zoom, and pan around the product.
- **Model Selection**:
  - Choose from built-in models: **Shoe**, **Cube**, **Sphere**.
  - **Custom Upload**: Upload your own `.glb` or `.gltf` 3D models to visualize them.
- **Advanced Color Customization**:
  - Change colors for different parts of the model (Base, Accent, Sole).
  - Use a color picker for precise control or select from a palette of presets.
- **Design Management**:
  - **Save Designs**: Save your current color configuration with a custom name.
  - **Load Designs**: Quickly restore previously saved designs.
  - **Delete Designs**: Remove unwanted designs.
  - **Persistence**: All saved designs are stored in your browser's **LocalStorage**, so they persist across reloads.
- **Snapshot Export**: Download a high-quality PNG snapshot of your customized 3D product.
- **Responsive UI**: A sleek, dark-themed interface built with **TailwindCSS** that works seamlessly on desktop and tablet.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **React 3D Bindings**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
src/
├── assets/              # Static assets
├── components/
│   ├── layout/          # Layout components (TopBar, etc.)
│   ├── panels/          # UI Control Panels
│   │   ├── ControlPanel.tsx        # Main container for controls
│   │   ├── ColorSection.tsx        # Color picker controls
│   │   ├── ModelSection.tsx        # Model selection & upload
│   │   ├── PresetSection.tsx       # Pre-defined color presets
│   │   └── SavedDesignsSection.tsx # Saved designs list
│   └── three/           # 3D Components
│       ├── Viewer3D.tsx            # Main Canvas wrapper
│       └── ProductModel.tsx        # The 3D Model renderer
├── state/
│   └── useCustomizerStore.ts # Zustand store for app state
├── App.tsx              # Main Application Component
└── main.tsx             # Entry Point
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd 3d-product-customizer
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate static files in the `dist` directory, which can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 🎨 Customization Guide

### Adding New Models

To add more built-in models, update the `ProductModel.tsx` component to include your new model geometry and handle its specific colorable materials. You will also need to update the `ModelType` definition in `useCustomizerStore.ts`.

### Modifying Colors

The default colors and presets can be modified in `useCustomizerStore.ts` and `PresetSection.tsx` respectively.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
