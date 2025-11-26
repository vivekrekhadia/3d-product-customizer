# 3D Product Customizer - Walkthrough

This project is a frontend-only 3D product customizer built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

## Features Implemented

- **3D Viewer**: Interactive 3D viewer using `@react-three/fiber`.
- **Multiple Models**: Switch between Shoe, Cube, and Sphere models.
- **Custom Model Upload**: Upload your own `.glb` or `.gltf` files to view and customize.
- **Customization**:
  - Change colors for Base, Accent, and Sole parts.
  - **Custom Color Picker**: Choose any color using the native color picker.
- **Themes**: Preset color themes (Classic, Neon, Stealth, Sunset).
- **Save/Load**: Save designs to local storage and load them back.
- **Gallery**: View and manage saved designs.
- **Export**: Download a PNG snapshot of the current 3D view.
- **Responsive Design**: Works on desktop (side-by-side) and mobile (stacked).

## Project Structure

- `src/components/three/`: 3D related components (`Viewer3D`, `ProductModel`).
- `src/components/panels/`: UI control panels.
  - `ModelSection`: Model selector and upload.
  - `ColorSection`: Color swatches and custom picker.
  - `PresetSection`: Quick themes.
  - `SavedDesignsSection`: Gallery.
- `src/state/`: Global state management with Zustand (`useCustomizerStore`).
- `src/App.tsx`: Main layout and integration.

## How to Run

1.  Navigate to the project directory:

    ```bash
    cd 3d-product-customizer
    ```

2.  Install dependencies (if not already done):

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

4.  Open the URL shown in the terminal (usually `http://localhost:5173`).

## Verification Results

- **Build**: Passed (`npm run build`).
- **Functionality**:
  - Switching models works (Shoe -> Cube -> Sphere).
  - Custom model upload works (loads local GLB).
  - Custom color picker updates model color.
  - All previous features (presets, save/load, download) retained.
