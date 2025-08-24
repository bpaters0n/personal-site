/*
 * World map renderer.
 *
 * Uses D3 and TopoJSON to draw a simplified world map with
 * countries coloured according to whether they appear in the
 * `travel.visitedIso3` list.  Cities you have lived in are plotted
 * as small white dots with labels.  The map automatically scales to
 * the size of its container.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Ensure the data variables are available
  if (!window.travel) {
    console.error('Travel data not found');
    return;
  }

  const visitedIso3 = window.travel.visitedIso3 || [];
  const cities = window.travel.livedCities || [];
  const container = document.getElementById('world-map');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3
    .select(container)
    .attr('width', width)
    .attr('height', height);

  // Set a light grey background on the SVG. Without this, the page
  // background would show through when zooming or panning. Keeping it
  // grey ensures that unvisited countries (rendered white) stand out
  // clearly while visited countries remain prominent. This grey matches
  // the container background (#f3f4f6) used in the stylesheet.
  svg.style('background', '#f3f4f6');

  // Define projection and path.  We use fitSize on the sphere for
  // convenience – this scales the projection to fill the SVG.
  const projection = d3
    .geoMercator()
    .fitSize([width, height], { type: 'Sphere' });
  const path = d3.geoPath().projection(projection);

  /*
   * Load country boundaries and colour them based on your travel history.
   *
   * We fetch a public Natural Earth GeoJSON hosted on CloudFront.  This
   * endpoint has CORS enabled so it can be requested directly from the
   * browser.  It contains polygon boundaries for every sovereign
   * country and includes multiple ISO3 codes under different property
   * names (`ISO_A3`, `iso_a3`, `ADM0_A3`, `adm0_a3`, `brk_a3`).  To
   * maximise compatibility, we compute the ISO3 for each feature by
   * checking these properties in order of preference.  We then
   * normalise the value to uppercase and compare against a set of
   * visited country codes.  Countries you have visited are filled
   * navy (#0B2447); all others are light grey (#D1D5DB).
   */
  const visitedSet = new Set((visitedIso3 || []).map((c) => String(c).toUpperCase()));

  // Fetch the Natural Earth GeoJSON and draw the map. Countries are coloured
  // navy if visited, grey otherwise. A custom tooltip appears when hovering
  // over a visited country. All shapes and labels live inside a single group
  // so that zoom and pan transformations apply uniformly.
  fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson')
    .then((resp) => resp.json())
    .then((geoData) => {
      // Group for all map elements (countries, markers, labels)
      const mapGroup = svg.append('g');

      // Tooltip setup
      container.style.position = 'relative';
      const tooltip = d3
        .select(container)
        .append('div')
        .style('position', 'absolute')
        .style('display', 'none')
        .style('background', 'rgba(255,255,255,0.9)')
        .style('border', '1px solid #ccc')
        .style('padding', '4px 6px')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .style('font-size', '12px')
        .style('color', '#0B2447');

      // Draw country polygons
      mapGroup
        .selectAll('path')
        .data(geoData.features)
        .join('path')
        .attr('d', path)
        .attr('fill', (d) => {
          const props = d.properties || {};
          const iso3 = String(
            props.ISO_A3 ||
            props.iso_a3 ||
            props.ADM0_A3 ||
            props.adm0_a3 ||
            props.brk_a3 ||
            d.id ||
            ''
          ).toUpperCase();
          // Countries with invalid ISO codes will be rendered as white,
          // matching the unvisited style.  Visited countries remain navy.
          if (!iso3 || iso3 === '-99' || iso3.length !== 3) return '#ffffff';
          return visitedSet.has(iso3) ? '#0B2447' : '#ffffff';
        })
        // Use the same grey as the container for borders so they blend into
        // the background.  This creates a clean look without distracting
        // outlines around each country.
        .attr('stroke', '#f3f4f6')
        .attr('stroke-width', 0.4)
        .on('mouseover', function (event, d) {
          const props = d.properties || {};
          const iso3 = String(
            props.ISO_A3 ||
            props.iso_a3 ||
            props.ADM0_A3 ||
            props.adm0_a3 ||
            props.brk_a3 ||
            d.id ||
            ''
          ).toUpperCase();
          if (iso3 && visitedSet.has(iso3)) {
            tooltip.style('display', 'block').text(props.ADMIN);
          }
        })
        .on('mousemove', function (event) {
          // Use d3.pointer to compute coordinates relative to the container.
          // This avoids issues where offsetX/offsetY may refer to the SVG
          // rather than the container.  The pointer function returns an
          // array [x, y] relative to the given container.
          const [x, y] = d3.pointer(event, container);
          tooltip
            .style('left', x + 10 + 'px')
            .style('top', y + 10 + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('display', 'none');
        });

      // Plot lived-in cities
      // We place both the markers and labels in groups under mapGroup so that
      // they are transformed together.  A class is assigned to the labels
      // allowing their size and stroke to be updated on zoom.  The base
      // values for radius, font size and stroke width are stored so that
      // they can be scaled inversely to the current zoom level.
      const baseCircleRadius = 4;
      const baseLabelSize = 12;
      const baseStrokeWidth = 3;

      // Offsets for city labels to avoid overlapping text.  Each entry
      // provides a [dx, dy] adjustment in pixels applied to the label
      // position relative to the projected city coordinates.  Positive dy
      // values push the label downward; negative dy values lift it up.
      const labelOffsets = {
        "Toronto": [0, -12],
        "New York": [0, 6],
        "Prague": [0, -8],
      };

      const citiesGroup = mapGroup.append('g');
      citiesGroup
        .selectAll('circle')
        .data(cities)
        .join('circle')
        .attr('cx', (d) => projection([d.lon, d.lat])[0])
        .attr('cy', (d) => projection([d.lon, d.lat])[1])
        .attr('r', baseCircleRadius)
        .attr('fill', '#ffffff')
        .attr('stroke', '#0B2447')
        .attr('stroke-width', 1.5);

      // City labels with white outline for contrast.  We assign a class
      // 'city-label' so we can adjust the font size and stroke width on
      // zoom.  They are positioned slightly above the corresponding
      // marker.  The paint-order property ensures that the stroke is
      // drawn first so that the fill sits on top of the outline.
      const labelsGroup = mapGroup.append('g');
      labelsGroup
        .selectAll('text')
        .data(cities)
        .join('text')
        .attr('class', 'city-label')
        .attr('x', (d) => {
          const [lon, lat] = [d.lon, d.lat];
          const proj = projection([lon, lat]);
          const offset = labelOffsets[d.city] || [0, 0];
          return proj[0] + offset[0];
        })
        .attr('y', (d) => {
          const [lon, lat] = [d.lon, d.lat];
          const proj = projection([lon, lat]);
          const offset = labelOffsets[d.city] || [0, 0];
          // base vertical offset of -8 to position above marker, plus any custom offset
          return proj[1] - 8 + offset[1];
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', `${baseLabelSize}px`)
        .attr('font-weight', '600')
        // Use the same navy colour as visited countries for the text fill.  A white
        // stroke is applied below, and paint-order ensures the stroke sits
        // behind the fill so the label remains legible on both grey and navy
        // backgrounds.
        .attr('fill', '#0B2447')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', baseStrokeWidth)
        .attr('paint-order', 'stroke fill')
        .text((d) => d.city);

      // Zoom and pan behaviour
      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 10])
          .on('zoom', (event) => {
            const { transform } = event;
            mapGroup.attr('transform', transform);
            // Adjust label font size and stroke width inversely to zoom level so that
            // the labels shrink when zooming in (k > 1) and grow when zooming out.
            const k = transform.k;
            labelsGroup
              .selectAll('text.city-label')
              .attr('font-size', `${baseLabelSize / k}px`)
              .attr('stroke-width', baseStrokeWidth / k);
            // Adjust circle radius and stroke width inversely to zoom so
            // city markers shrink along with the labels when zooming in.
            citiesGroup
              .selectAll('circle')
              .attr('r', baseCircleRadius / k)
              .attr('stroke-width', 1.5 / k);
          })
      );
    })
    .catch((err) => {
      console.error('Error loading world data:', err);
    });
});