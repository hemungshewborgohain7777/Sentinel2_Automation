// ============================================================
// SENTINEL-2 ANALYSIS DASHBOARD
// Google Earth Engine App
//
// Features:
// 1. Draw AOI on map
// 2. Import AOI from GEE Asset
// 3. Sentinel-2 filtering
// 4. Cloud filtering
// 5. RGB
// 6. False Color
// 7. NDVI
// 8. NDWI
// 9. NDBI
// 10. Image count
// 11. Export result to Google Drive
// ============================================================


// ============================================================
// 1. DEFAULT MAP LOCATION
// ============================================================

Map.setCenter(91.7362, 26.1445, 10);


// ============================================================
// 2. DRAWING TOOLS
// ============================================================

var drawingTools = Map.drawingTools();

drawingTools.setShown(true);

drawingTools.layers().reset();

drawingTools.setDrawModes([
  'polygon',
  'rectangle'
]);


// ============================================================
// 3. AOI VARIABLE
// ============================================================

var aoi = null;

var selectedAOI = null;

var currentImage = null;

var currentResult = null;


// ============================================================
// 4. TITLE
// ============================================================

var title = ui.Label({
  value: 'Sentinel-2 Analysis Dashboard (Automated⚡️)',

  style: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '10px 5px'
  }
});


var subtitle = ui.Label({
  value:
    'Explore Sentinel-2A (2017 onwards) imagery and spectral indices - Hemungshew Borgohain',

  style: {
    fontSize: '12px',
    color: 'gray',
    margin: '0 5px 10px 5px'
  }
});


// ============================================================
// 5. MAIN PANEL
// ============================================================

var panel = ui.Panel({

  widgets: [
    title,
    subtitle
  ],

  style: {
    width: '330px',
    padding: '10px'
  }

});

ui.root.insert(0, panel);


// ============================================================
// 6. AOI SOURCE
// ============================================================

panel.add(
  ui.Label({
    value: 'AOI Source',
    style: {
      fontWeight: 'bold',
      margin: '10px 5px 5px 5px'
    }
  })
);


var aoiSource = ui.Select({

  items: [
    'Draw on Map',
    'GEE Asset'
  ],

  value: 'Draw on Map',

  style: {
    stretch: 'horizontal'
  }

});

panel.add(aoiSource);


// ============================================================
// 7. GEE ASSET INPUT
// ============================================================

var assetLabel = ui.Label(
  'GEE Asset ID'
);

var assetTextbox = ui.Textbox({

  placeholder:
    'projects/ee-username/assets/my_aoi',

  style: {
    stretch: 'horizontal'
  }

});

panel.add(assetLabel);
panel.add(assetTextbox);


// ============================================================
// 8. AOI STATUS
// ============================================================

var aoiStatus = ui.Label({

  value: 'AOI: Not selected',

  style: {
    margin: '10px 5px'
  }

});

panel.add(aoiStatus);


// ============================================================
// 9. DATE INPUTS
// ============================================================

panel.add(
  ui.Label({
    value: 'Start Date',
    style: {
      margin: '10px 5px 5px 5px'
    }
  })
);


var startDate = ui.Textbox({

  value: '2026-01-01',

  placeholder: 'YYYY-MM-DD',

  style: {
    stretch: 'horizontal'
  }

});

panel.add(startDate);


panel.add(
  ui.Label({
    value: 'End Date',
    style: {
      margin: '10px 5px 5px 5px'
    }
  })
);


var endDate = ui.Textbox({

  value: '2026-03-31',

  placeholder: 'YYYY-MM-DD',

  style: {
    stretch: 'horizontal'
  }

});

panel.add(endDate);


// ============================================================
// 10. CLOUD COVER
// ============================================================

var cloudLabel = ui.Label(
  'Maximum Cloud Cover: 20%'
);


var cloudSlider = ui.Slider({

  min: 0,

  max: 100,

  value: 20,

  step: 5,

  style: {
    stretch: 'horizontal'
  }

});


cloudSlider.onChange(function(value) {

  cloudLabel.setValue(
    'Maximum Cloud Cover: ' +
    value +
    '%'
  );

});


panel.add(cloudLabel);

panel.add(cloudSlider);


// ============================================================
// 11. VISUALIZATION
// ============================================================

panel.add(
  ui.Label({
    value: 'Visualization',
    style: {
      margin: '10px 5px 5px 5px'
    }
  })
);


var visualizationSelect = ui.Select({

  items: [
    'RGB',
    'False Color',
    'NDVI',
    'NDWI',
    'NDBI'
  ],

  value: 'RGB',

  style: {
    stretch: 'horizontal'
  }

});


panel.add(visualizationSelect);


// ============================================================
// 12. RUN BUTTON
// ============================================================

var runButton = ui.Button({

  label: 'RUN ANALYSIS',

  style: {
    stretch: 'horizontal',
    margin: '15px 0px 5px 0px'
  }

});


panel.add(runButton);


// ============================================================
// 13. CLEAR AOI BUTTON
// ============================================================

var clearAOIButton = ui.Button({

  label: 'CLEAR AOI',

  style: {
    stretch: 'horizontal'
  }

});


panel.add(clearAOIButton);


// ============================================================
// 14. EXPORT BUTTON
// ============================================================

var exportButton = ui.Button({

  label: 'EXPORT TO GOOGLE DRIVE',

  style: {
    stretch: 'horizontal',
    margin: '15px 0px 5px 0px'
  }

});


panel.add(exportButton);


// ============================================================
// 15. INFORMATION
// ============================================================

var infoLabel = ui.Label({

  value:
    'Draw an AOI or select a GEE Asset.',

  style: {
    fontSize: '12px',
    margin: '10px 5px'
  }

});


panel.add(infoLabel);


// ============================================================
// 16. DETECT DRAWN AOI
// ============================================================

drawingTools.onDraw(function(geometry) {

  aoi = geometry;

  aoiStatus.setValue(
    'AOI: Selected from map'
  );

  print('Selected AOI:', aoi);

});


// ============================================================
// 17. CLEAR AOI
// ============================================================

clearAOIButton.onClick(function() {

  drawingTools.layers().reset();

  aoi = null;

  selectedAOI = null;

  aoiStatus.setValue(
    'AOI: Not selected'
  );

  infoLabel.setValue(
    'Draw an AOI or select a GEE Asset.'
  );

});


// ============================================================
// 18. RUN ANALYSIS
// ============================================================

runButton.onClick(function() {


  // ----------------------------------------------------------
  // Determine AOI
  // ----------------------------------------------------------

  if (
    aoiSource.getValue() ===
    'Draw on Map'
  ) {

    if (aoi === null) {

      infoLabel.setValue(
        'ERROR: Please draw an AOI first.'
      );

      return;

    }

    selectedAOI = aoi;

  }


  else {

    var assetId =
      assetTextbox.getValue();

    if (
      assetId === null ||
      assetId === ''
    ) {

      infoLabel.setValue(
        'ERROR: Please enter a GEE Asset ID.'
      );

      return;

    }

    try {

      selectedAOI =
        ee.FeatureCollection(
          assetId
        ).geometry();

    }

    catch (error) {

      infoLabel.setValue(
        'ERROR: Invalid GEE Asset.'
      );

      return;

    }

  }


  // ----------------------------------------------------------
  // User parameters
  // ----------------------------------------------------------

  var start =
    startDate.getValue();

  var end =
    endDate.getValue();

  var maxCloud =
    cloudSlider.getValue();

  var visualization =
    visualizationSelect.getValue();


  // ----------------------------------------------------------
  // Sentinel-2 collection
  // ----------------------------------------------------------

  var collection =
    ee.ImageCollection(
      'COPERNICUS/S2_SR_HARMONIZED'
    )
    .filterBounds(
      selectedAOI
    )
    .filterDate(
      start,
      end
    )
    .filter(
      ee.Filter.lte(
        'CLOUDY_PIXEL_PERCENTAGE',
        maxCloud
      )
    );


  // ----------------------------------------------------------
  // Image count
  // ----------------------------------------------------------

  var imageCount =
    collection.size();


  // ----------------------------------------------------------
  // Create median composite
  // ----------------------------------------------------------

  var image =
    collection.median();


  currentImage = image;


  // ----------------------------------------------------------
  // Clear old image layers
  // ----------------------------------------------------------

  Map.layers().reset();


  // ----------------------------------------------------------
  // Add AOI
  // ----------------------------------------------------------

  Map.addLayer(

    selectedAOI,

    {
      color: 'red'
    },

    'AOI'

  );


  // ==========================================================
  // RGB
  // ==========================================================

  if (
    visualization ===
    'RGB'
  ) {

    currentResult =
      image.clip(
        selectedAOI
      );

    Map.addLayer(

      currentResult,

      {
        bands: [
          'B4',
          'B3',
          'B2'
        ],

        min: 0,

        max: 3000
      },

      'Sentinel-2 RGB'

    );

  }


  // ==========================================================
  // FALSE COLOR
  // ==========================================================

  else if (
    visualization ===
    'False Color'
  ) {

    currentResult =
      image.clip(
        selectedAOI
      );

    Map.addLayer(

      currentResult,

      {
        bands: [
          'B8',
          'B4',
          'B3'
        ],

        min: 0,

        max: 3000
      },

      'False Color'

    );

  }


  // ==========================================================
  // NDVI
  // ==========================================================

  else if (
    visualization ===
    'NDVI'
  ) {

    var ndvi =
      image
      .normalizedDifference(
        [
          'B8',
          'B4'
        ]
      )
      .rename(
        'NDVI'
      );


    currentResult =
      ndvi.clip(
        selectedAOI
      );


    Map.addLayer(

      currentResult,

      {
        min: -1,

        max: 1,

        palette: [
          'blue',
          'white',
          'green'
        ]
      },

      'NDVI'

    );

  }


  // ==========================================================
  // NDWI
  // ==========================================================

  else if (
    visualization ===
    'NDWI'
  ) {

    var ndwi =
      image
      .normalizedDifference(
        [
          'B3',
          'B8'
        ]
      )
      .rename(
        'NDWI'
      );


    currentResult =
      ndwi.clip(
        selectedAOI
      );


    Map.addLayer(

      currentResult,

      {
        min: -1,

        max: 1,

        palette: [
          'brown',
          'white',
          'blue'
        ]
      },

      'NDWI'

    );

  }


  // ==========================================================
  // NDBI
  // ==========================================================

  else if (
    visualization ===
    'NDBI'
  ) {

    var ndbi =
      image
      .normalizedDifference(
        [
          'B11',
          'B8'
        ]
      )
      .rename(
        'NDBI'
      );


    currentResult =
      ndbi.clip(
        selectedAOI
      );


    Map.addLayer(

      currentResult,

      {
        min: -1,

        max: 1,

        palette: [
          'green',
          'white',
          'red'
        ]
      },

      'NDBI'

    );

  }


  // ----------------------------------------------------------
  // Display information
  // ----------------------------------------------------------

  imageCount.evaluate(
    function(count) {

      infoLabel.setValue(

        'Analysis complete.\n' +
        'Images found: ' +
        count +
        '\n' +
        'Visualization: ' +
        visualization

      );

    }
  );


  print(
    'Image Collection:',
    collection
  );

  print(
    'Number of Images:',
    imageCount
  );

});


// ============================================================
// 19. EXPORT TO GOOGLE DRIVE
// ============================================================

exportButton.onClick(function() {


  // ----------------------------------------------------------
  // Check whether analysis has been run
  // ----------------------------------------------------------

  if (
    currentResult === null
  ) {

    infoLabel.setValue(
      'Please run an analysis before exporting.'
    );

    return;

  }


  if (
    selectedAOI === null
  ) {

    infoLabel.setValue(
      'No AOI selected.'
    );

    return;

  }


  // ----------------------------------------------------------
  // Get selected visualization
  // ----------------------------------------------------------

  var visualization =
    visualizationSelect.getValue();


  // ----------------------------------------------------------
  // Create export name
  // ----------------------------------------------------------

  var exportName =
    'Sentinel2_' +
    visualization +
    '_2026';


  // ----------------------------------------------------------
  // Create Drive export
  // ----------------------------------------------------------

  Export.image.toDrive({

    image: currentResult,

    description: exportName,

    folder: 'GEE_Exports',

    fileNamePrefix: exportName,

    region: selectedAOI,

    scale: 10,

    maxPixels: 1e13

  });


  // ----------------------------------------------------------
  // Inform user
  // ----------------------------------------------------------

  infoLabel.setValue(

    'Export task created.\n' +
    'Open the Tasks tab and click RUN.'

  );


  print(
    'Export task created:',
    exportName
  );

});
