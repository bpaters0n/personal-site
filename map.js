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

  // Define projection and path.  We use fitSize on the sphere for
  // convenience – this scales the projection to fill the SVG.
  const projection = d3
    .geoMercator()
    .fitSize([width, height], { type: 'Sphere' });
  const path = d3.geoPath().projection(projection);

  // Load a country GeoJSON that includes ISO_A3 properties.  This
  // dataset is hosted on GitHub and contains country boundaries with
  // ISO codes.  If the request fails, the map will not render.
  fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
    .then((resp) => resp.json())
    .then((geoData) => {
      // Draw countries
      svg
        .append('g')
        .selectAll('path')
        .data(geoData.features)
        .join('path')
        .attr('d', path)
        .attr('fill', (d) => {
          const iso3 = d.properties.ISO_A3;
          // Some territories may have invalid codes (e.g. '-99')
          if (!iso3 || iso3.length !== 3 || iso3 === '-99') return '#D1D5DB';
          return visitedIso3.includes(iso3) ? '#0B2447' : '#D1D5DB';
        })
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 0.4);

      // Plot lived-in cities
      svg
        .append('g')
        .selectAll('circle')
        .data(cities)
        .join('circle')
        .attr('cx', (d) => projection([d.lon, d.lat])[0])
        .attr('cy', (d) => projection([d.lon, d.lat])[1])
        .attr('r', 4)
        .attr('fill', '#ffffff')
        .attr('stroke', '#0B2447')
        .attr('stroke-width', 1.5);

      // City labels
      svg
        .append('g')
        .selectAll('text')
        .data(cities)
        .join('text')
        .attr('x', (d) => projection([d.lon, d.lat])[0])
        .attr('y', (d) => projection([d.lon, d.lat])[1] - 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .attr('fill', '#374151')
        .text((d) => d.city);
    })
    .catch((err) => {
      console.error('Error loading world data:', err);
    });
});
