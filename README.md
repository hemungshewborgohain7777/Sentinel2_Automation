# Sentinel-2 Automation DOC

```## ***Link attached below About to check it out - Just login your codeEditor id***```

An interactive **Google Earth Engine (GEE)** application for exploring Sentinel-2 satellite imagery and generating commonly used spectral indices for remote sensing analysis.

The dashboard provides an interactive interface for selecting an Area of Interest (AOI), filtering Sentinel-2 imagery by date and cloud cover, visualizing satellite composites and spectral indices, and exporting analysis results to Google Drive.

## Features

* Interactive AOI selection by drawing a **polygon or rectangle** on the map
* Import AOI from a **Google Earth Engine Asset**
* Custom **start and end date** selection
* Adjustable **maximum cloud-cover percentage**
* Sentinel-2 Surface Reflectance Harmonized imagery
* **RGB composite** visualization
* **False-colour composite** visualization
* **NDVI** calculation
* **NDWI** calculation
* **NDBI** calculation
* Display of the number of Sentinel-2 images matching the selected criteria
* Export of analysis results to **Google Drive**
* Interactive map-based visualization

## Technologies

* **Google Earth Engine**
* **JavaScript**
* **Sentinel-2**
* Remote Sensing
* Geographic Information Systems (GIS)
* Spectral Index Analysis

## Data Source

The application uses the following Google Earth Engine image collection:

`COPERNICUS/S2_SR_HARMONIZED`

The Sentinel-2 collection is filtered according to:

* User-defined AOI
* User-defined date range
* Maximum cloud-cover percentage

A median composite is then generated from the filtered image collection.

## Spectral Indices

### NDVI — Normalized Difference Vegetation Index

NDVI is used to examine vegetation characteristics.

**Formula:**

```text
NDVI = (NIR - Red) / (NIR + Red)
```

The application uses Sentinel-2 bands:

```text
NIR  = B8
Red  = B4
```

### NDWI — Normalized Difference Water Index

NDWI is used to highlight water-related features.

**Formula:**

```text
NDWI = (Green - NIR) / (Green + NIR)
```

The application uses:

```text
Green = B3
NIR   = B8
```

### NDBI — Normalized Difference Built-up Index

NDBI is used to highlight built-up areas.

**Formula:**

```text
NDBI = (SWIR - NIR) / (SWIR + NIR)
```

The application uses:

```text
SWIR = B11
NIR  = B8
```

## Visualization Options

The dashboard currently provides five visualization modes:

| Visualization | Sentinel-2 Bands / Index |
| ------------- | ------------------------ |
| RGB           | B4, B3, B2               |
| False Colour  | B8, B4, B3               |
| NDVI          | (B8 - B4) / (B8 + B4)    |
| NDWI          | (B3 - B8) / (B3 + B8)    |
| NDBI          | (B11 - B8) / (B11 + B8)  |

## How It Works

The application follows this workflow:

```text
AOI Selection
      ↓
Date & Cloud Filtering
      ↓
Sentinel-2 Image Collection
      ↓
Median Composite
      ↓
Visualization Selection
      ↓
RGB / False Colour / NDVI / NDWI / NDBI
      ↓
Interactive Map Display
      ↓
Optional Google Drive Export
```

## How to Run

### 1. Open Google Earth Engine

Open the **Google Earth Engine Code Editor** and sign in with your Google account.

### 2. Create a new script

Create a new JavaScript script and copy the contents of:

```text
sentinel2_automation.js
```

into the Code Editor.

### 3. Run the application

Click **Run** in the Earth Engine Code Editor.

The dashboard will appear alongside the map.

### 4. Select an AOI

You can either:

* Draw a polygon or rectangle directly on the map, or
* Select **GEE Asset** and enter the Earth Engine Asset ID.

### 5. Set analysis parameters

Specify:

* Start date
* End date
* Maximum cloud cover

### 6. Select a visualization

Choose one of:

* RGB
* False Colour
* NDVI
* NDWI
* NDBI

### 7. Run the analysis

Click:

**RUN ANALYSIS**

The application will display the selected visualization and report the number of images found.

### 8. Export the result

After running the analysis, click:

**EXPORT TO GOOGLE DRIVE**

An Earth Engine export task will be created. Open the **Tasks** tab in the Code Editor and click **Run** to start the export.

## Project Structure

```text
Sentinel2-Automation/
│
├── sentinel2_automation.js
├── README.md
├── screenshots/
│   ├── dashboard.png
│   ├── rgb.png
│   ├── ndvi.png
│   ├── ndwi.png
│   └── ndbi.png
│
└── LICENSE
```

## Example Applications

The dashboard can be used as a starting point for:

* Vegetation monitoring
* Water-body identification
* Built-up area exploration
* Land-cover analysis
* Satellite image visualization
* Preliminary remote sensing investigations
* Educational demonstrations of spectral indices

## Limitations

This project is intended primarily as an **interactive remote sensing analysis and visualization tool**.

The current implementation:

* Uses a median composite of the filtered Sentinel-2 collection
* Does not perform advanced atmospheric correction beyond using the Sentinel-2 Surface Reflectance product
* Does not implement supervised or unsupervised classification
* Does not perform accuracy assessment
* Does not automatically generate statistical summaries of each index
* Requires Google Earth Engine for execution

## Future Improvements

Planned improvements include:

* Add a more robust cloud and cloud-shadow masking workflow
* Add additional spectral indices
* Add temporal analysis and time-series charts
* Add interactive statistics for the selected AOI
* Add land-use/land-cover classification
* Add downloadable analysis reports
* Improve UI design and user experience
* Add support for additional satellite datasets
* Add automated visualization legends
* Add dynamic export filenames based on the selected date range

## Author

**Hemungshew Borgohain**

B.Sc. (Hons.) Geography | GIS & Remote Sensing

Interested in:

* Geospatial Data Science
* Remote Sensing
* GIS
* Google Earth Engine
* Python for Geospatial Analysis
* GeoAI

## License

This project is intended for educational and portfolio purposes. Please refer to the applicable terms and licenses of the underlying datasets and Google Earth Engine platform when using or redistributing derived outputs.
